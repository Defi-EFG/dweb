import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { LendingPlatform, Loan, Pool, CollateralAsset } from '@/types/lending'
import * as constants from '@/constants'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'

import { lending } from '@/services/lending'
import { WalletParams } from '@/services/ecoc/types'
import { loanCurrency } from '@/store/common'

const myActivity = [
  {
    activityName: 'borrow',
    currencyName: 'EFG',
    timestamp: 1602222563,
    amount: 200,
    price: 0
  },
  {
    activityName: 'deposit',
    currencyName: 'ECOC',
    timestamp: 1602222563,
    amount: 1000,
    price: 0
  },
  {
    activityName: 'activated',
    currencyName: 'ECOC',
    timestamp: 1602222563,
    amount: 1000,
    price: 0
  }
]

const myCollateralAssets = [
  {
    currency: {
      name: constants.ECOC,
      style: constants.KNOWN_CURRENCY[constants.ECOC]
    },
    amount: 0,
    collateralFactor: 0.6 // 60%
  } as CollateralAsset
]

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  address = lending.address
  loan = {
    poolAddr: '',
    currency: loanCurrency,
    amount: 0,
    timestamp: 0,
    interestRate: 0,
    exchangeRate: 0,
    interest: 0,
    EFGInitialRate: 0,
    lastGracePeriod: 0,
    remainingGPT: 0
  } as Loan

  pools = [] as Pool[]
  myCollateralAssets = myCollateralAssets
  myActivity = myActivity
  collateralsActivated = [] as string[]

  lastUpdate = 0
  status = constants.STATUS_SYNCED

  get myBorrowing() {
    return [
      {
        currency: this.loan.currency,
        interestRate: this.loan.interestRate,
        amount: this.loan.amount,
        price: this.loan.exchangeRate
      }
    ]
  }

  get loaner() {
    return this.pools
  }

  @Mutation
  updateTime() {
    this.lastUpdate = new Date().getTime()
  }

  @Mutation
  updateStatus(status: string) {
    this.status = status
  }

  @MutationAction
  async activatedCollateral(currrencyName: string) {
    const collateralsActivated = (this.state as any).collateralsActivated
    const index = collateralsActivated.indexOf(currrencyName)

    if (index < 0) {
      collateralsActivated.push(currrencyName)
    }

    return { collateralsActivated }
  }

  @MutationAction
  async deactivatedCollateral(currrencyName: string) {
    const collateralsActivated = (this.state as any).collateralsActivated
    const index = collateralsActivated.indexOf(currrencyName)

    if (index >= 0) {
      collateralsActivated.splice(index, 1)
    }

    return { collateralsActivated }
  }

  @MutationAction
  async updateLoan(address: string) {
    const loan = (this.state as any).loan
    const loanInfo = await lending.getLoanInfo(address)

    if (loanInfo.interestRate <= 0) {
      loanInfo.interestRate = await lending.getInterestRate()
    }

    if (loanInfo.poolAddr === '') {
      loan.poolAddr = await lending.getUserPool(address)
    } else {
      loan.poolAddr = loanInfo.poolAddr
    }

    loan.amount = loanInfo.amount
    loan.timestamp = loanInfo.timestamp
    loan.interestRate = loanInfo.interestRate
    loan.interest = loanInfo.interest
    loan.EFGInitialRate = loanInfo.EFGInitialRate
    loan.lastGracePeriod = loanInfo.lastGracePeriod
    loan.remainingGPT = loanInfo.remainingGPT

    return { loan }
  }

  @MutationAction
  async updateCollateral(address: string) {
    const myCollateralAssets = (this.state as any).myCollateralAssets as CollateralAsset[]

    const res = await lending.getCollateralInfo(address)

    res.forEach(collateral => {
      let decimals = 8
      if (collateral.currencyName === 'USDT') {
        decimals = 4
      } else if (collateral.currencyName === 'ETH') {
        decimals = 16
      }

      const index = myCollateralAssets.findIndex(
        asset => asset.currency.name === collateral.currencyName
      )

      if (!index) {
        const newAsset = {
          currency: {
            name: collateral.currencyName,
            style: constants.KNOWN_CURRENCY[collateral.currencyName]
          },
          amount: utils.toDecimals(collateral.amount, decimals).toNumber(),
          collateralFactor: 0.6 // 60%
        }

        myCollateralAssets.push(newAsset)
      }

      const myAsset = myCollateralAssets[index]

      myAsset.amount = utils.toDecimals(collateral.amount, decimals).toNumber()
      myCollateralAssets.splice(index, 1, myAsset)
    })

    return { myCollateralAssets }
  }

  @MutationAction
  async updateLoners() {
    const pools = (this.state as any).pools as Pool[]
    const allPools = await lending.getAllPools()

    allPools.forEach(async address => {
      const poolInfo = await lending.getPoolInfo(address)
      const existingLoanerIndex = pools.findIndex(pool => pool.address === address)

      if (existingLoanerIndex < 0) {
        const newLoaner = {
          currency: loanCurrency,
          address: address,
          totalSupply: 100000,
          totalBorrowed: 0
        } as Pool
        pools.push(newLoaner)
      } else {
        const existingLoaner = pools[existingLoanerIndex]

        existingLoaner.totalBorrowed = existingLoaner.totalSupply - poolInfo.remainingEFG
        pools.splice(existingLoanerIndex, 1, existingLoaner)
      }
    })

    return { pools }
  }

  @Action
  init() {
    this.context.commit('updateTime')
  }

  @Action
  synced() {
    this.context.commit('updateStatus', constants.STATUS_SYNCED)
    return constants.STATUS_SYNCED
  }

  @Action({ rawError: true })
  async depositCollateral(payloads: {
    currencyName: string
    amount: number
    poolAddress: string
    walletParams: WalletParams
  }) {
    const { currencyName, amount, poolAddress, walletParams } = payloads

    try {
      let rawTransaction
      if (currencyName === 'ECOC') {
        rawTransaction = await lending.depositECOC(amount, poolAddress, walletParams)
      } else {
        rawTransaction = await lending.depositECOC(amount, poolAddress, walletParams)
      }
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async withdrawCollateral(payloads: {
    currencyName: string
    amount: number
    walletParams: WalletParams
  }) {
    const { amount, currencyName, walletParams } = payloads

    try {
      let rawTransaction
      if (currencyName === 'ECOC') {
        rawTransaction = await lending.withdrawECOC(amount, walletParams)
      } else {
        rawTransaction = await lending.withdrawECOC(amount, walletParams)
      }

      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async borrow(payloads: { amount: number; walletParams: WalletParams }) {
    const { amount, walletParams } = payloads

    try {
      const rawTransaction = await lending.borrow(amount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async repay(payloads: { amount: number; walletParams: WalletParams }) {
    const { amount, walletParams } = payloads

    try {
      const rawTransaction = await lending.repay(amount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { LendingPlatform, Loan, Pool, CollateralAsset, Collateral } from '@/types/lending'
import { Currency } from '@/types/currency'
import * as constants from '@/constants'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'
import { Ecrc20 } from '@/services/ecrc20'
import { lending } from '@/services/lending'
import { WalletParams } from '@/services/ecoc/types'
import {
  loanCurrency,
  rewardCurrency as extendCurrency,
  getCurrencyDecimals,
  getTokenInfo
} from '@/store/common'
import { now } from 'moment'

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

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  address = lending.address
  pools = [] as Pool[]

  borrowLimit = 0
  borrowBalance = 0

  loan = {
    poolAddr: '',
    currency: loanCurrency,
    amount: 0,
    timestamp: 0,
    interestRate: 0,
    exchangeRate: 0,
    interest: 0,
    EFGInitialRate: 0,
    lastGracePeriod: now() / 1000 + 0,
    remainingGPT: 0
  } as Loan

  myCollateralAssets = [
    {
      currency: {
        name: constants.ECOC,
        style: constants.KNOWN_CURRENCY[constants.ECOC]
      },
      amount: 0,
      collateralFactor: 0
    }
  ] as CollateralAsset[]

  supportedCollateralAssets = [
    {
      currencyName: 'ECOC',
      activated: false,
      collateralFactor: 0.6
    }
  ] as Collateral[]

  myActivity = myActivity
  lastUpdate = 0
  isLiquidation = false
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
  async updateSupprtedAssets() {
    const contractAddresses = await lending.getAllAssets()
    const supportedCollateralAssets = await Promise.all(
      contractAddresses.map(async address => {
        const tokenInfo = await Ecrc20.getEcrc20Info(address)
        const currencyName = tokenInfo.symbol
        const collateralFactor = await lending.getCollateralRate(currencyName)

        return {
          currencyName: currencyName,
          activated: false,
          collateralFactor: collateralFactor
        } as Collateral
      })
    )

    const currencyName = 'ECOC'
    const collateralFactor = await lending.getCollateralRate(currencyName)

    const ecocAsset = {
      currencyName: currencyName,
      activated: false,
      collateralFactor: collateralFactor
    } as Collateral

    supportedCollateralAssets.splice(0, 0, ecocAsset)

    return { supportedCollateralAssets }
  }

  @MutationAction
  async updateBalance(address: string) {
    const decimals = getCurrencyDecimals(loanCurrency.name)

    const borrowLimitFull = await lending.getBorrowLimit(address)
    const debtInfo = await lending.getDebt(address)

    const borrowBalance = utils.toDecimals(debtInfo.totalDebt, decimals).toNumber()
    const borrowLimit = utils
      .toDecimals(borrowLimitFull, decimals)
      .plus(borrowBalance) // [to do]
      .toNumber()

    return { borrowBalance, borrowLimit }
  }

  @MutationAction
  async updateLoan(address: string) {
    const loan = (this.state as any).loan
    const loanInfo = await lending.getLoanInfo(address)
    const decimals = getCurrencyDecimals(loanCurrency.name)

    if (loanInfo.interestRate <= 0) {
      loanInfo.interestRate = await lending.getInterestRate()
    }

    if (loanInfo.poolAddr === '') {
      loan.poolAddr = await lending.getUserPool(address)
    } else {
      loan.poolAddr = loanInfo.poolAddr
    }

    loan.amount = utils.toDecimals(loanInfo.amount, decimals).toNumber()
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
      const decimals = getCurrencyDecimals(collateral.currencyName)
      const index = myCollateralAssets.findIndex(
        asset => asset.currency.name === collateral.currencyName
      )

      if (index < 0) {
        const newAsset = {
          currency: {
            name: collateral.currencyName,
            style: constants.KNOWN_CURRENCY[collateral.currencyName]
          },
          amount: utils.toDecimals(collateral.amount, decimals).toNumber(),
          collateralFactor: 0
        }

        myCollateralAssets.push(newAsset)
      } else {
        const myAsset = myCollateralAssets[index]

        myAsset.amount = utils.toDecimals(collateral.amount, decimals).toNumber()
        myCollateralAssets.splice(index, 1, myAsset)
      }
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
      const loanDecimals = 8
      const remainingEFG = utils.toDecimals(poolInfo.remainingEFG, loanDecimals).toNumber()

      if (existingLoanerIndex < 0) {
        const newLoaner = {
          currency: loanCurrency,
          address: address,
          totalSupply: 100000,
          remaining: remainingEFG,
          totalBorrowed: 100000 - remainingEFG
        } as Pool
        pools.push(newLoaner)
      } else {
        const existingLoaner = pools[existingLoanerIndex]

        existingLoaner.remaining = remainingEFG
        existingLoaner.totalBorrowed = existingLoaner.totalSupply - remainingEFG
        pools.splice(existingLoanerIndex, 1, existingLoaner)
      }
    })

    return { pools }
  }

  @MutationAction
  async updateLiquidation(address: string) {
    const isLiquidation = await lending.canSeize(address)

    return { isLiquidation }
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

  @Action
  async getEstimatedGPT(address: string) {
    const fullAmount = await lending.getEstimatedGPT(address)
    const tokenInfo = getTokenInfo(extendCurrency.name)
    const decimals = tokenInfo.decimals
    const amount = utils.toDecimals(fullAmount, decimals).toNumber()

    return amount as number
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
        const tokenInfo = getTokenInfo(currencyName)
        const token = new Ecrc20(tokenInfo)
        const decimals = tokenInfo.decimals
        const fullAmount = utils.fromDecimals(amount, decimals).toNumber()

        const allowance = await token.allowance(walletParams.address, lending.address)
        if (fullAmount > allowance) {
          // waiting for ecrc-20 approve
          const approveTx = await token.approve(lending.address, amount, walletParams)
          const approveTxid = await Ecoc.sendRawTx(approveTx)

          console.log('Waiting for confirmation')
          await Ecoc.waitForConfirmation(approveTxid)
          console.log('Confirmed')

          const newUtxos = await Ecoc.getUtxos(walletParams.address)
          walletParams.utxoList = newUtxos
        }

        rawTransaction = await lending.depositAsset(
          currencyName,
          fullAmount,
          poolAddress,
          walletParams
        )
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
    const decimals = getCurrencyDecimals(currencyName)
    const fullAmount = utils.fromDecimals(amount, decimals).toNumber()

    try {
      let rawTransaction
      if (currencyName === 'ECOC') {
        rawTransaction = await lending.withdrawECOC(fullAmount, walletParams)
      } else {
        rawTransaction = await lending.withdrawAsset(currencyName, fullAmount, walletParams)
      }

      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async borrow(payloads: { amount: number; walletParams: WalletParams; currency: Currency }) {
    const { amount, walletParams, currency } = payloads

    if (!currency.tokenInfo) {
      return Promise.reject(new Error('Wrong Currency'))
    }

    const decimals = currency.tokenInfo.decimals
    const fullAmount = utils.fromDecimals(amount, decimals).toNumber()

    try {
      const rawTransaction = await lending.borrow(fullAmount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async repay(payloads: { amount: number; walletParams: WalletParams; currency: Currency }) {
    const { amount, walletParams, currency } = payloads

    if (!currency.tokenInfo) {
      return Promise.reject(new Error('Wrong Currency'))
    }

    const token = new Ecrc20(currency.tokenInfo)
    const decimals = currency.tokenInfo.decimals
    const fullAmount = utils.fromDecimals(amount, decimals).toNumber()

    try {
      const allowance = await token.allowance(walletParams.address, lending.address)
      if (fullAmount > allowance) {
        // waiting for ecrc-20 approve
        const approveTx = await token.approve(lending.address, amount, walletParams)
        const approveTxid = await Ecoc.sendRawTx(approveTx)

        console.log('Waiting for confirmation')
        await Ecoc.waitForConfirmation(approveTxid)
        console.log('Confirmed')

        const newUtxos = await Ecoc.getUtxos(walletParams.address)
        walletParams.utxoList = newUtxos
      }

      const rawTransaction = await lending.repay(fullAmount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async extendGracePeriod(payloads: { amount: number; walletParams: WalletParams }) {
    const { amount, walletParams } = payloads
    const tokenInfo = getTokenInfo(extendCurrency.name)
    const token = new Ecrc20(tokenInfo)
    const decimals = tokenInfo.decimals
    const fullAmount = utils.fromDecimals(amount, decimals).toNumber()

    try {
      const allowance = await token.allowance(walletParams.address, lending.address)
      if (fullAmount > allowance) {
        // waiting for ecrc-20 approve
        const approveTx = await token.approve(lending.address, amount, walletParams)
        const approveTxid = await Ecoc.sendRawTx(approveTx)

        console.log('Waiting for confirmation')
        await Ecoc.waitForConfirmation(approveTxid)
        console.log('Confirmed')

        const newUtxos = await Ecoc.getUtxos(walletParams.address)
        walletParams.utxoList = newUtxos
      }

      const rawTransaction = await lending.extendGracePeriod(fullAmount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

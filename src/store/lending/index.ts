import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { LendingPlatform, Loan, Loaner } from '@/types/lending'
import { Currency } from '@/types/currency'
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
  }
]

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  address = lending.address
  loan = {
    loaner: '',
    currency: loanCurrency,
    amount: 0,
    timestamp: 0,
    interestRate: 0,
    exchangeRate: 0,
    interest: 0
  } as Loan

  loaners = [] as Loaner[]
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

    loan.loaner = loanInfo.pool
    loan.amount = loanInfo.amount
    loan.timestamp = loanInfo.timestamp
    loan.interestRate = loanInfo.interestRate
    loan.interest = loanInfo.interest

    return { loan }
  }

  @MutationAction
  async updateCollateral(address: string) {
    const myCollateralAssets = (this.state as any).myCollateralAssets
    let poolAddress = (this.state as any).loan.loaner

    const currencyName = myCollateralAssets[0].currency.name

    if (poolAddress === '') {
      poolAddress = await lending.getDepositedPool(address, currencyName)
    }

    const res = await lending.getCollateralInfo(address, poolAddress, currencyName)
    myCollateralAssets[0].amount = res

    return { myCollateralAssets }
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
    amount: number
    poolAddress: string
    walletParams: WalletParams
  }) {
    const { amount, poolAddress, walletParams } = payloads

    try {
      const rawTransaction = await lending.depositColateral(amount, poolAddress, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async withdrawCollateral(payloads: {
    amount: number
    poolAddress: string
    walletParams: WalletParams
  }) {
    const { amount, poolAddress, walletParams } = payloads

    try {
      const rawTransaction = await lending.depositColateral(amount, poolAddress, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

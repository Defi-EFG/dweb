import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { LendingPlatform, Loan, Collateral } from '@/types/lending'
import { Currency } from '@/types/currency'
import * as constants from '@/constants'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'

import { lendingContract } from '@/services/lending'
import { Params, ExecutionResult } from '@/services/contract'
import { lending, loanCurrency, getPrice } from '@/store/common'

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
    price: 0
  }
]

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  contract = lendingContract
  collateralBalance = 100
  borrowedBalance = 10
  borrowPowerRate = 80

  loan = {
    loaner: '',
    currency: loanCurrency,
    amount: 0,
    timestamp: 0,
    interestRate: 0.25,
    exchangeRate: 0,
    interest: 0
  } as Loan

  myCollateralAssets = myCollateralAssets
  myActivity = myActivity
  collateralsActivated = [] as string[]

  get myBorrowing() {
    return [
      {
        currency: this.loan.currency,
        interestRate: this.loan.interestRate,
        amount: this.loan.amount,
        exchangeRate: this.loan.exchangeRate
      }
    ]
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

  @Action
  async getRate(currencyName: string) {
    return await getPrice(currencyName)
  }

  @Action
  async getInterestRate(currencyName: string) {
    const params: Params = {
      methodArgs: [currencyName]
    }

    const result = await lending.call('getInterestRate', params)

    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()
    return data
  }

  @Action
  async getDebt(address: string) {
    const params: Params = {
      methodArgs: [address]
    }

    const result = await lending.call('getDebt', params)

    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()
    return data
  }

  @Action
  async getBorrowPower(currencyName: string) {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await lending.call('getCollateralRate', params)

    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()
    return data
  }
}

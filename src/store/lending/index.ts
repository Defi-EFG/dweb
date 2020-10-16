import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { LendingPlatform, Loan, Loaner } from '@/types/lending'
import { Currency } from '@/types/currency'
import * as constants from '@/constants'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'

import { lending } from '@/services/lending'
import { Params } from '@/services/contract'
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
    amount: 100,
    collateralFactor: 0.6 // 60%
  }
]

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  address = lending.address
  loan = {
    loaner: 'ES1jMgpCNbDcBUdXz1JkJVxJWGkkjxbJB',
    currency: loanCurrency,
    amount: 5,
    timestamp: 0,
    interestRate: 0.25,
    exchangeRate: 0,
    interest: 0
  } as Loan

  loaners = [] as Loaner[]
  myCollateralAssets = myCollateralAssets
  myActivity = myActivity
  collateralsActivated = [] as string[]

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

  // @MutationAction
  // async updateAsset(currencyName: string) {
  //   return await lending.getPrice(currencyName)
  // }

  // @MutationAction
  // async updateRate(currencyName: string) {
  //   return await lending.getPrice(currencyName)
  // }
}

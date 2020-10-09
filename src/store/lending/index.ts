import {
  VuexModule,
  Module,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { LendingPlatform, Loan } from '@/types/lending'
import * as constants from '@/constants'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'

import { lendingContract } from '@/services/lending'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'

const lending = new SmartContract(lendingContract.address, lendingContract.abi)
const loanCurrency = {
  name: constants.EFG,
  style: constants.KNOWN_CURRENCY[constants.EFG]
}

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  contract = lendingContract
  loaner = ''
  collateralBalance = 0
  borrowPower = 0

  loan = {
    currency: loanCurrency,
    amount: 0,
    timestamp: 0,
    interestRate: 0,
    exchangeRate: 0,
    interest: 0
  } as Loan

  myCollateralAsset = []
  myActivity = []

  @Action
  async getRate(currencyName: string) {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await lending.call('getEFGRates', params)

    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()
    return data
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
      methodArgs: []
    } as Params

    const result = await lending.call('getCollateralRate', params)

    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()
    return data
  }
}

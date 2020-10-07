import {
  VuexModule,
  Module,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { LendingPlatform } from '@/types/lending'
import { Contract } from '@/types/contract'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'
import * as constants from '@/constants'
import { lendingContract } from '@/services/lending'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'

const lending = new SmartContract(lendingContract.address, lendingContract.abi)

@Module({ dynamic: true, store, namespaced: true, name: 'lendingStore' })
export default class LendingModule extends VuexModule implements LendingPlatform {
  contract = lendingContract

  @Action
  async getRate(currencyName: string) {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await lending.call('getEFGRates', params)
    return result
  }

  @Action
  async getInterestRate(currencyName: string) {
    const params: Params = {
      methodArgs: [currencyName]
    }

    const result = await lending.call('getInterestRate', params)
    return result
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

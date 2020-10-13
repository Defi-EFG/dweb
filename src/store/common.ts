import BigNumber from 'bignumber.js'
import * as constants from '@/constants'
import { lendingContract } from '@/services/lending'
import { stakingContract } from '@/services/staking'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'

export const lending = new SmartContract(lendingContract.address, lendingContract.abi)
export const staking = new SmartContract(stakingContract.address, stakingContract.abi)

export const loanCurrency = {
  name: constants.LOAN_CURRENCIES[0],
  style: constants.KNOWN_CURRENCY[constants.LOAN_CURRENCIES[0]]
}

export const stakingCurrency = {
  name: constants.EFG,
  style: constants.KNOWN_CURRENCY[constants.EFG]
}

export const rewardCurrency = {
  name: constants.GPT,
  style: constants.KNOWN_CURRENCY[constants.GPT]
}

export const getPrice = async (currencyName: string) => {
  const params = {
    methodArgs: [currencyName]
  } as Params

  const result = await lending.call('getEFGRates', params)

  const executionResult = result.executionResult as ExecutionResult
  const price = executionResult.formattedOutput['0'].toNumber()
  const priceUsd = new BigNumber(price).dividedBy(new BigNumber(1000000)).toNumber()

  return priceUsd
}

import BigNumber from 'bignumber.js'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import lendingAbi from './abi.json'

const lendingContract = {
  address: '2acc1ba4d0f8982f9785d2d629bf89d00e6693b8',
  abi: lendingAbi
} as Contract

const contract = new SmartContract(lendingContract.address, lendingContract.abi)

export namespace lending {
  export const address = lendingContract.address

  export const getPrice = async (currencyName: string) => {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await contract.call('getEFGRates', params)

    const executionResult = result.executionResult as ExecutionResult
    const price = executionResult.formattedOutput['0'].toNumber()
    const priceUsd = new BigNumber(price).dividedBy(new BigNumber(1000000)).toNumber()

    return priceUsd
  }
}

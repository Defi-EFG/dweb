import BigNumber from 'bignumber.js'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import stakingAbi from './abi.json'

const stakingContract = {
  address: 'a81b05336e98dfc9f40c9ea171addf1efe2debf5',
  abi: stakingAbi
} as Contract

const contract = new SmartContract(stakingContract.address, stakingContract.abi)

export namespace staking {
  export const address = stakingContract.address

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

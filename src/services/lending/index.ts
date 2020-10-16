import BigNumber from 'bignumber.js'
import Web3Utils from 'web3-utils'
import { Decoder, Utils } from 'ecoweb3'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import lendingAbi from './abi.json'
import { LoanInfo } from './types'

const lendingContract = {
  address: '2acc1ba4d0f8982f9785d2d629bf89d00e6693b8',
  abi: lendingAbi
} as Contract

const contract = new SmartContract(lendingContract.address, lendingContract.abi)

export namespace lending {
  export const address = lendingContract.address

  export const getAllPools = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getAllPools', params)
    const executionResult = result.executionResult as ExecutionResult
    const pools = executionResult.formattedOutput['0'] as string[]
    const poolsAddress = pools.map(pool => Decoder.toEcoAddress(pool))

    return poolsAddress
  }

  export const getPoolInfo = async (
    address: string
  ): Promise<{ name: string; remainingEFG: number }> => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getPoolInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput

    const name = Web3Utils.hexToUtf8(Utils.appendHexPrefix(res.name))
    const remainingEFG = res.remainingEFG.toNumber()

    return { name, remainingEFG }
  }

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

  export const getEFGBalance = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getEFGBalance', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return res
  }

  export const getCollateralInfo = async (address: string, poolAddress: string) => {
    const params = {
      methodArgs: [poolAddress],
      senderAddress: address
    } as Params

    const result = await contract.call('getCollateralInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0']

    return res
  }

  export const getCollateralRate = async (currencyName: string) => {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await contract.call('getCollateralRate', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return res
  }

  export const getInterestRate = async (currencyName: string) => {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await contract.call('getInterestRate', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return res
  }

  export const getDebt = async (
    address: string
  ): Promise<{ totalDebt: number; poolAddress: string }> => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getDebt', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput

    const totalDebt = res['0'].toNumber()
    if (totalDebt <= 0) {
      return { totalDebt: 0, poolAddress: '' }
    }

    const poolAddress = Decoder.toEcoAddress(res['1'])

    return { totalDebt, poolAddress }
  }

  export const getLoanInfo = async (address: string): Promise<LoanInfo> => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getLoanInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput

    const loanInfo = {
      assetSymbol: Web3Utils.hexToUtf8(Utils.appendHexPrefix(res.assetSymbol)),
      amount: res.amount.toNumber(),
      timestamp: res.timestamp.toNumber(),
      interestRate: res.interestRate.toNumber(),
      interest: res.interest.toNumber(),
      pool: ''
    } as LoanInfo

    if (loanInfo.amount > 0) {
      loanInfo.pool = Decoder.toEcoAddress(res.pool)
    }

    return loanInfo
  }
}

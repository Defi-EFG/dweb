import BigNumber from 'bignumber.js'
import Web3Utils from 'web3-utils'
import { Decoder, Utils } from 'ecoweb3'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import { WalletParams } from '@/services/ecoc/types'
import lendingAbi from './abi.json'
import { LoanInfo } from './types'

const lendingContract = {
  address: '84657142e092d9bdf3d06fdec68d1d67b0e03812',
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

  export const getDepositedPool = async (address: string, currencyName: string) => {
    const params = {
      methodArgs: [currencyName, address]
    } as Params

    const result = await contract.call('getDepositedPool', params)
    const executionResult = result.executionResult as ExecutionResult
    let poolAddress = executionResult.formattedOutput['0'] as string

    if (!poolAddress) return ''

    poolAddress = Decoder.toEcoAddress(poolAddress)
    return poolAddress
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

    const result = await contract.call('getUSDTRate', params)
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

  export const getCollateralInfo = async (
    address: string,
    poolAddress: string,
    currencyName: string
  ) => {
    const params = {
      methodArgs: [poolAddress, currencyName],
      senderAddress: address
    } as Params

    const result = await contract.call('getCollateralInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return res
  }

  export const getCollateralRate = async (currencyName: string) => {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await contract.call('getCollateralRate', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return new BigNumber(res).dividedBy(1000).toNumber()
  }

  export const getInterestRate = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getInterestRate', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return new BigNumber(res).dividedBy(1000).toNumber()
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

    const interestRate = new BigNumber(res.interestRate).dividedBy(1000).toNumber()

    const loanInfo = {
      assetSymbol: Web3Utils.hexToUtf8(Utils.appendHexPrefix(res.assetSymbol)),
      amount: res.amount.toNumber(),
      timestamp: res.timestamp.toNumber(),
      interestRate: interestRate,
      interest: res.interest.toNumber(),
      pool: ''
    } as LoanInfo

    if (loanInfo.amount > 0) {
      loanInfo.pool = Decoder.toEcoAddress(res.pool)
    }

    return loanInfo
  }

  //send to contract
  export const depositColateral = async (
    amount: number,
    poolAddress: string,
    walletParams: WalletParams
  ) => {
    const params = {
      methodArgs: [poolAddress],
      senderAddress: walletParams.address,
      amount: amount,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('lockECOC', params, keypair, utxoList)
    return rawTx
  }

  export const borrow = async (
    currencyName: string,
    amount: number,
    poolAddress: string,
    walletParams: WalletParams
  ) => {
    const params = {
      methodArgs: [currencyName, poolAddress, amount],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('borrow', params, keypair, utxoList)
    return rawTx
  }

  export const withdrawEFG = async (amount: number, walletParams: WalletParams) => {
    const params = {
      methodArgs: [amount],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('withdrawEFG', params, keypair, utxoList)
    return rawTx
  }

  export const withdrawECOC = async (amount: number, walletParams: WalletParams) => {
    const toAddr = walletParams.address
    const params = {
      methodArgs: [amount, toAddr],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('withdrawECOC', params, keypair, utxoList)
    return rawTx
  }

  export const repay = async (amount: number, walletParams: WalletParams) => {
    const params = {
      methodArgs: [amount],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('repay', params, keypair, utxoList)
    return rawTx
  }
}

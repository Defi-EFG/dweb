import BigNumber from 'bignumber.js'
import Web3Utils from 'web3-utils'
import { Decoder, Utils } from 'ecoweb3'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import { WalletParams } from '@/services/ecoc/types'
import lendingAbi from './abi.json'
import { LoanInfo } from './types'

interface Collateral {
  currencyName: string
  amount: number
}

const lendingContract = {
  address: '62c58814c2e02f867236538b55413456c4b6a2b0',
  abi: lendingAbi
} as Contract

const contract = new SmartContract(lendingContract.address, lendingContract.abi)

export namespace lending {
  export const address = lendingContract.address

  export const canSeize = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('canSeize', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'] as boolean

    return res
  }

  export const getBorrowLimit = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getBorrowLimit', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber() as number

    return res
  }

  export const getEstimatedGPT = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getEstimatedGPT', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber() as number

    return res
  }

  export const getAllAssets = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getAllAssets', params)
    const executionResult = result.executionResult as ExecutionResult
    const contractAddresses = executionResult.formattedOutput.allAcceptedAssets as string[]

    return contractAddresses
  }

  export const getAllPools = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getAllPools', params)
    const executionResult = result.executionResult as ExecutionResult
    const pools = executionResult.formattedOutput['0'] as string[]
    const poolsAddress = pools.map(pool => Decoder.toEcoAddress(pool)) as string[]

    return poolsAddress
  }

  export const getUserPool = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getUserPool', params)
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

  export const getAssetBalance = async (currencyName: string, address: string) => {
    const params = {
      methodArgs: [currencyName, address]
    } as Params

    const result = await contract.call('getAssetBalance', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return res
  }

  export const getCollateralInfo = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const resultSymbols = await contract.call('getCollateralSymbols', params)
    const executionResultSymbols = resultSymbols.executionResult as ExecutionResult
    const symbolsHex = executionResultSymbols.formattedOutput.collateralSymbol as string[]
    const symbols = symbolsHex.map(symbolHex =>
      Web3Utils.hexToUtf8(Utils.appendHexPrefix(symbolHex))
    )

    const resultAmounts = await contract.call('getCollateralAmount', params)
    const executionResultAmounts = resultAmounts.executionResult as ExecutionResult
    const amounts = executionResultAmounts.formattedOutput.collateralAmount

    const collateralList = symbols.map((symbol: string, index: number) => {
      return {
        currencyName: symbol,
        amount: amounts[index].toNumber()
      } as Collateral
    })

    return collateralList as Collateral[]
  }

  export const getCollateralRate = async (currencyName: string) => {
    const params = {
      methodArgs: [currencyName]
    } as Params

    const result = await contract.call('getCollateralRate', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return new BigNumber(res).dividedBy(10000).toNumber()
  }

  export const getInterestRate = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getInterestRate', params)
    const executionResult = result.executionResult as ExecutionResult
    const res = executionResult.formattedOutput['0'].toNumber()

    return new BigNumber(res).dividedBy(100).toNumber()
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

    const interestRate = new BigNumber(res.interestRate).dividedBy(100).toNumber()

    const loanInfo = {
      assetSymbol: 'EFG',
      amount: res.amount.toNumber(),
      timestamp: res.timestamp.toNumber(),
      interestRate: interestRate,
      interest: res.interest.toNumber(),
      poolAddr: '',
      EFGInitialRate: res.EFGInitialRate,
      lastGracePeriod: res.lastGracePeriod,
      remainingGPT: res.remainingGPT
    } as LoanInfo

    if (loanInfo.amount > 0) {
      loanInfo.poolAddr = Decoder.toEcoAddress(res.poolAddr)
    }

    return loanInfo
  }

  //send to contract
  export const depositECOC = async (
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

    const rawTx = await contract.getSendToTx('depositECOC', params, keypair, utxoList)
    return rawTx
  }

  export const depositAsset = async (
    currencyName: string,
    amount: number,
    poolAddress: string,
    walletParams: WalletParams
  ) => {
    const params = {
      methodArgs: [currencyName, amount, poolAddress],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('depositAsset', params, keypair, utxoList)
    return rawTx
  }

  export const borrow = async (amount: number, walletParams: WalletParams) => {
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

  export const withdrawAsset = async (
    currencyName: string,
    amount: number,
    walletParams: WalletParams
  ) => {
    const toAddr = walletParams.address
    const params = {
      methodArgs: [currencyName, amount, toAddr],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('withdrawAsset', params, keypair, utxoList)
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

  export const extendGracePeriod = async (amount: number, walletParams: WalletParams) => {
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

    const rawTx = await contract.getSendToTx('extendGracePeriod', params, keypair, utxoList)
    return rawTx
  }
}

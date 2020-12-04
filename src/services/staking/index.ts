import BigNumber from 'bignumber.js'
import { Decoder } from 'ecoweb3'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import { WalletParams } from '@/services/ecoc/types'
import { defaultNetwork } from '@/services/ecoc/config'
import { ECOC_MAINNET } from '@/services/ecoc/constants'
import stakingAbi from './abi.json'

const mainnetAddress = '632e0f7080affb9ae37c56be45dbc77268964332'
const testnetAddress = '1a5572d31c9992b2e2e9ce0abb4c213bf230c747'

const defaultAddress = defaultNetwork === ECOC_MAINNET ? mainnetAddress : testnetAddress

const stakingContract = {
  address: defaultAddress,
  abi: stakingAbi
} as Contract

const contract = new SmartContract(stakingContract.address, stakingContract.abi)

export namespace staking {
  export const address = stakingContract.address

  export const unclaimedGPT = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('unclaimedGPT', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()

    return data
  }

  export const availableGPT = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('availableGPT', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()

    return data
  }

  export const getTotalStaking = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getTotalStaking', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()

    return data as number
  }

  export const getTotalStakers = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getTotalStakers', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()

    return data as number
  }

  export const getRewardFee = async () => {
    const params = {
      methodArgs: []
    } as Params

    const result = await contract.call('getRewardFee', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'].toNumber()

    const feeRate = new BigNumber(data).dividedBy(new BigNumber(100)).toNumber()

    return feeRate as number
  }

  export const getStakingInfo = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getStakingInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const stakingAmount = executionResult.formattedOutput['0'].toNumber() as number
    const rewardAmount = executionResult.formattedOutput['1'].toNumber() as number
    const timestamp = executionResult.formattedOutput['2'].toNumber() as number

    return {
      stakingAmount,
      rewardAmount,
      timestamp
    }
  }

  export const getPendingIds = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('getPendingIds', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput.pendingId as any[]

    return data.map(id => id.toNumber() as number)
  }

  export const getPendingInfo = async (pendingId: number) => {
    const params = {
      methodArgs: [pendingId]
    } as Params

    const result = await contract.call('getPendingInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const stakerAddress = Decoder.toEcoAddress(executionResult.formattedOutput.beneficiar) as string
    const stakingAmount = executionResult.formattedOutput.EFGamount.toNumber() as number
    const rewardAmount = executionResult.formattedOutput.GPTamount.toNumber() as number
    const maturity = executionResult.formattedOutput.maturity.toNumber() as number

    return {
      stakerAddress,
      stakingAmount,
      rewardAmount,
      maturity
    }
  }

  //send to functions
  export const mintGPT = async (amount: number, walletParams: WalletParams) => {
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

    const rawTx = await contract.getSendToTx('mintGPT', params, keypair, utxoList)
    return rawTx
  }

  export const withdraw = async (pendingId: number, walletParams: WalletParams) => {
    const toAddr = walletParams.address
    const params = {
      methodArgs: [toAddr, pendingId],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('withdraw', params, keypair, utxoList)
    return rawTx
  }

  export const stopStaking = async (walletParams: WalletParams) => {
    const params = {
      methodArgs: [],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('stopStaking', params, keypair, utxoList)
    return rawTx
  }
}

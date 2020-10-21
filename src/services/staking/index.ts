import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { Contract } from '@/types/contract'
import { WalletParams } from '@/services/ecoc/types'
import stakingAbi from './abi.json'

const stakingContract = {
  address: '25a95723dc2a0d0f48a4bb51073fe3bb7cfaa355',
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

  export const mintingInfo = async (address: string) => {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await contract.call('mintingInfo', params)
    const executionResult = result.executionResult as ExecutionResult
    const stakingAmount = executionResult.formattedOutput['0'].toNumber()
    const timestamp = executionResult.formattedOutput['1'].toNumber()
    const unclaimedReward = executionResult.formattedOutput['2'].toNumber()

    return {
      stakingAmount,
      timestamp,
      unclaimedReward
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

  export const withdrawEFG = async (amount: number, walletParams: WalletParams) => {
    const toAddr = walletParams.address
    const params = {
      methodArgs: [toAddr, amount],
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

  export const claimStakedGPT = async (walletParams: WalletParams) => {
    const toAddr = walletParams.address
    const params = {
      methodArgs: [toAddr],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await contract.getSendToTx('claimStakedGPT', params, keypair, utxoList)
    return rawTx
  }
}

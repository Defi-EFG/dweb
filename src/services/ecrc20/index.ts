import { Ecrc20 as IEcrc20 } from '@/types/currency'
import { ecocw3 } from '@/services/ecoc/ecocw3'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'
import { WalletParams } from '@/services/ecoc/types'
import ecrc20Abi from './abi.json'

export class Ecrc20 {
  contract = {} as SmartContract

  constructor(tokenInfo: IEcrc20) {
    this.contract = new SmartContract(tokenInfo.address, ecrc20Abi)
  }

  async name() {
    const params = {
      methodArgs: []
    } as Params

    const result = await this.contract.call('name', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'] as string[]
    return data
  }

  async totalSupply() {
    const params = {
      methodArgs: []
    } as Params

    const result = await this.contract.call('totalSupply', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'] as string[]
    return data
  }

  async decimals() {
    const params = {
      methodArgs: []
    } as Params

    const result = await this.contract.call('decimals', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'] as string[]
    return data
  }

  async balanceOf(address: string) {
    const params = {
      methodArgs: [address]
    } as Params

    const result = await this.contract.call('balanceOf', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'] as string[]
    return data
  }

  async symbol() {
    const params = {
      methodArgs: []
    } as Params

    const result = await this.contract.call('symbol', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'] as string[]
    return data
  }

  async allowance(owner: string, spender: string) {
    const params = {
      methodArgs: [owner, spender]
    } as Params

    const result = await this.contract.call('allowance', params)
    const executionResult = result.executionResult as ExecutionResult
    const data = executionResult.formattedOutput['0'] as string[]
    return data
  }

  async transfer(to: string, amount: number, walletParams: WalletParams) {
    const params = {
      methodArgs: [to, amount],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await this.contract.getSendToTx('transfer', params, keypair, utxoList)
    return rawTx
  }

  async approve(spender: string, amount: number, walletParams: WalletParams) {
    const params = {
      methodArgs: [spender, amount],
      senderAddress: walletParams.address,
      amount: 0,
      fee: walletParams.fee,
      gasLimit: walletParams.gasLimit,
      gasPrice: walletParams.gasPrice
    } as Params

    const keypair = walletParams.keypair
    const utxoList = walletParams.utxoList

    const rawTx = await this.contract.getSendToTx('approve', params, keypair, utxoList)
    return rawTx
  }

  static async getEcrc20Info(contractAddress: string) {
    return await ecocw3.api.getTokenInfo(contractAddress)
  }
}

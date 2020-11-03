import { Encoder, Decoder, Ecocjs } from 'ecoweb3'
import { ecocw3 } from '@/services/ecoc/ecocw3'
import { Contract } from '@/types/contract'
import { Utxo, TxReceipt } from '@/types/transaction'

export const DEFAULT = {
  DEFAULT_AMOUNT: 0,
  DEFAULT_FEE: 0.01,
  DEFAULT_GAS_LIMIT: 250000,
  DEFAULT_GAS_PRICE: 40
}

export interface Params {
  methodArgs: (string | number)[]
  amount?: number
  fee?: number
  gasLimit?: number
  gasPrice?: number
  senderAddress?: string
}

export interface ExecutionResult {
  codeDeposit: number
  depositSize: number
  excepted: string
  formattedOutput: Record<string, any>
  gasForDeposit: number
  gasRefunded: number
  gasUsed: number
  newAddress: string
  output: string
}

export class SmartContract implements Contract {
  address: string
  abi: []

  constructor(address: string, abi: any) {
    this.address = address
    this.abi = abi
  }

  generateCall(methodName: string, params: Params) {
    const { methodArgs } = params
    const encodedData = Encoder.constructData(this.abi, methodName, methodArgs)

    return encodedData
  }

  generateSendData(methodName: string, params: Params) {
    const { methodArgs } = params
    const encodedData = Encoder.constructData(this.abi, methodName, methodArgs)

    return encodedData
  }

  async call(methodName: string, params: Params) {
    const encodedData = this.generateCall(methodName, params)
    const result = await ecocw3.api.callContract(this.address, encodedData)

    const data = Decoder.decodeCall(result, this.abi, methodName, true)
    return data
  }

  async getSendToTx(methodName: string, params: Params, keypair: any, utxoList: Utxo[]) {
    const encodedData = this.generateSendData(methodName, params)
    const contractAddress = this.address

    const fromAddress = Ecocjs.utils.getAddress(keypair)
    const network = keypair.network

    const tx = Ecocjs.utils.generateSendToTx(
      fromAddress,
      contractAddress,
      encodedData,
      network,
      params,
      utxoList
    )

    const unsignedTx = tx.buildIncomplete()
    const txInputLength = unsignedTx.ins.length

    for (let i = 0; i < txInputLength; i++) {
      tx.sign(i, keypair)
    }

    const singedTx = tx.build().toHex()

    return singedTx
  }

  static async send(singedTx: string) {
    const result = await ecocw3.api.sendRawTx(singedTx)
    return result
  }

  static decodeSearchLog(rawOutput: TxReceipt[], contractMetadata: any, removeHexPrefix = true) {
    return Decoder.decodeSearchLog(rawOutput, contractMetadata, removeHexPrefix)
  }
}

import { Encoder, Decoder, Ecocjs } from 'ecoweb3'
import { ecocw3 } from '@/services/ecoc/ecocw3'
import { Contract } from '@/types/contract'
import { Utxo } from '@/types/transaction'

const DEFAULT_AMOUNT = 0
const DEFAULT_GAS_LIMIT = 250000
const DEFAULT_GAS_PRICE = 0.0000004

export interface Params {
  methodArgs: (string | number)[]
  amount?: number
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

  generateSendTx(methodName: string, params: Params) {
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

  async sendTo(methodName: string, params: Params, keypair: any, utxoList: Utxo[]) {
    const { amount, gasLimit, gasPrice } = params

    const encodedData = this.generateSendTx(methodName, params)
    const contractAddress = this.address
    const amt = amount || DEFAULT_AMOUNT
    const limit = gasLimit || DEFAULT_GAS_LIMIT
    const price = gasPrice || DEFAULT_GAS_PRICE

    const singedTx = Ecocjs.utils.buildSendToContractTransaction(
      keypair,
      contractAddress,
      encodedData,
      limit,
      price * 1e8,
      amt,
      utxoList
    )
    const result = await ecocw3.api.sendRawTx(singedTx)

    const data = result //Decoder.decodeCall(result, this.abi, methodName, true)
    return data
  }
}

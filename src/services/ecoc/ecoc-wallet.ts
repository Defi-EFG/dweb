import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import { Ecocjs } from 'ecoweb3'

import { Utxo, Transaction } from '@/types/transaction'
import { EWallet, AddressInfo, TxData, Erc20Info } from './types'
import { ECOC_MAINNET, ECOC_TESTNET } from './constants'
import { ecocw3, changeToNetwork } from './ecocw3'

const isEcocAddress = (address: string, networkStr: string) => {
  try {
    const network = Ecocjs.getNetwork(networkStr)
    Ecocjs.address.toOutputScript(address, network)
  } catch (error) {
    return false
  }

  return true
}

export default class EcocWallet implements EWallet {
  keypair: any
  network: any
  networkName: string
  address: string

  constructor(keypair: any, networkStr = ECOC_MAINNET) {
    this.keypair = keypair
    this.network = Ecocjs.getNetwork(networkStr)
    this.address = this.getAddress()
    this.networkName = networkStr

    //change ecocw3 instance network to wallet network
    changeToNetwork(networkStr)
  }

  getAddress() {
    const { address } = Ecocjs.payments.p2pkh({
      pubkey: this.keypair.publicKey,
      network: this.network
    })
    return address as string
  }

  hasPrivKey() {
    return !!this.keypair.privateKey
  }

  getPrivKey() {
    try {
      return this.keypair.toWIF()
    } catch (e) {
      if (e.toString() === 'Error: Missing private key') {
        return null
      } else {
        throw e
      }
    }
  }

  async getAddressInfo() {
    return await EcocWallet.getAddressInfo(this.address)
  }

  async getTxList() {
    return await EcocWallet.getTxList(this.address)
  }

  async getEcrc20() {
    return await EcocWallet.getEcrc20(this.address)
  }

  async getUtxoList() {
    return await EcocWallet.getUtxoList(this.address)
  }

  async generateCreateContractTx(code: string, gasLimit: number, gasPrice: number, fee: number) {
    const utxoList = await this.getUtxoList()
    return await EcocWallet.generateCreateContractTx(this, code, gasLimit, gasPrice, fee, utxoList)
  }

  async generateSendToContractTx(
    contractAddress: string,
    encodedData: string,
    gasLimit: number,
    gasPrice: number,
    fee: number
  ) {
    const utxoList = await this.getUtxoList()
    return await EcocWallet.generateSendToContractTx(
      this.keypair,
      contractAddress,
      encodedData,
      gasLimit,
      gasPrice,
      fee,
      utxoList
    )
  }

  async generateTx(payload: { to: string; amount: number; fee: number }) {
    const utxoList = await this.getUtxoList()
    return await EcocWallet.generateTx(
      this.keypair,
      payload.to,
      payload.amount,
      payload.fee,
      utxoList
    )
  }

  async sendRawTx(tx: string) {
    const res = await EcocWallet.sendRawTx(tx)
    setTimeout(() => {
      //
    }, 3000)

    return res
  }

  async callContract(address: string, encodedData: string) {
    return await EcocWallet.callContract(address, encodedData)
  }

  static async getAddressInfo(address: string) {
    return (await ecocw3.api.getAddressInfo(address)) as AddressInfo
  }

  static async getTxInfo(txid: string) {
    return (await ecocw3.api.getTxInfo(txid)) as Transaction
  }

  static async getTxList(address: string) {
    return (await ecocw3.api.getTxList(address)) as TxData
  }

  static async getEcrc20(address: string) {
    return (await ecocw3.api.getEcrc20(address)) as Erc20Info[]
  }

  static async getUtxoList(address: string) {
    return (await ecocw3.api.getUtxoList(address)) as Utxo[]
  }

  static async generateCreateContractTx(
    keypair: any,
    code: string,
    gasLimit: number,
    gasPrice: number,
    fee: number,
    utxoList: Utxo[]
  ) {
    return Ecocjs.utils.buildCreateContractTransaction(
      keypair,
      code,
      gasLimit,
      gasPrice,
      fee,
      utxoList
    )
  }

  static async generateSendToContractTx(
    keypair: any,
    contractAddress: string,
    encodedData: string,
    gasLimit: number,
    gasPrice: number,
    fee: number,
    utxoList: Utxo[]
  ) {
    if (!keypair.privateKey) {
      return false
    }

    return Ecocjs.utils.buildSendToContractTransaction(
      keypair,
      contractAddress,
      encodedData,
      gasLimit,
      gasPrice,
      fee,
      utxoList
    )
  }

  static async generateTx(keypair: any, to: string, amount: number, fee: number, utxoList: Utxo[]) {
    if (!keypair.privateKey) {
      return false
    }
    return Ecocjs.utils.buildPubKeyHashTransaction(keypair, to, amount, fee, utxoList)
  }

  static async sendRawTx(tx: string): Promise<string> {
    const response = await ecocw3.api.sendRawTx(tx)
    return response.txid
  }

  static async callContract(address: string, encodedData: string) {
    return await ecocw3.api.callContract(address, encodedData)
  }

  static validateBip39Mnemonic(mnemonic: string) {
    return bip39.validateMnemonic(mnemonic)
  }

  static async createNewWallet(networkStr: string = ECOC_MAINNET) {
    const mnemonic = EcocWallet.generateMnemonic()
    const randomStr = Date.now().toString()

    return await EcocWallet.restoreFromMnemonic(mnemonic, randomStr, networkStr)
  }

  static async restoreFromMnemonic(mnemonic: string, password: string, networkStr: string) {
    if (bip39.validateMnemonic(mnemonic) == false) {
      return false
    }
    const network = Ecocjs.getNetwork(networkStr)
    const seedHex = await bip39.mnemonicToSeed(mnemonic, password)
    const hdNode = bip32.fromSeed(seedHex, network)
    const account = hdNode
      .deriveHardened(88)
      .deriveHardened(0)
      .deriveHardened(0)
    const keyPair = account

    return new EcocWallet(keyPair, networkStr)
  }

  static restoreFromWif(wif: string) {
    let network = Ecocjs.getNetwork(ECOC_MAINNET)
    try {
      const keypair = Ecocjs.ECPair.fromWIF(wif, network)
      return new EcocWallet(keypair)
    } catch (error) {
      network = Ecocjs.getNetwork(ECOC_TESTNET)
    }

    return new EcocWallet(Ecocjs.ECPair.fromWIF(wif, network), ECOC_TESTNET)
  }

  static generateMnemonic() {
    return bip39.generateMnemonic()
  }

  static isEcocAddress(address: string) {
    if (isEcocAddress(address, ECOC_MAINNET)) {
      return true
    }

    if (isEcocAddress(address, ECOC_TESTNET)) {
      return true
    }

    return false
  }
}

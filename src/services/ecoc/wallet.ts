import bip39 from 'bip39'
import bip32 from 'bip32'
import { Ecocjs } from 'ecoweb3'

import { Wallet } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Transaction } from '@/types/transaction'
import ecocw3 from './ecocw3'


export default class EcocWallet implements Wallet {
  keypair: any
  network: any
  keystore: KeyStore
  address: string
  transactions: Transaction[]

  constructor(keypair:any, networkStr='Mainnet') {
    this.keypair = keypair
    this.keystore = {} as KeyStore
    this.address = ""
    this.transactions = [] as Transaction []
    this.network = Ecocjs.getNetwork(networkStr)
  }

  validateMnemonic(mnemonic: string, password: string) {
    const tempWallet = EcocWallet.restoreFromMnemonic(mnemonic, password)
    return this.keypair.toWIF() === tempWallet.keypair.toWIF()
  }

  getAddress() {
    const { address } = Ecocjs.payments.p2pkh({
      pubkey: this.keypair.publicKey,
      network: this.network
    })
    return address
  }

  getHasPrivKey() {
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
    return await ecocw3.api.getInfo(this.address)
  }

  async getErc20() {
    return await ecocw3.api.getEcrc20(this.address)
  }

  async getTxList() {
    return await ecocw3.api.getTxList(this.address)
  }

  async generateCreateContractTx(code:string, gasLimit:string, gasPrice:string, fee:string) {
    return EcocWallet.generateCreateContractTx(
      this,
      code,
      gasLimit,
      gasPrice,
      fee,
      await ecocw3.api.getUtxoList(this.address)
    )
  }

  async generateSendToContractTx(contractAddress, encodedData, gasLimit, gasPrice, fee) {
    return await EcocWallet.generateSendToContractTx(
      this,
      contractAddress,
      encodedData,
      gasLimit,
      gasPrice,
      fee,
      await ecocw3.api.getUtxoList(this.address)
    )
  }

  async generateTx(to, amount, fee) {
    return await EcocWallet.generateTx(
      this,
      to,
      amount,
      fee,
      await ecocw3.api.getUtxoList(this.address)
    )
  }

  async sendRawTx(tx:string) {
    const res = await EcocWallet.sendRawTx(tx)
    setTimeout(() => {
      //
    }, 3000)

    return res
  }

  async callContract(address, encodedData) {
    return await EcocWallet.callContract(address, encodedData)
  }

  static generateCreateContractTx(EcocWallet, code, gasLimit, gasPrice, fee, utxoList) {
    return Ecocjs.utils.buildCreateContractTransaction(
      EcocWallet.keyPair,
      code,
      gasLimit,
      gasPrice,
      fee,
      utxoList
    )
  }

  static async generateSendToContractTx(
    EcocWallet,
    contractAddress,
    encodedData,
    gasLimit,
    gasPrice,
    fee,
    utxoList
  ) {
    if (!EcocWallet.getHasPrivKey()) {
      return false
    }
    return Ecocjs.utils.buildSendToContractTransaction(
      EcocWallet.keyPair,
      contractAddress,
      encodedData,
      gasLimit,
      gasPrice,
      fee,
      utxoList
    )
  }

  static async generateTx(EcocWallet, to, amount, fee, utxoList) {
    if (!EcocWallet.getHasPrivKey()) {
      return false
    }
    return Ecocjs.utils.buildPubKeyHashTransaction(EcocWallet.keyPair, to, amount, fee, utxoList)
  }

  static async sendRawTx(tx) {
    return await ecocw3.api.sendRawTx(tx)
  }

  static async callContract(address, encodedData) {
    return await ecocw3.api.callContract(address, encodedData)
  }

  static validateBip39Mnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic)
  }

  static restoreFromMnemonic(mnemonic, password) {
    //if (bip39.validateMnemonic(mnemonic) == false) return false
    const seedHex = bip39.mnemonicToSeed(mnemonic, password)
    const hdNode = bip32.fromSeed(seedHex, network)
    const account = hdNode
      .deriveHardened(88)
      .deriveHardened(0)
      .deriveHardened(0)
    const keyPair = account
    return new EcocWallet(keyPair)
  }

  static restoreFromMobile(mnemonic) {
    const seedHex = bip39.mnemonicToSeed(mnemonic, password)
    const hdNode = bip32.fromSeed(seedHex, network)
    const account = hdNode.deriveHardened(88).deriveHardened(0)
    const walletList = []
    for (let i = 0; i < 10; i++) {
      const wallet = new EcocWallet(account.deriveHardened(i))
      walletList[i] = {
        wallet,
        path: i
      }
    }
    return walletList
  }

  static restoreFromWif(wif) {
    return new EcocWallet(ecocjs.ECPair.fromWIF(wif, network))
  }

  static generateMnemonic() {
    return bip39.generateMnemonic(128, randomBytes)
  }

  static isEcocAddress(address) {
    try {
      Ecocjs.address.toOutputScript(address, network)
    } catch (error) {
      return false
    }

    return true
  }
}

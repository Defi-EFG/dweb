import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { Wallet, SendPayload } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Currency } from '@/types/currency'
import { TxList } from '@/types/transaction'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'
import { lending } from '@/services/lending'
import * as constants from '@/constants'
import { currencyInit } from './currency'

@Module({ dynamic: true, store, namespaced: true, name: 'walletStore' })
export default class WalletModule extends VuexModule implements Wallet {
  address = ''
  network = ''
  keystore = {} as KeyStore
  txList = {} as TxList
  currencies = currencyInit()
  selectedCurrencyIndex = 0
  lastUpdate = 0 //timestamp
  lastBlock = 0
  status = constants.STATUS_SYNCED

  get ecoc() {
    if (this.currencies.length < 0) return 0

    const currencyInfo = this.currencies.find(currency => currency.name === constants.ECOC)
    return currencyInfo?.balance
  }

  get currenciesList() {
    return this.currencies
  }

  get selectedCurrency() {
    return this.currencies[this.selectedCurrencyIndex]
  }

  get numberOfCurrency() {
    return this.currencies.length
  }

  get isWalletUnlocked() {
    return !!this.address
  }

  @Mutation
  clear() {
    this.address = ''
    this.network = ''
    this.keystore = {} as KeyStore
    this.txList = {} as TxList
    this.currencies = currencyInit()
    this.selectedCurrencyIndex = 0
    this.lastUpdate = 0
    this.lastBlock = 0
  }

  @Mutation
  updateTime() {
    this.lastUpdate = new Date().getTime()
  }

  @Mutation
  updateAddress(address: string) {
    this.address = address
  }

  @Mutation
  updateKeystore(keystore: KeyStore) {
    this.keystore = keystore
  }

  @Mutation
  updateNetwork(network: string) {
    this.network = network
  }

  @Mutation
  updateStatus(status: string) {
    this.status = status
  }

  // update everything except price
  @Mutation
  updateCurrencyInfo(currencyData: Currency) {
    const currencyIndex = this.currencies.findIndex(currency => currency.name === currencyData.name)
    if (currencyIndex < 0) {
      this.currencies.push(currencyData)
    } else {
      currencyData.price = this.currencies[currencyIndex].price
      this.currencies.splice(currencyIndex, 1, currencyData)
    }
  }

  //for update price
  @Mutation
  updateCurrencyByIndex(payload: { currencyIndex: number; currencyData: Currency }) {
    if (payload.currencyIndex >= 0) {
      this.currencies.splice(payload.currencyIndex, 1, payload.currencyData)
    }
  }

  @Mutation
  updateTransactions(txs: TxList) {
    this.txList = txs
  }

  @Action
  synced() {
    this.context.commit('updateStatus', constants.STATUS_SYNCED)
    return constants.STATUS_SYNCED
  }

  @Action
  async createNewWallet(password: string) {
    return await Ecoc.generateNewKeystore(password)
  }

  @Action
  async updateBalance() {
    if (!this.address) {
      return false
    }

    const ecocBalanceInfo = await Ecoc.getEcocBalance(this.address)
    if (ecocBalanceInfo) {
      this.context.commit('updateCurrencyInfo', ecocBalanceInfo)
    }

    const erc20BalanceInfo = await Ecoc.getEcrc20Balance(this.address)
    if (erc20BalanceInfo.length > 0) {
      erc20BalanceInfo.forEach(token => {
        this.context.commit('updateCurrencyInfo', token)
      })
    }

    this.context.commit('updateTime')

    return true
  }

  @Action
  async updateTransactionsHistory() {
    if (!this.address) {
      return false
    }

    const txs = await Ecoc.getTxs(this.address)
    this.context.commit('updateTransactions', txs)
    this.context.commit('updateTime')

    return true
  }

  @Action
  async logout() {
    this.context.commit('clear')
    return true
  }

  @Action({ rawError: true })
  async send(payload: SendPayload) {
    const { currency, to, amount, walletParams } = payload

    try {
      if (Ecoc.isEcrc20(currency)) {
        if (utils.toNumber(currency.balance).lt(amount)) {
          throw new InsufficientBalance(`Insufficient Balance For ${currency.name}`)
        }

        const txid = await Ecoc.sendEcrc20Balance(currency, to, amount, walletParams)
        return txid
      }

      if (utils.toNumber(currency.balance).lt(amount + walletParams.fee)) {
        throw new InsufficientBalance(`Insufficient Balance For ${currency.name}`)
      }

      const txid = await Ecoc.sendEcocBalance(to, amount, walletParams)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action
  async updateCurrenciesPrice() {
    const currenciesList = [...this.currenciesList]

    currenciesList.forEach(async (currency, index) => {
      const currentPrice = currency.price
      const price = await lending.getPrice(currency.name)

      if (currentPrice !== price) {
        currency.price = price

        this.context.commit('updateCurrencyByIndex', {
          currencyIndex: index,
          currencyData: currency
        })
        this.context.commit('updateTime')
      }
    })

    return true
  }

  @MutationAction
  async importWallet(payload: { keystore: string; password: string }) {
    const wallet = Ecoc.importFromKeystore(payload.keystore, payload.password)

    return {
      address: wallet.address,
      network: wallet.networkName,
      keystore: Ecoc.getKeystore(payload.keystore)
    }
  }

  @MutationAction
  async selectCurrency(currencyIndex: number) {
    if (this.numberOfCurrency < currencyIndex + 1) {
      return {}
    }

    return {
      selectedCurrencyIndex: currencyIndex
    }
  }

  @MutationAction
  async updateLastBlock(blocknumber: number) {
    return { lastBlock: blocknumber }
  }
}

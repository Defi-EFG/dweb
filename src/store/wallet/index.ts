import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { Wallet, SendPayload } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Currency } from '@/types/currency'
import { TxList } from '@/types/transaction'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'
import { SendEcrc20Payload, SendEcocPayload } from '@/services/ecoc/types'
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
  lastUpdate = 0

  get ecoc() {
    if (this.currencies.length < 0) return 0

    const currencyInfo = this.currencies.find(currency => currency.name === constants.ECOC)
    return currencyInfo?.balance
  }

  get selectedCurrency() {
    return this.currencies[this.selectedCurrencyIndex]
  }

  get numberOfCurrency() {
    return this.currencies.length
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
  updateCurrencyInfo(currencyData: Currency) {
    const currencyIndex = this.currencies.findIndex(currency => currency.name === currencyData.name)
    if (currencyIndex < 0) {
      this.currencies.push(currencyData)
    } else {
      this.currencies.splice(currencyIndex, 1, currencyData)
    }
  }

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

  @Action
  async send(payload: SendPayload) {
    const currency = payload.currency
    const password = payload.password

    if (Ecoc.isEcrc20(currency)) {
      if (utils.toNumber(currency.balance).lt(payload.amount)) {
        throw new InsufficientBalance(`Insufficient Balance For ${currency.name}`)
      }

      return await Ecoc.SendEcrc20Balance(
        this.keystore,
        password,
        currency,
        payload as SendEcrc20Payload
      )
    }

    if (utils.toNumber(currency.balance).lt(payload.amount + payload.fee)) {
      throw new InsufficientBalance(`Insufficient Balance For ${currency.name}`)
    }

    return await Ecoc.SendEcocBalance(this.keystore, password, payload as SendEcocPayload)
  }

  @Action
  async updateCurrenciesPrice() {
    const currenciesList = this.currencies

    currenciesList.forEach(async (currency, index) => {
      const currentPrice = currency.price
      const price = await lending.getPrice(currency.name)

      if (currentPrice !== price) {
        currency.price = price
        this.context.commit('updateCurrencyByIndex', {
          currencyIndex: index,
          currencyData: currency
        })
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
}

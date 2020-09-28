import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { Wallet } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Currency } from '@/types/currency'
import { TxList } from '@/types/transaction'
import * as Ecoc from '@/services/wallet'
import * as constants from '@/constants'

@Module({ dynamic: true, store, namespaced: true, name: 'walletStore' })
export default class WalletModule extends VuexModule implements Wallet {
  address = ''
  network = ''
  keystore = {} as KeyStore
  txList = {} as TxList
  currencies = [] as Currency[]
  selectedCurrency = 0
  lastUpdate = 0

  get ecoc() {
    if (this.currencies.length < 0) return 0

    const currencyInfo = this.currencies.find(currency => currency.name === constants.ECOC)
    return currencyInfo?.balance
  }

  @Mutation
  clear() {
    this.address = ''
    this.network = ''
    this.keystore = {} as KeyStore
    this.txList = {} as TxList
    this.currencies = [] as Currency[]
    this.selectedCurrency = 0
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
      this.currencies[currencyIndex].balance = currencyData.balance
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

  @MutationAction
  async importWallet(payload: { keystore: string; password: string }) {
    const wallet = Ecoc.importFromKeystore(payload.keystore, payload.password)

    return {
      address: wallet.address,
      network: wallet.networkName,
      keystore: Ecoc.getKeystore(payload.keystore)
    }
  }
}

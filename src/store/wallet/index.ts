import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { Wallet, SendPayload } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Currency } from '@/types/currency'
import { TxList, Transaction, PendingTransaction, TxHistory } from '@/types/transaction'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'
import { Ecrc20 } from '@/services/ecrc20'
import { lending } from '@/services/lending'
import * as constants from '@/constants'
import { currencyInit } from './currency'
import { getBalanceChanged } from './utils'

@Module({ dynamic: true, store, namespaced: true, name: 'walletStore' })
export default class WalletModule extends VuexModule implements Wallet {
  address = ''
  network = ''
  keystore = {} as KeyStore
  txList = { pagesTotal: 0, txs: [] } as TxList
  currencies = currencyInit()
  selectedCurrencyIndex = 0
  lastUpdate = 0 //timestamp
  lastBlock = 0
  status = constants.STATUS_SYNCED
  pendingTransactions = [] as PendingTransaction[]

  get ecoc() {
    if (this.currencies.length <= 0) return 0

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

  get pendingTransaction() {
    return this.pendingTransactions[0]
  }

  get transactionsHistory() {
    const txs = this.txList.txs

    if (!txs) {
      return []
    }

    return txs.map(tx => {
      let currencyType = constants.ECOC
      let value = getBalanceChanged(this.address, tx.vin, tx.vout)
      let type = value.lt(0) ? constants.TYPE_SENT : constants.TYPE_RECEIVED
      let status = tx.confirmations ? constants.STATUS_SUCCEED : constants.STATUS_PENDING
      let address = ''
      let subtype
      let txResult = []

      if (tx.receipt) {
        status =
          tx.receipt[0].excepted === 'None' ? constants.STATUS_SUCCEED : constants.STATUS_FAILED
        address = tx.receipt[0].contractAddress
        try {
          txResult = Ecrc20.decode(tx.receipt)
          const tokenInfo = Ecrc20.getKnownTokensInfo(address, this.network)

          if (tokenInfo) {
            const decimals = tokenInfo.decimals
            currencyType = tokenInfo.symbol
            subtype = 'ECRC-20'
            value = utils.toDecimals(txResult[0].log[0].value.toNumber(), decimals)
            type = txResult[0].log[0]._eventName
          } else {
            subtype = utils.addressFilter(address)
          }
        } catch (e) {
          //
        }
      }

      return {
        id: tx.txid,
        type: type,
        subtype: subtype,
        address: address,
        value: value.abs(),
        currency: currencyType,
        time: tx.time,
        confirmations: tx.confirmations,
        status: status,
        txResult: txResult
      } as TxHistory
    })
  }

  @Mutation
  clear() {
    this.address = ''
    this.network = ''
    this.keystore = {} as KeyStore
    this.txList = { pagesTotal: 0, txs: [] } as TxList
    this.currencies = currencyInit()
    this.selectedCurrencyIndex = 0
    this.lastUpdate = 0
    this.lastBlock = 0
    this.pendingTransactions = [] as PendingTransaction[]
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
    const currencyIndex = this.currencies.findIndex(currency => {
      if (currency.tokenInfo && currencyData.tokenInfo) {
        return currency.tokenInfo.address === currencyData.tokenInfo.address
      }

      return currency.name === currencyData.name
    })

    if (currencyIndex < 0) {
      this.currencies.push(currencyData)
    } else {
      currencyData.price = this.currencies[currencyIndex].price
      this.currencies.splice(currencyIndex, 1, currencyData)
    }
  }

  @Mutation
  removeCurrency(index: number) {
    this.currencies.splice(index, 1)
  }

  //for update price
  @Mutation
  updateCurrencyByIndex(payload: { currencyIndex: number; currencyData: Currency }) {
    if (payload.currencyIndex >= 0) {
      this.currencies.splice(payload.currencyIndex, 1, payload.currencyData)
    }
  }

  @Mutation
  updateTransactions(txList: TxList) {
    this.txList = txList
  }

  @Mutation
  appendTransactions(txs: Transaction[]) {
    const index = this.txList.txs.length
    this.txList.txs.splice(index, 0, ...txs)
  }

  @Action({ rawError: true })
  async updateTxHistoryByPage(pageNum: number) {
    try {
      const newTxs = await Ecoc.getTxs(this.address, pageNum)

      this.context.commit('appendTransactions', newTxs.txs)
      this.context.commit('updateTime')
    } catch (error) {
      return Promise.reject(error)
    }

    return true
  }

  @Action
  synced() {
    this.context.commit('updateStatus', constants.STATUS_SYNCED)
    return constants.STATUS_SYNCED
  }

  @Action({ rawError: true })
  async createNewWallet(password: string) {
    return await Ecoc.generateNewKeystore(password)
  }

  @Action({ rawError: true })
  async keystoreFromWiff(payload: { wif: string; password: string }) {
    return Ecoc.keystoreFromWiff(payload.wif, payload.password)
  }

  @Action({ rawError: true })
  async updateBalance() {
    if (!this.address) {
      return false
    }

    try {
      const ecocBalanceInfo = await Ecoc.getEcocBalance(this.address)
      if (ecocBalanceInfo) {
        this.context.commit('updateCurrencyInfo', ecocBalanceInfo)
      }

      let erc20BalanceInfo = await Ecoc.getEcrc20Balance(this.address)
      const zeroBalanceCurrencies = this.currenciesList
        .filter(currency => currency.name !== 'ECOC')
        .filter(
          currency =>
            !erc20BalanceInfo.find(
              newToken => currency.tokenInfo?.address === newToken.tokenInfo?.address
            )
        )
        .map(currency => {
          currency.balance = '0'
          return currency
        })

      erc20BalanceInfo = [...erc20BalanceInfo, ...zeroBalanceCurrencies]

      if (erc20BalanceInfo.length > 0) {
        erc20BalanceInfo.forEach(token => {
          this.context.commit('updateCurrencyInfo', token)
        })
      }

      this.context.commit('updateTime')
    } catch (error) {
      return Promise.reject(error)
    }

    return true
  }

  @Action({ rawError: true })
  async updateTransactionsHistory() {
    if (!this.address) {
      return false
    }

    let txs: TxList = { pagesTotal: 0, txs: [] } as TxList
    try {
      if (this.txList.txs.length > 10 && this.txList.pagesTotal > 10) {
        const toUpdatePage = Math.ceil(this.txList.txs.length / 10)
        for (let page = 0; page < toUpdatePage; page++) {
          const txList = await Ecoc.getTxs(this.address, page)
          txs.pagesTotal = txList.pagesTotal
          txs.txs.splice(txs.txs.length, 0, ...txList.txs)
        }
      } else {
        txs = await Ecoc.getTxs(this.address)
      }

      this.context.commit('updateTransactions', txs)
      this.context.commit('updateTime')
    } catch (error) {
      return Promise.reject(error)
    }

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
          throw new InsufficientBalance(`Insufficient Balance`)
        }

        const txid = await Ecoc.sendEcrc20Balance(currency, to, amount, walletParams)
        return txid
      }

      if (utils.toNumber(currency.balance).lt(amount + walletParams.fee)) {
        throw new InsufficientBalance(`Insufficient Balance`)
      }

      const txid = await Ecoc.sendEcocBalance(to, amount, walletParams)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async updateCurrenciesPrice() {
    const currenciesList = [...this.currenciesList]

    try {
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
    } catch (error) {
      return Promise.reject(error)
    }

    return true
  }

  @Action({ rawError: true })
  async getTxInfo(txid: string) {
    const txs = this.txList.txs

    try {
      const existingTx = txs.find(tx => tx.txid === txid)
      if (existingTx) return existingTx

      return await Ecoc.getTxInfo(txid)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  //@ts-ignore
  @MutationAction({ rawError: true })
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
  async updateLastBlock() {
    const lastBlock = await utils.getBlockNumber()
    return { lastBlock }
  }

  @MutationAction
  async addPendingTx(payload: { txid: string; txType: string }) {
    const pendingTransactions = (this.state as any).pendingTransactions as PendingTransaction[]

    const index = pendingTransactions.findIndex(tx => tx.txid === payload.txid)
    if (index >= 0) {
      return {}
    }

    const pendingTransaction = {
      txid: payload.txid,
      type: payload.txType,
      status: constants.STATUS_PENDING
    } as PendingTransaction

    pendingTransactions.splice(pendingTransactions.length, 1, pendingTransaction)

    return { pendingTransactions }
  }

  @MutationAction
  async updatePendingTxStatus() {
    const pendingTransactions = (this.state as any).pendingTransactions as PendingTransaction[]
    const confirmationNeeded = 1

    pendingTransactions.forEach(async (tx, index) => {
      try {
        const txResult = await Ecoc.getTxInfo(tx.txid)
        console.log('update pending', txResult)
        if (txResult.receipt) {
          tx.status =
            txResult.receipt[0].excepted === 'None'
              ? constants.STATUS_CONFIRMED
              : constants.STATUS_FAILED
          pendingTransactions.splice(index, 1, tx)
        } else if (txResult.confirmations >= confirmationNeeded) {
          tx.status = constants.STATUS_CONFIRMED
          pendingTransactions.splice(index, 1, tx)
        }
      } catch (error) {
        //
      }
    })

    return { pendingTransactions }
  }

  @MutationAction
  async removePendingTx(txid: string) {
    const pendingTransactions = (this.state as any).pendingTransactions as PendingTransaction[]

    const index = pendingTransactions.findIndex(tx => tx.txid === txid)
    if (index < 0) {
      return {}
    }

    pendingTransactions.splice(index, 1)

    return { pendingTransactions }
  }
}

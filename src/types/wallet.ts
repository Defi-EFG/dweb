import { KeyStore } from './keystore'
import { TxList, PendingTransaction } from './transaction'
import { Currency } from './currency'
import { WalletParams } from '@/services/ecoc/types'

export interface Wallet {
  address: string
  network: string
  keystore: KeyStore
  txList: TxList
  currencies: Currency[]
  selectedCurrencyIndex: number
  lastUpdate: number
  lastBlock: number
  status: string
  pendingTransactions: PendingTransaction[]
}

export interface SendPayload {
  currency: Currency
  to: string
  amount: number
  walletParams: WalletParams
}

import { KeyStore } from './keystore'
import { TxList } from './transaction'
import { Currency } from './currency'

export interface Wallet {
  address: string
  network: string
  keystore: KeyStore
  txList: TxList
  currencies: Currency[]
  selectedCurrencyIndex: number
  lastUpdate: number
}

export interface SendPayload {
  currency: Currency
  password: string
  to: string
  amount: number
  fee: number
  gasLimit?: number
  gasPrice?: number
}

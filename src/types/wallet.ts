import { KeyStore } from './keystore'
import { TxList } from './transaction'
import { Currency } from './currency'

export interface Wallet {
  address: string
  network: string
  keystore: KeyStore
  txList: TxList
  currencies: Currency[]
  selectedCurrency: number
  lastUpdate: number
}

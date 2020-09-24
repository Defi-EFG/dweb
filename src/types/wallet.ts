import { KeyStore } from './keystore'
import { Transaction } from './transaction'
import { Currency } from './currency'

export interface Wallet {
  address: string
  network: any
  keystore: KeyStore
  transactions: Transaction[]
  currencies: Currency[]
}

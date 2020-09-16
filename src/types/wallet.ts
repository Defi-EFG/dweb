import { KeyStore } from './keystore'
import { Transaction } from './transaction'

export interface Wallet {
  keypair: any
  network: any
  keystore: KeyStore
  address: string
  transactions: Transaction[]
}

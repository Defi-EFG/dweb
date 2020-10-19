import { Utxo } from '@/types/transaction'

export interface LoanInfo {
  assetSymbol: string
  amount: number
  timestamp: number
  interestRate: number
  interest: number
  pool: string
}

export interface WalletParams {
  keypair: any
  utxoList: Utxo[]
  fee: number
  gasLimit: number
  gasPrice: number
}

export interface Transaction {
  txid: string
  version: number
  locktime: number
  isEcrc20Transfer: boolean
  vin: TxValueIn[]
  vout: TxValueOut[]
  blockhash: string
  blockheight: number
  confirmations: number
  time: number
  blocktime: number
  valueOut: number
  size: number
  valueIn: number
  fees: number
}

export interface TxValueIn {
  coinbase?: string
  txid: string
  vout: number
  sequence: number
  n: number
  scriptSig?: {
    hex?: string
    asm?: string
  }
  addr?: string
  valueSat?: number
  value?: number
  doubleSpentTxID?: string
}

export interface TxValueOut {
  value: string
  n: number
  scriptPubKey: {
    hex: string
    asm: string
    addresses?: string[]
    type?: string
  }
  spentTxId: string | null
  spentIndex: number | null
  spentHeight: number | null
}

export interface SocketTx {
  isRBF: boolean
  txid: string
  valueOut: number
  vout: object[]
  loading: boolean
  time: number
}

export interface TxReceipt {
  blockHash: string
  blockNumber: number
  contractAddress: string
  cumulativeGasUsed: number
  excepted: string
  from: string
  gasUsed: number
  log: ReceiptLog[]
  to: string
  transactionHash: string
  transactionIndex: number
}

export interface ReceiptLog {
  address: string
  data: string
  topics: string[]
}

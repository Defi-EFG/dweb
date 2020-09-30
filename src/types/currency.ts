export interface Currency {
  name: string
  type: string
  icon: string
  balance: string
  price?: string
  tokenInfo?: Ecrc20
}

export interface Ecrc20 {
  name: string
  symbol: string
  address: string
  decimals: string
  totalSupply: string
}

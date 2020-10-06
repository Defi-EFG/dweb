export interface Currency {
  name: string
  type: string
  balance: string
  style?: Style
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

export interface Style {
  icon: string
  mark: string
}


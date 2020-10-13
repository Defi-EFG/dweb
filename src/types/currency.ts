export interface Currency {
  name: string
  type: string
  balance: string
  style?: Style
  price?: number
  tokenInfo?: Ecrc20
}

export interface Ecrc20 {
  name: string
  symbol: string
  address: string
  decimals: string
  totalSupply: string
}

export interface CurrencyInfo {
  name: string
  style: Style
}

export interface Style {
  icon: string
  mark: string
}

// Temporary interface, remove this after complete integrated with contract
export interface CurrencyRate {
  [token: string]: number
}

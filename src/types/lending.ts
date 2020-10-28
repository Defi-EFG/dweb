import { Currency, CurrencyInfo } from './currency'
export interface Pool {
  currency: CurrencyInfo
  address: string
  totalSupply: number
  totalBorrowed: number
  remaining: number
}

export interface Collateral {
  currency: Currency
  activated: boolean
  collateralFactor: number
}

export interface Borrow {
  currency: Currency
  apy: number
}

export interface CollateralAsset {
  currency: CurrencyInfo
  amount: number
  collateralFactor: number
}

export interface MyActivity {
  activityName: string
  currencyName: string
  amount: number
  price: number
  timestamp: number
}

export interface Loan {
  poolAddr: string
  currency: CurrencyInfo
  amount: number
  timestamp: number
  interestRate: number
  exchangeRate: number
  interest: number
  EFGInitialRate: number
  lastGracePeriod: number
  remainingGPT: number
}

export interface LendingPlatform {
  address: string

  loan: Loan
  pools: Pool[]
  myCollateralAssets: CollateralAsset[]
  myActivity: MyActivity[]

  collateralsActivated: string[]
  lastUpdate: number
  isLiquidation: boolean
  status: string
}

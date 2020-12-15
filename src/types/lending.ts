import { Currency, CurrencyInfo } from './currency'
export interface Pool {
  currency: CurrencyInfo
  address: string
  name: string
  totalSupply: number
  totalBorrowed: number
  totalBorrowers: number
  remaining: number
}

export interface Collateral {
  currencyName: string
  contractAddress: string
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

export interface MyAsset {
  currency: CurrencyInfo
  amount: number
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
  pools: Pool[]

  borrowLimit: number // in efg
  borrowBalance: number // total debt in efg
  loan: Loan

  myCollateralAssets: CollateralAsset[]
  supportedCollateralAssets: Collateral[]

  myActivity: MyActivity[]
  myAssets: MyAsset[]

  lastUpdate: number
  isLiquidation: boolean
  status: string
}

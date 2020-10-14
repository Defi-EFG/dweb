import { Contract } from './contract'
import { Currency, CurrencyInfo } from './currency'

export interface Collateral {
  currency: Currency
  activated: boolean
}

export interface Borrow {
  currency: Currency
  apy: number
}

export interface CollateralAsset {
  currency: CurrencyInfo
  amount: number
  price: number
}

export interface MyActivity {
  activityName: string
  currencyName: string
  amount: number
  price: number
  timestamp: number
}

export interface Loan {
  loaner: string
  currency: CurrencyInfo
  amount: number
  timestamp: number
  interestRate: number
  exchangeRate: number
  interest: number
}

export interface LendingPlatform {
  contract: Contract
  collateralBalance: number
  borrowedBalance: number
  borrowPowerRate: number
  loan: Loan

  myCollateralAssets: CollateralAsset[]
  myActivity: MyActivity[]

  collateralsActivated: string[]
}

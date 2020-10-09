import { Contract } from './contract'
import { CurrencyInfo } from './currency'

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
  borrowPower: number
  loan: Loan
  myCollateralAssets: CollateralAsset[]
  myActivity: MyActivity[]
}

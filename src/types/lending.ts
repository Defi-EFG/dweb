import { Contract } from './contract'
import { Currency, CurrencyInfo } from './currency'

export interface MyActivity {
  activityName: string
  currencyName: string
  amount: number
  time: string
}

export interface Loan {
  currency: CurrencyInfo
  amount: number
  timestamp: number
  interestRate: number
  exchangeRate: number
  interest: number
}

export interface LendingPlatform {
  contract: Contract
  loaner: string
  collateralBalance: number
  borrowPower: number
  loan: Loan
  myCollateralAsset: Currency[]
  myActivity: MyActivity[]
}

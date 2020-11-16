export interface LoanInfo {
  assetSymbol: string
  amount: number
  timestamp: number
  interestRate: number
  interest: number
  poolAddr: string
  EFGInitialRate: number
  lastGracePeriod: number
  remainingGPT: number
}

export interface Collateral {
  currencyName: string
  amount: number
}

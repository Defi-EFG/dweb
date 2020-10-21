import { CurrencyInfo } from './currency'

export interface StakingPlatform {
  address: string

  stakingCurrency: CurrencyInfo
  rewardCurrency: CurrencyInfo

  totalReward: number
  available: number
  staking: number
  timestamp: number
  totalStakedReward: number

  rewardHistory: RewardHistory[]
  lastUpdate: number
  status: string
}

export interface RewardHistory {
  amount: number
  timestamp: number
}

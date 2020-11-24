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

  numberOfStaking: number
  totalStaking: number

  rewardHistory: RewardHistory[]
  lastUpdate: number
  status: string
}

export interface RewardHistory {
  amount: number
  timestamp: number
}

export interface StakingInfo {
  staking: number
  currency?: CurrencyInfo
  reward: number
  status: boolean
  timestamp: number //ms
}

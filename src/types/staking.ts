import { Contract } from './contract'
import { CurrencyInfo } from './currency'

export interface StakingPlatform {
  contract: Contract

  stakingCurrency: CurrencyInfo
  rewardCurrency: CurrencyInfo

  totalReward: number
  available: number
  staking: number
  timestamp: number
  totalStakedReward: number

  rewardHistory: RewardHistory[]
}

export interface RewardHistory {
  amount: number
  timestamp: number
}

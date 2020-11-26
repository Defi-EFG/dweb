import { CurrencyInfo } from './currency'

export interface StakingPlatform {
  address: string

  stakingCurrency: CurrencyInfo
  rewardCurrency: CurrencyInfo
  stakingList: StakingInfo[]

  totalReward: number
  available: number
  withdrawalFeeRate: number

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
  pendingId?: number
  staking: number
  currency: CurrencyInfo
  reward: number
  status: boolean
  timestamp?: number //ms
}

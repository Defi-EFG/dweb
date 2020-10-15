import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { StakingPlatform } from '@/types/staking'

import { staking } from '@/services/staking'
import { stakingCurrency, rewardCurrency } from '@/store/common'

const rewardHistory = [
  {
    amount: 0.56,
    timestamp: 1602222563
  },
  {
    amount: 5.5,
    timestamp: 1602222563
  }
]

@Module({ dynamic: true, store, namespaced: true, name: 'stakingStore' })
export default class StakingModule extends VuexModule implements StakingPlatform {
  address = staking.address
  stakingCurrency = stakingCurrency
  rewardCurrency = rewardCurrency

  totalReward = 10000
  available = 10000
  staking = 100
  timestamp = 0
  totalStakedReward = 6.06

  rewardHistory = rewardHistory
}

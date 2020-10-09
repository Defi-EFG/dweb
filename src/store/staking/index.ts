import {
  VuexModule,
  Module,
  Mutation,
  Action,
  MutationAction,
} from 'vuex-module-decorators'
import store from '@/store'
import { InsufficientBalance } from '@/exceptions/wallet'
import { StakingPlatform } from '@/types/staking'
import * as constants from '@/constants'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'

import { stakingContract } from '@/services/staking'
import { SmartContract, Params, ExecutionResult } from '@/services/contract'

const staking = new SmartContract(stakingContract.address, stakingContract.abi)
const stakingCurrency = {
  name: constants.EFG,
  style: constants.KNOWN_CURRENCY[constants.EFG]
}
const rewardCurrency = {
  name: constants.GPT,
  style: constants.KNOWN_CURRENCY[constants.GPT]
}

@Module({ dynamic: true, store, namespaced: true, name: 'stakingStore' })
export default class StakingModule extends VuexModule implements StakingPlatform {
  contract = stakingContract
  stakingCurrency = stakingCurrency
  rewardCurrency = rewardCurrency

  totalReward = 0
  available = 0
  staking = 0
  timestamp = 0
  totalStakedReward = 0
}

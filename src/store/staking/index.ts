import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { WalletParams } from '@/services/ecoc/types'
import { StakingPlatform } from '@/types/staking'
import { staking as stakingContract } from '@/services/staking'
import * as Ecoc from '@/services/wallet'
import * as constants from '@/constants'
import * as utils from '@/services/utils'
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
  address = stakingContract.address
  stakingCurrency = stakingCurrency
  rewardCurrency = rewardCurrency

  totalReward = 10000
  available = 10000
  staking = 0
  timestamp = 0
  totalStakedReward = 0

  rewardHistory = rewardHistory
  lastUpdate = 0
  status = constants.STATUS_SYNCED

  @Mutation
  updateTime() {
    this.lastUpdate = new Date().getTime()
  }

  @Mutation
  updateStatus(status: string) {
    this.status = status
  }

  @Mutation
  updateTotalReward(totalReward: number) {
    this.totalReward = totalReward
  }

  @Mutation
  updateAvailable(available: number) {
    this.available = available
  }

  @MutationAction
  async updateMintingInfo(address: string) {
    const available = await stakingContract.unclaimedGPT()
    const decimals = 4
    const { stakingAmount, timestamp, unclaimedReward } = await stakingContract.mintingInfo(address)

    return {
      staking: stakingAmount,
      timestamp: timestamp,
      totalStakedReward: unclaimedReward,
      available: utils.toDecimals(available, decimals).toNumber(),
      lastUpdate: new Date().getTime()
    }
  }

  @Action
  init() {
    const totalReward = 10000
    this.context.commit('updateTotalReward', totalReward)
    this.context.commit('updateAvailable', totalReward)
    this.context.commit('updateTime')
  }

  @Action
  synced() {
    this.context.commit('updateStatus', constants.STATUS_SYNCED)
    return constants.STATUS_SYNCED
  }

  @Action({ rawError: true })
  async deposit(payloads: { amount: number; walletParams: WalletParams }) {
    const { amount, walletParams } = payloads

    try {
      const rawTransaction = await stakingContract.mintGPT(amount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async withdraw(payloads: { amount: number; walletParams: WalletParams }) {
    const { amount, walletParams } = payloads

    try {
      const rawTransaction = await stakingContract.withdrawEFG(amount, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async claim(payloads: { walletParams: WalletParams }) {
    const { walletParams } = payloads

    try {
      const rawTransaction = await stakingContract.claimStakedGPT(walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

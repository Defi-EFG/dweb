import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { WalletParams } from '@/services/ecoc/types'
import { StakingPlatform, StakingInfo } from '@/types/staking'
import { staking as stakingContract } from '@/services/staking'
import { Ecrc20 } from '@/services/ecrc20'
import * as Ecoc from '@/services/wallet'
import * as constants from '@/constants'
import * as utils from '@/services/utils'
import { stakingCurrency, rewardCurrency } from '@/store/common'
import { EFG, GPT } from '@/store/wallet/currency'

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

  stakingList = [
    {
      currency: stakingCurrency,
      staking: 0,
      reward: 0,
      status: true
    }
  ] as StakingInfo[]

  totalReward = 10000
  available = 10000

  numberOfStaking = 0
  totalStaking = 0

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

  @Mutation
  updateStakingList(stakingList: StakingInfo[]) {
    this.stakingList = stakingList
  }

  clear() {
    this.stakingList = [
      {
        currency: stakingCurrency,
        staking: 0,
        reward: 0,
        status: true
      }
    ] as StakingInfo[]
  }

  @MutationAction
  async updatePlatformInfo() {
    try {
      const numberOfStaking = await stakingContract.getTotalStakers()
      const fullTotalStaking = await stakingContract.getTotalStaking()
      const fullAvailable = await stakingContract.availableGPT()

      const rewardDecimals = GPT.tokenInfo?.decimals as string
      const stakingDecimals = EFG.tokenInfo?.decimals as string
      const totalStaking = utils.toDecimals(fullTotalStaking, stakingDecimals).toNumber()
      const available = utils.toDecimals(fullAvailable, rewardDecimals).toNumber()

      return { numberOfStaking, totalStaking, available }
    } catch (error) {
      return {}
    }
  }

  @MutationAction
  async updateStakingInfo(address: string) {
    try {
      const stakingList = (this.state as any).stakingList as StakingInfo[]
      const { stakingAmount, rewardAmount } = await stakingContract.getStakingInfo(address)

      const rewardDecimals = GPT.tokenInfo?.decimals as string
      const stakingDecimals = EFG.tokenInfo?.decimals as string

      const staking = {
        currency: stakingCurrency,
        staking: utils.toDecimals(stakingAmount, stakingDecimals).toNumber(),
        reward: utils.toDecimals(rewardAmount, rewardDecimals).toNumber(),
        status: true
      }

      stakingList.splice(0, 1, staking)

      return {
        stakingList,
        lastUpdate: new Date().getTime()
      }
    } catch (error) {
      return {}
    }
  }

  @MutationAction
  async updatePendingInfo(address: string) {
    try {
      const stakingList = (this.state as any).stakingList as StakingInfo[]
      const pendingIds = await stakingContract.getPendingIds(address)

      const rewardDecimals = GPT.tokenInfo?.decimals as string
      const stakingDecimals = EFG.tokenInfo?.decimals as string

      const pendingList = await Promise.all(
        pendingIds.map(async id => {
          const { stakingAmount, rewardAmount, maturity } = await stakingContract.getPendingInfo(id)

          const pending = {
            pendingId: id,
            currency: stakingCurrency,
            staking: utils.toDecimals(stakingAmount, stakingDecimals).toNumber(),
            reward: utils.toDecimals(rewardAmount, rewardDecimals).toNumber(),
            status: false,
            timestamp: maturity * 1000
          }

          return pending
        })
      )

      stakingList.splice(1, stakingList.length, ...pendingList)

      return {
        stakingList,
        lastUpdate: new Date().getTime()
      }
    } catch (error) {
      return {}
    }
  }

  @Action
  init() {
    const totalReward = 1000
    this.context.commit('updateTotalReward', totalReward)
    this.context.commit('updateAvailable', totalReward)
    this.context.commit('updateTime')
  }

  @Action
  synced() {
    this.context.commit('updateStatus', constants.STATUS_SYNCED)
    return constants.STATUS_SYNCED
  }

  @Action
  async logout() {
    this.context.commit('clear')
    return true
  }

  @Action({ rawError: true })
  async deposit(payloads: { amount: number; walletParams: WalletParams }) {
    const { amount, walletParams } = payloads
    const tokenInfo = EFG.tokenInfo

    if (!tokenInfo) {
      return Promise.reject(new Error('Wrong Currency'))
    }

    const efg = new Ecrc20(tokenInfo)
    const decimals = tokenInfo.decimals
    const fullAmount = utils.fromDecimals(amount, decimals).toNumber()

    try {
      const allowance = await efg.allowance(walletParams.address, stakingContract.address)
      if (fullAmount > allowance) {
        // waiting for ecrc-20 approve
        const approveTx = await efg.approve(stakingContract.address, amount, walletParams)
        const approveTxid = await Ecoc.sendRawTx(approveTx)

        console.log('Waiting for confirmation')
        await Ecoc.waitForConfirmation(approveTxid)
        console.log('Confirmed')

        const newUtxos = await Ecoc.getUtxos(walletParams.address)
        walletParams.utxoList = newUtxos
      }

      const depositTx = await stakingContract.mintGPT(fullAmount, walletParams)
      const txid = await Ecoc.sendRawTx(depositTx)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async withdraw(payloads: { pendingId: number; walletParams: WalletParams }) {
    const { pendingId, walletParams } = payloads

    try {
      const rawTransaction = await stakingContract.withdraw(pendingId, walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action({ rawError: true })
  async stopStaking(payloads: { walletParams: WalletParams }) {
    const { walletParams } = payloads

    try {
      const rawTransaction = await stakingContract.stopStaking(walletParams)
      const txid = await Ecoc.sendRawTx(rawTransaction)
      this.context.commit('updateStatus', constants.STATUS_PENDING)
      return txid
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

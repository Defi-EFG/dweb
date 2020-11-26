<template>
  <div class="staking-page">
    <v-row class="content-wrapper">
      <v-col xl="8" lg="8" md="12" sm="12" cols="12" class="content-1">
        <StakingList :stakingList="stakingList" @selectStaking="onStakingSelected"></StakingList>
        <div v-if="isLargeMobileDevice" class="col-spacer"></div>
        <StakingChart
          v-if="isLargeMobileDevice"
          :currencyName="rewardCurrency.name"
          :total="totalReward"
          :available="available"
        ></StakingChart>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" cols="12" class="content-2">
        <v-card dark color="#222738" class="tx-container" v-if="isLargeMobileDevice">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="stakingCurrency.style.icon" alt="" />
              <span>{{ stakingCurrency.name }}</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-row class="content-wrapper">
            <v-col cols="12" class="inner-content">
              <DepositWithdraw
                :balance="stakingBalance"
                :selectedStaking="selectedStaking"
              ></DepositWithdraw>
            </v-col>
          </v-row>
        </v-card>
        <StakingChart
          v-else
          :currencyName="rewardCurrency.name"
          :total="totalReward"
          :available="available"
        ></StakingChart>
      </v-col>
    </v-row>
    <v-row class="content-wrapper">
      <v-col xl="8" lg="8" md="12" sm="12" cols="12" class="content-3">
        <StakedReward
          v-if="isLargeMobileDevice"
          :rewardCurrency="rewardCurrency"
          :selectedStaking="selectedStaking"
        ></StakedReward>
        <v-card v-else dark color="#222738" class="tx-container">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="stakingCurrency.style.icon" alt="" />
              <span>{{ stakingCurrency.name }}</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-row class="content-wrapper">
            <v-col cols="6" class="inner-content pr-1">
              <DepositWithdraw
                :balance="stakingBalance"
                :selectedStaking="selectedStaking"
              ></DepositWithdraw>
            </v-col>
            <v-col cols="6" class="inner-content pl-1">
              <StakedReward
                :rewardCurrency="rewardCurrency"
                :selectedStaking="selectedStaking"
              ></StakedReward>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" class="content-4">
        <TransactionHistory :page="'staking'"></TransactionHistory>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import StakingModule from '@/store/staking'
import { StakingInfo } from '@/types/staking'

import TransactionHistory from '@/components/DeFi/TransactionHistory.vue'
import StakingList from '@/components/DeFi/StakingList.vue'
import StakingChart from '@/components/DeFi/StakingChart.vue'
import DepositWithdraw from '@/components/DeFi/DepositWithdraw.vue'
import StakedReward from '@/components/DeFi/StakedReward.vue'
import RewardHistory from '@/components/DeFi/RewardHistory.vue'
import TransactionRewardHistory from '@/components/DeFi/Mobile/TransactionRewardHistory.vue'

@Component({
  components: {
    TransactionHistory,
    StakingList,
    StakingChart,
    DepositWithdraw,
    StakedReward,
    RewardHistory,
    TransactionRewardHistory,
  },
})
export default class Staking extends Vue {
  walletStore = getModule(WalletModule)
  stakingStore = getModule(StakingModule)

  selectedStaking: StakingInfo = this.activeStaking as StakingInfo
  isLargeMobileDevice = false

  alreadySelected = false

  get isLoggedIn() {
    return this.walletStore.isWalletUnlocked
  }

  get stakingList() {
    return this.stakingStore.stakingList
  }

  get activeStaking() {
    return this.stakingList.find((staking) => staking.status === true)
  }

  get stakingBalance() {
    const currencyName = this.stakingCurrency.name
    const currency = this.walletStore.currenciesList.find(
      (currency: any) => currency.name === currencyName
    )
    if (!currency) return 0

    const balance = Number(currency.balance)
    return balance
  }

  get rewardHistory() {
    return this.stakingStore.rewardHistory
  }

  get totalReward() {
    return this.stakingStore.totalReward
  }

  get available() {
    return this.stakingStore.available
  }

  get stakingCurrency() {
    return this.stakingStore.stakingCurrency
  }

  get rewardCurrency() {
    return this.stakingStore.rewardCurrency
  }

  onStakingSelected(token: any) {
    this.selectedStaking = token
    this.alreadySelected = true
  }

  mounted() {
    this.isLargeMobileDevice = window.innerWidth < 1264
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    window.addEventListener('resize', function () {
      self.isLargeMobileDevice = this.window.innerWidth < 1264
    })
  }

  @Watch('stakingList')
  stakingListChanged() {
    if (!this.alreadySelected) {
      this.selectedStaking = this.activeStaking as StakingInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.supply-withdraw-wrapper {
  width: inherit;
  background: transparent linear-gradient(270deg, #2e3344 0%, #303748 100%) 0% 0% no-repeat
    padding-box;
}

.token-symbol {
  display: flex;
  align-items: center;
  font-size: medium;

  img {
    width: 24px;
    margin-right: 0.8rem;
  }
}

.col-spacer {
  margin-left: 4px;
  margin-right: 4px;
}

@media (max-width: 768px) {
  .col-spacer {
    padding-bottom: 12px;
  }
}
</style>

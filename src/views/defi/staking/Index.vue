<template>
  <div class="staking-page">
    <v-row class="content-wrapper">
      <v-col cols="8" class="content">
        <StakingList :stakingAmount="staking" :stakingCurrency="stakingCurrency"></StakingList>
        <div class="ml-1 mr-1"></div>
        <StakingChart
          :currencyName="rewardCurrency.name"
          :total="totalReward"
          :available="available"
        ></StakingChart>
      </v-col>
      <v-col cols="4" class="content">
        <TransactionHistory :page="'staking'"></TransactionHistory>
      </v-col>
    </v-row>
    <v-row class="content-wrapper">
      <v-col cols="8" class="content">
        <v-card dark color="#222738" class="tx-container">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="stakingCurrency.style.icon" />
              <span>{{ stakingCurrency.name }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row>
            <v-col cols="6" class="pr-1">
              <DepositWithdraw
                :balance="stakingBalance"
                :stakingAmount="staking"
                :stakingCurrency="stakingCurrency"
              ></DepositWithdraw>
            </v-col>
            <v-col cols="6" class="pl-1">
              <StakedReward
                :stakedReward="totalStakedReward"
                :rewardCurrency="rewardCurrency"
              ></StakedReward>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" class="content">
        <RewardHistory
          :rewardList="rewardHistory"
          :rewardCurrencyName="rewardCurrency.name"
        ></RewardHistory>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import StakingModule from '@/store/staking'

import TransactionHistory from '@/components/DeFi/TransactionHistory.vue'
import StakingList from '@/components/DeFi/StakingList.vue'
import LendingActivity from '@/components/DeFi/LendingActivity.vue'
import StakingChart from '@/components/DeFi/StakingChart.vue'
import DepositWithdraw from '@/components/DeFi/DepositWithdraw.vue'
import StakedReward from '@/components/DeFi/StakedReward.vue'
import RewardHistory from '@/components/DeFi/RewardHistory.vue'

@Component({
  components: {
    TransactionHistory,
    StakingList,
    LendingActivity,
    StakingChart,
    DepositWithdraw,
    StakedReward,
    RewardHistory
  }
})
export default class Staking extends Vue {
  walletStore = getModule(WalletModule)
  stakingStore = getModule(StakingModule)

  get stakingBalance() {
    return 0
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

  get staking() {
    return this.stakingStore.staking
  }

  get totalStakedReward() {
    return this.stakingStore.totalStakedReward
  }

  get stakingCurrency() {
    return this.stakingStore.stakingCurrency
  }

  get rewardCurrency() {
    return this.stakingStore.rewardCurrency
  }
}
</script>

<style lang="scss" scoped>
.supply-withdraw-wrapper {
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
</style>

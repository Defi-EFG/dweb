<template>
  <div class="staking-page">
    <v-row class="content-wrapper">
      <v-col xl="8" lg="8" md="12" sm="12" cols="12" class="content-1">
        <StakingList :stakingAmount="staking" :stakingCurrency="stakingCurrency"></StakingList>
        <div class="col-spacer"></div>
        <StakingChart
          :currencyName="rewardCurrency.name"
          :total="totalReward"
          :available="available"
        ></StakingChart>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" cols="12" class="content-2">
        <v-card dark color="#222738" class="tx-container" v-if="isLargeMobileDevice">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="stakingCurrency.style.icon" />
              <span>{{ stakingCurrency.name }}</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-row class="content-wrapper">
            <v-col cols="12" class="inner-content">
              <DepositWithdraw
                :balance="stakingBalance"
                :stakingAmount="staking"
                :stakingCurrency="stakingCurrency"
              ></DepositWithdraw>
            </v-col>
          </v-row>
        </v-card>
        <TransactionHistory v-else :page="'staking'"></TransactionHistory>
      </v-col>
    </v-row>
    <v-row class="content-wrapper">
      <v-col xl="8" lg="8" md="12" sm="12" cols="12" class="content-3">
        <StakedReward
          v-if="isLargeMobileDevice"
          :stakedReward="totalStakedReward"
          :rewardCurrency="rewardCurrency"
        ></StakedReward>
        <v-card v-else dark color="#222738" class="tx-container">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="stakingCurrency.style.icon" />
              <span>{{ stakingCurrency.name }}</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-row class="content-wrapper">
            <v-col cols="6" class="inner-content pr-1">
              <DepositWithdraw
                :balance="stakingBalance"
                :stakingAmount="staking"
                :stakingCurrency="stakingCurrency"
              ></DepositWithdraw>
            </v-col>
            <v-col cols="6" class="inner-content pl-1">
              <StakedReward
                :stakedReward="totalStakedReward"
                :rewardCurrency="rewardCurrency"
              ></StakedReward>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" class="content-4">
        <TransactionRewardHistory
          v-if="isLargeMobileDevice"
          :rewardList="rewardHistory"
          :rewardCurrencyName="rewardCurrency.name"
        ></TransactionRewardHistory>
        <RewardHistory
          v-else
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
    TransactionRewardHistory
  }
})
export default class Staking extends Vue {
  walletStore = getModule(WalletModule)
  stakingStore = getModule(StakingModule)

  get stakingBalance() {
    const currencyName = this.stakingCurrency.name
    const currency = this.walletStore.currenciesList.find(currency => currency.name === currencyName)
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

  get isLargeMobileDevice() {
    return window.innerWidth < 1264
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

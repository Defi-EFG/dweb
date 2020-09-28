<template>
  <div class="staking-page">
    <v-row>
      <v-col cols="8" class="pt-0 pb-0 d-flex">
        <StakingList></StakingList>
        <div class="ml-1 mr-1"></div>
        <StakingList></StakingList>
      </v-col>
      <v-col cols="4" class="pt-0 pb-0">
        <TransactionHistory :page="'staking'"></TransactionHistory>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card dark color="#222738">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img src="@/assets/efg_logo.svg" />
              <span>ECOC</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="pl-2 pr-2">
            <v-col cols="6" class="pr-1">
              <!-- <Collateral></Collateral> -->

              <!-- <Borrow></Borrow> -->
            </v-col>
            <v-col cols="6" class="pl-1">
              <!-- <Withdraw></Withdraw> -->

              <!-- <Repay></Repay> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <div>
          <TransactionHistory></TransactionHistory>
        </div>
        <div class="mt-3">
          <!-- <SupplyMarket @switchToBorrow="modeSwitch"></SupplyMarket> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransactionHistory from '@/components/DeFi/TransactionHistory.vue'
import StakingList from '@/components/DeFi/StakingList.vue'
import LendingActivity from '@/components/DeFi/LendingActivity.vue'

@Component({
  components: {
    TransactionHistory,
    StakingList,
    LendingActivity
  }
})
export default class Staking extends Vue {}
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

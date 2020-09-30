<template>
  <div class="lending-page">
    <v-row>
      <v-col cols="8" class="pt-0 pb-0 d-flex">
        <SupplyBalance></SupplyBalance>
        <div class="ml-1 mr-1"></div>
        <BorrowBalance></BorrowBalance>
      </v-col>
      <v-col cols="4" class="pt-0 pb-0">
        <LendingActivity></LendingActivity>
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
              <template v-if="mode === 'collateral'">
                <Collateral></Collateral>
              </template>
              <template v-else>
                <Borrow></Borrow>
              </template>
            </v-col>
            <v-col cols="6" class="pl-1">
              <template v-if="mode === 'collateral'">
                <Withdraw></Withdraw>
              </template>
              <template v-else>
                <Repay></Repay>
              </template>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <div>
          <CollateralToken @switchToCollateral="modeSwitch"></CollateralToken>
        </div>
        <div class="mt-3">
          <SupplyMarket @switchToBorrow="modeSwitch"></SupplyMarket>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SupplyBalance from '@/components/DeFi/SupplyBalance.vue'
import BorrowBalance from '@/components/DeFi/BorrowBalance.vue'
import LendingActivity from '@/components/DeFi/LendingActivity.vue'
import Collateral from '@/components/DeFi/CollateralCard.vue'
import Withdraw from '@/components/DeFi/WithdrawCard.vue'
import CollateralToken from '@/components/DeFi/CollateralToken.vue'
import SupplyMarket from '@/components/DeFi/SupplyMarket.vue'
import Borrow from '@/components/DeFi/BorrowCard.vue'
import Repay from '@/components/DeFi/RepayCard.vue'

@Component({
  components: {
    SupplyBalance,
    BorrowBalance,
    LendingActivity,
    Collateral,
    Withdraw,
    CollateralToken,
    SupplyMarket,
    Borrow,
    Repay
  }
})
export default class Lending extends Vue {
  mode = 'collateral'

  modeSwitch(val: string) {
    console.log('receive emit')
    this.mode = val
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

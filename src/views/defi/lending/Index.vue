<template>
  <div class="lending-page">
    <v-row class="content-wrapper">
      <v-col cols="8" class="content">
        <SupplyBalance :balance="collateralBalance"></SupplyBalance>
        <div class="ml-1 mr-1"></div>
        <BorrowBalance :balance="borrowedBalance" :borrowPower="borrowPower"></BorrowBalance>
      </v-col>
      <v-col cols="4" class="content">
        <LendingActivity></LendingActivity>
      </v-col>
    </v-row>
    <v-row class="content-wrapper">
      <v-col cols="8" class="content">
        <v-card dark class="tx-container">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img src="@/assets/efg_logo.svg" />
              <span> {{ selectedToken }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-row>
              <v-col cols="6" class="inner-content-left">
                <transition name="fade" mode="out-in">
                  <template v-if="mode === 'collateral'">
                    <Collateral :token="selectedToken"></Collateral>
                  </template>
                  <template v-else>
                    <Borrow :token="selectedToken"></Borrow>
                  </template>
                </transition>
              </v-col>
              <v-col cols="6" class="inner-content-right">
                <transition name="fade" mode="out-in">
                  <template v-if="mode === 'collateral'">
                    <Withdraw :token="selectedToken"></Withdraw>
                  </template>
                  <template v-else>
                    <Repay :token="selectedToken"></Repay>
                  </template>
                </transition>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" class="content">
        <v-row>
          <v-col cols="12" class="pt-0 pb-0">
            <CollateralToken @switchToCollateral="toCollateralToken"></CollateralToken>
          </v-col>
          <v-col cols="12" class="pb-0">
            <SupplyMarket @switchToBorrow="toSupplyToken"></SupplyMarket>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
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
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  mode = 'collateral'
  selectedToken = 'ECOC'

  get collateralBalance() {
    return this.lendingStore.collateralBalance
  }

  get borrowedBalance() {
    return this.lendingStore.borrowedBalance
  }

  get borrowPower() {
    return this.lendingStore.borrowPower
  }

  get isLoggedIn(): boolean {
    return this.walletStore.address != ''
  }

  modeSwitch(val: string) {
    console.log('receive emit')
    this.mode = val
  }

  toCollateralToken(token: string) {
    this.mode = 'collateral'
    console.log('selected', token)
    this.selectedToken = token
  }

  toSupplyToken(token: string) {
    this.mode = 'borrow'
    this.selectedToken = token
  }

  mounted() {
    const currencyName = 'ECOC'
    this.lendingStore.getRate(currencyName).then(console.log)
    this.lendingStore.getInterestRate(currencyName).then(console.log)
    this.lendingStore.getDebt('eJ2MXjCnSSpSvuDE8CdEDjwzSZgWxGfYBP').then(console.log)
    this.lendingStore.getBorrowPower(currencyName).then(console.log)
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

.inner-content {
  &-left {
    padding: 0 4px 0 0;
  }

  &-right {
    padding: 0 0 0 4px;
  }
}
</style>

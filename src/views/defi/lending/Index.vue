<template>
  <div class="lending-page">
    <v-row class="content-wrapper">
      <v-col cols="8" class="content">
        <SupplyBalance :balance="collateralValue"></SupplyBalance>
        <div class="ml-1 mr-1"></div>
        <BorrowBalance :balance="borrowedBalance" :maxBorrow="borrowPower"></BorrowBalance>
      </v-col>
      <v-col cols="4" class="content pr-0">
        <LendingActivity></LendingActivity>
      </v-col>
    </v-row>
    <v-row class="content-wrapper">
      <v-col cols="8" class="content pb-0">
        <v-card dark class="tx-container">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="selectedCurrency.style.icon" />
              <span> {{ selectedCurrency.name }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="content-wrapper">
            <v-col cols="6" class="inner-content pr-1">
              <transition name="fade" mode="out-in">
                <template v-if="mode === 'collateral'">
                  <Collateral
                    :currency="selectedCurrency"
                    :collateralBalance="collateralBalance"
                    :borrowBalance="borrowedBalance"
                    :borrowPower="borrowPower"
                    :borrowPowerPercentage="borrowPowerRate"
                  ></Collateral>
                </template>
                <template v-else>
                  <Borrow
                    :currency="selectedCurrency"
                    :collateralBalance="collateralBalance"
                    :borrowBalance="borrowedBalance"
                    :borrowPower="borrowPower"
                    :interestRate="interestRate"
                    :borrowPowerPercentage="borrowPowerRate"
                  ></Borrow>
                </template>
              </transition>
            </v-col>
            <v-col cols="6" class="inner-content pl-1">
              <transition name="fade" mode="out-in">
                <template v-if="mode === 'collateral'">
                  <Withdraw
                    :currency="selectedCurrency"
                    :collateralBalance="collateralBalance"
                    :borrowBalance="borrowedBalance"
                    :borrowPower="borrowPower"
                    :borrowPowerPercentage="borrowPowerRate"
                  ></Withdraw>
                </template>
                <template v-else>
                  <Repay
                    :currency="selectedCurrency"
                    :collateralBalance="collateralBalance"
                    :borrowBalance="borrowedBalance"
                    :borrowPower="borrowPower"
                    :interestRate="interestRate"
                    :borrowPowerPercentage="borrowPowerRate"
                  ></Repay>
                </template>
              </transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4" class="content pb-0 pr-0">
        <v-row>
          <v-col cols="12" class="pt-0 pb-0">
            <CollateralToken
              :collateralList="collateralList"
              @switchToCollateral="toCollateralToken"
              @onActivate="onActivate"
            ></CollateralToken>
          </v-col>
          <v-col cols="12" class="pb-0">
            <SupplyMarket :borrowList="borrowList" @switchToBorrow="toBorrowToken"></SupplyMarket>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import * as constants from '@/constants'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import { Currency } from '@/types/currency'
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
  selectedCurrency = this.collateralList[0].currency

  get collateralValue() {
    return this.lendingStore.collateralBalance
  }

  get collateralBalance() {
    return this.lendingStore.collateralBalance
  }

  get borrowedBalance() {
    return this.lendingStore.borrowedBalance
  }

  get borrowPowerRate() {
    return this.lendingStore.borrowPowerRate / 100
  }

  get borrowPower() {
    return this.collateralBalance * this.borrowPowerRate
  }

  get interestRate() {
    return this.lendingStore.loan.interestRate
  }

  get isLoggedIn(): boolean {
    return this.walletStore.address != ''
  }

  get collateralsActivated() {
    return this.lendingStore.collateralsActivated
  }

  get collateralList() {
    return this.walletStore.currencies
      .filter(currency => {
        return constants.COLLATERAL_CURRENCIES.indexOf(currency.name) >= 0
      })
      .map(currency => {
        return {
          currency: currency,
          activated: this.collateralsActivated.indexOf(currency.name) >= 0
        }
      })
  }

  get borrowList() {
    return this.walletStore.currencies
      .filter(currency => {
        return constants.LOAN_CURRENCIES.indexOf(currency.name) >= 0
      })
      .map(currency => {
        return {
          currency: currency,
          apy: this.lendingStore.loan.interestRate
        }
      })
  }

  modeSwitch(val: string) {
    console.log('receive emit')
    this.mode = val
  }

  toCollateralToken(currency: Currency) {
    this.mode = 'collateral'
    this.selectedCurrency = currency
  }

  toBorrowToken(currency: Currency) {
    this.mode = 'borrow'
    this.selectedCurrency = currency
  }

  onActivate(data: boolean) {
    if (data) this.lendingStore.activatedCollateral(this.selectedCurrency.name)
    else this.lendingStore.deactivatedCollateral(this.selectedCurrency.name)
  }

  mounted() {
    //
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

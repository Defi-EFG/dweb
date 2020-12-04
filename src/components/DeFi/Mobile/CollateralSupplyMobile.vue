<template>
  <v-tabs grow background-color="#2F3446" dark class="cs-tabs" @change="tabChange">
    <v-tab>{{ $t('views.lendingpage.collateral') }}</v-tab>
    <v-tab>{{ $t('views.lendingpage.borrow') }}</v-tab>

    <v-tab-item class="cs-tabs-item">
      <CollateralTokenMobile
        :collateralList="collateralList"
        @switchToCollateral="toCollateralToken"
      ></CollateralTokenMobile>
      <v-divider dark class="divider"></v-divider>
      <CollateralWithdrawMobile
        :currency="tokenCurrency"
        :collateralBalance="collateralBalance"
        :borrowBalance="borrowBalance"
        :borrowLimit="borrowLimit"
        :borrowPowerPercentage="borrowPowerPercentage"
      ></CollateralWithdrawMobile>
    </v-tab-item>

    <v-tab-item class="cs-tabs-item">
      <SupplyMarketMobile
        :borrowList="borrowList"
        @switchToBorrow="toBorrowToken"
      ></SupplyMarketMobile>
      <v-divider dark class="divider"></v-divider>
      <BorrowRepayMobile
        :currency="tokenCurrency"
        :collateralBalance="collateralBalance"
        :borrowBalance="borrowBalance"
        :borrowLimit="borrowLimit"
        :interestRate="interestRate"
        :borrowPowerPercentage="borrowPowerPercentage"
      ></BorrowRepayMobile>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'
import CollateralWithdrawMobile from '@/components/DeFi/Mobile/CollateralWithdrawMobile.vue'
import CollateralTokenMobile from '@/components/DeFi/Mobile/CollateralTokenMobile.vue'
import BorrowRepayMobile from '@/components/DeFi/Mobile/BorrowRepayMobile.vue'
import SupplyMarketMobile from '@/components/DeFi/Mobile/SupplyMarketMobile.vue'
import { Collateral } from '@/types/lending'
import { Borrow } from '@/types/lending'
import { Currency } from '@/types/currency'

@Component({
  components: {
    CollateralWithdrawMobile,
    BorrowRepayMobile,
    CollateralTokenMobile,
    SupplyMarketMobile
  }
})
export default class CollateralSupplyMobile extends Vue {
  @Prop({ default: [] }) readonly collateralList!: Collateral[]
  @PropSync('currency', { type: Object }) tokenCurrency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowLimit!: number
  @Prop() borrowPowerPercentage!: number
  @Prop() interestRate!: number
  @Prop({ default: [] }) readonly borrowList!: Borrow[]

  toCollateralToken(currency: Currency) {
    this.$emit('update:tokenCurrency', currency)
    this.$emit('selectCollateralMobile', currency)
  }

  toBorrowToken(currency: Currency) {
    this.$emit('update:tokenCurrency', currency)
    this.$emit('selectBorrowMobile', currency)
  }

  tabChange(index: any) {
    this.$emit('selectTab', index)
  }
}
</script>

<style lang="scss" scoped>
.cs-tabs {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.cs-tabs-item {
  background: #222738;
  color: white;
  padding: 1.2rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 425px) {
  .cs-tabs-item {
    padding: 0.7rem;
  }
}
</style>

<style lang="scss">
.cs-tabs {
  .v-tabs-items {
    background: #222738;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .v-tabs-slider {
    background-color: #c074f9;
  }
}
</style>

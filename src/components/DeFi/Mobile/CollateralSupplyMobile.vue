<template>
  <v-tabs grow background-color="#2F3446" dark class="cs-tabs">
    <v-tab>Collateral</v-tab>
    <v-tab>Supply Market</v-tab>

    <v-tab-item class="cs-tabs-item">
      <CollateralTokenMobile :collateralList="collateralList"></CollateralTokenMobile>
      <v-divider dark class="divider"></v-divider>
      <CollateralWithdrawMobile
        :currency="currency"
        :collateralBalance="collateralBalance"
        :borrowBalance="borrowBalance"
        :borrowPower="borrowPower"
        :borrowPowerPercentage="borrowPowerPercentage"
      ></CollateralWithdrawMobile>
    </v-tab-item>

    <v-tab-item class="cs-tabs-item">
      <SupplyMarketMobile :borrowList="borrowList"></SupplyMarketMobile>
      <v-divider dark class="divider"></v-divider>
      <BorrowRepayMobile
        :currency="currency"
        :collateralBalance="collateralBalance"
        :borrowBalance="borrowBalance"
        :borrowPower="borrowPower"
        :interestRate="interestRate"
        :borrowPowerPercentage="borrowPowerPercentage"
      ></BorrowRepayMobile>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
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
  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowPower!: number
  @Prop() borrowPowerPercentage!: number
  @Prop() interestRate!: number
  @Prop({ default: [] }) readonly borrowList!: Borrow[]
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
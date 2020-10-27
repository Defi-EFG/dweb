<template>
  <v-tabs grow :hide-slider="true" background-color="#17181C" dark class="cw-tabs">
    <v-tab>Collateral</v-tab>
    <v-tab>Withdraw</v-tab>

    <v-tab-item class="cw-tabs-item">
      <Collateral
        :currency="currency"
        :collateralBalance="collateralBalance"
        :borrowBalance="borrowBalance"
        :borrowPower="borrowPower"
        :borrowPowerPercentage="borrowPowerPercentage"
      ></Collateral>
    </v-tab-item>

    <v-tab-item class="cw-tabs-item">
      <Withdraw
        :currency="currency"
        :collateralBalance="collateralBalance"
        :borrowBalance="borrowBalance"
        :borrowPower="borrowPower"
        :borrowPowerPercentage="borrowPowerPercentage"
      ></Withdraw>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Currency } from '@/types/currency'
import Collateral from '@/components/DeFi/CollateralCard.vue'
import Withdraw from '@/components/DeFi/WithdrawCard.vue'

@Component({
  components: {
    Collateral,
    Withdraw
  }
})
export default class CollateralWithdrawMobile extends Vue {
  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowPower!: number
  @Prop() borrowPowerPercentage!: number
}
</script>

<style lang="scss" scoped>
.cw-tabs {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.cw-tabs-item {
  background: #1d212e;
  color: white;
  padding: 2.5rem;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

@media (max-width: 425px) {
  .cw-tabs-item {
    padding: 2rem 1.25rem;
  }
}
</style>

<style lang="scss">
.cw-tabs {
  .v-tab {
    color: #c074f9;
    font-weight: 800;
    text-transform: capitalize;
  }
  .v-tabs-items {
    background-color: transparent !important;
  }

  .v-tab--active {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background: #1d212e !important;
  }
}
</style>

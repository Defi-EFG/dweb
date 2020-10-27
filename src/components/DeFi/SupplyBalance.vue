<template>
  <v-card dark class="balance-card">
    <v-card-text>
      <span class="balance-label">{{ $t('views.lendingpage.collateralbalance') }}</span>
      <div class="loaner">Loaner: {{ loaner }}</div>
      <div class="balance" :class="isLiquidate ? 'liquidate' : ''">${{ balance.toFixed(2) }}</div>
      <div class="liquid-countdown" v-show="isLiquidate">
        <span>Counting down 5 blocks to liquidation...</span>
        <span class="extend-btn">Extend</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class SupplyBalance extends Vue {
  @Prop({ default: 0 }) readonly balance!: number
  @Prop({ default: '' }) readonly loaner!: string
  @Prop({ default: false }) readonly isLiquidate!: boolean
}
</script>

<style lang="scss" scoped>
.balance-card {
  background: #2e3344;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  width: -webkit-fill-available;
  text-align: left;
}

.balance {
  font-size: 38px;
  color: #3fc0db;
  text-align: right;
  padding-top: 3.8rem;
  padding-bottom: 1rem;
}

.balance-label {
  font-size: 16px;
  color: white;
}

.loaner {
  color: #7e7e7e;
  .change-btn {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }
}

.liquid-countdown {
  background: #151a2b;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  justify-content: space-between;

  .extend-btn {
    cursor: pointer;
    text-decoration: underline;
    color: #c074f9;
  }
}

.liquidate {
  color: #ff5656;
}

@media (max-width: 768px) {
  .balance {
    font-size: 29px;
    padding-top: 1.8rem;
  }

  .loaner {
    font-size: small;
  }

  .liquid-countdown {
    font-size: small;
  }
}
</style>

<style lang="scss">
.balance-card {
  .v-card__text {
    padding: 2rem !important;
  }
}
</style>

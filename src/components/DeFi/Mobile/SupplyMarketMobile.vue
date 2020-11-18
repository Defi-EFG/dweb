<template>
  <div class="supply-market-mobile">
    <v-row class="market-label">
      <v-col cols="4">{{ $t('views.lendingpage.assets') }}</v-col>
      <v-col cols="4" class="text-center">{{ $t('views.lendingpage.APY') }}</v-col>
      <v-col cols="4" class="text-right">{{ $t('views.lendingpage.wallet') }}</v-col>
    </v-row>
    <v-row
      class="market-item"
      v-for="(item, index) in borrowList"
      :key="index"
      @click="switchBorrow(item.currency)"
    >
      <v-col cols="4" class="assets">
        <img :src="item.currency.style.icon" alt="" />
        <span>{{ item.currency.name }}</span>
      </v-col>
      <v-col cols="4" class="apy">
        <span>{{ item.apy }}%</span>
      </v-col>
      <v-col cols="4" class="balance">
        <span>{{ item.currency.balance }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Borrow } from '@/types/lending'
import { Currency } from '@/types/currency'

@Component({})
export default class SupplyMarketMobile extends Vue {
  @Prop({ default: [] }) readonly borrowList!: Borrow[]

  switchBorrow(currency: Currency) {
    this.$emit('switchToBorrow', currency)
  }
}
</script>

<style lang="scss" scoped>
.supply-market-mobile {
  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}

.market-item {
  padding: 0.35rem 5px;
  align-items: center;
  background: #323646;
  border-radius: 6px;
  color: white;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  cursor: pointer;

  .assets {
    display: flex;
    place-items: center;

    img {
      width: 23px;
      margin-left: 0.5rem;
      margin-right: 1rem;
    }
  }

  .balance {
    text-align: right;
    small {
      opacity: 0.5;
    }
  }

  .apy {
    text-align: center;
  }

  .borrow {
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
  }
}

.market-item:hover {
  background: #42475c;
  transition: 0.3s;
}

.market-item:nth-last-child(1) {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .market-label {
    font-size: small;
  }

  .market-item {
    font-size: small;
  }
}
</style>

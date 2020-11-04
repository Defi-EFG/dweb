<template>
  <div class="collateral-content-mobile">
    <v-row class="collateral-label">
      <v-col cols="4">{{ $t('views.lendingpage.assets') }}</v-col>
      <v-col cols="5" class="text-right">{{ $t('views.lendingpage.wallet') }}Wallet</v-col>
      <v-col cols="3" class="text-center">{{ $t('views.lendingpage.collateral') }}</v-col>
    </v-row>
    <v-row
      class="collateral-item"
      v-for="(item, index) in collateralList"
      :key="index"
      @click="switchToCollateral(item.currency)"
    >
      <v-col cols="4" class="assets">
        <img :src="item.currency.style.icon" />
        <span>{{ item.currency.name }}</span>
      </v-col>
      <v-col cols="5" class="balance">
        <span>{{ item.currency.balance }} {{ item.currency.name }}</span>
      </v-col>
      <v-col cols="3" class="collateral">
        <div class="collateral-status" :class="item.activated ? 'activated' : ''"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Collateral } from '@/types/lending'
import { Currency } from '@/types/currency'

@Component({})
export default class CollateralTokenMobile extends Vue {
  @Prop({ default: [] }) readonly collateralList!: Collateral[]

  switchToCollateral(currency: Currency) {
    this.$emit('switchToCollateral', currency)
  }

  onActivate(data: boolean) {
    this.$emit('onActivate', data)
  }
}
</script>

<style lang="scss" scoped>
.collateral-content-mobile {
  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
.collateral-item {
  align-items: center;
  background: #323646;
  border-radius: 6px;
  padding: 0.35rem 0;
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

  .collateral {
    text-align: -webkit-center;
  }
}

.collateral-item:hover {
  background: #42475c;
  transition: 0.3s;
}
.collateral-status {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 6px solid #212637;
  background-color: #afb1b7;
}

@media (max-width: 768px) {
  .collateral-label {
    font-size: small;
  }

  .collateral-item {
    font-size: small;
  }
}
</style>

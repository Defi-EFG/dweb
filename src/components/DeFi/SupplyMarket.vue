<template>
  <v-card class="mx-auto market-token" color="#222738" dark>
    <v-toolbar class="market-token-head" flat dense>
      <v-toolbar-title>
        <span>{{ $t('views.lendingpage.borrow') }}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="market-content">
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
          <img :src="item.currency.style.icon" />
          <span>{{ item.currency.name }}</span>
        </v-col>
        <v-col cols="4" class="apy">
          <span>{{ item.apy }}%</span>
        </v-col>
        <v-col cols="4" class="balance">
          <span>{{ Number(item.currency.balance) | numberWithCommas({ fixed: [0, 8] }) }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Borrow } from '@/types/lending'
import { Currency } from '@/types/currency'

@Component({})
export default class SupplyMarket extends Vue {
  @Prop({ default: [] }) readonly borrowList!: Borrow[]

  switchBorrow(currency: Currency) {
    this.$emit('switchToBorrow', currency)
  }
}
</script>

<style lang="scss" scoped>
.market-token-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 16px;
  }
}

.market-token {
  height: 100%;
}

.market-label {
  padding: 0 5px;
}

.market-item {
  padding: 0 5px;
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

.supply-item:nth-last-child(1) {
  margin-bottom: 0;
}
</style>

<style lang="scss">
.market-content {
  height: 229px;
  overflow: auto;
  .row {
    margin-left: 0;
    margin-right: 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff41;
    border-radius: 6px;
  }
}
</style>

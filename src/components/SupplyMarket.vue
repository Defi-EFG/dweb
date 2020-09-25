<template>
  <v-card class="mx-auto market-token" color="#222738" dark>
    <v-toolbar class="market-token-head" flat dense>
      <v-toolbar-title>
        <span>Supply Market</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="market-content">
      <v-row class="market-label">
        <v-col class="text-center">Assets</v-col>
        <v-col cols="2" class="text-center">APY</v-col>
        <v-col cols="4" class="text-right">Wallet</v-col>
        <v-col class="text-center">Borrow</v-col>
      </v-row>
      <v-row class="market-item" v-for="(item, index) in supplyList" :key="index">
        <v-col class="assets">
          <img src="@/assets/efg_logo.svg" />
          <span>{{ item.token }}</span>
        </v-col>
        <v-col cols="2" class="apy">
          <span>{{ item.apy }}%</span>
        </v-col>
        <v-col cols="4" class="balance">
          <span>{{ item.value.toFixed(2) }} {{ item.token }}</span>
        </v-col>
        <v-col class="borrow">
          <span>Borrow</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class SupplyMarket extends Vue {
  supplyList = [
    {
      token: 'EFG',
      apy: 2.9,
      value: 20000
    },
    {
      token: 'ECOC',
      apy: 3.5,
      value: 1000
    }
  ]
}
</script>

<style lang="scss" scoped>
.market-token-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 18px;
  }
}

.market-item {
  align-items: center;
  background: #323646;
  border-radius: 6px;
  color: white;
  justify-content: space-between;
  margin-bottom: 0.5rem;

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

.supply-item:nth-last-child(1) {
  margin-bottom: 0;
}
</style>

<style lang="scss">
.market-content {
  .row {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>

<template>
  <v-card class="mx-auto collateral-token" color="#222738" dark>
    <v-toolbar class="collateral-token-head" flat dense>
      <v-toolbar-title>
        <span>Collateral</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="collateral-content">
      <v-row class="collateral-label">
        <v-col cols="4">Assets</v-col>
        <v-col cols="5" class="text-right">Wallet</v-col>
        <v-col cols="3" class="text-center">Collateral</v-col>
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
          <!-- <div class="collateral-status" :class="item.activated ? 'activated' : ''"></div> -->
          <v-switch
            color="#060606"
            :hide-details="true"
            :input-value="item.activated"
            inset
            @change="onActivate"
          ></v-switch>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Collateral } from '@/types/lending'
import { Currency } from '@/types/currency'

@Component({})
export default class CollateralToken extends Vue {
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
.collateral-token-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 16px;
  }
}

.collateral-token {
  height: 100%;
}

.collateral-item {
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

  .collateral {
    text-align: -webkit-center;
  }
}

.collateral-item:hover {
  background: #42475c;
  transition: 0.3s;
}

.supply-item:nth-last-child(1) {
  margin-bottom: 0;
}

.collateral-status {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 6px solid #212637;
  background-color: #afb1b7;
}

.activated {
  background-color: #c074f9 !important;
}
</style>

<style lang="scss">
.collateral-content {
  height: 230px;
  overflow: auto;
  .row {
    margin-left: 0;
    margin-right: 0;
  }

  .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
  }

  .v-input__slot {
    margin-left: 6px;
    justify-content: center;
  }

  .v-input--switch__track {
    color: #060606 !important;
  }

  .v-input--is-label-active {
    color: #060606 !important;
    .v-input--switch__thumb {
      background: transparent linear-gradient(180deg, #c074f9 0%, #734597 100%) 0% 0% no-repeat
        padding-box;
    }
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

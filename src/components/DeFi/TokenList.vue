<template>
  <div class="token-container">
    <div
      :class="`card-grad-border ${currency.name}-bg`"
      v-for="(currency, index) in currencies"
      :key="index"
    >
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-card
            class="token-card"
            v-bind="attrs"
            v-on="on"
            :class="{ selected: index === activeItem }"
            @click="selectCurrency(index)"
          >
            <img :class="`token-mark ${currency.name}`" :src="currency.style.mark" />
            <v-card-text class="token-text">
              <v-row>
                <v-col cols="12">
                  <div class="token-symbol">
                    <img :src="currency.style.icon" />
                    {{ currency.name }}
                  </div>
                </v-col>
                <v-col cols="12" class="mt-auto">
                  <div class="token-balance text-right">
                    <div class="label">Total Balance</div>
                    <div class="value">{{ currency.balance }} {{ currency.name }}</div>
                    <div class="estimated">
                      ≈ {{ getEstimatedValue(currency.balance, currency.price) }} USD
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
        <span>{{ getInfo(currency.tokenInfo) }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Ecrc20 } from '@/types/currency'
import WalletModule from '@/store/wallet'
import { getEstimatedValue } from '@/services/utils'

@Component({
  components: {}
})
export default class TokenList extends Vue {
  walletStore = getModule(WalletModule)
  // active on first item
  activeItem = 0

  getEstimatedValue = getEstimatedValue

  get currencies() {
    return this.walletStore.currencies
  }

  selectCurrency(index: number) {
    this.activeItem = index
    this.walletStore.selectCurrency(index).then(() => {
      //
    })
  }

  getInfo(tokenInfo: Ecrc20 | undefined) {
    if (tokenInfo) {
      return `Contract Address: ${tokenInfo.address}`
    } else return 'Native Currency'
  }
}
</script>

<style lang="scss" scoped>
.token-container {
  background-color: #363c50;
  color: white;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  overflow: auto;
  min-height: 226px;
  width: inherit;
  max-width: 1040px;

  &::-webkit-scrollbar-track {
    margin: 8px;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    height: 8px;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff41;
    height: 8px;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #ffffffbb;
  }
}

.token-card {
  background: linear-gradient(233deg, #686470, #262a3b, #202639, #313546);
  background-size: 400%;
  box-shadow: 0px 3px 6px #00000029;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 310px;
  cursor: pointer;

  .token-text {
    color: white;
    height: 100%;

    .row {
      height: 100%;
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
  }

  .token-symbol {
    display: flex;
    align-items: center;
    font-size: medium;
    margin-bottom: auto;

    img {
      width: 38px;
      margin-right: 0.5rem;
    }
  }

  .token-balance {
    color: white;
    margin-top: auto;
    position: relative;

    .label {
      margin-bottom: 0.7rem;
    }

    .value {
      font-size: x-large;
      margin-bottom: 0.5rem;
    }

    .estimated {
      opacity: 0.8;
    }
  }
}

.token-card:hover {
  background-position: 90% 100%;

  -webkit-transition: background 0.4s ease-out;
  -moz-transition: background 0.4s ease-out;
  -o-transition: background 0.4s ease-out;
  transition: background 0.4s ease-out;
}

.selected {
  background: linear-gradient(233deg, #686470 0%, #262a3b 100%) !important;
}

.card-grad-border {
  height: fit-content;
  background: transparent linear-gradient(183deg, #646464 0%, #474747 100%) 0% 0% no-repeat
    padding-box;
  padding-left: 10px;
  border-radius: 6px;
  margin-right: 5px;
  display: flex;
  height: inherit;

  &.ECOC-bg {
    background: linear-gradient(180deg, #5b1eaa 0%, #754097 100%) !important;
  }

  &.EFG-bg {
    background: linear-gradient(180deg, #9400dc 0%, #743f96 100%) !important;
  }

  &.GPT-bg {
    background: linear-gradient(3deg, #8a40d7 0%, #6800fe 100%) !important;
  }

  &.USDT-bg {
    background: linear-gradient(180deg, #53ae94 0%, #00bf66 100%) !important;
  }

  &.ETH-bg {
    background: linear-gradient(180deg, #bebebe 0%, #5a5a5a 100%) !important;
  }
}

.token-mark {
  position: absolute;
  bottom: 0.7rem;
  left: 1rem;

  &.ECOC {
    position: absolute;
    bottom: 1rem;
    left: 0;
  }

  &.EFG {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &.BCST,
  &.GPT {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }

  &.USDT {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }

  &.ETH {
    position: absolute;
    bottom: 1rem;
    left: 2rem;
  }
}
</style>

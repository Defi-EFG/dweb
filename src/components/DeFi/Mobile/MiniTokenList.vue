<template>
  <div class="token-dropdown">
    <v-select
      :menu-props="{ 'content-class': 'blurry-bg' }"
      :items="currencies"
      flat
      v-model="currentToken"
      :hide-details="true"
      solo
    >
      <template v-slot:item="data">
        <div class="token-item-select">
          <template v-if="isSymbolAvailable(data.item.name)">
            <img class="icon" alt="" :src="require(`@/assets/icon/vector/${data.item.name}.svg`)" />
          </template>
          <v-icon class="icon" v-else>mdi-help</v-icon>
          <span class="name">{{ data.item.name }}</span>
          <v-spacer></v-spacer>
          <span class="value">{{ data.item.balance }} {{ data.item.name }}</span>
        </div>
      </template>

      <template v-slot:selection="data">
        <div :class="`token-item ${data.item.name}`">
          <template v-if="isSymbolAvailable(data.item.name)">
            <img alt="" class="icon" :src="require(`@/assets/icon/vector/${data.item.name}.svg`)" />
          </template>
          <v-icon class="icon" v-else>mdi-help</v-icon>
          <span class="name">{{ data.item.name }}</span>
          <v-spacer></v-spacer>
          <div class="balance">
            <div>{{ data.item.balance }} {{ data.item.name }}</div>
            <small>≈{{ getEstimatedValue(data.item.balance, data.item.price) }} USD</small>
          </div>
        </div>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import { Currency } from '@/types/currency'
import * as constants from '@/constants'
import { getEstimatedValue } from '@/services/utils'

@Component({})
export default class MiniTokenList extends Vue {
  walletStore = getModule(WalletModule)

  getEstimatedValue = getEstimatedValue

  get currentToken() {
    return this.walletStore.selectedCurrency
  }

  set currentToken(val: any) {
    const currenyIndex = this.currencies.indexOf(val)
    this.walletStore.selectCurrency(currenyIndex)
  }

  get isLoggedIn() {
    return this.walletStore.isWalletUnlocked
  }

  get currencies() {
    return this.walletStore.currencies
  }

  get exampleCurrency() {
    const currency: Currency[] = [
      {
        name: 'ECOC',
        type: '',
        balance: '300',
        style: constants.KNOWN_CURRENCY['ECOC'],
        price: 1
      },
      {
        name: 'EFG',
        type: '',
        balance: '2.1234223',
        style: constants.KNOWN_CURRENCY['EFG'],
        price: 1
      },
      {
        name: 'GPT',
        type: '',
        balance: '1.329478',
        style: constants.KNOWN_CURRENCY['GPT'],
        price: 1
      },
      {
        name: 'USDT',
        type: '',
        balance: '4000',
        style: constants.KNOWN_CURRENCY['USDT'],
        price: 1
      },
      {
        name: 'ETH',
        type: '',
        balance: '23.622',
        style: constants.KNOWN_CURRENCY['ETH'],
        price: 1
      },
      {
        name: 'DEFAULT',
        type: '',
        balance: '2231.3',
        style: constants.KNOWN_CURRENCY['DEFAULT'],
        price: 1
      }
    ]

    return currency
  }

  isSymbolAvailable(name: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const img = require(`@/assets/icon/vector/${name}.svg`)
      return !!img
    } catch (e) {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-select-list::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.2) !important;
  background: inherit !important;
}

.v-select-list {
  background: inherit !important;
}

.token-item-select,
.token-item {
  display: flex;
  width: -webkit-fill-available;
}

.token-item {
  background: linear-gradient(268deg, #5b1eaa 0%, #754097 100%) !important;
  padding: 0.85rem 1.6rem;
  margin-right: -29px;
  border-radius: 6px;

  &.ECOC {
    background: linear-gradient(268deg, #5b1eaa 0%, #754097 100%) !important;
  }

  &.EFG {
    background: linear-gradient(268deg, #9400dc 0%, #743f96 100%) !important;
  }

  &.GPT {
    background: linear-gradient(268deg, #8a40d7 0%, #6800fe 100%) !important;
  }

  &.USDT {
    background: linear-gradient(268deg, #53ae94 0%, #00bf66 100%) !important;
  }

  &.ETH {
    background: linear-gradient(268deg, #bebebe 0%, #5a5a5a 100%) !important;
  }
}

.icon {
  width: 23px;
  margin-right: 0.5rem;

  color: white !important;
}

.name {
  margin: auto;
  color: white;
  text-transform: capitalize;
}

.balance {
  margin-right: 30px;
  text-align: right;
  color: white;
}

.value {
  color: white;
}
</style>

<style lang="scss">
.blurry-bg {
  -webkit-backdrop-filter: blur(12px); /* Safari 9+ */
  backdrop-filter: blur(12px);
  padding: 0 1rem;

  .v-list {
    .primary--text {
      color: transparent !important;
      caret-color: transparent !important;
    }
  }

  .v-list-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.125);
  }

  .v-list-item:nth-last-child(1) {
    border-bottom: 0;
  }

  .v-list-item:hover {
    background: rgba(159, 159, 159, 0.434);
    transition: 0.3s;
  }
}

.token-dropdown {
  width: -webkit-fill-available;

  .v-input__slot::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.2) !important;
  }

  .v-input__slot {
    padding: 0px !important;
    border-radius: 9px !important;
    // background: inherit !important;
  }

  .v-input__append-inner {
    .v-input__icon {
      .v-icon {
        color: white !important;
        margin-right: 20px;
      }
    }
  }
}
</style>

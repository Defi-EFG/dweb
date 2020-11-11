<template>
  <div class="wallet-page">
    <v-row class="content-wrapper">
      <v-col xl="8" lg="8" md="12" sm="12" cols="12" class="content-1">
        <MiniTokenList v-if="isMobileDevice"></MiniTokenList>
        <token-list v-else></token-list>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" cols="12" class="content-2">
        <ReceiveSendMobile v-if="isMobileDevice"></ReceiveSendMobile>
        <v-card dark class="tx-container" v-if="isLargeMobileDevice">
          <v-toolbar :class="`receive-send-wrapper token-${selectedCurrencyName}`" dense flat>
            <v-toolbar-title class="token-symbol">
              <img
                v-if="selectedCurrencyName && isSymbolAvailable(selectedCurrencyName)"
                :src="
                  require(`@/assets/icon/vector/${selectedCurrencyName}.svg` ||
                    `@/assets/icon/vector/default.svg`)
                "
              />
              <v-icon class="icon" v-else>mdi-help</v-icon>
              <span>{{ selectedCurrencyName }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="content-wrapper wallet-tx-menu">
            <v-col class="inner-content pr-1" cols="6">
              <receive-token></receive-token>
            </v-col>
            <v-col class="inner-content pl-1" cols="6">
              <send-token></send-token>
            </v-col>
          </v-row>
        </v-card>
        <contact-address v-if="!isMobileDevice && !isLargeMobileDevice"></contact-address>
      </v-col>
    </v-row>
    <v-row class="content-wrapper">
      <v-col xl="8" lg="8" md="12" sm="12" xs="12" cols="12" class="content-3">
        <contact-address v-if="isLargeMobileDevice || isMobileDevice"></contact-address>
        <v-card dark class="tx-container" v-else>
          <v-toolbar :class="`receive-send-wrapper token-${selectedCurrencyName}`" dense flat>
            <v-toolbar-title class="token-symbol">
              <img
                v-if="selectedCurrencyName && isSymbolAvailable(selectedCurrencyName)"
                :src="
                  require(`@/assets/icon/vector/${selectedCurrencyName}.svg` ||
                    `@/assets/icon/vector/default.svg`)
                "
              />
              <v-icon class="icon" v-else>mdi-help</v-icon>
              <span>{{ selectedCurrencyName }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="content-wrapper">
            <v-col class="inner-content pr-1" cols="6">
              <receive-token></receive-token>
            </v-col>
            <v-col class="inner-content pl-1" cols="6">
              <send-token></send-token>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" xs="12" cols="12" class="content-4">
        <transaction-history :page="'wallet'"></transaction-history>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import TokenList from '@/components/DeFi/TokenList.vue'
import ContactAddress from '@/components/DeFi/ContactAddress.vue'
import ReceiveToken from '@/components/DeFi/ReceiveToken.vue'
import SendToken from '@/components/DeFi/SendToken.vue'
import TransactionHistory from '@/components/DeFi/TransactionHistory.vue'
import MenuDropdown from '@/components/DeFi/MenuDropdown.vue'
import MiniTokenList from '@/components/DeFi/Mobile/MiniTokenList.vue'
import ReceiveSendMobile from '@/components/DeFi/Mobile/ReceiveSendMobile.vue'

@Component({
  components: {
    TokenList,
    ContactAddress,
    ReceiveToken,
    SendToken,
    TransactionHistory,
    MenuDropdown,
    MiniTokenList,
    ReceiveSendMobile
  }
})
export default class Wallet extends Vue {
  walletStore = getModule(WalletModule)

  get selectedIndex() {
    return this.walletStore.selectedCurrencyIndex
  }

  get selectedCurrencyName() {
    return this.selectedCurrency?.name || ''
  }

  get selectedCurrency() {
    return this.walletStore.selectedCurrency
  }

  get isLargeMobileDevice() {
    return window.innerWidth < 1264 && window.innerWidth > 600
  }

  get isMobileDevice() {
    return window.innerWidth < 600
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
.receive-send-wrapper {
  width: inherit;
  background: transparent linear-gradient(268deg, #646464 0%, #474747 100%) 0% 0% no-repeat
    padding-box;
}

.token-symbol {
  display: flex;
  align-items: center;
  font-size: medium;

  img {
    width: 24px;
    margin-right: 0.8rem;
  }
}

.token- {
  &ECOC {
    background: linear-gradient(268deg, #5b1eaa 0%, #754097 100%) !important;
  }

  &EFG {
    background: linear-gradient(268deg, #9400dc 0%, #743f96 100%) !important;
  }

  &GPT {
    background: linear-gradient(268deg, #8a40d7 0%, #6800fe 100%) !important;
  }

  &USDT {
    background: linear-gradient(268deg, #53ae94 0%, #00bf66 100%) !important;
  }

  &ETH {
    background: linear-gradient(268deg, #bebebe 0%, #5a5a5a 100%) !important;
  }

  &EWUSDT {
    background: linear-gradient(268deg, #53ae94 0%, #00bf66 100%) !important;
  }

  &EWETH {
    background: linear-gradient(268deg, #bebebe 0%, #5a5a5a 100%) !important;
  }
}
</style>

<style lang="scss">
.content-wrapper {
  margin-left: 0 !important;
  margin-right: 0 !important;

  .content {
    padding-top: 0;
    padding-left: 0;
    display: flex;
  }

  .content-4,
  .content-3,
  .content-2,
  .content-1 {
    padding-top: 0;
    padding-left: 0;
    display: flex;
  }

  .content-2 {
    padding-right: 0;
  }

  .content-3 {
    padding-bottom: 0;
  }

  .content-4 {
    padding-right: 0;
    padding-bottom: 0;
  }

  .inner-content {
    display: flex;
  }

  @media (max-width: 768px) {
    .content-1 {
      flex-wrap: wrap;
    }
  }
}

.tx-container {
  display: flex;
  flex-wrap: wrap;
  width: inherit;
  background: #222738 !important;

  .row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
}

.wallet-tx-menu {
  width: inherit;
}

@media (max-width: 1264px) {
  .content-wrapper {
    .content-1 {
      padding-right: 0;
    }

    .content-3 {
      padding-right: 0;
      padding-bottom: 12px;
    }
  }
}
</style>

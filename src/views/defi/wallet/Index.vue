<template>
  <div class="wallet-page">
    <v-row>
      <v-col cols="8" class="pt-0 pb-0">
        <token-list></token-list>
      </v-col>
      <v-col cols="4" class="pt-0 pb-0">
        <contact-address></contact-address>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card dark color="#222738">
          <v-toolbar :class="`receive-send-wrapper token-${selectedCurrencyName}`" dense flat>
            <v-toolbar-title class="token-symbol">
              <img :src="require(`@/assets/icon/vector/${selectedCurrencyName}.svg`)" />
              <span>{{ selectedCurrencyName }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="pl-2 pr-2">
            <v-col cols="6">
              <receive-token></receive-token>
            </v-col>
            <v-col cols="6">
              <send-token></send-token>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
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

@Component({
  components: {
    TokenList,
    ContactAddress,
    ReceiveToken,
    SendToken,
    TransactionHistory
  }
})
export default class Wallet extends Vue {
  walletStore = getModule(WalletModule)

  get selectedIndex() {
    return this.walletStore.selectedCurrencyIndex
  }

  get selectedCurrencyName() {
    return 'ETH'
    // return this.selectedCurrency?.name || ''
  }

  get selectedCurrency() {
    return this.walletStore.selectedCurrency
  }
}
</script>

<style lang="scss" scoped>
.receive-send-wrapper {
  background: transparent linear-gradient(268deg, #6212c9 0%, #9023bf 100%) 0% 0% no-repeat
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

  &DELAY {
    background: linear-gradient(268deg, #8a40d7 0%, #6800fe 100%) !important;
  }

  &USDT {
    background: linear-gradient(268deg, #53ae94 0%, #00bf66 100%) !important;
  }

  &ETH {
    background: linear-gradient(268deg, #bebebe 0%, #5a5a5a 100%) !important;
  }
}
</style>

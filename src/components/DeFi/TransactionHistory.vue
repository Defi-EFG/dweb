<template>
  <v-card class="mx-auto tx-history" dark color="#222738">
    <v-toolbar class="tx-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">mdi-clock</v-icon>
        <span>Transaction History</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text :class="page">
      <v-list color="#222738" class="tx-list">
        <v-list-item
          v-for="(tx, index) in transactionsHistory"
          :key="index"
          class="tx-item"
          @click="displayHistory(tx)"
        >
          <v-icon class="tx-icon">
            {{
              isReceived(tx.type) ? 'mdi-arrow-down-circle-outline' : 'mdi-arrow-up-circle-outline'
            }}
          </v-icon>

          <v-list-item-content>
            <v-list-item-title class="tx-type">
              {{ tx.type }} {{ tx.subtype ? `(${truncate(tx.subtype)})` : '' }}
              <v-spacer></v-spacer>
              {{ tx.value }} {{ tx.currency }}
            </v-list-item-title>
            <div class="tx-addr">
              <small> TxID: {{ truncate(tx.id, 20) }} </small>
              <v-spacer></v-spacer>
              <small>{{ getTime(tx.time) }}</small>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <TransactionDetailModal :showDialog.sync="showTxModal" :tx="sentTx"></TransactionDetailModal>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import { TxHistory } from '@/types/transaction'
import * as constants from '@/constants'
import TransactionDetailModal from '@/components/modals/TransactionDetailModal.vue'

@Component({
  components: {
    TransactionDetailModal
  }
})
export default class TransactionHistory extends Vue {
  @Prop() page!: string

  walletStore = getModule(WalletModule)
  defiAddr = '0x91A31A1C5197DD101e91B0747B02560f41E2f532'
  showTxModal = false
  sentTx: TxHistory = {} as TxHistory

  get address() {
    return this.walletStore.address
  }

  get transactionsHistory() {
    return this.walletStore.transactionsHistory
  }

  isReceived(type: string) {
    return type === constants.TYPE_RECEIVED
  }

  getTime(timestamp: number) {
    if (timestamp) {
      return `${moment(timestamp * 1000)
        .startOf('minute')
        .fromNow()} (${moment(timestamp * 1000).format('YYYY-MM-DD HH:mm')})`
    }
  }

  displayHistory(tx: TxHistory) {
    this.showTxModal = !this.showTxModal
    this.sentTx = tx
  }

  truncate(msg: string, charsToShow = 20) {
    if (msg.length <= charsToShow) return msg

    const separator = '...'
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)

    return msg.substr(0, frontChars) + separator + msg.substr(msg.length - backChars)
  }
}
</script>

<style lang="scss" scoped>
.tx-history {
  width: inherit;
}

.tx-history-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 16px;
  }

  .head-icon {
    font-size: 20px;
    margin-right: 8px;
  }
}

.tx-item {
  background: #363a4a7e;
  margin-bottom: 8px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
}

.tx-item:hover {
  background: #4d536a7e;
  transition: 0.3s;
}

.tx-type {
  color: white;
  display: flex;
  text-transform: capitalize;
}

.tx-addr {
  color: white;
  display: flex;
  opacity: 0.6;
}

.tx-icon {
  margin-right: 12px;
}

.staking {
  height: 217px;
  overflow: auto;

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

.wallet {
  max-height: 471px;
  overflow: auto;

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

@media (max-width: 425px) {
  .tx-icon {
    display: none;
  }
  .tx-type {
    font-size: small;
  }
}
</style>

<style lang="scss">
.tx-history {
  .v-card__text {
    padding: 0 !important;
  }
}
</style>

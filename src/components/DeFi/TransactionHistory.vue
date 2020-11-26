<template>
  <v-card class="mx-auto tx-history" dark color="#222738">
    <v-toolbar class="tx-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">mdi-clock</v-icon>
        <span>{{ $t('views.walletpage.transaction_history') }}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text :class="page" v-if="transactionsHistory.length > 0">
      <v-list color="#222738" class="tx-list">
        <v-list-item
          v-for="(tx, index) in transactionsHistory"
          :key="index"
          class="tx-item"
          @click="displayHistory(tx.id)"
        >
          <v-icon class="tx-icon">
            {{
              isReceived(tx.type) ? 'mdi-arrow-down-circle-outline' : 'mdi-arrow-up-circle-outline'
            }}
          </v-icon>

          <v-list-item-content>
            <v-list-item-title class="tx-type">
              {{ $t(tx.type) }} {{ tx.subtype ? `(${truncate(tx.subtype)})` : '' }}
              <v-spacer></v-spacer>
              {{ tx.value }} {{ tx.currency }}
            </v-list-item-title>
            <div class="tx-addr">
              <small> TxID: {{ truncate(tx.id, 15) }} </small>
              <v-spacer></v-spacer>
              <small>{{ getTime(tx.time) }}</small>
            </div>
          </v-list-item-content>
        </v-list-item>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </v-list>
    </v-card-text>
    <div class="empty-message" v-else>
      <div class="inner">
        <v-icon large>mdi-history</v-icon>
        <div class="message">{{ $t('views.walletpage.no_transaction_history') }}</div>
      </div>
    </div>
    <TransactionDetailModal
      :showDialog.sync="showTxModal"
      :txid="showTxId"
    ></TransactionDetailModal>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import * as constants from '@/constants'
import InfiniteLoading from 'vue-infinite-loading'
import TransactionDetailModal from '@/components/modals/TransactionDetailModal.vue'

@Component({
  components: {
    TransactionDetailModal,
    InfiniteLoading
  }
})
export default class TransactionHistory extends Vue {
  @Prop() page!: string

  walletStore = getModule(WalletModule)
  showTxModal = false
  showTxId = ''
  // start from 1 after first 10 tx
  pageNum = 1

  get isLoggedIn() {
    return this.walletStore.isWalletUnlocked
  }

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
        .fromNow()}`
    }
  }

  displayHistory(txid: string) {
    this.showTxModal = !this.showTxModal
    this.showTxId = txid
  }

  truncate(msg: string, charsToShow = 20) {
    if (msg.length <= charsToShow) return msg

    const separator = '...'
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)

    return msg.substr(0, frontChars) + separator + msg.substr(msg.length - backChars)
  }

  async infiniteHandler($state: any) {
    if (this.pageNum < this.walletStore.txList.pagesTotal) {
      setTimeout(async () => {
        await this.walletStore.updateTxHistoryByPage(this.pageNum)
        await this.walletStore.updateTransactionsHistory() // [To Do] refactor
        $state.loaded()
        this.pageNum++
      }, 1000)
    } else {
      $state.complete()
    }
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
  height: 494px;
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
  max-height: 533px;
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

.empty-message {
  display: flex;
  opacity: 0.4;
  text-align: center;
  height: 100%;

  .inner {
    margin: auto;
  }

  .message {
    font-size: medium;
  }
}

@media (max-width: 1264px) {
  .empty-message {
    margin: 2rem 0;
    height: auto;
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

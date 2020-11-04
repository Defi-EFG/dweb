<template>
  <div class="tx-noti">
    <v-btn class="noti-btn" icon>
      <v-badge color="#FFB300" :content="pendingTxNumber" :value="pendingTxNumber" overlap>
        <v-img
          class="noti-sign"
          src="@/assets/time-left.svg"
          @click="displayNotiList = !displayNotiList"
        ></v-img>
      </v-badge>
    </v-btn>
    <transition name="fade" mode="out-in">
      <div v-if="displayNotiList" class="noti-list-wrapper">
        <template v-if="txPendingList.length > 0">
          <v-row v-for="(tx, index) in txPendingList" :key="index" class="tx-items">
            <v-col cols="2" class="tx-load">
              <v-progress-circular
                v-if="tx.status === txConstants.STATUS_PENDING"
                class="ma-auto"
                :size="40"
                indeterminate
                color="white"
              ></v-progress-circular>
              <v-icon v-else class="completed">
                mdi-check-circle-outline
              </v-icon>
            </v-col>
            <v-col cols="7" class="tx-status">
              <div class="status">
                {{
                  tx.status === txConstants.STATUS_CONFIRMED
                    ? 'Transaction completed!'
                    : 'Transaction pending...'
                }}
              </div>
              <div class="id">
                TxID: {{ truncateAddress(tx.txid) }}
                <v-icon class="copy" @click="copyAddress(tx.txid)">mdi-content-copy</v-icon>
              </div>
            </v-col>
            <v-col cols="3" class="tx-details">
              <div class="type">{{ tx.type }}</div>
              <div
                v-if="tx.status === txConstants.STATUS_CONFIRMED"
                class="details"
                @click="showTxHistory(tx.txid)"
              >
                Details
              </div>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <div class="empty">No transaction pending</div>
        </template>
      </div>
    </transition>
    <TransactionDetailModal :showDialog.sync="showTxModal" :txid="txId"></TransactionDetailModal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { copyToClipboard } from '@/services/utils'
import { getModule } from 'vuex-module-decorators'
import TransactionDetailModal from '@/components/modals/TransactionDetailModal.vue'
import WalletModule from '@/store/wallet'
import * as constants from '@/constants'

@Component({
  components: {
    TransactionDetailModal
  }
})
export default class TxNotifications extends Vue {
  displayNotiList = false
  walletStore = getModule(WalletModule)
  showTxModal = false
  txId = ''

  get txPendingList() {
    const onPending = [...this.walletStore.pendingTransactions]
    return onPending.reverse()
  }

  get txConstants() {
    return constants
  }

  get pendingTxNumber() {
    const onPendingTx = this.txPendingList.filter(
      tx => tx.status === this.txConstants.STATUS_PENDING
    )
    return onPendingTx.length
  }

  copyAddress(addr: string) {
    copyToClipboard(addr)
  }

  showTxHistory(txId: string) {
    this.txId = txId
    this.showTxModal = !this.showTxModal
  }

  truncateAddress(addr: string) {
    const separator = '...'
    const frontChars = 10
    const backChars = 4
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }
}
</script>

<style lang="scss" scoped>
.noti-sign {
  // transform: scale(0.8);
  cursor: pointer;
}

.tx-items {
  padding-top: 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.173);
}

.tx-items:nth-child(1) {
  padding-top: 0;
}

.tx-items:nth-last-child(1) {
  border-bottom: 0;
}

.tx-load {
  display: flex;

  .completed {
    color: #89ee67;
    font-size: 40px;
  }
}

.tx-status {
  text-align: left;

  .id {
    color: rgb(142, 142, 142);

    .copy {
      font-size: medium;
      margin-left: 4px;
    }
  }
}

.tx-details {
  position: relative;
  z-index: 3;
  .type {
    text-transform: capitalize;
    color: #c074f9;
  }

  .details {
    cursor: pointer;
    text-decoration: underline;
  }
}

.empty {
  padding: 0.5rem 3rem;
}
</style>

<style lang="scss">
.tx-noti {
  padding-right: 1rem;
  .v-badge__badge {
    font-weight: 700;
  }
}

.noti-list-wrapper::before {
  content: '' !important;
  border-radius: 6px;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  box-shadow: inset 0 0 2000px rgba(169, 169, 169, 0.2) !important;
  background: inherit !important;
}

.noti-list-wrapper {
  border-radius: 6px;
  padding: 1rem;
  right: 20px;
  position: absolute;
  z-index: 1;
  margin-top: 1.5rem;
  -webkit-backdrop-filter: blur(20px); /* Safari 9+ */
  backdrop-filter: blur(20px);

  .row {
    margin-right: 0;
    margin-left: 0;
  }
}

@media (max-width: 765px) {
  .noti-list-wrapper {
    right: 0;
  }
}

@media (max-width: 490px) {
  .tx-load {
    flex: 0 0 25% !important;
    max-width: 25% !important;
    justify-content: center;
  }

  .tx-status {
    flex: 0 0 75% !important;
    max-width: 75% !important;
    font-size: smaller;
  }

  .tx-details {
    display: flex;
    max-width: 100% !important;
    flex: 0 0 100% !important;
    justify-content: space-around;
    padding-top: 0;
    font-size: smaller;
  }
}
</style>

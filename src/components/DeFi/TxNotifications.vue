<template>
  <div class="tx-noti">
    <v-badge color="#FFB300" :content="getPendingTx(txList)" :value="getPendingTx(txList)" overlap>
      <v-img
        class="noti-sign"
        src="@/assets/exchange.svg"
        @click="displayNotiList = !displayNotiList"
      ></v-img>
    </v-badge>
    <div v-if="displayNotiList" class="noti-list-wrapper">
      <v-row v-for="(tx, index) in txList" :key="index" class="tx-items">
        <v-col cols="auto" class="tx-load">
          <v-progress-circular
            v-if="tx.status === 'pending'"
            class="ma-auto"
            :size="40"
            indeterminate
            color="white"
          ></v-progress-circular>
          <v-icon v-else class="completed">
            mdi-check-circle-outline
          </v-icon>
        </v-col>
        <v-col cols="auto" class="tx-status">
          <div class="status">
            {{ tx.status === 'pending' ? 'Transaction pending...' : 'Transaction completed!' }}
          </div>
          <div class="id">
            TxID: {{ truncateAddress(tx.txid) }}
            <v-icon class="copy" @click="copyAddress(tx.txid)">mdi-content-copy</v-icon>
          </div>
        </v-col>
        <v-col cols="auto" class="tx-details">
          <div class="type">{{ tx.type }}</div>
          <div class="details" @click="showTxHistory">Details</div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { PendingTransaction } from '@/types/transaction'
import { copyToClipboard } from '@/services/utils'

@Component({})
export default class TxNotifications extends Vue {
  displayNotiList = false

  txList = [
    {
      txid: 'a5239e0eb34e1c0bb7d51d79cc6410f4ce43ec813313b4b692af383fe63ef6d2',
      type: 'Collateral',
      status: 'pending'
    } as PendingTransaction,
    {
      txid: '9aa6b2225c979cea2ae4064b6aa3bd3922d21595aaa8d919188e8e615aaa14c6',
      type: 'Collateral',
      status: 'completed'
    } as PendingTransaction
  ]

  getPendingTx(txs: PendingTransaction[]) {
    const onPendingTx = txs.filter(tx => tx.status === 'pending')
    return onPendingTx.length
  }

  copyAddress(addr: string) {
    copyToClipboard(addr)
  }

  showTxHistory() {
    console.log('tx history!')
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
</style>

<style lang="scss">
.tx-noti {
  padding-top: 0.4rem;
  padding-right: 2rem;
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
  .tx-details,
  .tx-status {
    font-size: smaller;
  }

  .tx-load {
    .completed {
      font-size: 25px !important;
    }

    .v-progress-circular {
      width: 25px !important;
      height: 25px !important;
    }
  }
}
</style>
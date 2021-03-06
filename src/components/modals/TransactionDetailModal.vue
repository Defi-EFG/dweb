<template>
  <v-dialog v-model="visible" max-width="415">
    <v-card color="#8C2BCC">
      <v-card-title class="td-head">
        <span>{{ $t('views.modal.transaction_details') }}</span>
        <v-spacer></v-spacer>
        <v-btn icon dark @click.native="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="td-body">
        <div class="tx-type">
          <span>{{ $t(tx.type) }}</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="tx-btn"
                fab
                dark
                x-small
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="goToExplorer(tx.id)"
              >
                <v-icon dark> arrow_upward </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('views.modal.view_on_explorer') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="tx-btn"
                fab
                dark
                x-small
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="doCopy(tx.id)"
              >
                <v-icon dark> content_copy </v-icon>
              </v-btn>
            </template>
            <span>{{ copyMsg }}</span>
          </v-tooltip>
        </div>
        <v-divider></v-divider>

        <div v-if="tx.type === constants.EVENT_APPROVAL" class="txdetailwrapper">
          <div class="d-flex">
            <small class="detail-label">{{ $t('views.modal.owner') }}</small>
            <v-spacer></v-spacer>
            <small class="text-end mb-0">{{ getAddress(tx.txResult[0].log[0].owner) }}</small>
          </div>
          <div class="d-flex">
            <small class="detail-label">{{ $t('views.modal.spender') }}</small>
            <v-spacer></v-spacer>
            <small class="text-end mb-0">{{ getAddress(tx.txResult[0].log[0].spender) }}</small>
          </div>
        </div>

        <div v-else-if="tx.type === constants.EVENT_TRANSFER" class="txdetailwrapper">
          <div>
            <b>{{ $t('views.modal.from') }}</b>
            <p class="text-end mb-0">{{ getAddress(tx.txResult[0].from) }}</p>
            <div>
              <b>{{ $t('views.modal.to') }}</b>
              <p class="text-end mb-0">{{ getAddress(tx.txResult[0].to) }}</p>
            </div>
          </div>
        </div>

        <div class="tx-detail">
          <div class="date">
            <span>{{ $t('views.modal.date') }}</span>
            <v-spacer></v-spacer>
            <span class="val">{{ getTime(tx.time) }}</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="currency">
            <span>{{ $t('views.modal.currency') }}</span>
            <v-spacer></v-spacer>
            <span class="val">{{ tx.currency }}</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="type">
            <span>{{ $t('views.modal.type') }}</span>
            <v-spacer></v-spacer>
            <span class="val">{{ tx.subtype ? $t(tx.subtype) : $t(tx.type) }}</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="amount">
            <span>{{ $t('views.modal.amount') }}</span>
            <v-spacer></v-spacer>
            <span class="val">{{ tx.value }}</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="confirm">
            <span>{{ $t('views.modal.confirmations') }}</span>
            <v-spacer></v-spacer>
            <span class="val">{{ tx.confirmations }}</span>
          </div>
          <template v-if="tx.status">
            <v-divider class="space"></v-divider>
            <div class="status">
              <span>{{ $t('views.modal.status') }}</span>
              <v-spacer></v-spacer>
              <span class="val">{{ $t(tx.status) }}</span>
            </div>
          </template>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'
import { copyToClipboard } from '@/services/utils'
import { Transaction, TxHistory } from '@/types/transaction'
import WalletModule from '@/store/wallet'
import moment from 'moment'
import { getModule } from 'vuex-module-decorators'
import * as constants from '@/constants'
import * as utils from '@/services/utils'

@Component({})
export default class TransactionDetailModal extends Vue {
  @PropSync('showDialog', { type: Boolean }) visible!: boolean
  @Prop({ default: '' }) txid!: string

  walletStore = getModule(WalletModule)
  copyMsg = this.$t('views.modal.copy_txid')

  txInfo = {} as Transaction

  get tx() {
    if (this.txid) {
      const txInfo = this.walletStore.transactionsHistory.find(tx => tx.id === this.txid)
      return txInfo
    }
    return {} as TxHistory
  }

  get address() {
    return this.walletStore.address || ''
  }

  get constants() {
    return constants
  }

  close() {
    this.$emit('update:showDialog', false)
  }

  doCopy(val: string) {
    copyToClipboard(val)
    this.copyMsg = this.$t('views.modal.copied')

    setTimeout(() => {
      this.copyMsg = this.$t('views.modal.copy_txid')
    }, 1000)
  }

  getTime(timestamp: number) {
    return moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
  }

  getTxInfo() {
    this.walletStore.getTxInfo(this.txid).then(tx => {
      this.txInfo = tx
    })
  }

  getAddress(addressHex: string) {
    const address = utils.addressFilter(addressHex)
    if (address === addressHex) {
      return utils.toEcocAddress(addressHex)
    }

    return address
  }

  goToExplorer(txid: string) {
    const explorerUrl = utils.getExplorerUrl(this.walletStore.network)
    window.open(`${explorerUrl}/tx/${txid}`)
  }

  mounted() {
    //this.getTxInfo()
  }
}
</script>

<style lang="scss" scoped>
.td-head {
  background: #5e0e92;
  color: white;
  span {
    font-size: medium;
  }
}

.td-body {
  background: white;
}

.tx-type {
  align-items: baseline;
  padding-top: 1.35rem;
  display: flex;
  padding-bottom: 0.5rem;

  span {
    font-size: 18px;
    font-weight: 800;
    color: black;
  }
}

.tx-direction {
  padding-top: 4px;
  color: black;
  justify-content: space-between;
  .to,
  .from {
    display: flex;
  }
}

.tx-btn {
  transform: scale(0.8);
}

.tx-detail {
  padding-top: 1.75rem;
  padding-bottom: 1rem;

  .val {
    color: black;
  }
  .confirm,
  .date,
  .currency,
  .type,
  .amount,
  .status {
    padding: 0 8px;
    display: flex;
  }

  .space {
    margin-top: 6px;
    margin-bottom: 6px;
  }
}
.txdetailwrapper {
  padding: 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
}

.detail-label {
  color: black;
  font-weight: 700;
}
</style>

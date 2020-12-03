<template>
  <v-tabs show-arrows grow background-color="#2F3446" dark class="tr-tabs">
    <v-tab>Transaction History</v-tab>
    <v-tab>Reward History</v-tab>

    <v-tab-item class="tr-tabs-item">
      <v-list color="#222738" class="tx-list">
        <v-list-item
          v-for="(tx, index) in transactionsHistory"
          :key="index"
          class="tx-item"
          @click="displayHistory(tx.id)"
        >
          <v-icon dark class="tx-icon">
            {{ isReceived(tx.type) ? 'arrow_circle_down' : 'arrow_circle_up' }}
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
    </v-tab-item>

    <v-tab-item class="tr-tabs-item">
      <div class="history-items" v-for="(item, index) in rewardList" :key="index">
        <v-row>
          <v-col class="ma-auto token-col">
            <div class="token">
              <img src="@/assets/gpt.svg" alt="" />
              <span>{{ rewardCurrencyName }}</span>
            </div>
          </v-col>
          <!-- <v-col cols="auto" class="time-col">
            <div class="time">
              <div class="remain">{{ getTimeReward(item.timestamp).remain }}</div>
              <small class="timestamp">{{ getTimeReward(item.timestamp).date }}</small>
            </div>
          </v-col> -->
          <v-col class="ma-auto value-col">
            <div class="value">{{ item.amount }} {{ rewardCurrencyName }}</div>
          </v-col>
        </v-row>
      </div>
    </v-tab-item>
    <TransactionDetailModal
      :showDialog.sync="showTxModal"
      :txid="showTxId"
    ></TransactionDetailModal>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import { RewardHistory as Rewardlist } from '@/types/staking'
import * as constants from '@/constants'
import TransactionDetailModal from '@/components/modals/TransactionDetailModal.vue'

@Component({
  components: {
    TransactionDetailModal
  }
})
export default class TransactionRewardHistory extends Vue {
  @Prop({ default: [] }) readonly rewardList!: Rewardlist
  @Prop({ default: '###' }) readonly rewardCurrencyName!: string

  walletStore = getModule(WalletModule)
  showTxModal = false
  showTxId = ''

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
}
</script>

<style lang="scss" scoped>
.tr-tabs {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.tr-tabs-item {
  background: #222738;
  color: white;
  padding: 0.5rem 0.2rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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

.history-items {
  margin: 6px 12px 12px;
  padding: 3px;
  background: #363a4a7e;
  border-radius: 5px;
  // justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 0.5rem;

  .row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .token {
    display: flex;
    align-items: center;
    img {
      width: 28px;
      margin-right: 0.5rem;
    }

    span {
      text-transform: uppercase;
    }
  }

  .time {
    text-align: center;

    .remain {
      margin-bottom: -6px;
    }
  }

  .timestamp {
    opacity: 0.5;
  }

  .value {
    text-align: right;
  }
}

.history-items:nth-last-child(1) {
  margin-bottom: 0;
}

@media (max-width: 425px) {
  .tx-icon {
    display: none;
  }
  .tx-type {
    font-size: small;
  }

  .token {
    font-size: small;
    img {
      width: 24px !important;
    }
  }

  .time-col {
    display: none;
  }

  .value-col {
    text-align: right;
    font-size: small;

    .value {
      margin-bottom: -6px;
    }
  }
}
</style>

<style lang="scss">
.tr-tabs {
  .v-tabs-items {
    background: #222738;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .v-tabs-slider {
    background-color: #c074f9;
  }
}
</style>

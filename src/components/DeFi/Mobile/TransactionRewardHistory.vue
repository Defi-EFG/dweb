<template>
  <v-tabs show-arrows grow background-color="#2F3446" dark class="tr-tabs">
    <v-tab>Transaction History</v-tab>
    <v-tab>Reward History</v-tab>

    <v-tab-item class="tr-tabs-item">
      <v-list color="#222738" class="tx-list">
        <v-list-item
          v-for="(tx, index) in exampleHistory"
          :key="index"
          class="tx-item"
          @click="displayHistory(tx)"
        >
          <v-icon dark class="tx-icon">
            {{
              isReceived(tx.type) ? 'mdi-arrow-down-circle-outline' : 'mdi-arrow-up-circle-outline'
            }}
          </v-icon>

          <v-list-item-content>
            <v-list-item-title class="tx-type">
              {{ tx.type }} {{ tx.subtype ? `(${tx.subtype})` : '' }}
              <v-spacer></v-spacer>
              {{ tx.value }} {{ tx.currency }}
            </v-list-item-title>
            <div class="tx-addr">
              <small>
                {{ isReceived(tx.type) ? 'From' : 'To' }}:
                {{ tx.address === defiAddr ? 'Lending (DeFi)' : truncateAddress(tx.address) }}
              </small>
              <v-spacer></v-spacer>
              <small>{{ tx.time }}</small>
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
              <img src="@/assets/gpt.svg" />
              <span>{{ rewardCurrencyName }}</span>
            </div>
          </v-col>
          <v-col cols="auto" class="time-col">
            <div class="time">
              <div class="remain">{{ getTime(item.timestamp).remain }}</div>
              <small class="timestamp">{{ getTime(item.timestamp).timestamp }}</small>
            </div>
          </v-col>
          <v-col class="ma-auto value-col">
            <div class="value">{{ item.amount }} {{ rewardCurrencyName }}</div>
            <small class="timestamp">{{ getTime(item.timestamp).timestamp }}</small>
          </v-col>
        </v-row>
      </div>
    </v-tab-item>
    <TransactionDetailModal :showDialog.sync="showTxModal" :tx="sentTx"></TransactionDetailModal>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import { TxValueIn, TxValueOut, TxHistory } from '@/types/transaction'
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
  defiAddr = '0x91A31A1C5197DD101e91B0747B02560f41E2f532'
  showTxModal = false
  sentTx: TxHistory = {} as TxHistory

  get address() {
    return this.walletStore.address
  }

  get exampleHistory() {
    return [
      {
        id: '0xd05c5d8e0d553213411593bb171fb238a2504e442c3824b3a79c25551197492f',
        type: 'Received',
        subtype: 'withdraw',
        address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
        value: 10,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 1,
        status: 'Completed'
      } as TxHistory,
      {
        id: '0xd05c5d8e0d553213411593bb171fb238a2504e442c3824b3a79c25551197492f',
        type: 'Sent',
        subtype: 'repay',
        address: '0x91A31A1C5197DD101e91B0747B02560f41E2f532',
        value: 891.14,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 0,
        status: 'Pending'
      } as TxHistory,
      {
        type: 'Received',
        subtype: 'borrow',
        address: '0x91A31A1C5197DD101e91B0747B02560f41E2f532',
        value: 100,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 0,
        status: 'Rejected'
      } as TxHistory,
      {
        id: '0xd05c5d8e0d553213411593bb171fb238a2504e442c3824b3a79c25551197492f',
        type: 'Sent',
        subtype: 'deposit',
        address: '0x91A31A1C5197DD101e91B0747B02560f41E2f532',
        value: 50,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 1,
        status: 'Completed'
      } as TxHistory,
      {
        id: '0xd05c5d8e0d553213411593bb171fb238a2504e442c3824b3a79c25551197492f',
        type: 'Sent',
        subtype: '',
        address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
        value: 50,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 1,
        status: 'Completed'
      } as TxHistory,
      {
        id: '0xd05c5d8e0d553213411593bb171fb238a2504e442c3824b3a79c25551197492f',
        type: 'Received',
        subtype: '',
        address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
        value: 100,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 0,
        status: 'Pending'
      } as TxHistory,
      {
        id: '0xd05c5d8e0d553213411593bb171fb238a2504e442c3824b3a79c25551197492f',
        type: 'Sent',
        subtype: 'borrow',
        address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
        value: 100,
        currency: 'ECOC',
        time: new Date().getTime(),
        confirmations: 0,
        status: 'Pending'
      } as TxHistory
    ]
  }

  get transactionsHistory() {
    const txs = this.walletStore.txList.txs

    if (!txs) {
      return []
    }

    return txs.map(txs => {
      const currency = txs.isEcrc20Transfer ? 'ECRC-20' : 'ECOC'
      const value = this.getBalanceChanged(txs.vin, txs.vout)
      const type = new BigNumber(value).lt(0) ? constants.TYPE_SENT : constants.TYPE_RECEIVED

      return {
        type: type,
        subtype: '',
        address: '',
        value: value,
        currency: currency,
        time: this.getTime(txs.time)
      }
    })
  }

  isReceived(type: string) {
    return type === constants.TYPE_RECEIVED
  }

  getBalanceChanged(vin: TxValueIn[], vout: TxValueOut[]) {
    let balanceIn
    let balanceOut

    try {
      balanceIn = vin.reduce((sum, vtx) => {
        if (vtx.addr === this.address) return sum.plus(vtx.value as number)
        return sum.plus(0)
      }, new BigNumber(0))

      balanceOut = vout.reduce((sum, vtx) => {
        if (vtx.scriptPubKey.addresses && vtx.scriptPubKey.addresses[0] === this.address) {
          return sum.plus(vtx.value)
        }

        return sum.plus(0)
      }, new BigNumber(0))
    } catch (error) {
      return '0'
    }

    return balanceOut.minus(balanceIn)
  }

  getTime(timestamp: number) {
    if (timestamp) {
      const timeMsg = moment(timestamp * 1000)
        .startOf('minute')
        .fromNow()

      return {
        remain: timeMsg,
        timestamp: moment(timestamp * 1000).format('YYYY-MM-DD HH:mm')
      }
    }

    return { remain: '', timestamp }
  }

  displayHistory(tx: TxHistory) {
    this.showTxModal = !this.showTxModal
    this.sentTx = tx
  }

  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 8
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)

    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
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

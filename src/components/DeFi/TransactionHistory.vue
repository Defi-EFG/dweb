<template>
  <v-card class="mx-auto tx-history" dark color="#222738">
    <v-toolbar class="tx-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-clock</v-icon>
        <span>Transaction History</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text :class="page">
      <v-list color="#222738" class="tx-list">
        <v-list-item
          v-for="(tx, index) in transactionsHistory"
          :key="index"
          class="tx-item"
          @click="displayHistory"
        >
          <v-icon class="mr-3">
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
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import { TxValueIn, TxValueOut } from '@/types/transaction'
import * as constants from '@/constants'

@Component({})
export default class TransactionHistory extends Vue {
  @Prop() page!: string

  walletStore = getModule(WalletModule)
  defiAddr = '0x91A31A1C5197DD101e91B0747B02560f41E2f532'

  get address() {
    return this.walletStore.address
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
      return `${moment(timestamp * 1000)
        .startOf('minute')
        .fromNow()} (${moment(timestamp * 1000).format('YYYY-MM-DD HH:mm')})`
    }
  }

  displayHistory() {
    console.log('clicked')
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
.tx-history {
  width: inherit;
}

.tx-history-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 18px;
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

.staking {
  height: 240px;
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
</style>

<style lang="scss">
.tx-history {
  .v-card__text {
    padding: 0 !important;
  }
}
</style>

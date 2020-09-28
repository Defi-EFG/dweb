<template>
  <v-card class="mx-auto" :class="page" dark>
    <v-toolbar class="tx-history-head" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-clock</v-icon>
        <span>Transaction History</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-list color="#222738" class="tx-list">
      <v-list-item v-for="(tx, index) in items" :key="index" class="tx-item">
        <v-icon class="mr-3">{{
          tx.type === 'received' ? 'mdi-arrow-down-circle-outline' : 'mdi-arrow-up-circle-outline'
        }}</v-icon>

        <v-list-item-content>
          <v-list-item-title class="tx-type">
            {{ tx.type }} {{ tx.subtype ? `(${tx.subtype})` : '' }}
            <v-spacer></v-spacer>
            {{ tx.value }} {{ tx.token }}
          </v-list-item-title>
          <div class="tx-addr">
            <small
              >{{ tx.type === 'received' ? 'From' : 'To' }}:
              {{ tx.address === defiAddr ? 'Lending (DeFi)' : truncateAddress(tx.address) }}</small
            >
            <v-spacer></v-spacer>
            <small>{{ tx.time }}</small>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class TransactionHistory extends Vue {
  @Prop() page!: string

  // mock address
  defiAddr = '0x91A31A1C5197DD101e91B0747B02560f41E2f532'

  items = [
    {
      type: 'received',
      subtype: 'withdraw',
      address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
      value: 10,
      token: 'ECOC',
      time: '25 Aug'
    },
    {
      type: 'sent',
      subtype: 'repay',
      address: '0x91A31A1C5197DD101e91B0747B02560f41E2f532',
      value: 891.14,
      token: 'ECOC',
      time: '25 Aug'
    },
    {
      type: 'received',
      subtype: 'borrow',
      address: '0x91A31A1C5197DD101e91B0747B02560f41E2f532',
      value: 100,
      token: 'ECOC',
      time: '25 Aug'
    },
    {
      type: 'sent',
      subtype: 'deposit',
      address: '0x91A31A1C5197DD101e91B0747B02560f41E2f532',
      value: 50,
      token: 'ECOC',
      time: '25 Aug'
    },
    {
      type: 'sent',
      subtype: '',
      address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
      value: 50,
      token: 'ECOC',
      time: '25 Aug'
    },
    {
      type: 'received',
      subtype: '',
      address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
      value: 100,
      token: 'ECOC',
      time: '25 Aug'
    },
    {
      type: 'sent',
      subtype: 'borrow',
      address: '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E',
      value: 100,
      token: 'ECOC',
      time: '25 Aug'
    }
  ]

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
}

.wallet {
  height: auto;
}
</style>

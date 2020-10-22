<template>
  <v-dialog v-model="visible" max-width="415">
    <v-card color="#8C2BCC">
      <v-card-title class="td-head">
        <span>Transaction Details</span>
        <v-spacer></v-spacer>
        <v-btn icon dark @click.native="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="td-body">
        <div class="tx-type">
          <span>Received (Withdraw)</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="tx-btn" fab dark x-small color="primary" v-bind="attrs" v-on="on">
                <v-icon dark>
                  mdi-arrow-up
                </v-icon>
              </v-btn>
            </template>
            <span>View on explorer</span>
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
                @click="doCopy"
              >
                <v-icon dark>
                  mdi-content-copy
                </v-icon>
              </v-btn>
            </template>
            <span>{{ copyMsg }}</span>
          </v-tooltip>
        </div>
        <v-divider></v-divider>
        <div class="tx-direction">
          <small>From: Lending (DeFi)</small>
          <v-icon small>mdi-arrow-right</v-icon>
          <small>To: 0x76D684b9D7C925A5...</small>
        </div>

        <div class="tx-detail">
          <div class="date">
            <span>Date</span>
            <v-spacer></v-spacer>
            <span class="val">2020-09-17 02:56:41</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="currency">
            <span>Currency</span>
            <v-spacer></v-spacer>
            <span class="val">ECOC</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="type">
            <span>Type</span>
            <v-spacer></v-spacer>
            <span class="val">Receive</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="amount">
            <span>Amount</span>
            <v-spacer></v-spacer>
            <span class="val">22050.050</span>
          </div>
          <v-divider class="space"></v-divider>
          <div class="status">
            <span>Status</span>
            <v-spacer></v-spacer>
            <span class="val">Completed</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component({})
export default class TransactionDetailModal extends Vue {
  @PropSync('showDialog', { type: Boolean }) visible!: boolean

  txId = 'asdsghpsjosjr;sjgioewflksnklgskfjslkfjklas'

  copyMsg = 'Copy TxID'

  close() {
    this.$emit('update:showDialog', false)
  }

  doCopy() {
    navigator.clipboard.writeText('<empty clipboard>').then(
      function() {
        console.log('copied success')
      },
      function() {
        /* clipboard write failed */
      }
    )
  }

  get show() {
    return this.visible
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
  display: flex;
  justify-content: space-between;
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
</style>
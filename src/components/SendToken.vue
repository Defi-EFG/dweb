<template>
  <v-card class="mx-auto send-token" dark color="#1D212E">
    <v-toolbar class="send-head" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-arrow-up-circle-outline</v-icon>
        <span>Send</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="text-center send-area">
      <div class="token-balance">
        <span>ECOC Total Balance</span>
        <v-spacer></v-spacer>
        <span>2,000.00 ECOC</span>
      </div>
      <v-text-field
        label="To Address"
        class="to-address-field"
        single-line
        solo
        hide-details="true"
      >
        <template v-slot:append-outer>
          <div class="address-book">
            <v-icon>mdi-book-variant</v-icon>
          </div>
        </template>
      </v-text-field>
      <div class="withdraw-rate">
        <span>Minimum Withdrawal: {{ withdrawRate }} EFG</span>
        <v-spacer></v-spacer>
        <span class="fb-btn">Full Balance</span>
      </div>
      <v-text-field
        class="withdraw-amount"
        placeholder="0"
        prefix="Amount"
        suffix="EFG"
        single-line
        solo
        hide-details="true"
      ></v-text-field>

      <div class="withdraw-fee">
        <span>Withdrawal fee:</span>
        <v-spacer></v-spacer>
        <span class="fee-value">0.00 EFG</span>
      </div>

      <div class="total-withdraw">
        <span>Total Withdraw:</span>
        <v-spacer></v-spacer>
        <span class="fee-value">0.00 EFG</span>
      </div>

      <v-btn depressed block large class="send-btn">Send</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class SendToken extends Vue {
  withdrawRate = 0.001
}
</script>

<style lang="scss" scoped>
.send-head {
  background: transparent linear-gradient(270deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 18px;
  }
}

.address-book {
  background: #474d5d;
  padding: 12px;
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 0;
  cursor: pointer;
}

.address-book:hover {
  background: #5e657b;
  transition: 0.3s;
}

.to-address-field {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #363a4a;
  margin: 0;
  border: 0;
}

.token-balance {
  padding: 1rem 8px;
  display: flex;
  color: white;
}

.withdraw-rate {
  display: flex;
  padding: 10px 8px;
  font-size: small;

  .fb-btn {
    text-decoration: underline;
    color: white;
    cursor: pointer;
  }
}

.withdraw-amount {
  text-align: right;
}

.withdraw-fee {
  display: flex;
  padding: 1.5rem 8px 8px 8px;
  color: white;

  .fee-value {
    opacity: 0.7;
  }
}

.total-withdraw {
  padding: 1rem;
  display: flex;
  background: #ffffff08;
  color: white;
  border-radius: 5px;
}

.send-btn {
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  background-color: #363a4a !important;
  color: #c074f9;
  font-weight: bold;
}
</style>

<style lang="scss">
.send-area {
  .v-input__slot {
    background: #363a4a !important;
    box-shadow: none !important;
  }
  .v-input__append-outer {
    margin: 0 !important;
  }
}

.withdraw-amount {
  .v-text-field__prefix {
    opacity: 0.6;
  }

  input {
    text-align: right;
  }
}
</style>
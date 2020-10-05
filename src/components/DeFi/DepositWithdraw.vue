<template>
  <v-card dark class="tab-container">
    <v-tabs grow background-color="#191c26" class="dw-tabs" :hide-slider="true" show-arrows>
      <v-tab>Deposit</v-tab>
      <v-tab>Withdraw</v-tab>

      <v-tab-item>
        <v-card dark color="#2e3344" class="deposit">
          <v-card-text class="wrapper">
            <div class="label pl-3">
              <img src="@/assets/delay.svg" />
              <span>DELAY - Flexible Staking</span>
            </div>
            <small class="pl-3">Deposit EFG, Earn Delay</small>

            <div class="total-balance">
              <span>TOTAL BALANCE</span>
              <v-spacer></v-spacer>
              <span>{{ totalBalance.toFixed(2) }} EFG</span>
            </div>

            <div class="minimum-d">
              <span class="value">Minimum Deposit: 1.00 EFG</span>
              <v-spacer></v-spacer>
              <span class="all" @click="fillAmountDeposit(totalBalance)">Deposit All</span>
            </div>

            <v-text-field
              class="deposit-amount"
              placeholder="0"
              prefix="Deposit Amount"
              v-model="depositAmount"
              suffix="EFG"
              single-line
              solo
              hide-details="true"
            ></v-text-field>

            <div class="note">
              <span>Note: Reward earning will start after the deposit completed.</span>
            </div>

            <v-btn large block class="btn-d">Deposit</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card dark color="#2e3344" class="withdraw">
          <v-card-text class="wrapper">
            <div class="label pl-3">
              <span>Withdraw</span>
            </div>
            <span class="pl-3">Please input the amount that you want to withdraw</span>

            <div class="d-amount">
              <span>Deposited amount</span>
              <v-spacer></v-spacer>
              <span>{{ depositedAmount.toFixed(2) }} EFG</span>
            </div>

            <div class="minimum-w">
              <span class="value">Minimum Deposit: 1.00 EFG</span>
              <v-spacer></v-spacer>
              <span class="all" @click="fillAmountWithdraw(depositedAmount)">Withdraw All</span>
            </div>

            <v-text-field
              class="withdrawal-amount"
              placeholder="0"
              prefix="Withdrawal Amount"
              v-model="withdrawAmount"
              suffix="EFG"
              single-line
              solo
              hide-details="true"
            ></v-text-field>

            <v-btn large block class="btn-w">Withdraw</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class DepositWithdraw extends Vue {
  totalBalance = 1000
  depositedAmount = 500
  depositAmount: string | number = ''
  withdrawAmount: string | number = ''

  fillAmountDeposit(amount: number) {
    this.depositAmount = amount
  }

  fillAmountWithdraw(amount: number) {
    this.withdrawAmount = amount
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  width: inherit;
  text-align: left;
}

.withdraw,
.deposit {
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  .wrapper {
    padding: 1.2rem;
    padding-top: 2rem;
  }

  .label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: white;
    font-weight: bold;
    img {
      width: 24px;
      margin-right: 0.5rem;
    }
  }

  .d-amount,
  .total-balance {
    margin-top: 1.4rem;
    display: flex;
    padding: 10px;
    border: 1px solid #ffffff15;
    text-transform: uppercase;
    font-weight: 800;
    color: white;
    border-radius: 5px;
  }

  .minimum-w,
  .minimum-d {
    display: flex;
    padding: 13px 10px;
    .value {
      opacity: 0.7;
    }

    .all {
      text-decoration: underline;
      cursor: pointer;
      color: white;
    }
  }

  .withdrawal-amount,
  .deposit-amount {
    text-align: right;
  }

  .note {
    padding: 10px;
    opacity: 0.7;
  }

  .btn-w,
  .btn-d {
    margin-top: 3rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    background: transparent linear-gradient(90deg, #8b41d6 0%, #6800fe 100%) 0% 0% no-repeat
      padding-box;
  }

  .btn-w {
    margin-top: 5.9rem;
  }
}
</style>

<style lang="scss">
.dw-tabs {
  .v-tabs-items {
    background-color: transparent !important;
  }

  .v-tab--active {
    background: #2e3344 !important;
  }
}

.withdrawal-amount,
.deposit-amount {
  .v-input__slot {
    padding: 0 1.3rem !important;
    background: #23262f !important;
    box-shadow: none !important;
  }
  .v-text-field__prefix {
    opacity: 0.6;
  }

  .v-text-field__suffix {
    padding-left: 8px;
  }

  input {
    text-align: right;
  }
}
</style>
<template>
  <v-card dark color="#1D212E" class="collateral-card">
    <v-card-text class="wrapper">
      <p class="action-label">Collateral</p>
      <div class="wallet-balance mb-2">
        <span class="text-left">Wallet Balance:</span>
        <v-spacer></v-spacer>
        <span class="balance" @click="fillAmount(walletBalance)"
          >{{ walletBalance.toFixed(2) }} {{ currencyName }}</span
        >
      </div>
      <v-text-field
        class="amount-input"
        label="Collateral Amount"
        :suffix="currencyName"
        height="43"
        color="#C074F9"
        v-model="collateralAmount"
        type="number"
        :hint="tokenConversion"
        persistent-hint
      ></v-text-field>
      <div class="borrow-power">
        <span class="label">Borrow Power</span>
        <v-progress-linear
          :value="calculateBPUsed(collateralAmount)"
          rounded
          color="#C074F9"
          background-color="#E4E4E4"
          class="borrow-bar"
          height="5"
        ></v-progress-linear>
      </div>
      <div class="borrow-used">
        <div class="text-left">Borrow Power Used</div>
        <v-spacer></v-spacer>
        <div class="text-right">
          <span>{{ bpUsed.toFixed(1) }}%</span>
          &rarr;
          <span class="after-calculated">{{ calculateBPUsed(collateralAmount).toFixed(1) }}%</span>
        </div>
      </div>
      <div class="borrow-total mt-1 mb-3">
        <div class="text-left">Total Borrow Power</div>
        <v-spacer></v-spacer>
        <div class="text-right">
          <span>$800.00</span>
          &rarr;
          <span class="after-calculated">${{ calculateTotalBP(collateralAmount).toFixed(2) }}</span>
        </div>
      </div>
      <v-divider />
      <v-btn
        large
        block
        depressed
        :disabled="!isCollateralable(collateralAmount, 'error')"
        :class="isCollateralable(collateralAmount, 'error') ? 'submit-btn' : 'submit-btn disabled'"
        >{{ isCollateralable(collateralAmount, 'btn') ? 'Deposit' : 'Not available' }}</v-btn
      >
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Currency, CurrencyRate } from '@/types/currency'

@Component({})
export default class Collateral extends Vue {
  @Prop() currency!: Currency

  // mock data
  // Token -> per Dollars
  currencyRate: CurrencyRate = {
    ECOC: 1,
    USDT: 1,
    ETH: 10
  }

  collateralAmount: number | string = 0

  get walletBalance() {
    return Number(this.currency.balance)
  }

  get currencyName() {
    return this.currency.name
  }

  get supplyBalance() {
    return 1000
  }

  get borrowBalance() {
    return 200
  }

  get borrowPowerPercentage() {
    return 0.8
  }

  get bpUsed() {
    return (this.borrowBalance / (this.supplyBalance * this.borrowPowerPercentage)) * 100
  }

  get tokenConversion() {
    return `${this.collateralAmount} ${this.currencyName} ≈ $${this.currencyRate[
      this.currencyName
    ] * Number(this.collateralAmount)}`
  }

  fillAmount(amount: number) {
    this.collateralAmount = amount
  }

  // BP = Borrow Power
  calculateTotalBP(colAmount: number) {
    const dollarsAmount = Number(colAmount) * this.currencyRate[this.currencyName]
    return (this.supplyBalance + dollarsAmount) * this.borrowPowerPercentage
  }

  calculateBPUsed(colAmount: number) {
    const dollarsAmount = Number(colAmount) * this.currencyRate[this.currencyName]
    return (
      (this.borrowBalance / ((this.supplyBalance + dollarsAmount) * this.borrowPowerPercentage)) *
      100
    )
  }

  isCollateralable(amount: number, type: string) {
    const isEnough = amount <= this.walletBalance
    const isValidAmount = amount >= 0
    const isClickable = amount > 0

    if (type === 'error') {
      return isEnough && isClickable
    }
    return isEnough && isValidAmount
  }
}
</script>

<style lang="scss" scoped>
.collateral-card {
  width: 100%;
}

.wrapper {
  padding: 2rem;
  text-align: left;
}

.action-label {
  font-size: large;
  color: #c074f9;
  font-weight: 700;
  margin-bottom: 2rem;
}

.wallet-balance {
  display: flex;
  color: white;

  .balance {
    text-decoration: underline;
    cursor: pointer;
    text-align: right;
  }
}

.borrow-power {
  margin-top: 1rem;

  .label {
    font-weight: 700;
    color: white;
  }
  .borrow-bar {
    margin-top: 8px;
    margin-bottom: 12px;
  }
}

.borrow-total,
.borrow-used {
  display: flex;
  color: white;

  .after-calculated {
    color: #c074f9;
  }
}

.submit-btn {
  margin-top: 4.3rem;
  margin-bottom: 1.2rem;
  border-radius: 7px;
  font-weight: bold;
  background: transparent linear-gradient(90deg, #3ba7c1 0%, #59289a 100%) 0% 0% no-repeat
    padding-box;
}

.disabled {
  background: #8f8f8f !important;
  cursor: no-drop;
}
</style>

<style lang="scss">
.amount-input {
  .v-label {
    color: white !important;
    font-weight: 700;
    margin-top: 8px;
  }

  .v-label--active {
    margin-top: 0;
  }

  input {
    text-align: right;
    font-size: 28px;
    color: #c074f9 !important;
    margin: 8px 0;
    font-weight: 300;
  }

  .v-text-field__suffix {
    opacity: 0.6;
    color: white !important;
    font-size: smaller;
    margin-left: 8px;
  }

  .v-messages {
    padding-top: 8px;
  }

  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-color: transparent !important;
    background-image: none !important;
    color: #c074f9 !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
}
</style>

<template>
  <v-card dark color="#1D212E" class="repay-card">
    <v-card-text class="wrapper">
      <p class="action-label">Repay</p>
      <div class="repay-summary">
        <div class="wallet-balance">
          <span>Wallet Balance</span>
          <v-spacer></v-spacer>
          <span class="balance" @click="fillAmount(walletBalance)"
            >{{ walletBalance.toFixed(2) }} {{ currencyName }}</span
          >
        </div>
        <div class="debt">
          <span>Debt</span>
          <v-spacer></v-spacer>
          <span class="balance">{{ debt.toFixed(2) }} {{ currencyName }}</span>
        </div>
      </div>

      <v-text-field
        class="amount-input"
        label="Repay Amount"
        v-model="repayAmount"
        :suffix="currencyName"
        type="number"
        height="43"
        color="#C074F9"
        :hint="tokenConversion"
        persistent-hint
      ></v-text-field>
      <div class="borrow-power">
        <span class="label">Borrow Power</span>
        <v-progress-linear
          :value="calculateBPUsed(repayAmount)"
          rounded
          color="#C074F9"
          background-color="#E4E4E4"
          class="borrow-bar"
          height="5"
        ></v-progress-linear>
      </div>
      <div class="borrow-used">
        <div>Borrow Power Used</div>
        <v-spacer></v-spacer>
        <div>
          <span>{{ bpUsed.toFixed(1) }}%</span>
          &rarr;
          <span class="after-calculated">{{ calculateBPUsed(repayAmount).toFixed(1) }}%</span>
        </div>
      </div>
      <div class="borrow-total mt-1 mb-3">
        <div class="text-left">Total Borrowed</div>
        <v-spacer></v-spacer>
        <div class="text-right">
          <span>${{ debt }}</span>
          &rarr;
          <span class="after-calculated">${{ calculateDebt(repayAmount).toFixed(2) }}</span>
        </div>
      </div>
      <v-divider />
      <div class="borrow-apy">
        <span class="label">Borrow APY</span>
        <v-spacer></v-spacer>
        <span>{{ interestRate }} %</span>
      </div>
      <v-btn
        large
        block
        depressed
        :disabled="!isRepayable(repayAmount, 'error')"
        :class="isRepayable(repayAmount, 'error') ? 'submit-btn' : 'submit-btn disabled'"
        >{{ isRepayable(repayAmount, 'btn') ? 'Repay' : 'Insufficient' }}</v-btn
      >
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Currency } from '@/types/currency'

@Component({})
export default class RepayCard extends Vue {
  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowPower!: number
  @Prop() interestRate!: number
  @Prop() borrowPowerPercentage!: number
  @Prop({ default: 10 }) debt!: number

  repayAmount = 0

  get walletBalance() {
    return Number(this.currency.balance)
  }

  get currencyName() {
    return this.currency.name
  }

  get currencyPrice() {
    return this.currency.price || 0
  }

  get bpUsed() {
    return (this.borrowBalance / this.borrowPower) * 100
  }

  get tokenConversion() {
    return `${this.repayAmount} ${this.currencyName} ≈ ${this.currencyPrice *
      Number(this.repayAmount)}`
  }

  fillAmount(amount: number) {
    if (amount >= this.debt) {
      this.repayAmount = this.debt
    } else {
      this.repayAmount = amount
    }
  }

  calculateDebt(repayAmount: number) {
    return this.debt - repayAmount
  }

  calculateBPUsed(repayAmount: number) {
    const dollarsAmount = Number(repayAmount) * this.currencyPrice
    return (
      (this.borrowBalance /
        ((this.collateralBalance + dollarsAmount) * this.borrowPowerPercentage)) *
      100
    )
  }

  isRepayable(amount: number, type: string) {
    const isInRange = amount <= this.walletBalance && amount <= this.debt
    const isValidAmount = amount >= 0
    const isClickable = amount > 0

    if (type === 'error') {
      return isInRange && isClickable
    }
    return isInRange && isValidAmount
  }
}
</script>

<style lang="scss" scoped>
.repay-card {
  width: inherit;
}

.wrapper {
  text-align: left;
  padding: 2rem;
}

.repay-summary {
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.action-label {
  font-size: large;
  color: #c074f9;
  font-weight: 700;
}

.borrow-apy,
.wallet-balance {
  display: flex;
  color: white;

  .balance {
    text-decoration: underline;
    cursor: pointer;
  }

  .label {
    font-weight: 700;
  }
}

.debt {
  display: flex;
  opacity: 0.5;
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

.borrow-apy {
  margin-top: 0.5rem;
}

.submit-btn {
  margin-top: 3.6rem;
  border-radius: 7px;
  font-weight: bold;
  background: transparent linear-gradient(90deg, #9c26df 0%, #661b91 100%) 0% 0% no-repeat
    padding-box;
}

.disabled {
  background: #8f8f8f !important;
  cursor: no-drop;
}
</style>

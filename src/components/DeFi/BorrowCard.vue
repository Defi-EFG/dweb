<template>
  <v-card dark color="#1D212E">
    <v-card-text class="wrapper">
      <p class="action-label">Borrow</p>
      <div class="wallet-balance mb-2">
        <span>Wallet Balance:</span>
        <v-spacer></v-spacer>
        <span class="balance">500.00 {{ token }}</span>
      </div>
      <v-text-field
        class="amount-input"
        label="Borrow Amount"
        :suffix="token"
        v-model="borrowValue"
        height="43"
        color="#C074F9"
        :hint="tokenConversion"
        persistent-hint
      ></v-text-field>
      <div class="borrow-power">
        <span class="label">Borrow Power</span>
        <v-slider
          class="borrow-slider"
          v-model="val"
          min="0"
          max="100"
          color="#c074f9"
          track-color="#E4E4E4"
          thumb-color="#ffffff"
          :hide-details="true"
          @end="limitValue(25)"
          @click="limitValue(25)"
        ></v-slider>
      </div>
      <div class="borrow-used">
        <div>Borrow Power Used</div>
        <v-spacer></v-spacer>
        <div>
          <span>25.0%</span>
          &rarr;
          <span class="after-calculated">{{ calculateBPUsed(borrowValue).toFixed(1) }}%</span>
        </div>
      </div>
      <v-divider />
      <div class="borrow-apy">
        <span class="label">Borrow APY</span>
        <v-spacer></v-spacer>
        <span>2.90 %</span>
      </div>
      <v-btn large block depressed class="submit-btn">Borrow</v-btn>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CurrencyRate } from '@/types/currency'

@Component({})
export default class BorrowCard extends Vue {
  @Prop() token!: string

  currencyRate: CurrencyRate = {
    ECOC: 1,
    USDT: 1,
    EFG: 1,
    ETH: 10
  }

  val = 25
  minVal = 25
  borrowValue = 0

  limitValue(num: number) {
    if (this.val < num) {
      this.val = num
    }
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

  get tokenConversion() {
    return `${this.borrowValue} ${this.token} ≈ $${this.currencyRate[this.token] *
      Number(this.borrowValue)}`
  }

  // BP = Borrow Power
  calculateBPUsed(borrowAmount: number) {
    const dollarsAmount = Number(borrowAmount) * this.currencyRate[this.token]
    return (
      ((this.borrowBalance + dollarsAmount) / (this.supplyBalance * this.borrowPowerPercentage)) *
      100
    )
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: left;
  padding: 2rem;
}

.action-label {
  font-size: large;
  color: #c074f9;
  font-weight: 700;
  margin-bottom: 2rem;
}

.borrow-apy,
.wallet-balance {
  display: flex;
  color: white;

  .label {
    font-weight: 700;
  }
}

.borrow-apy {
  margin-top: 0.5rem;
}

.borrow-power {
  margin-top: 1rem;
  .label {
    font-weight: 700;
    color: white;
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

.borrow-used {
  margin-top: 1rem;
  margin-bottom: 1.25rem;
}

.submit-btn {
  margin-top: 3.6rem;
  border-radius: 7px;
  font-weight: bold;
  background: transparent linear-gradient(90deg, #9c26df 0%, #661b91 100%) 0% 0% no-repeat
    padding-box;
}
</style>

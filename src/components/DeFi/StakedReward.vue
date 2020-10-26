<template>
  <v-card dark color="#2e3344" class="staked-reward">
    <v-card-text class="wrapper">
      <div class="total-reward">
        <p class="label mb-0">Your Staked Reward</p>
        <p class="value text-center">{{ stakedReward }} {{ currencyName }}</p>
      </div>

      <div class="d-amount">
        <span>Withdraw Available</span>
        <v-spacer></v-spacer>
        <span class="text-right">{{ withdrawAvailable.toFixed(2) }} {{ currencyName }}</span>
      </div>

      <v-divider></v-divider>

      <p class="reward-label mb-1">Reward Withdrawal</p>

      <div class="minimum-w">
        <span class="value">Minimum Withdrawal: 1.00 GPT</span>
        <v-spacer></v-spacer>
        <span class="all" @click="fillAmount(withdrawAvailable)">Withdraw All</span>
      </div>

      <v-text-field
        class="staked-amount"
        placeholder="0"
        prefix="Amount"
        :suffix="currencyName"
        v-model="withdrawAmount"
        single-line
        solo
        hide-details="true"
      ></v-text-field>

      <v-btn large block depressed class="reward-btn">Withdraw Reward</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CurrencyInfo } from '@/types/currency'

@Component({})
export default class StakedReward extends Vue {
  @Prop({ default: 0 }) readonly stakedReward!: number
  @Prop({ default: {} }) readonly rewardCurrency!: CurrencyInfo

  withdrawAmount: string | number = ''

  get currencyName() {
    return this.rewardCurrency.name
  }

  get withdrawAvailable() {
    return this.stakedReward
  }

  fillAmount(amount: number) {
    this.withdrawAmount = amount
  }
}
</script>

<style lang="scss" scoped>
.staked-reward {
  width: inherit;
}

.wrapper {
  padding: 1.2rem;
  padding-top: 3.11rem;
  text-align: left;
}

.d-amount {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  padding: 10px;
  border: 1px solid #ffffff15;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  border-radius: 5px;
}

.minimum-w {
  display: flex;
  padding: 13px 10px;
  .value {
    text-align: left;
    opacity: 0.7;
  }

  .all {
    text-decoration: underline;
    cursor: pointer;
    color: white;
    text-align: right;
  }
}

.staked-amount {
  text-align: right;
}

.reward-btn {
  margin-top: 1.3rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  background: #474d5d !important;
  background-color: #474d5d !important;
  font-weight: bold !important;
  color: #c074f9;
}

.total-reward {
  text-align: center;

  .label {
    text-transform: uppercase;
    color: white;
  }

  .value {
    padding-top: 1rem;
    background: transparent linear-gradient(90deg, #c074f9 0%, #deb6fe 100%) 0% 0% no-repeat
      padding-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: x-large;
    font-weight: bold;
  }
}

.reward-label {
  padding: 1.5rem 10px 0;
  font-size: larger;
  color: #c074f9;
  font-weight: 700;
}

@media (max-width: 425px) {
  .total-reward {
    .value {
      font-size: large;
      padding-top: 0.5rem;
    }
  }

  .staked-amount,
  .minimum-w,
  .d-amount {
    font-size: small;
  }

  .reward-label {
    font-size: 15px;
  }
}
</style>

<style lang="scss">
.staked-amount {
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

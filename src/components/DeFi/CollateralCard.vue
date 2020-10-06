<template>
  <v-card dark color="#1D212E">
    <v-card-text class="wrapper">
      <p class="action-label">Collateral</p>
      <div class="wallet-balance mb-2">
        <span>Wallet Balance:</span>
        <v-spacer></v-spacer>
        <span class="balance" @click="fillAmount(balance)">{{ balance.toFixed(2) }} {{ token }}</span>
      </div>
      <v-text-field
        class="amount-input"
        label="Collateral Amount"
        :suffix="token"
        height="43"
        color="#C074F9"
        v-model="collateralAmount"
      ></v-text-field>
      <div class="borrow-power">
        <span class="label">Borrow Power</span>
        <v-progress-linear
          value="25"
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
          <span>25.0%</span>
          &rarr;
          <span class="after-calculated">22.7%</span>
        </div>
      </div>
      <div class="borrow-total mt-1 mb-3">
        <div>Total Borrow Power</div>
        <v-spacer></v-spacer>
        <div>
          <span>$800.00</span>
          &rarr;
          <span class="after-calculated">$880.00</span>
        </div>
      </div>
      <v-divider />
      <v-btn large block depressed class="submit-btn">Collateral</v-btn>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Collateral extends Vue {
  token = 'ECOC'
  balance = 1000
  collateralAmount: number | string = ''

  fillAmount(amount: number) {
    this.collateralAmount = amount
  }
}
</script>

<style lang="scss" scoped>
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
  margin-top: 4.5rem;
  margin-bottom: 1.2rem;
  border-radius: 7px;
  font-weight: bold;
  background: transparent linear-gradient(90deg, #3ba7c1 0%, #59289a 100%) 0% 0% no-repeat
    padding-box;
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
}
</style>

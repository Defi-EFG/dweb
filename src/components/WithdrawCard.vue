<template>
  <v-card dark color="#1D212E">
    <v-card-text class="wrapper">
      <p class="action-label">Withdraw</p>
      <div class="wallet-balance mb-2">
        <span>Supply Balance:</span>
        <v-spacer></v-spacer>
        <span class="balance">500.00 {{ token }}</span>
      </div>
      <v-text-field
        class="amount-input"
        label="Withdrawal Amount"
        :suffix="token"
        v-model="withdrawValue"
        height="43"
        color="#C074F9"
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
      <v-btn large block depressed class="submit-btn">Withdraw</v-btn>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Withdraw extends Vue {
  token = 'ECOC'
  val = 25
  minVal = 25
  withdrawValue = 0

  limitValue(num: number) {
    if (this.val < num) {
      this.val = num
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 2rem;
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

.submit-btn {
  margin-top: 3.5rem;
  border-radius: 7px;
  font-weight: bold;
  background: transparent linear-gradient(90deg, #3ba7c1 0%, #59289a 100%) 0% 0% no-repeat
    padding-box;
}
</style>

<style lang="scss">
.borrow-power {
  .v-slider--horizontal {
    min-height: 25px;
    margin: 0;
  }

  .v-slider--horizontal .v-slider__track-container {
    height: 5px;
  }

  .v-slider__thumb-container {
    border: 10px solid #1d212e;
    border-radius: 50%;
    top: 9%;
  }

  .v-slider__thumb {
    width: 16px;
    height: 16px;
    left: -8px;
  }
}
</style>

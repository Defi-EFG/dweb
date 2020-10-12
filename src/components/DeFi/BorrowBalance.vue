<template>
  <v-card dark class="borrow-card">
    <v-card-text>
      <span class="borrow-label">Borrow Balance</span>
      <div class="borrow">${{ borrowBalance.toFixed(2) }}</div>
      <div class="borrow-power">
        <div class="label">
          <span class="power-label">Borrow Power</span>
          <span v-if="isLiquidate" class="liquid-label">Liquidation</span>
        </div>
        <v-progress-linear
          background-color="#1D212E"
          :color="isLiquidate ? '#FF5656' : '#C074F9'"
          height="7"
          class="borrow-bar"
          :rounded="true"
          :value="calculateBorrow(borrowBalance, maxBorrow)"
        ></v-progress-linear>
        <div class="borrow-cap">
          {{ calculateBorrow(borrowBalance, maxBorrow).toFixed(1) }}% ({{
            `${borrowBalance.toFixed(2)}/${maxBorrow.toFixed(2)}`
          }})
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class BorrowBalance extends Vue {
  borrowBalance = 200
  maxBorrow = 800
  isLiquidate = false

  calculateBorrow(val: number, max: number) {
    return (val / max) * 100
  }
}
</script>

<style lang="scss" scoped>
.borrow-card {
  background: #2e3344;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  width: -webkit-fill-available;
  text-align: left;
}

.borrow {
  font-size: 38px;
  color: #c074f9;
  text-align: right;
  padding: 2rem 0 1.2rem 0;
}

.borrow-label {
  font-size: 16px;
  color: white;
}

.borrow-power {
  color: white;

  .label {
    display: flex;
    justify-content: space-between;

    .liquid-label {
      color: #ff5656;
    }
  }

  .borrow-cap {
    text-align: right;
  }
}

.borrow-bar {
  margin-top: 4px;
  margin-bottom: 1px;
  box-shadow: 0px 3px 6px #00000029;
}
</style>

<style lang="scss">
.borrow-card {
  .v-card__text {
    padding: 2rem !important;
  }
}
</style>

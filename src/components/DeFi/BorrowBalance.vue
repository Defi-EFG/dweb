<template>
  <v-card dark class="borrow-card">
    <v-card-text>
      <span class="borrow-label">{{ $t('views.lendingpage.borrow_balance') }}</span>
      <div class="borrow">${{ balance | numberWithCommas({ fixed: [0, 8] }) }}</div>
      <div class="borrow-power">
        <div class="label">
          <span class="power-label">{{ $t('views.lendingpage.borrow_po') }}</span>
          <span v-if="isLiquidate" class="liquid-label">{{
            $t('views.lendingpage.liquidation')
          }}</span>
        </div>
        <v-progress-linear
          background-color="#1D212E"
          :color="isLiquidate ? '#FF5656' : '#C074F9'"
          height="7"
          class="borrow-bar"
          :rounded="true"
          :value="calculateBorrow(balance, borrowLimit)"
        ></v-progress-linear>
        <div class="borrow-cap">
          {{ calculateBorrow(balance, borrowLimit).toFixed(1) }}% ({{
            `${balance.toFixed(2)}/${borrowLimit.toFixed(2)}`
          }})
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { numberWithCommas } from '@/plugins/filters'

@Component({})
export default class BorrowBalance extends Vue {
  @Prop({ default: 0 }) readonly balance!: number
  @Prop({ default: 0 }) readonly borrowLimit!: number
  @Prop({ default: false }) readonly isLiquidate!: boolean

  mounted() {
    const balanceString = numberWithCommas(this.balance, { fixed: [0, 8] })
    this.dynamicFontsize(balanceString.length)
  }

  calculateBorrow(val: number, max: number) {
    if (max === 0) return 0
    return (val / max) * 100
  }

  dynamicFontsize(textLength: any) {
    const baseSize = 37
    if (textLength >= baseSize) {
      textLength = baseSize - 2
    }

    const fontSize = baseSize - textLength
    const boxes = document.querySelector('.borrow')
    //@ts-ignore
    boxes.style.fontSize = `${fontSize}px`
  }

  @Watch('balance')
  balanceChanged(val: any) {
    const balanceVal = numberWithCommas(val, { fixed: [0, 8] })
    this.dynamicFontsize(balanceVal.length)
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
  font-size: 36px;
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

@media (max-width: 768px) {
  .borrow {
    font-size: 29px;
    padding-top: 1rem;
  }

  .borrow-power {
    font-size: small;
  }
}
</style>

<style lang="scss">
.borrow-card {
  .v-card__text {
    padding: 2rem !important;
  }
}
</style>

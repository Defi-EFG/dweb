<template>
  <div>
    <p class="action-label" v-if="!isMobileDevice">Borrow</p>
    <div class="wallet-balance">
      <span>Wallet Balance:</span>
      <v-spacer class="space"></v-spacer>
      <span class="balance">{{ walletBalance.toFixed(2) }} {{ currencyName }}</span>
    </div>
    <v-text-field
      class="amount-input"
      label="Borrow Amount"
      type="number"
      :suffix="currencyName"
      v-model="borrowValue"
      height="43"
      dark
      color="#C074F9"
      :hint="tokenConversion"
      persistent-hint
    ></v-text-field>
    <div class="borrow-power">
      <span class="label">Borrow Power</span>
      <v-slider
        class="borrow-slider"
        v-model="bpSlider"
        min="0"
        max="100"
        color="#c074f9"
        track-color="#E4E4E4"
        thumb-color="#E4E4E4"
        :hide-details="true"
        thumb-label
        @end="limitValue"
        @click="limitSlider"
      ></v-slider>
    </div>
    <div class="borrow-used">
      <div>Borrow Power Used</div>
      <v-spacer class="space"></v-spacer>
      <div class="bp-change">
        <span>{{ bpUsed.toFixed(1) }}%</span>
        &rarr;
        <span class="after-calculated">{{ calculateBPUsed(borrowValue).toFixed(1) }}%</span>
      </div>
    </div>
    <div class="borrow-total mt-1 mb-3">
      <div class="text-left">Total Borrowed</div>
      <v-spacer class="space"></v-spacer>
      <div class="bt-change">
        <span>${{ borrowLimit }}</span>
        &rarr;
        <span class="after-calculated">${{ borrowLimit.toFixed(2) }}</span>
      </div>
    </div>
    <v-divider dark />
    <div class="borrow-apy">
      <span class="label">Borrow APY</span>
      <v-spacer></v-spacer>
      <span>{{ interestRate }} %</span>
    </div>
    <v-btn
      dark
      large
      block
      depressed
      :disabled="!isBorrowable(borrowValue, 'error')"
      :class="isBorrowable(borrowValue, 'error') ? 'submit-btn' : 'submit-btn disabled'"
      @click="onOpenModal"
      >{{ isBorrowable(borrowValue, 'btn') ? 'Borrow' : 'Not available' }}</v-btn
    >
    <TransactionComfirmationModal
      :visible="confirmTxModal"
      :toAddr="contractAddr"
      :amount="borrowValue"
      :currency="currency"
      @onConfirm="onConfirm"
      @onClose="onClose"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import LendingModule from '@/store/lending'
import { Currency } from '@/types/currency'
import { WalletParams } from '@/services/ecoc/types'
import TransactionComfirmationModal from '@/components/modals/transaction-confirmation.vue'

@Component({
  components: {
    TransactionComfirmationModal
  }
})
export default class BorrowCard extends Vue {
  lendingStore = getModule(LendingModule)

  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowLimit!: number
  @Prop() interestRate!: number
  @Prop() borrowPowerPercentage!: number

  bpSlider = 0
  borrowValue = 0

  errorMsg = ''
  confirmTxModal = false

  mounted() {
    this.bpSlider = this.bpUsed
  }

  get contractAddr() {
    return this.lendingStore.address
  }

  get isMobileDevice() {
    return window.innerWidth < 1264
  }

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
    return (this.borrowBalance / this.borrowLimit) * 100
  }

  get tokenConversion() {
    return `${this.borrowValue} ${this.currencyName} ≈ ${this.currencyPrice *
      Number(this.borrowValue)}`
  }

  // only for click event
  limitSlider() {
    if (this.bpSlider < this.bpUsed) {
      this.bpSlider = this.bpUsed
    }

    this.borrowValue = this.bpPercentToValue(this.bpSlider)
    this.borrowValue = Number(this.borrowValue.toFixed(2))
  }

  limitValue(num: number) {
    if (num < this.bpUsed) {
      this.bpSlider = this.bpUsed
    }

    this.borrowValue = this.bpPercentToValue(num)
    this.borrowValue = Number(this.borrowValue.toFixed(2))
  }

  // BP = Borrow Power
  calculateBPUsed(borrowAmount: number) {
    const dollarsAmount = Number(borrowAmount) * this.currencyPrice
    const bpPercent =
      ((this.borrowBalance + dollarsAmount) /
        (this.collateralBalance * this.borrowPowerPercentage)) *
      100
    return bpPercent
  }

  bpPercentToValue(bp: number) {
    const bpPercent =
      ((bp / 100) * (this.collateralBalance * this.borrowPowerPercentage) - this.borrowBalance) /
      this.currencyPrice
    return bpPercent
  }

  isBorrowable(amount: number, type: string) {
    const isEnough =
      amount * this.currencyPrice <=
      this.collateralBalance * this.borrowPowerPercentage - this.borrowBalance
    const isValidAmount = amount >= 0
    const isClickable = amount > 0

    if (type === 'error') {
      return isEnough && isClickable
    }
    return isEnough && isValidAmount
  }

  @Watch('borrowValue')
  borrowUpdated(val: any) {
    if (this.borrowValue < 0) {
      this.borrowValue = 0
      this.bpSlider = this.bpUsed
    }

    this.bpSlider = this.calculateBPUsed(val)
  }

  onOpenModal() {
    if (this.borrowValue) {
      this.confirmTxModal = !this.confirmTxModal
    }
  }

  closeModal() {
    this.confirmTxModal = false
  }

  onSuccess() {
    this.borrowValue = 0
    this.closeModal()
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
    console.log(errorMsg)
  }

  onClose() {
    this.closeModal()
  }

  onConfirm(walletParams: WalletParams) {
    const amount = Number(this.borrowValue)
    const poolAddress = this.lendingStore.loan.loaner

    const payload = {
      amount,
      poolAddress,
      walletParams
    }

    this.lendingStore
      .borrow(payload)
      .then(txid => {
        console.log('Txid:', txid)
        this.onSuccess()
      })
      .catch(error => {
        this.onError(error.message)
      })
  }
}
</script>

<style lang="scss" scoped>
.borrow-card {
  width: inherit;
}

.wrapper {
  text-align: left;
  padding: 2rem;
}

.action-label {
  font-size: large;
  color: #c074f9;
  font-weight: 700;
  margin-bottom: 1rem;
}

.borrow-apy,
.wallet-balance {
  display: flex;
  color: white;

  .balance {
    text-align: right;
  }

  .label {
    font-weight: 700;
  }
}

.wallet-balance {
  margin-bottom: 1.87rem;
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

  .bp-change {
    text-align: right;
  }

  .bt-change {
    text-align: right;
  }

  .after-calculated {
    color: #c074f9;
  }
}

// .borrow-used {
//   margin-top: 1rem;
//   margin-bottom: 1.25rem;
// }

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

@media (max-width: 768px) {
  .wallet-balance,
  .borrow-power,
  .borrow-used,
  .borrow-total,
  .borrow-apy {
    font-size: small;
  }
}

@media (max-width: 425px) {
  .wallet-balance {
    flex-wrap: wrap;

    .balance {
      width: 100%;
    }
  }

  .borrow-used {
    flex-wrap: wrap;

    .bp-change {
      width: 100%;
    }
  }

  .borrow-total {
    flex-wrap: wrap;

    .bt-change {
      width: 100%;
    }
  }

  .space {
    flex-basis: 100%;
  }
}
</style>

<style lang="scss">
.borrow-slider {
  .v-slider__thumb-label {
    background-color: #c074f9 !important;
  }
}
</style>

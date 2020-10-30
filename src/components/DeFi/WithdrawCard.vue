<template>
  <div>
    <p class="action-label" v-if="!isMobileDevice">Withdraw</p>
    <div class="wallet-balance mb-2">
      <span>Max Withdrawable:</span>
      <v-spacer class="space"></v-spacer>
      <span class="balance" @click="fillAmount(maxWithdraw)"
        >{{ maxWithdraw.toFixed(2) }} {{ currencyName }}</span
      >
    </div>
    <v-text-field
      class="amount-input"
      label="Withdrawal Amount"
      :suffix="currencyName"
      v-model="withdrawValue"
      height="43"
      color="#C074F9"
      dark
      :hint="tokenConversion"
      persistent-hint
      type="number"
    ></v-text-field>
    <div class="borrow-power">
      <span class="label">Borrow Power</span>
      <v-progress-linear
        :value="calculateBPUsed(withdrawValue)"
        rounded
        color="#C074F9"
        background-color="#E4E4E4"
        class="borrow-bar"
        height="5"
      ></v-progress-linear>
    </div>
    <div class="borrow-used">
      <div class="text-left">Borrow Power Used</div>
      <v-spacer class="space"></v-spacer>
      <div class="bp-change">
        <span>{{ bpUsed.toFixed(1) }}%</span>
        &rarr;
        <span class="after-calculated">{{ calculateBPUsed(withdrawValue).toFixed(1) }}%</span>
      </div>
    </div>
    <div class="borrow-total mt-1 mb-3">
      <div class="text-left">Total Borrow Power</div>
      <v-spacer class="space"></v-spacer>
      <div class="bt-change">
        <span>${{ borrowLimit }}</span>
        &rarr;
        <span class="after-calculated">${{ calculateTotalBP(withdrawValue).toFixed(2) }}</span>
      </div>
    </div>
    <v-divider dark />
    <v-btn
      dark
      large
      block
      depressed
      :disabled="!isWithdrawable(withdrawValue, 'error')"
      :class="isWithdrawable(withdrawValue, 'error') ? 'submit-btn' : 'submit-btn disabled'"
      @click="openConfirmTxModal"
    >
      {{ isWithdrawable(withdrawValue, 'btn') ? 'Withdraw' : 'Insufficient' }}</v-btn
    >
    <TransactionComfirmationModal
      :visible="confirmTxModal"
      :toAddr="contractAddr"
      :amount="withdrawValue"
      :currency="currency"
      @onConfirm="onConfirm"
      @onClose="closeConfirmTxModal"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Currency } from '@/types/currency'
import LendingModule from '@/store/lending'
import WalletModule from '@/store/wallet'
import * as constants from '@/constants'
import { WalletParams } from '@/services/ecoc/types'
import TransactionComfirmationModal from '@/components/modals/transaction-confirmation.vue'

@Component({
  components: {
    TransactionComfirmationModal
  }
})
export default class Withdraw extends Vue {
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowLimit!: number
  @Prop() borrowPowerPercentage!: number

  confirmTxModal = false
  errorMsg = ''

  val = 25
  minVal = 25
  withdrawValue = 0

  get myCollateral() {
    return this.lendingStore.myCollateralAssets
  }

  get contractAddr() {
    return this.lendingStore.address
  }

  get isMobileDevice() {
    return window.innerWidth < 1264
  }

  get maxWithdraw() {
    const selectedCollateral = this.myCollateral.find(
      asset => asset.currency.name === this.currencyName
    )
    if (!selectedCollateral) return 0

    return 1000 // selectedCollateral.amount
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
    return `${this.withdrawValue} ${this.currencyName} ≈ ${this.currencyPrice *
      Number(this.withdrawValue)}`
  }

  limitValue(num: number) {
    if (this.val < num) {
      this.val = num
    }
  }

  fillAmount(amount: number) {
    this.withdrawValue = amount
  }

  // BP = Borrow Power
  calculateTotalBP(withdrawAmount: number) {
    const dollarsAmount = Number(withdrawAmount) * this.currencyPrice
    return (this.collateralBalance - dollarsAmount) * this.borrowPowerPercentage
  }

  calculateBPUsed(withdrawAmount: number) {
    return (this.borrowBalance / this.calculateTotalBP(withdrawAmount)) * 100
  }

  isWithdrawable(amount: number, type: string) {
    const isEnough = amount <= this.maxWithdraw
    const isValidAmount = amount >= 0
    const isClickable = amount > 0

    if (type === 'error') {
      return isEnough && isClickable
    }

    return isEnough && isValidAmount
  }

  openConfirmTxModal() {
    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
    this.withdrawValue = 0
    this.confirmTxModal = false
  }

  onSuccess() {
    this.closeConfirmTxModal()
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
    console.log(errorMsg)
  }

  onConfirm(walletParams: WalletParams) {
    const amount = Number(this.withdrawValue)
    const currencyName = this.currencyName

    const payload = {
      currencyName,
      amount,
      walletParams
    }

    this.lendingStore
      .withdrawCollateral(payload)
      .then(txid => {
        console.log('Txid:', txid)
        this.walletStore.addPendingTx(txid, constants.TX_WITHDRAW)
        this.onSuccess()
      })
      .catch(error => {
        this.onError(error.message)
      })
  }
}
</script>

<style lang="scss" scoped>
.withdraw-card {
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

@media (max-width: 768px) {
  .wallet-balance,
  .borrow-power,
  .borrow-used,
  .borrow-total {
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

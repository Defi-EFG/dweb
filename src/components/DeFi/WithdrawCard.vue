<template>
  <div>
    <p class="action-label" v-if="!isMobileDevice">{{ $t('views.lendingpage.withdraw') }}</p>
    <div class="wallet-balance mb-2">
      <span>{{ $t('views.lendingpage.max_with') }}</span>
      <v-spacer class="space"></v-spacer>
      <span class="balance" @click="fillAmount(maxWithdraw)"
        >{{ maxWithdraw.toFixed(2) }} {{ currencyName }}</span
      >
    </div>
    <v-text-field
      class="amount-input"
      :label="lendingpage.withdrawalamount"
      placeholder="0"
      :suffix="currencyName"
      v-model="withdrawValue"
      height="43"
      color="#C074F9"
      dark
      :hint="tokenConversion"
      persistent-hint
      type="number"
      pattern="[0-9]*"
    ></v-text-field>
    <div class="borrow-power">
      <span class="label">{{ $t('views.lendingpage.borrow_po') }}</span>
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
      <div class="text-left">{{ $t('views.lendingpage.borrow_power_used') }}</div>
      <v-spacer class="space"></v-spacer>
      <div class="bp-change">
        <span>{{ bpUsed | numberWithCommas({ fixed: [0, 2] }) }}%</span>
        &rarr;
        <span class="after-calculated"
          >{{ Number(calculateBPUsed(withdrawValue)) | numberWithCommas({ fixed: [0, 2] }) }}%</span
        >
      </div>
    </div>
    <div class="borrow-total mt-1 mb-3">
      <div class="text-left">{{ $t('views.lendingpage.borrow_limit') }}</div>
      <v-spacer class="space"></v-spacer>
      <div class="bt-change">
        <span>${{ borrowLimit | numberWithCommas({ fixed: [0, 5] }) }}</span>
        &rarr;
        <span class="after-calculated"
          >${{
            Number(calculateTotalBP(withdrawValue)) | numberWithCommas({ fixed: [0, 2] })
          }}</span
        >
      </div>
    </div>
    <v-divider dark />
    <v-btn
      dark
      large
      block
      depressed
      :loading="!!onPendingTx"
      :disabled="!isWithdrawable(withdrawValue, 'error')"
      :class="isWithdrawable(withdrawValue, 'error') ? 'submit-btn' : 'submit-btn disabled'"
      @click="openConfirmTxModal"
    >
      {{
        isWithdrawable(withdrawValue, 'btn')
          ? lendingpage.withdraw
          : $t('views.lendingpage.insufficient')
      }}
      <template v-slot:loader>
        <v-progress-circular indeterminate :size="24" class="spinner"></v-progress-circular>
        <span class="ml-2" v-if="!isWithdrawPendingType">Waiting...</span>
      </template>
    </v-btn>
    <TransactionConfirmationModal
      :visible="confirmTxModal"
      :fromAddr="contractAddr"
      :toAddr="walletAddr"
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
import TransactionConfirmationModal from '@/components/modals/TransactionConfirmation.vue'

@Component({
  components: {
    TransactionConfirmationModal
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
  withdrawValue: number | string = ''
  isMobileDevice = false

  mounted() {
    this.isMobileDevice = window.innerWidth < 1264
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    window.addEventListener('resize', function() {
      self.isMobileDevice = this.window.innerWidth < 1264
    })
  }

  get myCollateral() {
    return this.lendingStore.myCollateralAssets
  }

  get walletAddr() {
    return this.walletStore.address
  }

  get contractAddr() {
    return this.lendingStore.address
  }

  get maxWithdraw() {
    const selectedCollateral = this.myCollateral.find(
      asset => asset.currency.name === this.currencyName
    )
    if (!selectedCollateral) return 0

    return selectedCollateral.amount
  }

  get currencyName() {
    return this.currency.name
  }

  get currencyPrice() {
    return this.currency.price || 0
  }

  get bpUsed() {
    return (this.borrowBalance / this.borrowLimit) * 100 || 0
  }

  get lendingpage() {
    return this.$t('views.lendingpage')
  }

  get tokenConversion() {
    return `${Number(this.withdrawValue)} ${this.currencyName} ≈ $${this.currencyPrice *
      Number(this.withdrawValue)}`
  }

  get onPendingTx() {
    const pendingList = [
      constants.ACTION_COLLATERAL,
      constants.ACTION_WITHDRAW,
      constants.ACTION_BORROW,
      constants.ACTION_REPAY,
      constants.ACTION_LIQUID_DEPOSIT,
      constants.ACTION_ASSETS_WITHDRAW
    ]
    return this.walletStore.pendingTransactions.find(tx => {
      return pendingList.includes(tx.actionType || '') && tx.status === constants.STATUS_PENDING
    })
  }

  get isWithdrawPendingType() {
    return this.walletStore.pendingTransactions.find(tx => {
      return tx.actionType === constants.ACTION_WITHDRAW && tx.status === constants.STATUS_PENDING
    })
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
    const total = this.borrowLimit - dollarsAmount * this.borrowPowerPercentage
    return total || 0
  }

  calculateBPUsed(withdrawAmount: number) {
    return (this.borrowBalance / this.calculateTotalBP(withdrawAmount)) * 100 || 0
  }

  isWithdrawable(amount: number, type: string) {
    const isEnough = amount <= this.maxWithdraw
    const isValidAmount = amount >= 0
    const isClickable = amount > 0
    const isNotBorrowedYet = this.borrowBalance <= 0

    if (type === 'error') {
      return isEnough && isClickable && isNotBorrowedYet
    }

    return isEnough && isValidAmount && isNotBorrowedYet
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
    window.scrollTo(0, 0)
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
  }

  onConfirm(walletParams: WalletParams) {
    const amount = Number(this.withdrawValue)
    const currency = this.currency

    const payload = {
      currency,
      amount,
      walletParams
    }

    this.lendingStore
      .withdrawCollateral(payload)
      .then((txid: any) => {
        this.walletStore.addPendingTx({
          txid: txid,
          txType: constants.TX_WITHDRAW,
          actionType: constants.ACTION_WITHDRAW
        })
        this.onSuccess()
      })
      .catch((error: any) => {
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
  background: transparent linear-gradient(90deg, #3ba7c1 0%, #59289a 100%) 0% 0% padding-box;
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

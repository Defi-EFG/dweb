<template>
  <div class="borrow-card-wrapper">
    <p class="action-label" v-if="!isMobileDevice">{{ $t('views.lendingpage.borrow') }}</p>
    <div class="wallet-balance">
      <span>{{ $t('views.lendingpage.wallet_bl') }}</span>
      <v-spacer class="space"></v-spacer>
      <span class="balance">{{ walletBalance.toFixed(2) }} {{ currencyName }}</span>
    </div>
    <v-text-field
      class="amount-input"
      :label="lendingpage.borrowamount"
      placeholder="0"
      type="number"
      pattern="[0-9]*"
      :suffix="currencyName"
      v-model="borrowValue"
      height="43"
      dark
      color="#C074F9"
      :hint="tokenConversion"
      persistent-hint
    >
      <template v-slot:prepend-inner>
        <v-btn class="py-4" x-small text @click="safeMaxInput">{{
          $t('views.modal.safe_max')
        }}</v-btn>
      </template>
    </v-text-field>
    <div
      class="borrow-power"
      @keyup.up="limitSlider"
      @keyup.down="limitSlider"
      @keyup.left="limitSlider"
      @keyup.right="limitSlider"
    >
      <span class="label">{{ $t('views.lendingpage.borrow_po') }}</span>
      <v-slider
        class="borrow-slider"
        v-model="bpSlider"
        min="0"
        max="100"
        track-color="#E4E4E4"
        thumb-label
        :color="bpSlider > safeLimit ? '#F49D44' : '#C074F9'"
        :thumb-color="bpSlider > safeLimit ? '#F49D44' : '#C074F9'"
        :hide-details="true"
        @end="limitSlider"
        @click.native="limitSlider"
      ></v-slider>
    </div>
    <div class="borrow-used">
      <div>{{ $t('views.lendingpage.borrow_power_used') }}</div>
      <v-spacer class="space"></v-spacer>
      <div class="bp-change">
        <span>{{ bpUsed.toFixed(1) }}%</span>
        &rarr;
        <span class="after-calculated">{{ calculateBPUsed(borrowValue).toFixed(1) }}%</span>
      </div>
    </div>
    <div class="borrow-total mt-1 mb-3">
      <div class="text-left">{{ $t('views.lendingpage.total_borrowed') }}</div>
      <v-spacer class="space"></v-spacer>
      <div class="bt-change">
        <span>${{ borrowBalance.toFixed(2) }}</span>
        &rarr;
        <span class="after-calculated">${{ totalBorrowed.toFixed(2) }}</span>
      </div>
    </div>
    <v-divider dark />
    <div class="borrow-apy">
      <span class="label">{{ $t('views.lendingpage.borrowAPY') }}</span>
      <v-spacer></v-spacer>
      <span>{{ interestRate }} %</span>
    </div>
    <div class="fixed-height">
      <div v-show="bpSlider > safeLimit" class="warning-borrow text-center">
        <p class="mb-0">{{ $t('views.lendingpage.warning') }}</p>
      </div>
    </div>
    <v-btn
      dark
      large
      block
      depressed
      :loading="!!onPendingTx"
      :disabled="!isBorrowable(borrowValue, 'error')"
      :class="isBorrowable(borrowValue, 'error') ? 'submit-btn' : 'submit-btn disabled'"
      @click="onOpenModal"
      >{{
        isBorrowable(borrowValue, 'btn')
          ? lendingpage.borrow
          : $t('views.lendingpage.not_available')
      }}
      <template v-slot:loader>
        <v-progress-circular indeterminate :size="24" class="spinner"></v-progress-circular>
        <span class="ml-2" v-if="!isBorrowPendingType">{{ $t('views.lendingpage.waiting') }}</span>
      </template>
    </v-btn>

    <TransactionConfirmationModal
      :visible="confirmTxModal"
      :fromAddr="contractAddr"
      :toAddr="walletAddr"
      :amount="borrowValue"
      :currency="currency"
      :txError="errorMsg"
      @onConfirm="onConfirm"
      @onClose="onClose"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import { Currency } from '@/types/currency'
import { WalletParams } from '@/services/ecoc/types'
import * as constants from '@/constants'
import TransactionConfirmationModal from '@/components/modals/TransactionConfirmation.vue'
@Component({
  components: {
    TransactionConfirmationModal
  }
})
export default class BorrowCard extends Vue {
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowLimit!: number
  @Prop() interestRate!: number
  @Prop() borrowPowerPercentage!: number

  bpSlider = 0
  borrowValue: number | string = ''

  errorMsg = ''
  confirmTxModal = false
  isMobileDevice = false

  mounted() {
    this.isMobileDevice = window.innerWidth < 1264
    this.bpSlider = this.bpUsed
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    window.addEventListener('resize', function() {
      self.isMobileDevice = this.window.innerWidth < 1264
    })
  }

  get isLoggedIn() {
    return this.walletStore.isWalletUnlocked
  }

  get walletAddr() {
    return this.walletStore.address
  }

  get contractAddr() {
    return this.lendingStore.address
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
    return (this.borrowBalance / this.borrowLimit) * 100 || 0
  }

  get tokenConversion() {
    return `${Number(this.borrowValue) || 0} ${this.currencyName} ≈ $${this.currencyPrice *
      Number(this.borrowValue) || 0}`
  }

  get totalBorrowed() {
    return (this.borrowBalance + Number(this.borrowValue) * this.currencyPrice) | 0
  }

  get safeLimit() {
    return 80 // 80%
  }

  get limit() {
    return 99.9 // 99.9%
  }

  get lendingpage() {
    return this.$t('views.lendingpage')
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

  get isBorrowPendingType() {
    return this.walletStore.pendingTransactions.find(tx => {
      return tx.actionType === constants.ACTION_BORROW && tx.status === constants.STATUS_PENDING
    })
  }

  limitSlider() {
    if (this.bpSlider < this.bpUsed) {
      this.bpSlider = this.bpUsed
    }

    if (this.bpSlider >= this.limit) {
      this.bpSlider = this.limit
    }

    this.borrowValue = this.bpPercentToValue(this.bpSlider)
    this.borrowValue = Number(this.borrowValue.toFixed(2))
  }

  // BP = Borrow Power
  calculateBPUsed(borrowAmount: number) {
    const dollarsAmount = Number(borrowAmount) * this.currencyPrice
    const bpPercent = ((this.borrowBalance + dollarsAmount) / this.borrowLimit) * 100
    return bpPercent || 0
  }

  bpPercentToValue(bp: number) {
    const bpPercent = ((bp / 100) * this.borrowLimit - this.borrowBalance) / this.currencyPrice
    return bpPercent
  }

  isBorrowable(amount: number, type: string) {
    const isEnough = amount * this.currencyPrice <= this.borrowLimit - this.borrowBalance
    const isValidAmount = amount >= 0
    const isClickable = amount > 0

    if (!this.isLoggedIn) {
      return false
    }

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
    window.scrollTo(0, 0)
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
  }

  onClose() {
    this.closeModal()
  }

  onConfirm(walletParams: WalletParams) {
    this.errorMsg = ''
    const amount = Number(this.borrowValue)
    const poolAddress = this.lendingStore.loan.poolAddr
    const currency = this.currency

    const payload = {
      currency,
      amount,
      poolAddress,
      walletParams
    }

    this.lendingStore
      .borrow(payload)
      .then((txid: any) => {
        this.walletStore.addPendingTx({
          txid: txid,
          txType: constants.TX_BORROW,
          actionType: constants.ACTION_BORROW
        })
        this.onSuccess()
      })
      .catch((error: any) => {
        this.onError(error.message)
      })
  }

  safeMaxInput() {
    this.bpSlider = this.safeLimit
    this.borrowValue = this.bpPercentToValue(this.bpSlider)
    this.borrowValue = Number(this.borrowValue.toFixed(2))
  }
}
</script>

<style lang="scss" scoped>
.fixed-height {
  margin-bottom: 20px;
  height: 34px;
  margin-top: 5px;
}
.warning-borrow {
  font-size: 11px;
  border: 1px solid #fb8c00;
  color: #f49d44;

  max-height: auto;
}
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
.submit-btn {
  margin-top: 1rem;
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
.borrow-card-wrapper {
  .v-input__prepend-inner {
    margin: auto;
  }

  .v-label {
    position: relative !important;
    overflow: unset;
    margin-left: -5rem;
  }
}
</style>

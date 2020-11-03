<template>
  <div>
    <p class="action-label" v-if="!isMobileDevice">Repay</p>
    <div class="repay-summary">
      <div class="wallet-balance">
        <span>Wallet Balance</span>
        <v-spacer class="space"></v-spacer>
        <span class="balance" @click="fillAmount(walletBalance)"
          >{{ walletBalance.toFixed(2) }} {{ currencyName }}</span
        >
      </div>
      <div class="debt">
        <span>Debt</span>
        <v-spacer class="space"></v-spacer>
        <span class="balance">{{ debt.toFixed(2) }} {{ currencyName }}</span>
      </div>
    </div>

    <v-text-field
      class="amount-input"
      label="Repay Amount"
      v-model="repayAmount"
      :suffix="currencyName"
      type="number"
      height="43"
      dark
      color="#C074F9"
      :hint="tokenConversion"
      persistent-hint
    ></v-text-field>
    <div class="borrow-power">
      <span class="label">Borrow Power</span>
      <v-progress-linear
        :value="calculateBPUsed(repayAmount)"
        rounded
        color="#C074F9"
        background-color="#E4E4E4"
        class="borrow-bar"
        height="5"
      ></v-progress-linear>
    </div>
    <div class="borrow-used">
      <div>Borrow Power Used</div>
      <v-spacer class="space"></v-spacer>
      <div class="bp-change">
        <span>{{ bpUsed.toFixed(1) }}%</span>
        &rarr;
        <span class="after-calculated">{{ calculateBPUsed(repayAmount).toFixed(1) }}%</span>
      </div>
    </div>
    <div class="borrow-total mt-1 mb-3">
      <div class="text-left">Total Borrowed</div>
      <v-spacer class="space"></v-spacer>
      <div class="bt-change">
        <span>${{ debt }}</span>
        &rarr;
        <span class="after-calculated">${{ calculateDebt(repayAmount).toFixed(2) }}</span>
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
      :disabled="!isRepayable(repayAmount, 'error')"
      :class="isRepayable(repayAmount, 'error') ? 'submit-btn' : 'submit-btn disabled'"
      @click="openConfirmTxModal"
      >{{ isRepayable(repayAmount, 'btn') ? 'Repay' : 'Insufficient' }}</v-btn
    >
    <TransactionComfirmationModal
      :visible="confirmTxModal"
      :toAddr="contractAddr"
      :amount="repayAmount"
      :currency="currency"
      @onConfirm="onConfirm"
      @onClose="closeConfirmTxModal"
    />
    <Loading :msg="loadingMsg" :loading="loading" @onClose="loading = false" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import { Currency } from '@/types/currency'
import { WalletParams } from '@/services/ecoc/types'
import * as constants from '@/constants'
import TransactionComfirmationModal from '@/components/modals/transaction-confirmation.vue'
import Loading from '@/components/modals/loading.vue'

@Component({
  components: {
    TransactionComfirmationModal,
    Loading
  }
})
export default class RepayCard extends Vue {
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  @Prop() currency!: Currency
  @Prop() collateralBalance!: number
  @Prop() borrowBalance!: number
  @Prop() borrowLimit!: number
  @Prop() interestRate!: number
  @Prop() borrowPowerPercentage!: number
  @Prop({ default: 10 }) debt!: number

  confirmTxModal = false
  loading = false
  errorMsg = ''
  loadingMsg = 'Currency Approving...'
  repayAmount = 0

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
    return `${this.repayAmount} ${this.currencyName} ≈ ${this.currencyPrice *
      Number(this.repayAmount)}`
  }

  fillAmount(amount: number) {
    if (amount >= this.debt) {
      this.repayAmount = this.debt
    } else {
      this.repayAmount = amount
    }
  }

  calculateDebt(repayAmount: number) {
    return this.debt - repayAmount
  }

  calculateBPUsed(repayAmount: number) {
    const dollarsAmount = Number(repayAmount) * this.currencyPrice
    return (
      (this.borrowBalance /
        ((this.collateralBalance + dollarsAmount) * this.borrowPowerPercentage)) *
      100
    )
  }

  isRepayable(amount: number, type: string) {
    const isInRange = amount <= this.walletBalance && amount <= this.debt
    const isValidAmount = amount >= 0
    const isClickable = amount > 0

    if (type === 'error') {
      return isInRange && isClickable
    }
    return isInRange && isValidAmount
  }

  openConfirmTxModal() {
    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
    this.repayAmount = 0
    this.confirmTxModal = false
  }

  onSuccess() {
    this.loading = false
    this.closeConfirmTxModal()
  }

  onError(errorMsg: string) {
    this.loading = false
    this.errorMsg = errorMsg
    console.log(errorMsg)
  }

  onConfirm(walletParams: WalletParams) {
    this.loading = true
    const amount = Number(this.repayAmount)

    const payload = {
      amount,
      walletParams
    }

    this.lendingStore
      .repay(payload)
      .then(txid => {
        console.log('Txid:', txid)
        this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_REPAY })
        this.onSuccess()
      })
      .catch(error => {
        this.onError(error.message)
      })
  }
}
</script>

<style lang="scss" scoped>
.repay-card {
  width: inherit;
}

.wrapper {
  text-align: left;
  padding: 2rem;
}

.repay-summary {
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.action-label {
  font-size: large;
  color: #c074f9;
  font-weight: 700;
}

.debt,
.borrow-apy,
.wallet-balance {
  display: flex;
  color: white;

  .balance {
    text-align: right;
    text-decoration: underline;
    cursor: pointer;
  }

  .label {
    font-weight: 700;
  }
}

.debt {
  opacity: 0.5;
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

  .bp-change,
  .bt-change {
    text-align: right;
  }

  .after-calculated {
    color: #c074f9;
  }
}

.borrow-apy {
  margin-top: 0.5rem;
}

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
  .borrow-apy,
  .debt {
    font-size: small;
  }
}

@media (max-width: 425px) {
  .debt,
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

<template>
  <div>
    <v-card dark class="tab-container">
      <v-tabs grow background-color="#191c26" class="dw-tabs" :hide-slider="true" show-arrows>
        <v-tab>Deposit</v-tab>
        <v-tab>Withdraw</v-tab>

        <v-tab-item>
          <v-card dark color="#2e3344" class="deposit">
            <v-card-text class="wrapper">
              <div class="label pl-3">
                <img src="@/assets/efg_logo.svg" />
                <span>{{ stakingCurrencyName }} - Flexible Staking</span>
              </div>
              <small class="pl-3"
                >Deposit {{ stakingCurrencyName }} to Earn {{ rewardCurrencyName }}</small
              >

              <div class="total-balance">
                <span>Your Balance</span>
                <v-spacer></v-spacer>
                <span class="text-right">{{ balance.toFixed(2) }} {{ stakingCurrencyName }}</span>
              </div>

              <div class="minimum-d">
                <span class="value">Minimum Deposit: 1.00 EFG</span>
                <v-spacer></v-spacer>
                <span class="all" @click="fillAmountDeposit(balance)">Deposit All</span>
              </div>

              <v-text-field
                class="deposit-amount"
                placeholder="0"
                prefix="Deposit Amount"
                v-model="depositAmount"
                :suffix="stakingCurrencyName"
                single-line
                solo
                hide-details="true"
              ></v-text-field>

              <div class="note">
                <span>Note: Reward earning will start after the deposit completed.</span>
              </div>

              <v-btn large block class="btn-d" @click="openConfirmTxModal(TYPE_DEPOSIT)"
                >Deposit</v-btn
              >
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card dark color="#2e3344" class="withdraw">
            <v-card-text class="wrapper">
              <div class="label pl-3">
                <span>Withdraw</span>
              </div>
              <span class="description">Please input the amount that you want to withdraw</span>

              <div class="d-amount">
                <span>Your Staking amount</span>
                <v-spacer></v-spacer>
                <span>{{ stakingAmount.toFixed(2) }} {{ stakingCurrencyName }}</span>
              </div>

              <div class="minimum-w">
                <span class="value">Minimum Withdrawal: 1.00 GPT</span>
                <v-spacer></v-spacer>
                <span class="all" @click="fillAmountWithdraw(stakingAmount)">Withdraw All</span>
              </div>

              <v-text-field
                class="withdrawal-amount"
                placeholder="0"
                prefix="Withdrawal Amount"
                v-model="withdrawAmount"
                :suffix="stakingCurrencyName"
                single-line
                solo
                hide-details="true"
              ></v-text-field>
              <v-btn large block class="btn-w" @click="openConfirmTxModal(TYPE_WITHDRAW)"
                >Withdraw</v-btn
              >
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <TransactionComfirmationModal
      :visible="confirmTxModal"
      :toAddr="contractAddr"
      :amount="amount"
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
import StakingModule from '@/store/staking'
import { WalletParams } from '@/services/ecoc/types'
import { CurrencyInfo } from '@/types/currency'
import * as constants from '@/constants'
import TransactionComfirmationModal from '@/components/modals/transaction-confirmation.vue'
import Loading from '@/components/modals/loading.vue'

@Component({
  components: {
    TransactionComfirmationModal,
    Loading
  }
})
export default class DepositWithdraw extends Vue {
  walletStore = getModule(WalletModule)
  stakingStore = getModule(StakingModule)

  @Prop({ default: 0 }) readonly balance!: number
  @Prop({ default: 0 }) readonly stakingAmount!: number
  @Prop({ default: {} }) readonly stakingCurrency!: CurrencyInfo

  TYPE_DEPOSIT = 'deposit'
  TYPE_WITHDRAW = 'withdraw'

  actionType = ''
  confirmTxModal = false
  loading = false
  loadingMsg = ''
  errorMsg = ''

  depositAmount: string | number = ''
  withdrawAmount: string | number = ''

  amount: string | number = 0

  get currency() {
    const stakingCurrency = this.walletStore.currenciesList.find(
      currency => currency.name === this.stakingCurrencyName
    )

    return stakingCurrency || {}
  }

  get contractAddr() {
    return this.stakingStore.address
  }

  get stakingCurrencyName() {
    return this.stakingCurrency.name || '###'
  }

  get rewardCurrencyName() {
    return 'GPT'
  }

  fillAmountDeposit(amount: number) {
    this.depositAmount = amount
  }

  fillAmountWithdraw(amount: number) {
    this.withdrawAmount = amount
  }

  openConfirmTxModal(type: string) {
    if (type === this.TYPE_DEPOSIT) {
      this.actionType = type
      this.amount = this.depositAmount
    } else if (type === this.TYPE_WITHDRAW) {
      this.actionType = type
      this.amount = this.withdrawAmount
    }

    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
    this.amount = 0
    this.depositAmount = 0
    this.withdrawAmount = 0
    this.actionType = ''
    this.confirmTxModal = false
  }

  onSuccess() {
    this.loading = false
    this.loadingMsg = ''
    this.closeConfirmTxModal()
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
    this.loading = false
    this.loadingMsg = ''
    console.log(errorMsg)
  }

  onConfirm(walletParams: WalletParams) {
    this.loading = true

    const amount = Number(this.amount)
    const payload = {
      amount,
      walletParams
    }

    if (this.actionType === this.TYPE_DEPOSIT) {
      this.loadingMsg = 'Currency Approving...'
      this.stakingStore
        .deposit(payload)
        .then(txid => {
          setTimeout(() => {
            console.log('Txid:', txid)
            this.walletStore.addPendingTx(txid, constants.TX_DEPOSIT)
            this.onSuccess()
          }, 1000)
        })
        .catch(error => {
          this.onError(error.message)
        })
    } else if (this.actionType === this.TYPE_WITHDRAW) {
      this.loadingMsg = 'Sending Transaction...'
      this.stakingStore
        .withdraw(payload)
        .then(txid => {
          setTimeout(() => {
            console.log('Txid:', txid)
            this.walletStore.addPendingTx(txid, constants.TX_WITHDRAW)
            this.onSuccess()
          }, 1000)
        })
        .catch(error => {
          this.onError(error.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  width: inherit;
  text-align: left;
}

.withdraw,
.deposit {
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  .wrapper {
    padding: 1.2rem;
    padding-top: 2rem;
  }

  .label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: white;
    font-weight: bold;
    img {
      width: 24px;
      margin-right: 0.5rem;
    }
  }

  .d-amount,
  .total-balance {
    margin-top: 1.4rem;
    display: flex;
    padding: 10px;
    border: 1px solid #ffffff15;
    text-transform: uppercase;
    font-weight: 800;
    color: white;
    border-radius: 5px;
  }

  .minimum-w,
  .minimum-d {
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

  .withdrawal-amount,
  .deposit-amount {
    text-align: right;
  }

  .note {
    padding: 10px;
    opacity: 0.7;
  }

  .description {
    padding-left: 12px;
  }

  .btn-w,
  .btn-d {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    background: transparent linear-gradient(90deg, #8b41d6 0%, #6800fe 100%) 0% 0% no-repeat
      padding-box;
  }

  .btn-w {
    margin-top: 5.3rem;
  }
}

@media (max-width: 425px) {
  .withdrawal-amount,
  .d-amount,
  .minimum-w,
  .description,
  .note,
  .minimum-d,
  .deposit-amount,
  .total-balance,
  .label {
    font-size: small;
    span {
      font-size: small;
    }
  }
}
</style>

<style lang="scss">
.dw-tabs {
  .v-tabs-items {
    background-color: transparent !important;
  }

  .v-tab--active {
    background: #2e3344 !important;
  }
}

.withdrawal-amount,
.deposit-amount {
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

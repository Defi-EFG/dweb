<template>
  <div class="stake-wrapper">
    <v-card dark color="#2e3344" class="staked-reward">
      <v-card-text class="wrapper">
        <div class="total-reward">
          <p class="label mb-0">{{ $t('views.stakingpage.your_sk') }}</p>
          <p class="value text-center">{{ stakedReward }} {{ currencyName }}</p>
        </div>

        <div class="d-amount">
          <span>{{ $t('views.stakingpage.withdraw_avb') }}</span>
          <v-spacer></v-spacer>
          <span class="text-right">{{ withdrawAvailable.toFixed(2) }} {{ currencyName }}</span>
        </div>

        <v-divider></v-divider>

        <p class="reward-label mb-1">{{ $t('views.stakingpage.reward_wd') }}</p>

        <div class="minimum-w">
          <span class="value">{{ $t('views.stakingpage.minimum_wd') }}</span>
          <v-spacer></v-spacer>
          <span class="all" @click="fillAmount(withdrawAvailable)">{{
            $t('views.stakingpage.withdrawall')
          }}</span>
        </div>

        <v-text-field
          class="staked-amount"
          placeholder="0"
          type="number"
          :prefix="stakingpage.amount"
          :suffix="currencyName"
          v-model="withdrawAmount"
          single-line
          solo
          hide-details="true"
        ></v-text-field>

        <v-btn large block depressed class="reward-btn" @click="openConfirmTxModal">{{
          $t('views.stakingpage.withdrawreward')
        }}</v-btn>
      </v-card-text>
    </v-card>
    <TransactionConfirmationModal
      :visible="confirmTxModal"
      :fromAddr="contractAddr"
      :toAddr="walletAddr"
      :amount="withdrawAmount"
      :currency="currency"
      @onConfirm="onConfirm"
      @onClose="closeConfirmTxModal"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { CurrencyInfo } from '@/types/currency'
import WalletModule from '@/store/wallet'
import StakingModule from '@/store/staking'
import { WalletParams } from '@/services/ecoc/types'
import * as constants from '@/constants'
import TransactionConfirmationModal from '@/components/modals/TransactionConfirmation.vue'

@Component({
  components: {
    TransactionConfirmationModal
  }
})
export default class StakedReward extends Vue {
  walletStore = getModule(WalletModule)
  stakingStore = getModule(StakingModule)

  @Prop({ default: 0 }) readonly stakedReward!: number
  @Prop({ default: {} }) readonly rewardCurrency!: CurrencyInfo

  confirmTxModal = false
  errorMsg = ''
  withdrawAmount: string | number = ''

  get currencyName() {
    return this.rewardCurrency.name
  }

  get withdrawAvailable() {
    return this.stakedReward
  }

  get currency() {
    const stakingCurrency = this.walletStore.currenciesList.find(
      currency => currency.name === this.currencyName
    )

    return stakingCurrency || {}
  }

  get walletAddr() {
    return this.walletStore.address
  }

  get contractAddr() {
    return this.stakingStore.address
  }

  get stakingpage() {
    return this.$t('views.stakingpage')
  }

  fillAmount(amount: number) {
    this.withdrawAmount = amount
  }

  openConfirmTxModal() {
    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
    this.withdrawAmount = 0
    this.confirmTxModal = false
  }

  onSuccess() {
    this.closeConfirmTxModal()
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
  }

  onConfirm(walletParams: WalletParams) {
    const amount = Number(this.withdrawAmount)
    const payload = {
      amount,
      walletParams
    }

    this.stakingStore
      .claim(payload)
      .then(txid => {
        this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_WITHDRAW })
        this.onSuccess()
      })
      .catch(error => {
        this.onError(error.message)
      })
  }
}
</script>

<style lang="scss" scoped>
.stake-wrapper {
  display: flex;
  width: -webkit-fill-available;
}

.staked-reward {
  width: -webkit-fill-available;
}

.wrapper {
  padding: 1.2rem;
  padding-top: 3.11rem;
  text-align: left;
}

.d-amount {
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  padding: 10px;
  border: 1px solid #ffffff15;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  border-radius: 5px;
}

.minimum-w {
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

.staked-amount {
  text-align: right;
}

.reward-btn {
  margin-top: 1.3rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  background: #474d5d !important;
  background-color: #474d5d !important;
  font-weight: bold !important;
  color: #c074f9;
}

.total-reward {
  text-align: center;

  .label {
    text-transform: uppercase;
    color: white;
  }

  .value {
    padding-top: 1rem;
    background: transparent linear-gradient(90deg, #c074f9 0%, #deb6fe 100%) 0% 0% no-repeat
      padding-box;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: x-large;
    font-weight: bold;
  }
}

.reward-label {
  padding: 1.5rem 10px 0;
  font-size: larger;
  color: #c074f9;
  font-weight: 700;
}

@media (max-width: 425px) {
  .total-reward {
    .value {
      font-size: large;
      padding-top: 0.5rem;
    }
  }

  .staked-amount,
  .minimum-w,
  .d-amount {
    font-size: small;
  }

  .reward-label {
    font-size: 15px;
  }
}
</style>

<style lang="scss">
.staked-amount {
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

  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-color: transparent !important;
    background-image: none !important;
    color: #c074f9 !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
}
</style>

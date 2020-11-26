<template>
  <div class="stake-wrapper">
    <v-card dark color="#2e3344" class="staked-reward">
      <v-card-text class="wrapper">
        <div class="total-reward">
          <p class="label mb-0">{{ $t('views.stakingpage.your_sk') }}</p>
          <p class="value text-center">
            {{ staked.reward | numberWithCommas({ fixed: [0, 4] }) }} {{ rewardCurrencyName }}
          </p>
        </div>

        <div class="d-amount" :class="staked.status ? '' : 'disabled-text'">
          <div class="d-flex">
            <span class="text-uppercase">{{ $t('views.stakingpage.deposit_amount') }}</span>
            <v-spacer></v-spacer>
            <span class="text-right"
              >{{ staked.staking | numberWithCommas({ fixed: [0, 8] }) }}
              {{ staked.currency.name }}</span
            >
          </div>
          <div class="d-flex">
            <span class="text-uppercase">{{ $t('views.stakingpage.staked_available') }}</span>
            <v-spacer></v-spacer>
            <span class="text-right"
              >{{ staked.reward | numberWithCommas({ fixed: [0, 4] }) }}
              {{ rewardCurrencyName }}</span
            >
          </div>
        </div>

        <v-divider></v-divider>

        <p class="reward-label mb-0" v-if="!staked.status">
          {{ $t('views.stakingpage.you_will_get') }}
        </p>

        <div class="minimum-w" v-if="!staked.status">
          <div class="d-flex">
            <span>{{ $t('views.stakingpage.deposit_amount') }}</span>
            <v-spacer></v-spacer>
            <span
              >{{ staked.staking | numberWithCommas({ fixed: [0, 8] }) }}
              {{ staked.currency.name }}</span
            >
          </div>
          <div class="d-flex">
            <span>{{ $t('views.stakingpage.staked_available') }}</span>
            <v-spacer></v-spacer>
            <span
              >{{ staked.reward | numberWithCommas({ fixed: [0, 4] }) }}
              {{ rewardCurrencyName }}</span
            >
          </div>
          <div class="d-flex">
            <span>{{ $t('views.stakingpage.fee') }} ({{ withdrawalFeeRate }}%)</span>
            <v-spacer></v-spacer>
            <span>{{ fee | numberWithCommas({ fixed: [0, 4] }) }} {{ rewardCurrencyName }}</span>
          </div>
        </div>

        <v-btn
          v-if="!staked.status"
          large
          block
          depressed
          class="reward-btn"
          :class="!!isStakedDue ? '' : 'disabled'"
          :disabled="!isStakedDue"
          @click="withdraw"
        >
          <template v-if="isStakedDue">{{ $t('views.stakingpage.withdrawreward') }}</template>
          <template v-else><v-icon left>mdi-timer-sand</v-icon>{{ countdownInFormat }}</template>
        </v-btn>

        <v-btn
          v-else
          large
          block
          outlined
          class="stop-btn"
          :class="staked.status ? '' : 'stopped'"
          color="#FF4E4E"
          :disabled="!staked.staking"
          @click="stopStaking"
          >{{ $t('views.stakingpage.stop_staking') }}</v-btn
        >
      </v-card-text>
    </v-card>
    <TransactionConfirmationModal
      :visible="confirmTxModal"
      :fromAddr="fromAddr"
      :toAddr="toAddr"
      :amount="amount"
      :currency="currencyECOC"
      @onConfirm="onConfirm"
      @onClose="closeConfirmTxModal"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Currency, CurrencyInfo } from '@/types/currency'
import WalletModule from '@/store/wallet'
import StakingModule from '@/store/staking'
import moment from 'moment'
import { WalletParams } from '@/services/ecoc/types'
import * as constants from '@/constants'
import TransactionConfirmationModal from '@/components/modals/TransactionConfirmation.vue'
import { StakingInfo } from '@/types/staking'

enum ActionType {
  TYPE_STOP,
  TYPE_WITHDRAW
}

@Component({
  components: {
    TransactionConfirmationModal
  }
})
export default class StakedReward extends Vue {
  walletStore = getModule(WalletModule)
  stakingStore = getModule(StakingModule)

  @Prop({ default: {} }) readonly rewardCurrency!: CurrencyInfo
  @Prop() selectedStaking!: StakingInfo

  confirmTxModal = false
  actionType = ActionType.TYPE_STOP as ActionType
  errorMsg = ''
  fromAddr = ''
  toAddr = ''
  amount = 0

  get walletAddr() {
    return this.walletStore.address
  }

  get contractAddr() {
    return this.stakingStore.address
  }

  get withdrawalFeeRate() {
    return this.stakingStore.withdrawalFeeRate
  }

  get staked() {
    return this.selectedStaking
  }

  get fee() {
    return this.staked.reward * (this.withdrawalFeeRate / 100)
  }

  // when countdown is finished on 21st day
  get isStakedDue() {
    return this.countdownDuration <= 0
  }

  get countdownDuration() {
    const dueDate = moment.utc(this.staked.timestamp)
    const timeDiff = dueDate.diff(moment().utc())
    return timeDiff
  }

  get countdownInFormat() {
    const remainingTime = moment.duration(this.countdownDuration)
    return `${remainingTime.days()} ${this.$t(
      'views.stakingpage.day'
    )} ${remainingTime.hours()} ${this.$t(
      'views.stakingpage.hour'
    )} ${remainingTime.minutes()} ${this.$t('views.stakingpage.min')}`
  }

  get rewardCurrencyName() {
    return this.rewardCurrency.name
  }

  get currencyECOC() {
    const ECOC = this.walletStore.currenciesList.find(
      (currency: Currency) => currency.name === constants.ECOC
    )

    return ECOC || {}
  }

  get stakingpage() {
    return this.$t('views.stakingpage')
  }

  stopStaking() {
    this.actionType = ActionType.TYPE_STOP
    this.fromAddr = this.walletAddr
    this.toAddr = this.contractAddr
    this.openConfirmTxModal()
  }

  withdraw() {
    this.actionType = ActionType.TYPE_WITHDRAW
    this.fromAddr = this.contractAddr
    this.toAddr = this.walletAddr
    this.openConfirmTxModal()
  }

  openConfirmTxModal() {
    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
    this.confirmTxModal = false
    this.fromAddr = ''
    this.toAddr = ''
  }

  onSuccess() {
    this.closeConfirmTxModal()
    window.scrollTo(0, 0)
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
  }

  onConfirm(walletParams: WalletParams) {
    if (this.actionType === ActionType.TYPE_WITHDRAW) {
      const pendingId = this.staked.pendingId as number
      const payload = {
        pendingId,
        walletParams
      }

      this.stakingStore
        .withdraw(payload)
        .then((txid: any) => {
          this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_WITHDRAW })
          this.onSuccess()
        })
        .catch((error: Error) => {
          this.onError(error.message)
        })
    } else if (this.actionType === ActionType.TYPE_STOP) {
      const payload = {
        walletParams
      }

      this.stakingStore
        .stopStaking(payload)
        .then((txid: any) => {
          this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_STOP_STAKING })
          this.onSuccess()
        })
        .catch((error: Error) => {
          this.onError(error.message)
        })
    }
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
  text-align: right;
}

.d-amount {
  padding: 10px;
  margin-bottom: 3.25rem;
  border: 1px solid #ffffff15;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  border-radius: 5px;
}

.minimum-w {
  display: block;
  padding: 13px 10px;
}

.staked-amount {
  text-align: right;
}

.reward-btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  background: #474d5d !important;
  background-color: #474d5d !important;
  font-weight: bold !important;
  color: #c074f9;
}

.stop-btn {
  margin-top: 8.9rem;
  margin-bottom: 1rem;
  border-radius: 5px;
}

.stopped {
  margin-top: 1rem;
}

.disabled-text {
  pointer-events: none;
  color: rgba(255, 255, 255, 0.12);
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
  text-align: left;
  padding: 0.75rem 10px 0;
  font-size: medium;
  color: #c074f9;
  font-weight: 700;
}

.disabled {
  background: rgba(255, 255, 255, 0.12) !important;
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

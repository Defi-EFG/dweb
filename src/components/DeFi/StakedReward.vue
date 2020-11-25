<template>
  <div class="stake-wrapper">
    <v-card dark color="#2e3344" class="staked-reward">
      <v-card-text class="wrapper">
        <div class="total-reward">
          <p class="label mb-0">{{ $t('views.stakingpage.your_sk') }}</p>
          <p class="value text-center">{{ staked.reward }} {{ currencyName }}</p>
        </div>

        <div class="d-amount" :class="staked.status ? '' : 'disabled-text'">
          <div class="d-flex">
            <span class="text-uppercase">Deposited amount</span>
            <v-spacer></v-spacer>
            <span class="text-right">{{ staked.staking }} {{ staked.currency.name }}</span>
          </div>
          <div class="d-flex">
            <span class="text-uppercase">Staked available</span>
            <v-spacer></v-spacer>
            <span class="text-right">{{ staked.reward }} {{ currencyName }}</span>
          </div>
        </div>

        <v-divider></v-divider>

        <p class="reward-label mb-0" v-if="!staked.status">You will get</p>

        <div class="minimum-w" v-if="!staked.status">
          <div class="d-flex">
            <span>Deposited amount</span>
            <v-spacer></v-spacer>
            <span>{{ staked.staking }} {{ staked.currency.name }}</span>
          </div>
          <div class="d-flex">
            <span>Staked available</span>
            <v-spacer></v-spacer>
            <span>{{ staked.reward }} {{ currencyName }}</span>
          </div>
          <div class="d-flex">
            <span>Fee</span>
            <v-spacer></v-spacer>
            <span>1 {{ currencyName }}</span>
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
          @click="openConfirmTxModal"
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
          :disabled="!staked.reward"
          >Stop staking</v-btn
        >
      </v-card-text>
    </v-card>
    <TransactionConfirmationModal
      :visible="confirmTxModal"
      :fromAddr="contractAddr"
      :toAddr="walletAddr"
      :amount="staked.reward"
      :currency="currency"
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
  errorMsg = ''

  get staked() {
    return this.selectedStaking
  }

  // when countdown is finished on 21st day
  get isStakedDue() {
    return this.countdownDuration <= 0
  }

  get countdownDuration() {
    const dueDate = moment(this.staked.timestamp)
    const timeDiff = dueDate.diff(moment())
    return moment.duration(timeDiff).as('milliseconds')
  }

  get countdownInFormat() {
    return moment.utc(this.countdownDuration).format('DD [days] HH [hour] MM [min]')
  }

  get currencyName() {
    return this.rewardCurrency.name
  }

  get currency() {
    const stakingCurrency = this.walletStore.currenciesList.find(
      (currency: Currency) => currency.name === this.currencyName
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

  openConfirmTxModal() {
    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
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
    const amount = Number(this.staked.reward)
    const payload = {
      amount,
      walletParams
    }

    this.stakingStore
      .claim(payload)
      .then((txid: any) => {
        this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_WITHDRAW })
        this.onSuccess()
      })
      .catch((error: Error) => {
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

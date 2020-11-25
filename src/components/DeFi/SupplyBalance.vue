<template>
  <div class="balance-wrapper">
    <v-card dark class="balance-card">
      <v-card-text>
        <span class="balance-label">{{ $t('views.lendingpage.collateral_bl') }}</span>
        <div class="loaner">{{ $t('views.lendingpage.loaner') }}: {{ poolAddr }}</div>
        <div class="balance" :class="isLiquidate ? 'liquidate' : ''">
          ${{ balance | numberWithCommas({ fixed: [0, 8] }) }}
        </div>
        <div class="liquid-wrapper" v-show="isNearLiquidate && !extentTimeRemaining()">
          <span class="pl-2">{{ $t('views.lendingpage.estimated_gpt') }} {{ estimatedGPT }}</span>

          <div class="liquid-countdown pt-0">
            <span class="lg"> GPT Balance: {{ extendBalance }} GPT</span>
            <span class="extend-btn" @click="depositgpt">{{ $t('views.modal.deposit') }}</span>
          </div>
        </div>
        <div class="liquid-countdown" v-show="extentTimeRemaining()">
          <span>{{ $t('views.lendingpage.liquidation_protection') }} {{ timeRemainMessage }}</span>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="depositgptModal" max-width="400" persistent>
      <v-card class="blur-card" color="#FFFFFF00">
        <v-card-title class="modal-header">
          <v-icon></v-icon>
          <v-btn icon @click="closedepositgptModal"><v-icon color="white">$close</v-icon></v-btn>
        </v-card-title>
        <div class="depositgptwrapper pt-9 ">
          <h3>{{ $t('views.modal.make_gpt_header') }}</h3>
          <small>{{ $t('views.modal.make_gpt_desp') }}</small>
          <div class="comfirmdetail mt-7">
            <div class="flex-between details">
              <span>{{ $t('views.modal.gpt_balance') }}:</span>
              <span>{{ currency.balance }} {{ $t('views.modal.GPT') }}</span>
            </div>
            <div class="flex-between  mt-2">
              <v-text-field
                class="estimatedGPT-field"
                v-model="estimatedGPTAmount"
                prefix="Estimated GPT needed"
                type="number"
                pattern="[0-9]*"
                filled
                :rules="[rules.required]"
                min="0"
                :placeholder="estimatedGPT"
                :value="estimatedGPT"
                >{{ $t('views.modal.GPT') }}</v-text-field
              >
            </div>
            <div class="horiz-line"></div>
            <v-btn
              @click="openConfirmTxModal"
              large
              class="depositbtn mt-8 text-capitalize"
              color="primary"
              >{{ $t('views.modal.deposit') }}</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>

    <TransactionConfirmationModal
      :txType="confirmTxType"
      :visible="confirmTxModal"
      :fromAddr="address"
      :toAddr="contractAddr"
      :amount="estimatedGPTAmount"
      :currency="currency"
      @onConfirm="onConfirm"
      @onClose="closeConfirmTxModal"
    />
    <Loading :msg="loadingMsg" :loading="loading" @onClose="loading = false" />
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import * as constants from '@/constants'
import { WalletParams } from '@/services/ecoc/types'
import { Currency } from '@/types/currency'
import { rewardCurrency as extendCurrency } from '@/store/common'
import * as utils from '@/services/utils'
import TransactionConfirmationModal from '@/components/modals/TransactionConfirmation.vue'
import Loading from '@/components/modals/loading.vue'
import { numberWithCommas } from '@/plugins/filters'

@Component({
  components: {
    TransactionConfirmationModal,
    Loading
  }
})
export default class SupplyBalance extends Vue {
  @Prop({ default: 0 }) readonly balance!: number
  @Prop({ default: false }) readonly isLiquidate!: boolean
  @Prop({ default: false }) visible!: boolean

  depositgptModal = this.visible
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  confirmTxModal = false
  confirmTxType = 'liquidation'
  errorMsg = ''

  loading = false
  loadingMsg = ''
  estimatedGPTAmount: string | number = '0'
  estimatedGPT: string | number = '0'
  safetyFactor = 0.01

  timeRemainMessage: any = 0
  @Watch('visible')
  checkvisible(val: any) {
    this.depositgptModal = val
  }
  rules = {
    required: (value: string) => {
      return !!value || this.$t('views.modal.required')
    }
  }
  closedepositgptModal() {
    this.depositgptModal = false
  }
  depositfunction() {
    console.log('depositfunction')
    this.depositgptModal = false
  }
  mounted() {
    if (this.isNearLiquidate) {
      this.getEstimatedGPT().then(amount => {
        this.estimatedGPT = amount
      })
    }

    const balanceString = numberWithCommas(this.balance, { fixed: [0, 8] })
    this.dynamicFontsize(balanceString.length)

    setInterval(() => {
      this.timeRemainMessage = this.extentTimeRemaining()
    }, 1000)
  }

  get isLoggedIn(): boolean {
    return this.walletStore.address != ''
  }

  get isNearLiquidate() {
    const margin = 0.8
    return this.lendingStore.borrowBalance / this.lendingStore.borrowLimit > margin
  }

  get address() {
    return this.walletStore.address
  }

  get poolAddr() {
    return this.lendingStore.loan.poolAddr
  }

  // unix timestamp in second
  get currentTimestamp() {
    return moment().unix()
  }

  extentTimeRemaining() {
    if (this.walletStore.isWalletUnlocked) {
      const lastGracePeriod = this.lendingStore.loan.lastGracePeriod //unix timestamp in second
      if (lastGracePeriod === 0) return ''

      const timeDiff = lastGracePeriod - moment().unix()
      if (timeDiff < 0) return ''

      const dur = moment.duration(timeDiff * 1000)
      return `${moment.utc(dur.as('milliseconds')).format('HH:mm:ss')}`
    }
    return false
  }
  depositgpt() {
    this.depositgptModal = !this.depositgptModal
  }

  get contractAddr() {
    return this.lendingStore.address
  }

  get currency() {
    return this.walletStore.currenciesList.find(currency => currency.name === extendCurrency.name)
  }

  get isEnoughGPT() {
    if (!this.currency) return false
    return Number(this.currency.balance) >= Number(this.estimatedGPT)
  }

  get extendBalance() {
    const currency = this.lendingStore.myAssets.find(
      asset => asset.currency.contractAddress === extendCurrency.contractAddress
    )

    if (!currency) return 0
    return currency.amount
  }

  async getEstimatedGPT() {
    if (!this.isLoggedIn) {
      return '0'
    }

    const amount = await this.lendingStore.getEstimatedGPT(this.address)
    const estimatedGPT = utils
      .toNumber(amount)
      .multipliedBy(1 + this.safetyFactor)
      .toNumber()
      .toFixed(4)

    return estimatedGPT
  }

  dynamicFontsize(textLength: any) {
    const baseSize = 37
    if (textLength >= baseSize) {
      textLength = baseSize - 2
    }

    const fontSize = baseSize - textLength
    const boxes = document.querySelector('.balance')
    //@ts-ignore
    boxes.style.fontSize = `${fontSize}px`
  }

  openConfirmTxModal() {
    if (this.estimatedGPTAmount != '' && this.estimatedGPTAmount > 0) {
      this.closedepositgptModal()
      this.getEstimatedGPT().then(amount => {
        this.estimatedGPT = amount
        this.confirmTxModal = true
      })
    }
  }

  closeConfirmTxModal() {
    this.confirmTxModal = false
    this.estimatedGPTAmount = ''
  }

  onSuccess() {
    this.loading = false
    this.loadingMsg = ''
    this.closeConfirmTxModal()
    window.scrollTo(0, 0)
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
    this.loading = false
    this.loadingMsg = ''
  }

  onConfirm(walletParams: WalletParams) {
    this.loading = true
    this.loadingMsg = 'Currency Approving...'
    const amount = Number(this.estimatedGPT)
    const currency = this.currency as Currency
    const poolAddress = this.poolAddr

    const payload = {
      currency,
      poolAddress,
      amount,
      walletParams
    }

    this.lendingStore
      .depositAsset(payload)
      .then((txid: any) => {
        setTimeout(() => {
          this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_DEPOSIT })
          this.onSuccess()
        }, 1000)
      })
      .catch((error: any) => {
        this.onError(error.message)
      })
  }

  @Watch('isNearLiquidate')
  checkIfLiquidation(value: boolean) {
    if (value) {
      this.getEstimatedGPT().then(amount => {
        this.estimatedGPT = amount
      })
    }
  }

  @Watch('balance')
  balanceChanged(val: any) {
    const balanceVal = numberWithCommas(val, { fixed: [0, 8] })
    this.dynamicFontsize(balanceVal.length)
  }
}
</script>

<style lang="scss" scoped>
.balance-wrapper {
  display: flex;
  width: -webkit-fill-available;
}

.balance-card {
  background: #2e3344;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  width: -webkit-fill-available;
  text-align: left;
}

.balance {
  font-size: 38px;
  color: #3fc0db;
  text-align: right;
  padding-top: 3.8rem;
  padding-bottom: 1rem;
}

.balance-label {
  font-size: 16px;
  color: white;
}

.loaner {
  color: #7e7e7e;
  .change-btn {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }
}

.liquid-wrapper {
  display: flex;
  flex-direction: column;
  background: #151a2b;
  border-radius: 5px;
  padding: 8px;
}
.liquid-countdown {
  background: #151a2b;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  justify-content: space-between;

  .extend-btn {
    cursor: pointer;
    text-decoration: underline;
    color: #c074f9;
  }
}
.lg {
  color: rgba(224, 224, 224, 0.425);
  font-size: 13px;
}
.liquidate {
  color: #ff5656;
}

@media (max-width: 768px) {
  .balance {
    font-size: 29px;
    padding-top: 1.8rem;
  }

  .loaner {
    font-size: small;
  }

  .liquid-countdown {
    font-size: small;
  }
}
</style>

<style lang="scss">
.estimatedGPT-field input {
  text-align: right;
}
.balance-card {
  .v-card__text {
    padding: 2rem !important;
  }
}
</style>

<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
}
.modal-header {
  padding: 9px !important;
  background-color: transparent;
  border-bottom: 1px solid rgba(247, 247, 247, 0.344);
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
.depositgptwrapper {
  background-color: white;
  padding: 24px;
  margin: 24px 16px;
  border-radius: 5px;
}

.depositgptwrapper h3 {
  color: #44096b;
  font-weight: 900;
  font-size: 18px;
}
.depositgptwrapper small {
  color: rgb(184, 184, 184);
}
.depositbtn {
  width: 100%;
}
.details {
  background-color: rgba(211, 211, 211, 0.322);
  border-radius: 5px;
  padding: 14px 17px;
  margin-top: 10px;
  color: rgb(185, 185, 185);
  font-size: 14px;
}
.detail2 {
  background-color: rgba(211, 211, 211, 0.322);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gptamount {
  color: black;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.horiz-line {
  border-bottom: 1px solid lightgray;
}
</style>

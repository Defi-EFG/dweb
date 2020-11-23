<template>
  <div class="balance-wrapper">
    <v-card dark class="balance-card">
      <v-card-text>
        <span class="balance-label">{{ $t('views.lendingpage.collateral_bl') }}</span>
        <div class="loaner">{{ $t('views.lendingpage.loaner') }}: {{ poolAddr }}</div>
        <div class="balance" :class="isLiquidate ? 'liquidate' : ''">
          ${{ balance | numberWithCommas({ fixed: [0, 8] }) }}
        </div>
        <div class="liquid-countdown" v-show="isNearLiquidate && !extentTimeRemaining()">
          <span>{{ $t('views.lendingpage.estimated_gpt') }} {{ estimatedGPT }}</span>
          <span class="extend-btn" @click="openConfirmTxModal">{{
            $t('views.lendingpage.extend')
          }}</span>
        </div>
        <div class="liquid-countdown" v-show="extentTimeRemaining()">
          <span>{{ $t('views.lendingpage.liquidation_protection') }} {{ timeRemainMessage }}</span>
        </div>
      </v-card-text>
    </v-card>
    <TransactionConfirmationModal
      :txType="confirmTxType"
      :visible="confirmTxModal"
      :fromAddr="address"
      :toAddr="contractAddr"
      :amount="estimatedGPT"
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

  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  confirmTxModal = false
  confirmTxType = 'liquidation'
  errorMsg = ''

  loading = false
  loadingMsg = ''

  estimatedGPT: string | number = '0'
  safetyFactor = 0.01

  timeRemainMessage: any = 0

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
    this.getEstimatedGPT().then(amount => {
      this.estimatedGPT = amount
      this.confirmTxModal = true
    })
  }

  closeConfirmTxModal() {
    this.confirmTxModal = false
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

    const payload = {
      amount,
      walletParams
    }

    this.lendingStore
      .extendGracePeriod(payload)
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
.balance-card {
  .v-card__text {
    padding: 2rem !important;
  }
}
</style>

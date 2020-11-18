<template>
  <div class="lending-card">
    <v-tabs
      dark
      grow
      background-color="#252B3D"
      class="lending-tabs"
      :hide-slider="true"
      show-arrows
    >
      <v-tab>{{ $t('views.lendingpage.my_collateral') }}</v-tab>
      <v-tab>{{ $t('views.lendingpage.my_borrowing') }}</v-tab>
      <v-tab>{{ $t('views.lendingpage.my_activity') }}</v-tab>

      <v-tab-item class="my-collateral">
        <v-card dark class="elevation-0" color="#2e3344">
          <v-card-text v-if="myCollateral.length > 0">
            <div class="supply-header">
              <div>{{ $t('views.lendingpage.assets') }}</div>
              <div>{{ $t('views.lendingpage.balance') }}</div>
            </div>
            <div class="supply-item" v-for="(item, index) in myCollateral" :key="index">
              <div class="assets">
                <img :src="item.currency.style.icon" alt="" />
                <span>{{ item.currency.name }}</span>
              </div>
              <div class="balance">
                <div>
                  ${{
                    getEstimatedValue(item.amount, getCurrencyPrice(item.currency.name))
                      | numberWithCommas({ fixed: [0, 2] })
                  }}
                </div>
                <small
                  >≈{{ item.amount | numberWithCommas({ fixed: [0, 5] }) }}
                  {{ item.currency.name }}</small
                >
              </div>
            </div>
          </v-card-text>
          <v-card-text v-else>
            No collateral assets
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item class="my-borrowing">
        <v-card class="elevation-0" dark color="#2e3344">
          <v-card-text v-if="myBorrowing.length > 0">
            <div class="borrow-header">
              <div class="mr-3">{{ $t('views.lendingpage.assets') }}</div>
              <div>{{ $t('views.lendingpage.inrerest') }}</div>
              <div>{{ $t('views.lendingpage.balance') }}</div>
            </div>
            <div class="borrow-item" v-for="(item, index) in myBorrowing" :key="index">
              <div class="assets">
                <img :src="item.currency.style.icon" alt="" />
                <span>{{ item.currency.name }}</span>
              </div>
              <div class="apy">
                <span>{{ item.interestRate }}%</span>
              </div>
              <div class="balance">
                <div>
                  ${{ getEstimatedValue(item.amount, getCurrencyPrice(item.currency.name)) }}
                </div>
                <small>≈{{ item.amount.toFixed(2) }} {{ item.currency.name }}</small>
              </div>
            </div>
          </v-card-text>
          <v-card-text v-else>
            No Borrowing assets
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item class="my-assets">
        <v-card class="elevation-0" dark color="#2e3344">
          <v-card-text>
            <div class="supply-header">
              <div>{{ $t('views.lendingpage.assets') }}</div>
              <div>{{ $t('views.lendingpage.balance') }}</div>
            </div>
            <div class="supply-item" v-for="(item, index) in myAssets" :key="index">
              <div class="assets">
                <img :src="item.currency.style.icon" alt="" />
                <span>{{ item.currency.name }}</span>
              </div>
              <div class="balance">
                <div>{{ item.amount.toFixed(2) }} {{ item.currency.name }}</div>
                <small @click="openConfirmTxModal(item.currency, item.amount)">{{
                  $t('views.lendingpage.withdraw')
                }}</small>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <TransactionConfirmationModal
      :visible="confirmTxModal"
      :fromAddr="contractAddr"
      :toAddr="walletAddr"
      :amount="amount"
      :currency="currency"
      @onConfirm="onConfirm"
      @onClose="closeConfirmTxModal"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import moment from 'moment'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import { Currency, CurrencyInfo } from '@/types/currency'
import { WalletParams } from '@/services/ecoc/types'
import { getEstimatedValue } from '@/services/utils'
import * as constants from '@/constants'
import { getCurrency } from '@/store/common'
import TransactionConfirmationModal from '@/components/modals/TransactionConfirmation.vue'

@Component({
  components: {
    TransactionConfirmationModal
  }
})
export default class LendingActivity extends Vue {
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  confirmTxModal = false
  errorMsg = ''
  amount = 0
  currency = {} as Currency

  activityIcon = {
    borrow: 'mdi-transfer-up',
    deposit: 'mdi-transfer-down',
    activated: 'mdi-circle-slice-8'
  }

  getEstimatedValue = getEstimatedValue

  get walletAddr() {
    return this.walletStore.address
  }

  get contractAddr() {
    return this.lendingStore.address
  }

  get myCollateral() {
    return this.lendingStore.myCollateralAssets
  }

  get myBorrowing() {
    return this.lendingStore.myBorrowing
  }

  get myAssets() {
    return this.lendingStore.myAssets.filter(asset => asset.amount)
  }

  getCurrencyPrice(currencyName: string): number {
    const currency = this.walletStore.currencies.find(currency => currency.name === currencyName)
    if (!currency) return 0
    return currency.price || 0
  }

  getTime(timestamp: number) {
    if (timestamp) {
      // const timeMsg = moment(timestamp * 1000)
      //   .startOf('minute')
      //   .fromNow()

      return `${moment(timestamp * 1000).format('YYYY-MM-DD HH:mm')}`
    }

    return timestamp
  }

  openConfirmTxModal(currencyInfo: CurrencyInfo, amount: number) {
    this.currency = getCurrency(currencyInfo.name)
    this.amount = amount
    this.confirmTxModal = !this.confirmTxModal
  }

  closeConfirmTxModal() {
    this.amount = 0
    this.currency = {} as Currency
    this.confirmTxModal = false
  }

  onSuccess() {
    this.closeConfirmTxModal()
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
  }

  onConfirm(walletParams: WalletParams) {
    const amount = Number(this.amount)
    const currency = this.currency

    const payload = {
      currency,
      amount,
      walletParams
    }

    this.lendingStore
      .withdrawCollateral(payload)
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
.lending-card {
  background: #2e3344;
  width: inherit;
  border-radius: 5px;
}

.borrow-header,
.supply-header {
  display: flex;
  justify-content: space-between;
  padding: 4px 1rem 1rem 1rem;
}

.borrow-item,
.supply-item {
  padding: 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.071);
  border-radius: 6px;
  display: flex;
  color: white;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .assets {
    display: flex;
    place-items: center;

    img {
      width: 28px;
      margin-left: 0.5rem;
      margin-right: 1rem;
    }
  }

  .balance {
    text-align: right;
    small {
      opacity: 0.5;
    }
  }

  .apy {
    margin: auto;
  }
}

.borrow-item:nth-last-child(1),
.supply-item:nth-last-child(1) {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .my-collateral,
  .my-borrowing,
  .my-assets,
  .my-activity {
    font-size: small;
  }

  .my-collateral {
    .supply-header {
      font-size: small;
    }

    .supply-item {
      font-size: small;
    }
  }

  .my-borrowing {
    .borrow-header {
      font-size: small;
    }

    .borrow-item {
      font-size: small;
    }
  }

  .my-activity {
    .activity-type {
      font-size: small;
    }
  }
}
</style>

<style lang="scss">
.lending-tabs {
  .v-card__text {
    max-height: 228px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff41;
      border-radius: 6px;
    }
  }

  .v-tabs-items {
    background-color: transparent !important;
  }

  .v-tab--active {
    background: #2e3344 !important;
  }
}
</style>

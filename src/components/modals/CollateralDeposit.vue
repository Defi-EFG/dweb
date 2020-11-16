<template>
  <div>
    <v-dialog v-model="show" max-width="420" class="send-transaction" id="collat" persistent>
      <v-stepper v-model="step" class="blur-card">
        <v-stepper-items>
          <!-- Welcome to ECOC Finance Governance -->
          <v-stepper-content step="1">
            <v-card color="#FFFFFF00">
              <v-card-title class="modal-header">
                <v-icon></v-icon>
                <v-btn @click="onClose()" icon><v-icon color="white">$close</v-icon></v-btn>
              </v-card-title>
              <div class="transaction-confirmation-wrapper collateral_pddeful ">
                <div class="headtitle_collat">
                  <div class="headtitle_collat_head">{{ $t('views.modal.select_Loaner') }}</div>
                  <div class="headtitle_collat_sub">
                    {{ $t('views.modal.you_can_only') }}
                  </div>
                </div>
                <div class="transaction-confirmation-content collat_bg">
                  <v-container>
                    <div class="texttitle_hade">
                      <v-row class="row1 ">
                        <v-col lg="4" md="4" cols="4">
                          {{ $t('views.main.loaner') }}
                        </v-col>
                        <v-col lg="4" md="4" cols="4">
                          {{ $t('views.main.total_supply') }}
                        </v-col>
                        <v-col lg="4" md="4" cols="4">
                          {{ $t('views.main.total_borrowed') }}
                        </v-col>
                      </v-row>
                    </div>
                    <div class="row2" id="style-1">
                      <v-row
                        v-for="(item, i) in Loanerlist"
                        :key="i"
                        :class="Loanername == item.address ? 'active row1 roww2' : 'row1 roww2'"
                        @click="selectLoaner((Loanername = item.address))"
                      >
                        <v-col lg="4" md="4" cols="4">
                          <div class="margintop Loener">
                            {{ truncateAddress(item.address) }}
                          </div>
                        </v-col>
                        <v-col lg="4" md="4" cols="4">
                          <div class="margintop color_1 textafter">
                            <span class="color_size1">
                              ${{ item.totalSupply | numberWithCommas({ fixed: [0, 2] }) }}</span
                            >
                          </div>
                        </v-col>
                        <v-col lg="4" md="4" cols="4">
                          <div class="margintop color_2 textafter">
                            <span class="color_size2">
                              ${{ item.totalBorrowed | numberWithCommas({ fixed: [0, 2] }) }}</span
                            >
                          </div>
                        </v-col>
                        <img class="row1_img" src="@/assets/backg_01.svg" />
                      </v-row>
                    </div>
                  </v-container>
                </div>
                <v-btn
                  large
                  depressed
                  class="mb-7"
                  :class="Loanername != '' ? 'text-capitalize' : 'disabled'"
                  @click="connectStep()"
                  >{{ $t('views.modal.select') }}</v-btn
                >
              </div>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card color="#FFFFFF00">
              <v-card-title class="modal-header">
                <v-btn @click="leftarrow()" icon><v-icon color="white">$leftarrow</v-icon></v-btn>
                <v-btn @click="onClose()" icon><v-icon color="white">$close</v-icon></v-btn>
              </v-card-title>
              <div class="transaction-confirmation-wrapper collateral_pddeful">
                <div class="content-wrapper ">
                  <div class="content-logo ">
                    <div class="logo"><img src="@/assets/ECOC.svg" alt="" /></div>
                  </div>
                  <h3 class="">{{ $t('views.modal.use_ECOC') }}</h3>
                  <p class="lightgray--text">
                    {{ $t('views.modal.you_can_deposit') }}
                  </p>
                </div>
                <div class="transaction-confirmation-content outputselect">
                  <span>{{ $t('views.main.loaner') }}</span
                  ><br />
                  <input type="text" v-model="selectdata" disabled />
                </div>
                <v-btn large depressed class="text-capitalize mb-7" @click="nextcollat()">{{
                  $t('views.modal.next')
                }}</v-btn>
              </div>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card color="#FFFFFF00">
              <v-card-title class="modal-header">
                <v-btn @click="leftarrow3()" icon><v-icon color="white">$leftarrow</v-icon></v-btn>
                <v-btn @click="onClose()" icon><v-icon color="white">$close</v-icon></v-btn>
              </v-card-title>
              <div class="transaction-confirmation-wrapper collat_bg2 collateral_margin mb-7">
                <div class="d-flex ">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        @click="copyAddress(addr)"
                        class="transaction-sender"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ truncateAddress(addr) }}
                      </div>
                    </template>
                    <span>{{ $t('views.modal.copied') }}</span>
                  </v-tooltip>

                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        @click="copyAddress(toAddr)"
                        class="transaction-receiver"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ addressFilter(toAddr) }}
                      </div>
                    </template>
                    <span>{{ $t('views.modal.copied') }}</span>
                  </v-tooltip>
                  <div class="icon-send"><v-icon small color="white">$rightarrow</v-icon></div>
                </div>
                <div class="transaction-confirmation-content ">
                  <div class="collateral_pd">
                    <h4>
                      <strong>{{ $t('views.modal.transaction') }}</strong>
                    </h4>
                    <small>{{ $t('views.modal.please_transaction') }}</small>
                    <div class="div_prices">
                      <div class="transaction-confirmation-content-detail">
                        <div class="detail">
                          <span class="gt">{{ $t('views.modal.amount') }}</span>
                          <div class="d-flex justify-end">
                            <p>{{ amount }}</p>
                            <p class="ml-2">{{ selectedCurrencyName }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="detail">
                        <span class="gt">{{ $t('views.modal.gas_fee') }}</span>
                        <div class="text-end">
                          <div class="d-flex justify-end">
                            <p>{{ totalFee }}</p>
                            <p class="ml-2">ECOC</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="detail">
                      <span class="gt"></span>
                      <div class="text-end gt">
                        <v-btn small text color="primary" @click="gasSetting()">
                          <span class="gassetting">{{ $t('views.modal.gas_setting') }}</span>
                        </v-btn>
                      </div>
                    </div>
                    <div class="border-bottom"></div>
                    <div class="pt-4">
                      <v-text-field
                        :label="modaltext.keystore_password"
                        v-model="password"
                        :rules="[rules.required, rules.min]"
                        :type="showpassword ? 'text' : 'password'"
                        :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @keyup.enter="onConfirm()"
                        dense
                        filled
                      ></v-text-field>
                    </div>
                    <div v-if="errorMsg">
                      <span class="errorMsg">{{ $t(errorMsg) }}</span>
                    </div>
                    <div class="action-transaction-confirmation">
                      <v-btn
                        outlined
                        large
                        color="primary"
                        class="text-capitalize1"
                        @click="leftarrow3"
                        >{{ $t('views.modal.cancel') }}</v-btn
                      >
                      <v-btn
                        large
                        depressed
                        color="primary"
                        class="text-capitalize"
                        @click="onConfirm()"
                        >{{ $t('views.modal.confirm') }}</v-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <div id="loadding" v-if="loading">
              <v-card color="#FFFFFF00">
                <div class="generate-keydtore">
                  <v-progress-circular
                    rotate="360"
                    size="120"
                    width="9"
                    color="white"
                    indeterminate
                  ></v-progress-circular>
                  <p>{{ $t(loadingMsg) }}</p>
                </div>
              </v-card>
            </div>

            <div id="tx-result" v-else>
              <v-card color="#FFFFFF00">
                <v-card-title class="modal-header">
                  <v-icon></v-icon>
                  <v-btn @click="onClose()" text><v-icon color="white">$close</v-icon></v-btn>
                </v-card-title>
                <div class="transaction-confirmation-wrapper collateral_pddeful ">
                  <div class="headtitle_collat">
                    <div class="headtitle_collat_head font-bold">
                      Deposit Successful!<img src="@/assets/icon/Check.svg" alt="" />
                    </div>
                    <v-container colortextoutput>
                      <v-row class="border-bottom_1 ">
                        <v-col cols="6" class="nopadding">Collateral</v-col>
                        <v-col cols="6" class="textright nopadding">0 ECOC</v-col>
                      </v-row>
                      <v-row class="border-bottom_1">
                        <v-col cols="6" class="nopadding">Borrow Power Used (New)</v-col>
                        <v-col cols="6" class="textright nopadding">0 %</v-col>
                      </v-row>
                      <v-row class="border-bottom_1">
                        <v-col cols="6" class="nopadding">Total Borrow Power (New)</v-col>
                        <v-col cols="6" class="textright nopadding">$0</v-col>
                      </v-row>
                    </v-container>
                    <v-container>
                      <v-row class="headshowwallet showwallet">
                        <v-col cols="6">ECOC Wallet</v-col>
                        <v-col cols="6" class="textright"
                          ><div class="nametitlecollat">
                            <div class="dot-circle"></div>
                            ...
                          </div></v-col
                        >
                      </v-row>
                      <v-row class="showwallet2 showwalletcc">
                        <v-col cols="8" class="nopadding font-bold ">Transaction Confirmed!</v-col>
                        <v-col cols="4" class="textright nopadding">
                          <v-btn class="icon" fab dark x-small color="primary">
                            <v-icon dark>
                              mdi-arrow-up
                            </v-icon>
                          </v-btn>
                          <v-btn class="icon" fab dark x-small color="primary">
                            <v-icon dark>
                              mdi-content-copy
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row class="showwallet3 font-df">
                        <v-col cols="6" class="nopadding showwallet_bgd"
                          >Total Sent (Collateral)</v-col
                        >
                        <v-col cols="6" class="textright nopadding showwallet_bgd2">0 ECOC</v-col>
                      </v-row>
                      <v-row class="showwallet4 font-df">
                        <v-col cols="6" class="nopadding border-top-collat">Ending Balance:</v-col>
                        <v-col cols="6" class="textright nopadding border-top-collat">0 ECOC</v-col>
                      </v-row>
                    </v-container>
                  </div>
                </div>
              </v-card>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

    <v-dialog v-model="gassetting" max-width="370" class="content-gas-setting">
      <v-card>
        <div class="d-flex justify-lg-space-between pt-3 ">
          <v-icon></v-icon>
          <v-btn icon @click="closeGasSetting"><v-icon>$close</v-icon></v-btn>
        </div>
        <div class="content-gas-setting">
          <h3>{{ $t('views.modal.gas_setting') }}</h3>
          <small>{{ $t('views.modal.Increase') }}</small>
          <div class="gas-customization">
            <v-btn-toggle tile group>
              <v-btn>
                <div class="gas-custom-btn-group" @click="fee = feeSlow">
                  <p>{{ $t('views.modal.slow') }}</p>
                  <p>{{ feeSlow }} ECOC</p>
                </div>
              </v-btn>
              <v-btn>
                <div class="gas-custom-btn-group" @click="fee = feeAverage">
                  <p>{{ $t('views.modal.average') }}</p>
                  <p>{{ feeAverage }} ECOC</p>
                </div></v-btn
              >
              <v-btn>
                <div class="gas-custom-btn-group" @click="fee = feeFast">
                  <p>{{ $t('views.modal.fast') }}</p>
                  <p>{{ feeFast }} ECOC</p>
                </div></v-btn
              >
            </v-btn-toggle>
          </div>
          <div class="inputnumber d-flex justify-space-between">
            <v-col cols="6" class="pb-0">
              <label for="Gas price:">{{ $t('views.modal.gas_price') }}</label
              ><v-text-field type="number" pattern="[0-9]*" v-model="gasPrice"></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <label for="Gas limit:">{{ $t('views.modal.gas_limit') }}</label
              ><v-text-field type="number" pattern="[0-9]*" v-model="gasLimit"></v-text-field>
            </v-col>
          </div>

          <div class="d-flex justify-space-between py-2">
            <p>{{ $t('views.modal.total_transaction') }}</p>
            <div class="text-end">
              <p class="mb-0">{{ totalFee }} ECOC</p>
            </div>
          </div>
          <div class="save-button ">
            <v-btn color="primary" depressed block @click="closeGasSetting">{{
              $t('views.modal.save')
            }}</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import { WalletParams } from '@/services/ecoc/types'
import { Currency } from '@/types/currency'
import { DEFAULT } from '@/services/contract'
import * as Ecoc from '@/services/wallet'
import * as utils from '@/services/utils'
import * as constants from '@/constants'
import { copyToClipboard } from '@/services/utils'

@Component({
  components: {}
})
export default class CollateralDeposit extends Vue {
  @Prop() visible!: boolean
  @Prop({ default: {} }) currency!: Currency
  @Prop() amount!: number
  @Prop() toAddr!: string

  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  feeSlow = 0.004
  feeAverage = 0.01
  feeFast = 0.1

  gassetting = false
  loading = false
  loadingMsg = 'Currency Approving...'
  errorMsg = ''
  password = ''

  showpassword = false
  step = 1
  Loanername = ''
  selectdata = ''
  active = ''

  fee = DEFAULT.DEFAULT_FEE
  gasLimit = DEFAULT.DEFAULT_GAS_LIMIT
  gasPrice = DEFAULT.DEFAULT_GAS_PRICE

  rules = {
    required: (value: any) => !!value || this.$t('views.modal.required'),
    min: (v: any) => v.length >= 8 || this.$t('views.modal.characters'),
    emailMatch: () => this.$t('views.modal.the_email')
  }

  get totalFee() {
    return utils.getEcocTotalFee(this.fee, this.gasPrice, this.gasLimit)
  }

  get Loanerlist() {
    return this.lendingStore.pools
  }

  get poolAddress() {
    return this.lendingStore.loan.poolAddr
  }

  get ecoc() {
    return this.walletStore.ecoc
  }

  get addr() {
    return this.walletStore.address
  }

  get selectedCurrencyName() {
    return this.currency.name || ''
  }

  get show() {
    return this.visible
  }

  get modaltext() {
    return this.$t('views.modal')
  }

  @Watch('visible')
  checkPoolAddress(value: boolean) {
    if (value) {
      if (this.poolAddress) {
        this.step = 3
        this.selectdata = this.poolAddress
      }
    }
  }

  copyAddress(addr: string) {
    copyToClipboard(addr)
  }

  gasSetting() {
    this.gassetting = true
  }

  closeGasSetting() {
    this.gassetting = false
  }

  onClose() {
    this.step = 1
    this.selectdata = ''
    this.password = ''
    this.errorMsg = ''
    this.loading = false
    this.$emit('onClose')
  }

  onSuccess() {
    this.step = 1
    this.loading = false
    this.errorMsg = ''
    this.password = ''
    this.$emit('onSuccess')
  }

  selectLoaner(Loanername: string) {
    this.selectdata = Loanername
    this.active = Loanername
  }

  connectStep() {
    if (this.selectdata != '') {
      this.step = 2
    }
  }

  leftarrow() {
    this.step = 1
  }

  nextcollat() {
    this.step = 3
  }

  leftarrow3() {
    this.step = 2
  }

  toLoading() {
    this.step = 4
  }

  addressFilter(address: string) {
    if (address == this.lendingStore.address) return 'Lending Platform'
    else return address
  }

  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 10
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }

  onError(errorMsg: string) {
    this.errorMsg = errorMsg
    this.loading = false
    this.step = 3
  }

  async onConfirm() {
    try {
      const password = this.password
      const address = this.walletStore.address
      const keystore = this.walletStore.keystore
      const wallet = Ecoc.importFromKeystore(keystore, password)
      const utxoList = await wallet.getUtxoList()

      const walletParams = {
        address: address,
        keypair: wallet.keypair,
        utxoList: utxoList,
        fee: this.fee,
        gasLimit: this.gasLimit,
        gasPrice: this.gasPrice
      } as WalletParams

      this.password = ''
      this.errorMsg = ''
      this.depositCollateral(walletParams)
    } catch (error) {
      this.errorMsg = error.message
    }
  }

  async depositCollateral(walletParams: WalletParams) {
    this.loading = true
    this.toLoading()

    const amount = Number(this.amount)
    const poolAddress = this.selectdata
    const currency = this.currency

    const payload = {
      currency,
      amount,
      poolAddress,
      walletParams
    }

    this.lendingStore
      .depositCollateral(payload)
      .then(txid => {
        setTimeout(() => {
          this.walletStore.addPendingTx({ txid: txid, txType: constants.TX_DEPOSIT })
          this.onSuccess()
        }, 1000)
      })
      .catch(error => {
        this.onError(error.message)
      })
  }
}
</script>

<style lang="scss">
.content-gas-setting {
  padding: 0px 25px 20px;
}
.outputselect {
  color: #cccccc;
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    box-shadow: unset !important;
    background-color: #3a3b4400;
    color: #ffffff !important;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: unset;
  }
  .theme--light.v-input--is-disabled input,
  .theme--light.v-input--is-disabled textarea {
    color: #ffffff !important;
  }
}
.theme--light.v-stepper {
  background: #ffffff00 !important;
}
.blur-card {
  background-color: transparent;
  position: relative;
  color: white;
}
.blur-card:before {
  background-color: transparent;
  content: '';
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -16px;
  box-shadow: inset 0 0 2000px rgba(116, 116, 116, 0.356) !important;
  backdrop-filter: blur(20px);
  z-index: -1;
}
</style>
<style lang="scss" scoped>
.disabled {
  background: #8b8b8b !important;
  cursor: no-drop;
  width: 100%;
  margin-top: 20px;
}
.generate-keydtore {
  height: 506px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.generate-keydtore p {
  color: #ffffff;
}
.generate-keydtore p {
  margin-top: 15px;
}
.nopadding .icon {
  transform: scale(0.8);
}
.row1 {
  color: #cccccc;
  position: relative;
  font-size: 12px;
  padding: 0 2px;
}
.texttitle_hade {
  padding: 0 23px 0 15px;
}
.row1 img {
  opacity: 0.25;
  position: absolute;
  max-width: 40px;
  right: 0;
  bottom: 0;
}
.row2 {
  max-height: 150px;
  overflow-y: scroll;
  padding: 0 15px;
}
.roww2 {
  margin-bottom: 5px;
  display: flex;
  background-color: #1f2027;
  border-radius: 3px;
  cursor: pointer;
}
.roww2:hover {
  background-color: #4a2752;
}
#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #b052ee;
}

.roww2 .color_size1 {
  color: #3fc0db;
}
.roww2 .color_size2 {
  color: #c074f9;
}
.text-capitalize {
  width: 100%;
  background-color: #b052ee !important;
  color: #ffffff;
  transition: 0.5s;
  margin-top: 20px;
}
.text-capitalize1 {
  margin-top: 20px;
  width: 100%;
  color: #ffffff;
  text-transform: capitalize;
}
.headtitle_collat {
  padding: 20px 0 0 0;
}
.headtitle_collat_head {
  color: #ffffff;
  font-weight: bold;
}
.headtitle_collat_head img {
  margin-left: 5px;
}
.headtitle_collat_sub {
  color: #cccccc99;
  font-size: 13px;
}
.icon-send {
  display: flex;
  align-items: center;
  position: absolute;
  border: 1px solid white;
  border-radius: 50%;
  left: 47%;
  top: 17px;
  padding: 3px;
  background-color: #44096b;
}
.gt,
.transaction-confirmation-content small {
  color: rgb(155, 155, 155);
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.div_prices {
  background-color: #f0f0f0;
  padding: 3px 10px;
  border-radius: 3px;
}
.transaction-confirmation-wrapper {
  margin: 16px 16px 0 16px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.transaction-sender,
.transaction-receiver {
  text-align: center;
  width: 50%;
  color: white;
  padding: 17px;
  font-size: 0.8em;
}
#collat {
  height: 450px;
}
.collat_bg {
  background-color: #6e6f7d38;
}
.collat_bg2 {
  background-color: #ffffff;
}
.transaction-confirmation-content {
  font-size: 13px;
}
.transaction-confirmation-content h3,
h2 {
  color: #370757;
  font-weight: 500;
}
.action-transaction-confirmation .v-btn {
  border: 2px solid #44096b;
}
.transaction-receiver {
  background-color: #370757;
}
.transaction-sender {
  background-color: #44096b;
  border-right: 1px solid rgba(180, 180, 180, 0.555);
}
.action-transaction-confirmation,
.detail,
.modal-header {
  display: flex;
  justify-content: space-between;
}
.v-stepper__content {
  padding: 0;
}
.modal-header {
  padding: 9px !important;
  background-color: transparent;
  border-bottom: 1px solid rgba(211, 211, 211, 0.344);
  z-index: 999;
}
.v-card {
  position: relative;
}

.action-transaction-confirmation button {
  width: 48%;
}
.transaction-confirmation-content-detail p {
  margin: 0;
  text-align: end;
}
.detail p {
  margin: 0;
}
.address {
  font-size: 0.9em;
  word-break: break-all;
}
.border-bottom {
  border-bottom: 1px solid lightgray;
}
.send-detail,
.detail {
  padding: 5px 4px;
}
.detail:nth-last-of-type(2) {
  padding-bottom: 0px;
}
.detail .v-btn:not(.v-btn--round).v-size--small {
  padding: 0;
  font-size: 0.9em;
  text-transform: capitalize;
  text-decoration: underline;
  height: auto;
}

.gassetting {
  letter-spacing: 0px;
  font-size: 10px;
}
.content-wrapper {
  text-align: center;
  color: #cccccc;
  padding: 0px 20px 20px 20px;
}
.content-wrapper p {
  line-height: 1.1;
}
.content-wrapper img {
  width: 60px;
  margin-top: 17px;
  margin-bottom: 25px;
}
.outputselect {
  text-align: center;
  color: #cccccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #6e6f7d38;
}
.outputselect input {
  width: 100%;
  color: #929292;
  text-align: center;
  font-size: 16px;
}
.outputselect span {
  font-size: 13px;
}
.collateral_pd {
  padding: 20px;
}
.collateral_pddeful {
  padding: 0 16px;
}
.collateral_margin {
  margin-left: 35px;
  margin-right: 35px;
}
.gas_seting {
  padding: 2px 0;
}
.colortextoutput {
  color: #cccccc;
}
.border-bottom_1 {
  border-bottom: 1px solid #cccccc4a;
  font-size: 14px;
}
.textright {
  text-align: right;
}
.headshowwallet {
  color: #cccccc;
}
.showwallet {
  background-color: #44096b;
  border-radius: 5px 5px 0 0;
  padding: 0 20px;
}
.showwallet2 {
  background-color: #ffffff;
  padding: 0 20px;
}
.showwallet3 {
  background-color: #ffffff;
  padding: 0 20px;
}
.showwallet4 {
  background-color: #ffffff;
  border-radius: 0 0 5px 5px;
  padding: 0 20px;
}
.nopadding {
  padding: 15px 5px;
}
.nopadding img {
  width: 40px;
  margin-left: -10px;
}
.showwallet_bgd {
  background-color: #f5f5f5;
  border-radius: 5px 0 0 5px;
}
.showwallet_bgd2 {
  background-color: #f5f5f5;
  border-radius: 0 5px 5px 0;
}
.nametitlecollat {
  background: #2d0845;
  width: 78%;
  padding: 3px 13px;
  border-radius: 50px;
  float: right;
  text-align: center;
  display: flex;
  align-items: center;
}
.nametitlecollat .dot-circle {
  height: 12px;
  width: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-right: 6px;
}
.border-top-collat {
  border-top: 1px solid #cccccc;
  margin-top: 10px;
}
.font-bold {
  font-weight: bold;
  font-size: 17px;
}
.font-df {
  font-size: 13px;
}
.active {
  background-color: #441753;
}
</style>

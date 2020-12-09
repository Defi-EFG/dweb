<template>
  <div>
    <v-dialog v-model="show" max-width="420" class="send-transaction" persistent>
      <v-card class="blur-card" color="#FFFFFF00">
        <v-card-title class="modal-header">
          <v-icon></v-icon>
          <v-btn @click="onClose" icon><v-icon color="white">close</v-icon></v-btn>
        </v-card-title>
        <div class="transaction-confirmation-wrapper">
          <div class="d-flex">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div
                  @click="copyAddress(fromAddr)"
                  class="transaction-sender"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ truncateAddress(addressFilter(fromAddr)) }}
                </div>
              </template>
              <span> {{ copymessage }}</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div
                  @click="copyAddress(toAddr)"
                  class="transaction-receiver"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ truncateAddress(addressFilter(toAddr)) }}
                </div>
              </template>
              <span>{{ copymessage }}</span>
            </v-tooltip>
            <div class="icon-send"><v-icon small color="white">arrow_forward</v-icon></div>
          </div>
          <div class="transaction-confirmation-content">
            <h3>
              <strong>{{ $t('views.modal.transaction') }}</strong>
            </h3>
            <small>{{ $t('views.modal.please_transaction') }}</small>
            <div class="transaction-confirmation-content-detail">
              <div class="send-detail border-bottom">
                <span class="gt">{{ $t('views.modal.send_to') }}</span>
                <div class="d-flex justify-end">
                  <p class="address">{{ toAddr }}</p>
                </div>
              </div>
              <div class="detail border-bottom">
                <span class="gt">{{ $t('views.modal.amount') }}</span>
                <div class="d-flex justify-end">
                  <p>{{ Number(amount) }}</p>
                  <p class="ml-2">{{ selectedCurrencyName }}</p>
                </div>
              </div>
            </div>

            <div class="detail border-bottom">
              <span class="gt">{{ $t('views.modal.gas_fee') }}</span>
              <div class="text-end">
                <div class="d-flex justify-end">
                  <p>{{ gasFee }}</p>
                  <p class="ml-2">ECOC</p>
                </div>
                <v-btn @click="gasSetting()" small text color="primary">
                  <span class="gassetting">{{ $t('views.modal.gas_setting') }}</span>
                </v-btn>
              </div>
            </div>
            <div class="pt-4">
              <v-text-field
                :type="showpassword ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                :label="modal.keystore_password"
                @click:append="showpassword = !showpassword"
                v-model="password"
                v-on:keyup.enter="onConfirm"
                :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                dense
                filled
                v-on:submit.prevent="onConfirm"
              ></v-text-field>
            </div>

            <div class="errorMsg" v-if="errorMsg">
              <span>{{ $t(errorMsg) }}</span>
            </div>

            <div class="action-transaction-confirmation">
              <v-btn outlined large color="primary" class="text-capitalize" @click="onClose">{{
                $t('views.modal.cancel')
              }}</v-btn>
              <v-btn
                large
                depressed
                color="primary"
                class="text-capitalize"
                :loading="isLoading"
                @click="onConfirm"
                >{{ $t('views.modal.confirm') }}</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="gassetting" max-width="370" class="content-gas-setting">
      <v-card>
        <div class="d-flex justify-lg-space-between pt-3">
          <v-icon></v-icon>
          <v-btn icon @click="closeGasSetting"><v-icon>close</v-icon></v-btn>
        </div>
        <div class="content-gas-setting">
          <h3>{{ $t('views.modal.gas_custom') }}</h3>
          <small>{{ $t('views.modal.Increase') }}</small>
          <div class="gas-customization">
            <v-btn-toggle tile group mandatory v-model="feeTier">
              <v-btn>
                <div class="gas-custom-btn-group">
                  <p>{{ $t('views.modal.slow') }}</p>
                  <p>{{ feeTierList[0] }} ECOC</p>
                </div>
              </v-btn>
              <v-btn>
                <div class="gas-custom-btn-group">
                  <p>{{ $t('views.modal.average') }}</p>
                  <p>{{ feeTierList[1] }} ECOC</p>
                </div></v-btn
              >
              <v-btn>
                <div class="gas-custom-btn-group">
                  <p>{{ $t('views.modal.fast') }}</p>
                  <p>{{ feeTierList[2] }} ECOC</p>
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
          <div class="save-button">
            <v-btn
              color="primary"
              depressed
              block
              :disabled="totalFee <= 0"
              @click="saveGasSetting"
              >{{ $t('views.modal.save') }}</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { WalletParams } from '@/services/ecoc/types'
import { Currency } from '@/types/currency'
import WalletModule from '@/store/wallet'
import * as Ecoc from '@/services/wallet'
import { DEFAULT } from '@/services/contract'
import { copyToClipboard, getEcocTotalFee, addressFilter, truncate } from '@/services/utils'

@Component({
  components: {}
})
export default class TransactionConfirmationModal extends Vue {
  @Prop({ default: {} }) currency!: Currency
  @Prop({ default: false }) visible!: boolean
  @Prop() fromAddr!: string
  @Prop() toAddr!: string
  @Prop() amount!: string
  @Prop() txError?: string

  walletStore = getModule(WalletModule)

  feeTierList = [0.004, 0.01, 0.1]

  copymessage = this.$t('views.modal.copy_Address')
  gassetting = false
  errorMsg = ''
  password = ''
  keystore: any = ''
  keystorePassword = ''
  showpassword = false
  isLoading = false

  gasFee = 0

  feeTier = 1

  rules = {
    required: (value: any) => {
      return !!value || this.$t('views.modal.required')
    },
    min: (v: any) => {
      if (this.visible) {
        return v.length >= 6 || this.$t('views.modal.characters')
      }
    }
  }

  fee = DEFAULT.DEFAULT_FEE
  gasLimit = DEFAULT.DEFAULT_GAS_LIMIT
  gasPrice = DEFAULT.DEFAULT_GAS_PRICE

  mounted() {
    this.gasFee = this.totalFee
  }

  get show() {
    return this.visible
  }

  get isNative() {
    return this.selectedCurrencyName === 'ECOC'
  }

  get enoughBalance() {
    if (!this.ecoc) {
      return false
    }

    return Number(this.totalFee) <= Number(this.ecoc)
  }

  get totalFee() {
    if (this.isNative) return this.feeTierList[this.feeTier]
    return getEcocTotalFee(this.feeTierList[this.feeTier], this.gasPrice, this.gasLimit)
  }

  get ecoc() {
    return this.walletStore.ecoc
  }

  get walletAddress() {
    return this.walletStore.address
  }

  get selectedCurrencyName() {
    return this.currency.name || ''
  }

  get modal() {
    return this.$t('views.modal')
  }

  copyAddress(addr: string) {
    this.copymessage = this.$t('views.modal.copied')
    copyToClipboard(addr)

    setTimeout(() => {
      this.copymessage = this.$t('views.modal.copy_Address')
    }, 1000)
  }

  gasSetting() {
    this.gassetting = true
  }

  closeGasSetting() {
    this.gassetting = false
  }

  saveGasSetting() {
    this.gasFee = this.totalFee
    this.gassetting = false
  }

  truncateAddress(addr: string) {
    return truncate(addr, 15)
  }

  addressFilter(address: string) {
    return addressFilter(address)
  }

  onClose() {
    this.password = ''
    this.errorMsg = ''
    this.$emit('onClose')
  }

  async onConfirm() {
    this.isLoading = true
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
        fee: this.feeTierList[this.feeTier],
        gasLimit: this.gasLimit,
        gasPrice: this.gasPrice
      } as WalletParams

      this.password = ''
      this.errorMsg = ''
      this.$emit('onConfirm', walletParams)
    } catch (error) {
      this.errorMsg = error.message
    }
  }

  @Watch('txError')
  onTxError(msg: string) {
    this.isLoading = false
    if (msg.includes('has no matching Script')) {
      this.errorMsg = 'Invalid address format'
    } else if (msg.includes('400')) {
      this.errorMsg = 'UTXO currently unavailable, Please try again'
    } else {
      this.errorMsg = msg
    }
  }

  @Watch('visible')
  onModalClose() {
    this.isLoading = false
  }
}
</script>

<style>
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
  bottom: -20px;
  box-shadow: inset 0 0 2000px rgba(116, 116, 116, 0.356) !important;
  backdrop-filter: blur(20px);
  z-index: -1;
}
</style>
<style lang="scss" scoped>
.content-gas-setting {
  padding: 0px 25px 20px;
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
.transaction-confirmation-content small {
  font-size: 12.5px;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.transaction-confirmation-wrapper {
  margin: 16px;
  border-radius: 8px;
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
.transaction-confirmation-content {
  padding: 20px;
  background-color: white;
  font-size: 13px;
}
.transaction-confirmation-content h3 {
  color: #370757;
}
.action-transaction-confirmation .v-btn {
  border: 2px solid #44096b;
}
.transaction-receiver {
  background-color: #370757;
  cursor: pointer;
}

.transaction-sender {
  cursor: pointer;
  background-color: #44096b;
  border-right: 1px solid rgba(180, 180, 180, 0.555);
}
.action-transaction-confirmation,
.detail,
.modal-header {
  display: flex;
  justify-content: space-between;
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
  padding: 10px 4px;
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
</style>
<style lang="scss">
.gas-customization .v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
  height: 75px !important;
  border-radius: 5px !important;
  box-shadow: 0px 3px 6px #00000029;
  border: transparent;
  width: 106px;
  margin: 0;
  margin-right: 8px;
  letter-spacing: 0px;
  font-size: 0.8em;
}
.gas-customization {
  padding: 20px 0px;
  border-bottom: 1px solid rgba(177, 169, 170, 0.466);
}
.gas-custom-btn-group {
  display: flex;
  flex-direction: column;
  text-align: end;
  text-transform: capitalize;
}

.gas-custom-btn-group p {
  margin: 0px;
  color: black;
}
.gas-custom-btn-group p:nth-of-type(1) {
  font-size: 12px;
  font-weight: 800;
}
.gas-customization .v-btn--active {
  background-color: transparent !important;
  background-color: white;
  background: transparent linear-gradient(180deg, #d2bae2 0%, #f9ecff 100%);
}

.gas-actived {
  background-color: transparent !important;
  background-color: white;
  background: transparent linear-gradient(180deg, #d2bae2 0%, #f9ecff 100%);
}

.inputnumber {
  border-bottom: 1px solid rgba(177, 169, 170, 0.466);
}

.inputnumber .v-text-field__slot {
  background-color: rgba(218, 218, 218, 0.288);
  border-radius: 5px;
  padding-left: 0px 0px 0px 8px;
}
.inputnumber .v-text-field {
  padding-top: 0px;
}

.inputnumber input[type='number']::-webkit-inner-spin-button,
.inputnumber input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
  padding: 15px 3px;
}
.errorMsg {
  margin-bottom: 6px;
  background-color: #ff7878;
  color: white;
  font-size: 10px;
  padding: 6px;
  border-radius: 4px;
  font-weight: 600;
}
.not-enough {
  background-color: white;
  color: red;
}
</style>

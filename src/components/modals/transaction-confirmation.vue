<template>
  <v-dialog v-model="sendialog" max-width="400" class="send-transaction">
    <v-card class="blur-card" color="#FFFFFF00">
      <v-card-title class="modal-header">
        <v-icon></v-icon>
        <v-btn text><v-icon color="white" @click="onClose">$close</v-icon></v-btn>
      </v-card-title>
      <div class="transaction-confirmation-wrapper ">
        <div class="d-flex ">
          <div class="transaction-sender text-truncate">{{ walletAddress }}</div>
          <div class="transaction-receiver text-truncate">{{ toAddr }}</div>
          <div class="icon-send"><v-icon small color="white">$rightarrow</v-icon></div>
        </div>
        <div class="transaction-confirmation-content">
          <!-- <GasSetting ></GasSetting> -->
          <h3><strong>Transaction Confirm</strong></h3>
          <small>Please confirm the transaction</small>
          <div class="transaction-confirmation-content-detail">
            <div class="send-detail border-bottom">
              <span class="gt">Send to</span>
              <div class="d-flex justify-end">
                <p class="address">{{ toAddr }}</p>
              </div>
            </div>
            <div class="detail border-bottom">
              <span class="gt">Amount</span>
              <div class="d-flex justify-end">
                <p>{{ amount }}</p>
                <p class="ml-2">{{ selectedCurrencyName }}</p>
              </div>
            </div>
          </div>

          <div class="detail border-bottom ">
            <span class="gt">Fee</span>
            <div class="text-end">
              <div class="d-flex justify-end">
                <p>{{ fee }}</p>
                <p class="ml-2">ECOC</p>
              </div>
              <v-btn small text color="primary">
                <span class="gassetting">fee setting</span>
              </v-btn>
            </div>
          </div>
          <v-form class="pt-4">
            <v-text-field
              label="KeyStore Password"
              v-model="password"
              type="password"
              dense
              filled
            ></v-text-field
          ></v-form>
          <div class="error" v-if="errorMsg">
            <p class="error">{{ errorMsg }}</p>
          </div>
          <div class="action-transaction-confirmation">
            <v-btn outlined large color="primary" class="text-capitalize" @click="onClose"
              >Cancel</v-btn
            >
            <v-btn large depressed color="primary" class="text-capitalize" @click="onConfirm"
              >Confirm</v-btn
            >
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { WalletParams } from '@/services/ecoc/types'
import { Currency } from '@/types/currency'
import WalletModule from '@/store/wallet'
import * as Ecoc from '@/services/wallet'
import { DEFAULT } from '@/services/contract'
import GasSetting from './gas-setting-modal.vue'

@Component({
  components: { GasSetting }
})
export default class TransactionComfirmationModal extends Vue {
  @Prop({ default: {} }) currency!: Currency
  @Prop({ default: false }) visible!: boolean
  @Prop() toAddr!: string
  @Prop() amount!: string

  walletStore = getModule(WalletModule)

  sendialog = false
  errorMsg = ''
  password = ''

  fee = DEFAULT.DEFAULT_FEE
  gasLimit = DEFAULT.DEFAULT_GAS_LIMIT
  gasPrice = DEFAULT.DEFAULT_GAS_PRICE

  @Watch('visible')
  show() {
    this.sendialog = this.visible
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

  onClose() {
    this.password = ''
    this.errorMsg = ''
    this.$emit('onClose')
  }

  async onConfirm() {
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

    this.$emit('onConfirm', walletParams)
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
  bottom: -16px;
  box-shadow: inset 0 0 2000px rgba(116, 116, 116, 0.356) !important;
  backdrop-filter: blur(20px);
  z-index: -1;
}
</style>
<style lang="scss" scoped>
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

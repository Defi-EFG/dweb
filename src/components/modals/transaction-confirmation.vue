<template>
  <div>
    <v-dialog v-model="sendialog" max-width="400" class="send-transaction">
      <v-card class="blur-card" color="#FFFFFF00">
        <v-card-title class="modal-header">
          <v-icon></v-icon>
          <v-btn @click="sendialog = false" text><v-icon color="white">$close</v-icon></v-btn>
        </v-card-title>
        <div class="transaction-confirmation-wrapper ">
          <div class="d-flex ">
            <div class="transaction-sender">{{ truncateAddress(addr) }}</div>
            <div class="transaction-receiver">receiver</div>
            <div class="icon-send"><v-icon small color="white">$rightarrow</v-icon></div>
          </div>
          <div class="transaction-confirmation-content">
            <h3><strong>Transaction Confirm</strong></h3>
            <small>Please confirm the transaction</small>
            <div class="transaction-confirmation-content-detail">
              <div class="send-detail border-bottom">
                <span class="gt">Send to</span>
                <div class="d-flex justify-end">
                  <p class="address">receiver</p>
                </div>
              </div>
              <div class="detail border-bottom">
                <span class="gt">Amount</span>
                <div class="d-flex justify-end">
                  <p></p>
                  <!-- number -->
                  <p class="ml-2">ECOC</p>
                </div>
              </div>
            </div>

            <div class="detail border-bottom ">
              <span class="gt">Gas Fee</span>
              <div class="text-end">
                <div class="d-flex justify-end">
                  <p></p>
                  <!-- number -->
                  <p class="ml-2">ECOC</p>
                </div>
                <v-btn @click="gasSetting()" small text color="primary">
                  <span class="gassetting">gas setting</span>
                </v-btn>
              </div>
            </div>

            <v-form class="pt-4">
              <v-text-field
                v-model="keystorePassword"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                name="input-10-1"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                label="Keystore Password"
                color="primary"
                filled
                :rules="[rules.required, rules.min]"
                elevation-0
                dense
                required
              ></v-text-field
            ></v-form>

            <div class="action-transaction-confirmation">
              <v-btn
                @click="sendialog = false"
                outlined
                large
                color="primary"
                class="text-capitalize"
                >Cancel</v-btn
              >
              <v-btn large depressed color="primary" class="text-capitalize">Confirm</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="gassetting" max-width="370" class="content-gas-setting">
      <v-card>
        <div class="d-flex justify-lg-space-between pt-3 ">
          <v-icon></v-icon>
          <v-btn text @click="gassetting = false"><v-icon>$close</v-icon></v-btn>
        </div>
        <div class="content-gas-setting">
          <h3>Gas Customization</h3>
          <small>Increase the processing time of your transaction by using higher gas fee</small>
          <div class="gas-customization">
            <v-btn-toggle tile group>
              <v-btn>
                <div class="gas-custom-btn-group">
                  <p>Slow</p>
                  <p>-20 min</p>
                  <p>1.00 ECOC</p>
                </div>
              </v-btn>
              <v-btn>
                <div class="gas-custom-btn-group">
                  <p>Average</p>
                  <p>-20 min</p>
                  <p>1.00 ECOC</p>
                </div></v-btn
              >
              <v-btn>
                <div class="gas-custom-btn-group">
                  <p>Fast</p>
                  <p>-20min</p>
                  <p>1.00 ECOC</p>
                </div></v-btn
              >
            </v-btn-toggle>
          </div>
          <div class="inputnumber d-flex justify-space-between">
            <v-col cols="6" class="pb-0">
              <label for="Gas price:">Gas price:</label
              ><v-text-field type="number" v-model="gasPrice"></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <label for="Gas limit:">Gas limit:</label
              ><v-text-field type="number" v-model="gasLimit"></v-text-field>
            </v-col>
          </div>
          <div class="d-flex justify-space-between py-2">
            <p>New Transaction Fee:</p>
            <div class="text-end">
              <p class="mb-0">3.00 ECOC</p>
              <small>-20 sec</small>
            </div>
          </div>
          <div class="save-button ">
            <v-btn color="primary" depressed block>save</v-btn>
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
@Component({
  components: {}
})
export default class TransactionComfirmationModal extends Vue {
  walletStore = getModule(WalletModule)
  gassetting = false
  sendialog = false
  gasPrice: any = ''
  gasLimit: any = ''
  show = false
  keystorePassword = ''
  @Prop() visible!: boolean
  rules = {
    required: (value: any) => {
      return !!value || 'Required.'
    },
    min: (v: any) => {
      return v.length >= 6 || 'Min 6 characters'
    }
  }

  get addr() {
    return this.walletStore.address
  }

  @Watch('visible')
  checkSendModalActive() {
    this.sendialog = this.visible
    if (this.sendialog !== true) {
      this.sendialog = true
    }
  }
  gasSetting() {
    this.gassetting = true
  }
  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 8
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
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
</style>

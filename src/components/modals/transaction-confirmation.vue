<template>
  <div class="send-transaction">
    <v-dialog v-model="sendialog" max-width="400">
      <v-card class="blur-card">
        <v-card-title class="headline modal-header">
          <v-icon></v-icon>
          <v-btn text @click="close()"><v-icon color="white">$close</v-icon></v-btn>
        </v-card-title>
        <div class="transaction-confirmation-wrapper ">
          <div class="d-flex ">
            <div class="transaction-sender">Ed76D6...F985</div>
            <div class="transaction-receiver">0x76D6...F065</div>
            <div class="icon-send"><v-icon small color="white">$rightarrow</v-icon></div>
          </div>
          <div class="transaction-confirmation-content">
            <GasSetting></GasSetting>
            <h3><strong>Transaction Confirm</strong></h3>
            <small>Please confirm the transaction</small>
            <div class="transaction-confirmation-content-detail">
              <div class="send-detail border-bottom">
                <span class="gt">Send to</span>
                <div class="d-flex justify-end">
                  <p class="address">0x76D684b9D7C925A56B65u77637h18B235F065</p>
                </div>
              </div>
            </div>
            <div class="detail border-bottom">
              <span class="gt">Amount</span>
              <div class="d-flex justify-end">
                <p>200.00</p>
                <p class="ml-2">ECOC</p>
              </div>
            </div>
          </div>

          <div class="detail border-bottom ">
            <span class="gt">Gas Fee</span>
            <div class="text-end">
              <div class="d-flex justify-end">
                <p>2.00</p>
                <p class="ml-2">ECOC</p>
              </div>
              <v-btn small text color="primary">
                <span class="gassetting">gas setting</span>
              </v-btn>
            </div>
          </div>
          <v-form class="pt-4">
            <v-text-field label="KeyStore Password" dense filled></v-text-field
          ></v-form>
          <div class="action-transaction-confirmation">
            <v-btn outlined large color="primary" class="text-capitalize">Cancel</v-btn>
            <v-btn large depressed color="primary" class="text-capitalize">Confirm</v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import GasSetting from './gas-setting-modal.vue'
@Component({
  components: {}
})
export default class TransactionComfirmationModal extends Vue {
  sendialog = false
  @Prop() visible!: boolean
  @Watch('visible')
  close() {
    this.sendialog = !this.sendialog
    console.log(this.sendialog)
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

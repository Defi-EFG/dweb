<template>
  <v-dialog v-model="Collateralmodel" max-width="500" class="send-transaction" id="collat">
    <v-stepper v-model="step" class="blur-card">
      <v-stepper-items>
        <!-- Welcome to ECOC Finance Governance -->
        <v-stepper-content step="1">
          <v-card color="#FFFFFF00">
            <v-card-title class="modal-header">
              <v-icon></v-icon>
              <v-btn @click="close()" text><v-icon color="white">$close</v-icon></v-btn>
            </v-card-title>
            <div class="transaction-confirmation-wrapper collateral_pddeful ">
              <div class="headtitle_collat">
                <div class="headtitle_collat_head">Select the Loaner</div>
                <div class="headtitle_collat_sub">
                  You can only change the loaner once you repay all the borrowed.
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
                    <v-row class="row1 roww2">
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop Loener">
                          1jMgdd...kjxbJB
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_1 textafter">
                          <span class="color_size1">$8,123,456.79</span>
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_2 textafter">
                          <span class="color_size2">$4,189,402.65</span>
                        </div>
                      </v-col>
                      <img class="row1_img" src="@/assets/backg_01.svg" />
                    </v-row>
                    <v-row class="row1 roww2">
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop Loener">
                          1jMgdd...kjxbJB
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_1 textafter">
                          <span class="color_size1">$8,123,456.79</span>
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_2 textafter">
                          <span class="color_size2">$4,189,402.65</span>
                        </div>
                      </v-col>
                      <img class="row1_img" src="@/assets/backg_01.svg" />
                    </v-row>
                    <v-row class="row1 roww2">
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop Loener">
                          1jMgdd...kjxbJB
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_1 textafter">
                          <span class="color_size1">$8,123,456.79</span>
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_2 textafter">
                          <span class="color_size2">$4,189,402.65</span>
                        </div>
                      </v-col>
                      <img class="row1_img" src="@/assets/backg_01.svg" />
                    </v-row>
                    <v-row class="row1 roww2">
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop Loener">
                          1jMgdd...kjxbJB
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_1 textafter">
                          <span class="color_size1">$8,123,456.79</span>
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_2 textafter">
                          <span class="color_size2">$4,189,402.65</span>
                        </div>
                      </v-col>
                      <img class="row1_img" src="@/assets/backg_01.svg" />
                    </v-row>
                    <v-row class="row1 roww2">
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop Loener">
                          1jMgdd...kjxbJB
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_1 textafter">
                          <span class="color_size1">$8,123,456.79</span>
                        </div>
                      </v-col>
                      <v-col lg="4" md="4" cols="4">
                        <div class="margintop color_2 textafter">
                          <span class="color_size2">$4,189,402.65</span>
                        </div>
                      </v-col>
                      <img class="row1_img" src="@/assets/backg_01.svg" />
                    </v-row>
                  </div>
                </v-container>
              </div>
              <v-btn large depressed class="text-capitalize" @click="connectStep()">Select</v-btn>
            </div>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card color="#FFFFFF00">
            <v-card-title class="modal-header">
              <v-btn @click="leftarrow()" text><v-icon color="white">$leftarrow</v-icon></v-btn>
              <v-btn @click="close()" text><v-icon color="white">$close</v-icon></v-btn>
            </v-card-title>
            <div class="transaction-confirmation-wrapper collateral_pddeful">
              <div class="content-wrapper ">
                <div class="content-logo ">
                  <div class="logo"><img src="@/assets/ECOC.svg" alt="" /></div>
                </div>
                <h3 class="">Use ECOC as a collateral?</h3>
                <p class="lightgray--text">
                  You can deposit more once you repay all the borrowed. (Borrow power is 0)
                </p>
              </div>
              <div class="transaction-confirmation-content outputselect">
                <span>Loaner</span>
                <div>ES1jMgpCNbDcBUdXz1JkJVxJWGkkjxbJB</div>
              </div>
              <v-btn large depressed class="text-capitalize" @click="nextcollat()">Next</v-btn>
            </div>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card color="#FFFFFF00">
            <v-card-title class="modal-header">
              <v-btn @click="leftarrow3()" text><v-icon color="white">$leftarrow</v-icon></v-btn>
              <v-btn @click="close()" text><v-icon color="white">$close</v-icon></v-btn>
            </v-card-title>
            <div class="transaction-confirmation-wrapper collat_bg2 collateral_margin">
              <div class="d-flex ">
                <div class="transaction-sender">Ed76D6...F985</div>
                <div class="transaction-receiver">0x76D6...F065</div>
                <div class="icon-send"><v-icon small color="white">$rightarrow</v-icon></div>
              </div>
              <div class="transaction-confirmation-content">
                <div class="collateral_pd">
                  <GasSetting></GasSetting>
                  <h3><strong>Transaction Confirm</strong></h3>
                  <small>Please confirm the transaction</small>
                  <div class="transaction-confirmation-content-detail">
                    <div class="detail">
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
                    <v-btn outlined large color="primary" class="text-capitalize1">Cancel</v-btn>
                    <v-btn
                      large
                      depressed
                      color="primary"
                      class="text-capitalize"
                      @click="outputsuccess()"
                      >Confirm</v-btn
                    >
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-card color="#FFFFFF00">
            <v-card-title class="modal-header">
              <v-icon></v-icon>
              <v-btn @click="close()" text><v-icon color="white">$close</v-icon></v-btn>
            </v-card-title>
            <div class="transaction-confirmation-wrapper collateral_pddeful ">
              <div class="headtitle_collat">
                <div class="headtitle_collat_head font-bold">
                  Deposit Successful!<img src="@/assets/icon/Check.svg" alt="" />
                </div>
                <v-container colortextoutput>
                  <v-row class="border-bottom_1 ">
                    <v-col cols="6" class="nopadding">Collateral</v-col>
                    <v-col cols="6" class="textright nopadding">+100.00 ECOC</v-col>
                  </v-row>
                  <v-row class="border-bottom_1">
                    <v-col cols="6" class="nopadding">Borrow Power Used (New)</v-col>
                    <v-col cols="6" class="textright nopadding">22.7 %</v-col>
                  </v-row>
                  <v-row class="border-bottom_1">
                    <v-col cols="6" class="nopadding">Total Borrow Power (New)</v-col>
                    <v-col cols="6" class="textright nopadding">$880.00</v-col>
                  </v-row>
                </v-container>
                <v-container>
                  <v-row class="headshowwallet showwallet">
                    <v-col cols="6">ECOC Wallet</v-col>
                    <v-col cols="6" class="textright"
                      ><div class="nametitlecollat">
                        <div class="dot-circle"></div>
                        Ed76...F985
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
                    <v-col cols="6" class="nopadding showwallet_bgd">Total Sent (Collateral)</v-col>
                    <v-col cols="6" class="textright nopadding showwallet_bgd2">-100.00 ECOC</v-col>
                  </v-row>
                  <v-row class="showwallet4 font-df">
                    <v-col cols="6" class="nopadding border-top-collat">Ending Balance:</v-col>
                    <v-col cols="6" class="textright nopadding border-top-collat"
                      >1998.00 ECOC</v-col
                    >
                  </v-row>
                </v-container>
              </div>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import GasSetting from './gas-setting-modal.vue'
@Component({
  components: {}
})
export default class TransactionComfirmationModal extends Vue {
  Collateralmodel = false
  step = 1
  @Prop() visible!: boolean
  @Watch('visible')
  close() {
    this.Collateralmodel = !this.Collateralmodel
  }
  connectStep() {
    this.step = 2
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
  outputsuccess() {
    this.step = 5
  }
}
</script>
<style lang="scss">
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
  margin-top: 20px;
  width: 100%;
  background-color: #b052ee !important;
  color: #ffffff;
}
.text-capitalize1 {
  margin-top: 20px;
  width: 100%;
  color: #ffffff;
}
.headtitle_collat {
  padding: 20px 0;
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
.collat_bg {
  background-color: #6e6f7d38;
}
.collat_bg2 {
  background-color: #ffffff;
}
.transaction-confirmation-content {
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
.content-wrapper {
  text-align: center;
  color: #cccccc;
  padding: 20px;
}
.content-wrapper p {
  line-height: 1.1;
}
.content-wrapper img {
  width: 80px;
}
.outputselect {
  text-align: center;
  color: #cccccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #6e6f7d38;
}
.outputselect span {
  font-size: 11px;
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
</style>

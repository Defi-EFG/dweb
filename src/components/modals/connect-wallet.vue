<template>
  <v-dialog v-model="connectwalletmodal" width="394">
    <v-card class="rounded-lg">
      <v-card-title class="headline modal-header">
        <v-btn text @click="dialog = true" @click.stop="connectwalletmodal = false"
          ><v-icon>$leftarrow</v-icon></v-btn
        >
        <v-btn text @click="connectwalletmodal = false"><v-icon>$close</v-icon></v-btn>
      </v-card-title>
      <div class="create-wallet-wraper bg-white rounded-lg">
        <div class="pb-5 mb-7">
          <h3 class="primary--text"><b>Connect ECOC Wallet</b></h3>
          <small class="lightgray--text">Please input your keystore text or file.</small>
        </div>
        <template>
          <div class="upload_input">
            <v-file-input
         
            accept="application/json"
              outlined
              prepend-icon="mdi-upload"
              label="Your keystore text..."
              truncate-length="auto"
            ></v-file-input>
            <div class="uploadkeystorefile">
              <span class="lightgray--text  mr-2">or</span> <a href="">Upload keystore file </a>
            </div>
            <div class="action-wrapper">
              <v-btn large class="mb-5" color="primary" >
                <h4 class="text-capitalize font-weight-light">Next</h4>
              </v-btn>
            </div>
          </div>
        </template>
      </div>
    </v-card>
  </v-dialog>
</template> 
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class ConnectWalletModal extends Vue {
  connectwalletmodal = false
  @Prop() visible!: boolean
  @Watch('visible')
  CreateWalletdialog() {
    this.connectwalletmodal = this.visible
  }

  onSuccess() {
    this.$emit('onSuccess')
  }
  onClose() {
    this.$emit('onClose')
  }
}
</script>


<style>
.create-wallet-wraper .v-label {
  font-size: 0.8em;
}
.create-wallet-wraper .v-input__slot:before {
  border: none !important;
}
.v-text-field__details {
  margin-bottom: 0px !important;
}
.upload_input .v-input__prepend-outer {
  margin-right: 0px !important;
  position: absolute;
  right: 0;
  bottom: -25px;
}
.upload_input .v-file-input .v-file-input__text {
  word-break: break-all !important;
  height: 150px !important;
}
.upload_input .v-icon.v-icon.v-icon--link::before{
   color: white;
}

.upload_input .v-icon.v-icon.v-icon--link{
  border: 1px solid;
  border-radius: 50%;
  background-color: #44096B;
  color: white;
  padding: 4px;
      font-size: revert;
}
</style>

<style lang="scss" scoped>
.v-btn--fab.v-size--small {
  height: 30px;
  width: 30px;
}

.v-text-field {
  margin: 0;
  padding: 0;
  flex-direction: column-reverse;
}
.uploadkeystorefile {
  font-size: 0.8em;
  display: flex;
  justify-content: flex-end;
  text-align: end;
  padding-right: 25px;
  margin-right: 5px;
}
.uploadkeystorefile a {
  text-decoration-line: underline;
}
.modal-header {
  display: flex;
  justify-content: space-between;

  padding: 9px !important;
  border-bottom: 1px solid #0000002e;
}
.action-wrapper {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.create-wallet-wraper {
  padding: 29px 33px 38px 36px;
}
</style>
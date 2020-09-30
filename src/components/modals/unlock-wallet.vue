<template>
  <div>
    <v-dialog v-model="unlockwalletModal" max-width="394" persistent>
      <v-stepper v-model="step">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-icon></v-icon>
                <v-btn text @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>
              <div class="content-wrapper ">
                <div class="content-logo ">
                  <div class="logo"><img src="@/assets/icon/light-logo-defi.svg" alt="" /></div>
                </div>
                <h3 class="primary--text">Welcome to</h3>
                <h3 class="primary--text">ECOC Finance Governance</h3>
                <p class="lightgray--text">Please create or connect your wallet</p>
              </div>
              <div class="action-wrapper more-space">
                <v-btn
                  @click.native="step = 2"
                  large
                  class="mb-5 border"
                  color="white"
                  elevation="1"
                >
                  <div class="d-flex align-center">
                    <div class="img-btn-logo">
                      <img src="@/assets/icon/addwallate.svg" alt="crate new wallet" />
                    </div>
                    <h4 class="text-capitalize primary--text">Create new ECOC Wallet</h4>
                  </div>
                </v-btn>
                <v-btn large color="white" elevation="1" @click.native="step = 4">
                  <div class="img-btn-logo">
                    <img src="@/assets/icon/createnew.svg" alt="Connect wallet" />
                  </div>
                  <h4 class="mr-6 text-capitalize primary--text">Connect ECOC Wallet</h4>
                </v-btn>
              </div>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-btn text @click.native="step = 1"><v-icon>$leftarrow</v-icon></v-btn>
                <v-btn text @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>
              <CreateWalletModal />
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-btn text @click.native="step = 1"><v-icon>$leftarrow</v-icon></v-btn>
                <v-btn text @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>

              <ConnectWalletModal />
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import ConnectWalletModal from './connect-wallet.vue'
import CreateWalletModal from './create-wallet.vue'
@Component({
  components: {
    CreateWalletModal,
    ConnectWalletModal
  }
})
export default class UnlockwalletModal extends Vue {
  createwalletdialog = false
  connectwalletmodal = false
  step = 1
  @Prop() visible!: boolean
  unlockwalletModal = this.visible
  @Watch('visible')
  show() {
    this.unlockwalletModal = this.visible
  }
  onOpenModal() {
    this.createwalletdialog = !this.createwalletdialog
    console.log('testonOpenModal')

    // this.unlockWalletOpen = !this.unlockWalletOpen
  }
  submit() {
    this.step = 1
  }

  // onOpenCreateWallet() {
  //   console.log('CreateNewWallet1')
  //   this.createwalletdialog = !this.createwalletdialog
  // }
  // onOpenConnectWallet() {
  //   console.log('connect')
  //   this.connectwalletmodal = !this.connectwalletmodal
  //}
  onClose() {
    console.log('emitOnclose')
    this.$emit('onClose')
  }
  onCreatewallet() {
    this.$emit('onCreatewallet')
  }
  onSuccess() {
    this.$emit('onSuccess')
  }

  onCloseX() {
    this.onClose()
  }

  onCloseModalcreate() {
    this.createwalletdialog = !this.createwalletdialog
    console.log('onCloseModalcreate')
  }
  ConnectWallet() {
    // this.onOpenConnectWallet()
    console.log('connect', this.connectwalletmodal)
  }
}
</script>

<style lang="scss" scoped>
.v-stepper__content {
  padding: 0;
}
.content-wrapper {
  text-align: center;
}
.action-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.action-wrapper .elevation-1 {
  box-shadow: 0px 3px 8px #00000021 !important;
}
.more-space {
  padding: 38px 36px 77px 36px;
}

.topspace {
  padding: 30px 0px;
}

.logo {
  width: 76px;
  padding: 14px;
  border-radius: 50%;
  height: 76px;
  margin: 0 auto;
  box-shadow: -1px 1px 9px -4px #a5a5a5;
  margin-top: 48px;
  margin-bottom: 7px;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
v-btn {
  height: auto;
}

.v-application p {
  margin-bottom: 0;
}
.v-btn.v-size--small {
  margin-left: 10px;
}
.v-input__slot:before {
  border-color: none !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;

  padding: 9px !important;
  border-bottom: 1px solid #0000002e;
}

.bg-white {
  background-color: white;
}

.v-btn.v-size--small {
  margin-left: 10px;
}
.img-btn-logo {
  width: 40px;
  height: 33px;
  margin-bottom: 6px;
  padding-bottom: 3px;
  margin-right: 9px;
}
.img-btn-logo img {
  width: 100%;
  height: 100%;
}
.v-btn.v-size--small {
  margin-left: 10px;
}
.efg-header {
  max-width: 1088px;
  margin: 0 auto;

  a {
    font-weight: bold;
    color: #ffffff;
    padding: 0 10px;
    text-decoration: unset;

    &.router-link-exact-active {
      color: rgb(192, 116, 249);
      border-bottom: 2px solid rgb(192, 116, 249);
      span {
        color: rgb(192, 116, 249);
        transition: 0.3s;
      }
    }
  }
  span:hover {
    color: rgb(192, 116, 249);
    transition: 0.3s;
  }
  a:hover {
    color: rgb(192, 116, 249);
    transition: 0.3s;
  }
}

.active {
  color: #c074f9 !important;
  transition: 0.5s;
}
.efg-logo {
  width: 28px;
  height: auto;
  margin-right: 0px;
}

.user-status {
  width: auto;
  height: auto;
  background-color: #2a3047 !important;

  .dot-circle {
    height: 12px;
    width: 12px;
    background-color: #c074f9;
    border-radius: 50%;
    margin-right: 6px;
  }
  .theme--dark.v-btn:hover {
    color: #42b983;
    transition: 0.3s;
  }
}
.color_bg {
  background: #2b1534 linear-gradient(180deg, #2c1635 0%, #2b1534 100%) 0% 0% no-repeat padding-box;
  position: fixed;
  width: 100%;
  transition: 0.3s;
  z-index: 20;
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #27272700;
}
</style>

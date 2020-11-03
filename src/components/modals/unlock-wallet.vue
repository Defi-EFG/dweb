<template>
  <div>
    <v-dialog v-model="unlockwalletModal" max-width="394" persistent>
      <v-stepper v-model="step">
        <v-stepper-items>
          <!-- Welcome to ECOC Finance Governance -->
          <v-stepper-content step="1">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-icon></v-icon>
                <v-btn icon @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
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
                <v-btn @click="createStep" large class="mb-5 border" color="white" elevation="1">
                  <div class="d-flex align-center">
                    <div class="img-btn-logo">
                      <img src="@/assets/icon/addwallate.svg" alt="crate new wallet" />
                    </div>
                    <h4 class="text-capitalize primary--text">Create new ECOC Wallet</h4>
                  </div>
                </v-btn>
                <v-btn large color="white" elevation="1" @click="connectStep">
                  <div class="img-btn-logo">
                    <img src="@/assets/icon/createnew.svg" alt="Connect wallet" />
                  </div>
                  <h4 class="mr-6 text-capitalize primary--text">Connect ECOC Wallet</h4>
                </v-btn>
              </div>
            </v-card>
          </v-stepper-content>

          <!-- Keystore File Generated! -->

          <v-stepper-content step="3">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-btn icon disabled><v-icon></v-icon></v-btn>
                <v-btn icon @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>
              <template v-if="this.value < 100">
                <div class="generate-keystore bg-white">
                  <v-progress-circular
                    :rotate="360"
                    :size="120"
                    :width="9"
                    color="primary"
                    :value="this.value"
                    indeterminate
                  ></v-progress-circular>
                  <p>{{ msg }}</p>
                </div>
              </template>
              <template v-else-if="this.value >= 100">
                <div class="create-wallet-wraper bg-white rounded-lg">
                  <div class="pb-5 mb-4">
                    <h3 class="primary--text"><b>Keystore File Generated!</b></h3>
                    <small class="lightgray--text"
                      >Please save your keystore file to connect your wallet.</small
                    >
                  </div>
                  <v-textarea
                    name="input-7-1"
                    filled
                    :value="createWalletKeystore"
                    auto-grow
                    disabled
                  ></v-textarea>
                  <div class="action-wrapper">
                    <v-btn large class="mb-5" color="primary" @click="downloadkeystore()">
                      <h4 class="text-capitalize font-weight-light">Download Keystore File</h4>
                    </v-btn>
                    <small class="connect">
                      Already saved your keystore file?.
                      <v-btn text @click="connectStep">Connect</v-btn>
                    </small>
                  </div>
                </div>
              </template>
            </v-card>
          </v-stepper-content>

          <!-- Create ECOC Wallet -->

          <v-stepper-content step="2">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-btn icon @click="welcomeStep"><v-icon>$leftarrow</v-icon></v-btn>
                <v-btn icon @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>
              <div class="create-wallet-wraper bg-white rounded-lg">
                <div class="pb-5 mb-7">
                  <h3 class="primary--text"><b>Create ECOC Wallet</b></h3>
                  <small class="lightgray--text"
                    >Please set your password to generate a keystore file</small
                  >
                </div>
                <template>
                  <v-text-field
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    name="input-10-1"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    :rules="[rules.required, rules.min]"
                    label="Set your password"
                    color="primary"
                    filled
                    elevation-0
                    dense
                    required
                    v-model="createWalletPassword"
                  ></v-text-field>
                </template>
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  name="input-10-2"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :rules="[
                    rules.required,
                    rules.min,
                    createWalletPassword === confirmPassword || 'Password must match'
                  ]"
                  label="Repeat your password"
                  color="primary"
                  filled
                  elevation-0
                  dense
                  required
                  v-model="confirmPassword"
                ></v-text-field>
                <div class="action-wrapper">
                  <v-btn large class="mb-5" color="primary" @click="onCreateWallet">
                    <h4 class="text-capitalize font-weight-light">Create</h4>
                  </v-btn>
                  <small class="lightgray--text mt-1 mb-4"
                    >Needed password to unlock keystore file.</small
                  >
                </div>
              </div>
            </v-card>
          </v-stepper-content>
          <!-- Connect ECOC Wallet-->
          <v-stepper-content step="4">
            <v-card class="rounded-lg">
              <v-card-title class="headline modal-header">
                <v-btn icon @click="welcomeStep"><v-icon>$leftarrow</v-icon></v-btn>
                <v-btn icon @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>
              <div class="create-wallet-wraper bg-white rounded-lg">
                <div class="pb-5 mb-7">
                  <h3 class="primary--text"><b>Connect ECOC Wallet</b></h3>
                  <small class="lightgray--text">Please input your keystore text or file.</small>
                </div>
                <template>
                  <div class="upload_input">
                    <v-textarea
                      filled
                      auto-grow
                      label="Your keystore text..."
                      outlined
                      v-model="keystore"
                      required
                      :rules="[rules.required]"
                    ></v-textarea>

                    <text-reader @load="keystore = $event"></text-reader>

                    <div class="errorMsg" v-if="errorMsg2">
                      <span>{{ errorMsg2 }}</span>
                    </div>
                    <div class="errorMsg" v-else-if="errormsg">
                      <span>{{ errormsg }}</span>
                    </div>

                    <div class="action-wrapper">
                      <v-btn
                        large
                        v-if="upload || keystore.length > 6"
                        @click="confirmKeystore"
                        class="mb-5"
                        color="primary"
                      >
                        <h4 class="text-capitalize font-weight-light">Next</h4>
                      </v-btn>
                      <v-btn v-else large class="mb-5" color="primary" disabled>
                        <h4 class="text-capitalize font-weight-light">Next</h4>
                      </v-btn>
                    </div>
                  </div>
                </template>
              </div>
            </v-card>
          </v-stepper-content>

          <!-- Keystore password -->

          <v-stepper-content step="5">
            <v-card class="rounded-lg">
              <v-card-title class="headline modal-header">
                <v-btn icon @click="connectStep"><v-icon>$leftarrow</v-icon></v-btn>
                <v-btn icon @click.stop="onCloseX()"><v-icon>$close</v-icon></v-btn>
              </v-card-title>

              <div class="create-wallet-wraper bg-white rounded-lg">
                <div class="pb-5 mb-7">
                  <h3 class="primary--text"><b>Keystore password</b></h3>
                  <small class="lightgray--text">Please input your keystore password</small>
                </div>
                <template>
                  <v-form ref="form">
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
                </template>

                <div class="errorMsg" v-if="errorMsg">
                  <span>{{ errorMsg }}</span>
                </div>

                <div class="action-wrapper">
                  <v-btn large class="mb-5" color="primary" @click="onUnlockWallet()">
                    <h4 class="text-capitalize font-weight-light">Connect</h4>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Loading from './loading.vue'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import StakingModule from '@/store/staking'
import TextReader from './text-reader.vue'
import * as Ecoc from '@/services/wallet'
@Component({
  components: {
    Loading,
    TextReader
  }
})
export default class UnlockwalletModal extends Vue {
  @Prop() visible!: boolean
  @Prop({ default: 'Generating keystore file...' }) msg!: string
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)
  stakingStore = getModule(StakingModule)

  upload = false
  keystore: any = ''
  keystorePassword = ''
  files = true
  createWalletKeystore = ''
  createWalletPassword = ''
  confirmPassword = ''
  show = false
  step = 1
  unlockwalletModal = this.visible
  errorMsg = ''
  errorMsg2 = ''
  errormsg = ''
  password = ''
  value = 0
  rules = {
    required: (value: any) => {
      return !!value || 'Required.'
    },
    min: (v: any) => {
      return v.length >= 6 || 'Min 6 characters'
    }
  }

  @Watch('visible')
  checkvisible() {
    this.unlockwalletModal = this.visible
  }
  onClose() {
    this.step = 1
    this.$emit('onClose')
  }
  onCloseX() {
    this.onClose()
  }

  onCreateWallet() {
    const password = this.createWalletPassword
    this.walletStore.createNewWallet(password).then(keystore => {
      if (this.createWalletKeystore === '') {
        this.createWalletKeystore = keystore
        if (this.createWalletKeystore === keystore) {
          setInterval(() => {
            this.value += 50
            if (this.value === 101) {
              clearInterval(this.value)
              return (this.value = 0)
            }
          }, 1000)
        }
      }

      if (password.length < 6) {
        this.step = 2
      } else if (password != this.confirmPassword) {
        this.step = 2
      } else {
        this.step = 3
      }
    })
  }

  createStep() {
    this.step = 2
  }

  connectStep() {
    this.step = 4
  }

  welcomeStep() {
    this.step = 1
  }

  async confirmKeystore() {
    try {
      const obj = JSON.parse(this.keystore)
      if ('version' in obj && 'content' in obj && 'crypto' in obj) {
        this.step = 5
      } else {
        this.errormsg = 'Wrong format of keystore text'
        console.log(this.errormsg)
      }
    } catch (error) {
      this.errorMsg2 = 'Wrong format of keystore file'
      console.log(this.errorMsg2)
    }
  }

  async onUnlockWallet() {
    try {
      const keystore = this.keystore
      const password = this.keystorePassword
   

      this.walletStore.importWallet({ keystore, password }).then(() => {
        this.onClose()
      })
    } catch (error) {
      this.errorMsg = error.message
    }
  }

  getFormattedTime() {
    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth() + 1
    const d = today.getDate()
    const h = today.getHours()
    const mi = today.getMinutes()
    const sec = today.getSeconds()
    return `${y}-${m}-${d}T${h}-${mi}-${sec}`
  }

  downloadkeystore() {
    const blob = new Blob([this.createWalletKeystore], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `keystore-${this.getFormattedTime()}.json`
    link.click()
  }
  get ecoc() {
    return this.walletStore.ecoc
  }
  get walletAddress() {
    return this.walletStore.address
  }
}
</script>

<style>
.connect .v-btn:not(.v-btn--round).v-size--default {
  color: #44096b;
  padding: 0;
  margin: 0;
  font-size: 0.9em;
  font-weight: 700;
  text-transform: capitalize;
  text-decoration: underline;
}
.disable-events {
  pointer-events: none;
}
.create-wallet-wraper .v-label {
  font-size: 0.8em;
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
.upload_input .v-icon.v-icon.v-icon--link::before {
  color: white;
}

.upload_input .v-icon.v-icon.v-icon--link {
  border: 1px solid;
  border-radius: 50%;
  background-color: #44096b;
  color: white;
  padding: 4px;
  font-size: revert;
}
</style>
<style lang="scss" scoped>
.connect {
  text-align: end;
}
.v-btn--fab.v-size--small {
  height: 30px;
  width: 30px;
}
.create-wallet-wraper {
  padding: 29px 33px 43px 36px;
}
.v-stepper__content {
  padding: 0;
}
.v-text-field {
  margin: 0;
  padding: 0;
  flex-direction: column-reverse;
}
.content-wrapper {
  text-align: center;
}
.uploadkeystorefile {
  font-size: 0.8em;
  display: flex;
  justify-content: flex-end;
  text-align: end;
  padding-right: 25px;
  margin-right: 5px;
}
.action-wrapper,
.upl .action-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.action-wrapper .elevation-1 {
  box-shadow: 0px 3px 8px #00000021 !important;
}
.more-space {
  padding: 38px 36px 56px 36px;
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
.logo img,
.img-btn-logo img {
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

.img-btn-logo {
  width: 40px;
  height: 33px;
  margin-bottom: 6px;
  padding-bottom: 3px;
  margin-right: 9px;
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
.generate-keystore {
  height: 460px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.generate-keystore p {
  margin-top: 15px;
}
.errorMsg {
  background-color: white;
  color: red;

  font-size: 10px;
  padding: 4px;
}
</style>

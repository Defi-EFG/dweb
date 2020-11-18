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
                <v-btn icon @click.stop="onCloseX()">
                  <v-icon>$close</v-icon>
                </v-btn>
              </v-card-title>
              <div class="content-wrapper ">
                <div class="content-logo ">
                  <div class="logo"><img src="@/assets/icon/light-logo-defi.svg" alt="" /></div>
                </div>
                <h3 class="primary--text">{{ $t('views.modal.welcome_to') }}</h3>
                <h3 class="primary--text">{{ $t('views.modal.ecoc_finance') }}</h3>
                <p class="lightgray--text">{{ $t('views.modal.Please_create') }}</p>
              </div>
              <div class="action-wrapper more-space">
                <v-btn @click="toStep(2)" large class="mb-5 border" color="white" elevation="1">
                  <div class="d-flex align-center">
                    <div class="img-btn-logo">
                      <img src="@/assets/icon/addwallate.svg" alt="crate new wallet" />
                    </div>
                    <h4 class="text-capitalize primary--text">
                      {{ $t('views.modal.create_new_ECOC') }}
                    </h4>
                  </div>
                </v-btn>
                <v-btn large color="white" elevation="1" @click="toStep(4)">
                  <div class="img-btn-logo">
                    <img src="@/assets/icon/createnew.svg" alt="Connect wallet" />
                  </div>
                  <h4 class="mr-6 text-capitalize primary--text">
                    {{ $t('views.modal.connect_ECOC') }}
                  </h4>
                </v-btn>
              </div>
            </v-card>
          </v-stepper-content>

          <!-- Keystore File Generated! -->

          <v-stepper-content step="3">
            <v-card>
              <v-card-title class="headline modal-header">
                <v-btn icon disabled>
                  <v-icon></v-icon>
                </v-btn>
                <v-btn icon @click.stop="onCloseX()">
                  <v-icon>$close</v-icon>
                </v-btn>
              </v-card-title>
              <template v-if="loading">
                <div class="generate-keystore bg-white">
                  <v-progress-circular
                    :rotate="360"
                    :size="120"
                    :width="9"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                  <p>{{ $t(msg) }}</p>
                </div>
              </template>
              <template v-else-if="!loading">
                <div class="create-wallet-wraper bg-white rounded-lg">
                  <div class="pb-5 mb-4">
                    <h3 class="primary--text">
                      <b>{{ $t('views.modal.keystore_gen') }}</b>
                    </h3>
                    <small class="lightgray--text">{{ $t('views.modal.please_sav') }}</small>
                  </div>
                  <div class="mb-4 keystorewrapper">
                    <div class="keystorefield" @click="copyAddress(createWalletKeystore)">
                      {{ createWalletKeystore }}
                    </div>
                    <div v-if="copymessage === 'Copied'" class="sctext">
                      {{ $t('views.modal.copymessage1') }}
                    </div>
                    <div v-else class="copyaddres">
                      {{ $t('views.modal.copymessage') }}
                    </div>
                  </div>
                  <div class="action-wrapper">
                    <v-btn large class="mb-5" color="primary" @click="downloadkeystore()">
                      <h4 class="text-capitalize font-weight-light">
                        {{ $t('views.modal.download_keystore') }}
                      </h4>
                    </v-btn>
                    <small class="connect">
                      {{ $t('views.modal.Already') }}
                      <v-btn text @click="toStep(4)">{{ $t('views.modal.connect') }}</v-btn>
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
                <v-btn icon @click="toStep(1)">
                  <v-icon>$leftarrow</v-icon>
                </v-btn>
                <v-btn icon @click.stop="onCloseX()">
                  <v-icon>$close</v-icon>
                </v-btn>
              </v-card-title>
              <div class="create-wallet-wraper bg-white rounded-lg">
                <div class="pb-5 mb-7">
                  <h3 class="primary--text">
                    <b>
                      <b>{{ $t('views.modal.create_ecoc') }}</b></b
                    >
                  </h3>
                  <small class="lightgray--text"
                    >{{ $t('views.modal.please_set_your') }}
                    <span class=" text-btn" @click="openPrivatekeyfield()" text>{{
                      $t('views.modal.use_privatekey')
                    }}</span>
                  </small>
                </div>
                <transition name="fade">
                  <template v-if="showPrivateKetTextfield">
                    <div class="private-key-feild">
                      <v-textarea
                        ref="openprivate"
                        rows="2"
                        auto-grow
                        :label="modal.create_wallet_with"
                        filled
                        class="loginwithprivatekey"
                        elevation-0
                        dense
                        required
                        v-model="privatekey"
                      ></v-textarea>
                    </div>
                  </template>
                </transition>

                <template>
                  <v-text-field
                    ref="passwordsetupRef"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    name="input-10-1"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    :rules="[rules.required, rules.min]"
                    :label="modal.set_your_password"
                    color="primary"
                    filled
                    elevation-0
                    dense
                    required
                    v-model="createWalletPassword"
                  ></v-text-field>
                </template>

                <v-text-field
                  ref="confirmPasswordRef"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :rules="[
                    rules.required,
                    rules.min,
                    createWalletPassword === confirmPassword || modal.password_must_match
                  ]"
                  :label="modal.repeat_your_password"
                  color="primary"
                  filled
                  elevation-0
                  dense
                  required
                  v-on:keyup.enter="onCreateWallet"
                  v-model="confirmPassword"
                ></v-text-field>
                <div class="errorMsg" if="errorPrivatekey">
                  <span>{{ errorPrivatekey }}</span>
                </div>
                <div class="action-wrapper">
                  <v-btn large class="mb-5" color="primary" @click="onCreateWallet">
                    <h4 class="text-capitalize font-weight-light">
                      {{ $t('views.modal.create') }}
                    </h4>
                  </v-btn>
                  <small class="lightgray--text mt-1 mb-4">{{
                    $t('views.modal.needed_password')
                  }}</small>
                </div>
              </div>
            </v-card>
          </v-stepper-content>

          <!-- Connect ECOC Wallet-->
          <v-stepper-content step="4">
            <v-card class="rounded-lg">
              <v-card-title class="headline modal-header">
                <v-btn icon @click="toStep(1)">
                  <v-icon>$leftarrow</v-icon>
                </v-btn>
                <v-btn icon @click.stop="onCloseX()">
                  <v-icon>$close</v-icon>
                </v-btn>
              </v-card-title>

              <div class="create-wallet-wraper bg-white rounded-lg">
                <div class="pb-5 mb-7">
                  <h3 class="primary--text">
                    <b>{{ $t('views.modal.connect_ECOC') }}</b>
                  </h3>
                  <small class="lightgray--text">{{ $t('views.modal.please_input') }}</small>
                </div>
                <template>
                  <div class="upload_input">
                    <v-textarea
                      ref="uploadkeystoreRef"
                      filled
                      :label="modal.your_keystore"
                      outlined
                      v-model="keystore"
                      required
                      :rules="[rules.required]"
                    ></v-textarea>
                    <text-reader @load="keystore = $event"></text-reader>
                    <div class="errorMsg" v-if="errorMsg2">
                      <span>{{ $t('views.modal.errorMsg2') }}</span>
                    </div>
                    <div class="errorMsg" v-else-if="errormsg">
                      <span> {{ $t('views.modal.errormsg') }}</span>
                    </div>
                    <div class="action-wrapper">
                      <v-btn
                        large
                        v-if="upload || keystore.length > 6"
                        @click="confirmKeystore"
                        class="mb-5"
                        color="primary"
                      >
                        <h4 class="text-capitalize font-weight-light">
                          {{ $t('views.modal.next') }}
                        </h4>
                      </v-btn>
                      <v-btn v-else large class="mb-5" color="primary" disabled>
                        <h4 class="text-capitalize font-weight-light">
                          {{ $t('views.modal.next') }}
                        </h4>
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
                <v-btn icon @click="toStep(4)">
                  <v-icon>$leftarrow</v-icon>
                </v-btn>
                <v-btn icon @click.stop="onCloseX()">
                  <v-icon>$close</v-icon>
                </v-btn>
              </v-card-title>
              <div class="create-wallet-wraper bg-white rounded-lg">
                <div class="pb-5 mb-7">
                  <h3 class="primary--text">
                    <b>{{ $t('views.modal.keystore_password') }}</b>
                  </h3>
                  <small class="lightgray--text">{{
                    $t('views.modal.please_input_keystore')
                  }}</small>
                </div>
                <template>
                  <v-text-field
                    ref="keystorePasswordRef"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    name="input-10-1"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    :label="modal.keystore_password"
                    color="primary"
                    filled
                    :rules="[rules.required, rules.min]"
                    elevation-0
                    dense
                    v-on:keyup.enter="onUnlockWallet"
                    required
                    v-model="keystorePassword"
                  ></v-text-field>
                  <div class="errorMsg" v-if="errorMsg">
                    <span>{{ $t(errorMsg) }}</span>
                  </div>
                  <div class="action-wrapper">
                    <v-btn large class="mb-5" color="primary" @click="onUnlockWallet">
                      <h4 class="text-capitalize font-weight-light">
                        {{ $t('views.modal.connect') }}
                      </h4>
                    </v-btn>
                  </div>
                </template>
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
import TextReader from './TextReader.vue'
import { copyToClipboard } from '@/services/utils'
@Component({
  components: {
    Loading,
    TextReader
  }
})
export default class UnlockwalletModal extends Vue {
  @Prop() visible!: boolean
  @Prop({
    default: 'Generating keystore file...'
  })
  msg!: string
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)
  stakingStore = getModule(StakingModule)
  privatekey = ''
  upload = false
  showPrivateKetTextfield = false
  keystore = ''
  keystorePassword = ''
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
  loading = false
  errorPrivatekey: string | Error = ''
  copymessage = 'Tap to copy'

  rules = {
    required: (value: any) => {
      if (this.visible) {
        return !!value || this.$t('views.modal.required')
      }
      return true
    },
    min: (v: any) => {
      if (this.visible) {
        return v.length > 6 || this.$t('views.modal.characters')
      }
      return true
    }
  }

  @Watch('visible')
  checkvisible(val: any) {
    this.unlockwalletModal = val
  }

  toStep(step: any) {
    this.step = step
    if (this.step === 5) {
      const keystorePassword: any = this.$refs.keystorePasswordRef
      this.$nextTick(() => {
        keystorePassword.focus()
      })
    }
    if (this.step === 2) {
      const passwordsetup: any = this.$refs.passwordsetupRef
      this.$nextTick(() => {
        passwordsetup.focus()
      })
    }
  }

  clearData() {
    this.keystore = ''
    this.keystorePassword = ''
    this.createWalletKeystore = ''
    this.createWalletPassword = ''
    this.confirmPassword = ''
    this.errorMsg = ''
    this.errorMsg2 = ''
    this.errormsg = ''
    this.password = ''
    this.upload = false
  }

  onClose() {
    this.toStep(1)
    this.$emit('onClose')
  }

  onCloseX() {
    this.clearData()

    this.onClose()
  }
  openPrivatekeyfield() {
    this.showPrivateKetTextfield = !this.showPrivateKetTextfield
  }
  copyAddress(keystorePassword: string) {
    this.copymessage = 'Copied'
    copyToClipboard(keystorePassword)

    setTimeout(() => {
      this.copymessage = 'Tap to copy'
    }, 1000)
  }

  onCreateWallet() {
    const password = this.createWalletPassword
    const wif = this.privatekey

    if (wif === '') {
      if (password.length < 6 || password != this.confirmPassword) {
        this.toStep(2)
      } else {
        this.walletStore.createNewWallet(password).then(keystore => {
          this.createWalletKeystore = keystore
          this.loading = true
          this.toStep(3)
          setTimeout(() => {
            this.createWalletKeystore = keystore as string
            this.loading = false
          }, 1500)
        })
      }
    } else {
      if (password.length < 6 || password != this.confirmPassword) {
        this.toStep(2)
      } else {
        this.toStep(3)
        this.walletStore
          .keystoreFromWiff({
            wif,
            password
          })
          .then(keystore => {
            this.createWalletKeystore = keystore as string
            this.loading = true
            setTimeout(() => {
              this.createWalletKeystore = keystore as string
              this.loading = false
            }, 1500)
          })
          .catch(error => {
            this.toStep(2)
            this.errorPrivatekey = error.message
          })
      }
    }
  }

  async confirmKeystore() {
    try {
      const obj = JSON.parse(this.keystore)
      if ('version' in obj && 'content' in obj && 'crypto' in obj) {
        this.toStep(5)
      } else {
        this.errormsg = 'Wrong format of keystore text'
      }
    } catch (error) {
      this.errorMsg2 = 'Wrong format of keystore file'
    }
  }

  async onUnlockWallet() {
    const keystore = this.keystore
    const password = this.keystorePassword
    this.walletStore
      .importWallet({
        keystore,
        password
      })
      .then(() => {
        this.onCloseX()
      })
      .catch(error => {
        this.errorMsg = error.message
      })
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
    const blob = new Blob([this.createWalletKeystore], {
      type: 'application/json'
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `keystore-${this.getFormattedTime()}.json`
    link.click()
  }
  get modal() {
    return this.$t('views.modal')
  }
}
</script>

<style>
.text-btn {
  font-weight: 900;
  color: #44096b;
  margin: 0px 5px;
  cursor: pointer;
  padding: 3px;
  border-radius: 5px;
  transition: 0.2s;
}

.text-btn:hover {
  background-color: #44096b63;
}

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
.keystorefield {
  cursor: pointer;
  background-color: rgba(236, 235, 235, 0.658);
  padding: 14px;
  border-radius: 5px;
}
.copyaddres {
  font-size: 14px;
  color: lightgray;
  text-align: end;
}
.sctext {
  font-size: 14px;
  text-align: end;
  color: green;
}
</style>

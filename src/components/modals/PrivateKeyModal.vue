<template>
  <div class="privatekey">
    <v-dialog v-model="checkPrivatekeyDialog" max-width="440">
      <v-card class="blur-card" color="#FFFFFF00" elevation="0">
        <v-card-title class="modal-header d-flex justify-space-between">
          <v-icon></v-icon>
          <v-btn icon @click="checkPrivatekeyDialog = false" text
            ><v-icon color="white">close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-title class="bg-header mt-7"
          ><div>
            <span>{{ $t('views.modal.ECOC_Walle') }}</span>
          </div>
          <div class="header-primarykey">
            <v-icon color="white" class="mr-2">fiber_manual_record</v-icon>
            {{ truncateAddress(addr) }}
          </div>
        </v-card-title>
        <div class="bg-white mb-5">
          <div class="d-flex">
            <h3 class="header">{{ $t('views.modal.private_key') }}</h3>
            <img src="@/assets/primarykey.svg" alt="" />
          </div>

          <div class="inputpassword" v-if="getPrivateKey() === false">
            <small>{{ $t('views.modal.please_input_key') }}</small>
            <v-text-field
              class="mt-5"
              v-model="keystorePassword"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              :rules="[rules.required, rules.min]"
              name="input-10-1"
              :label="keystore.keystore_password"
              color="primary"
              filled
              elevation-0
              dense
            >
            </v-text-field>
            <div class="action-wrapper">
              <v-btn large color="primary" @click="getPrivateKey()">{{
                $t('views.modal.access')
              }}</v-btn>
            </div>
          </div>
          <template v-if="getPrivateKey() === true">
            <v-textarea filled disabled :value="privatekey" class="textarea"> </v-textarea>
            <div class=" copybtn">
              <v-btn icon small color="primary" @click="copyPrivateKey(privatekey)">
                <v-icon light>
                  content_copy
                </v-icon></v-btn
              >
            </div>
            <div class="copy-message ">
              <transition name="fade" mode="out-in">
                <div class="copied" v-if="showCopy">{{ $t('views.modal.copied') }}!</div>
              </transition>
            </div>
          </template>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import { getKeystoreContent } from '@/services/keystore'
import { copyToClipboard } from '@/services/utils'

@Component({})
export default class PrivateKey extends Vue {
  walletStore = getModule(WalletModule)

  @Prop() visiblemodalpk!: boolean
  checkPrivatekeyDialog = false
  keystorePassword: any = ''
  show = false
  showCopy = false
  privatekey = ''
  accessPrivateKey = false

  rules = {
    required: (value: any) => {
      return !!value || this.$t('views.modal.required')
    },
    min: (v: any) => {
      return v.length >= 6 || this.$t('views.modal.characters')
    }
  }

  get addr() {
    return this.walletStore.address
  }

  get keystore() {
    return this.$t('views.modal')
  }
  @Watch('visiblemodalpk')
  checkvisible() {
    if (this.checkPrivatekeyDialog === false) {
      this.checkPrivatekeyDialog = !this.checkPrivatekeyDialog
    }
  }

  onClose() {
    this.$emit('onClose')
  }

  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 8
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }

  getPrivateKey() {
    if (
      (this.privatekey = getKeystoreContent(
        this.walletStore.keystore,
        this.keystorePassword
      ) as string)
    ) {
      return true
    } else {
      return false
    }
  }

  copyPrivateKey(privatekey: string) {
    copyToClipboard(privatekey)
    this.showCopy = true
    setTimeout(() => {
      this.showCopy = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.header-primarykey .v-icon.v-icon {
  font-size: 15px;
}
.v-dialog {
  overflow-y: hidden;
}
.header-primarykey {
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.219);
  max-height: 100px;
  padding: 0px 10px;
  font-size: 13px;
}

.header-primarykey span {
  font-size: 10px;
}
.modal-header {
  border-bottom: 1px solid rgba(211, 211, 211, 0.288);
}
.action-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.bg-white {
  background-color: white;
  margin: 0px 29px;
  padding: 26px;
}
.bg-header {
  background-color: #44096b;
  color: white;
  margin: 10px 29px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bg-header span {
  font-size: 15px;
}
@media (max-width: 400px) {
  .bg-header {
    margin: 10px 13px 0px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .bg-white {
    margin: 0px 15px;
  }
}
.header {
  color: #44096b;
  margin-right: 4px;
  font-weight: 900;
}
.textarea {
  position: relative;
}
.copybtn {
  position: absolute;
  bottom: 64px;
  right: 64px;
}
.content_copy::before {
  font-size: 18px;
}

.textareaprivatekey {
  background-color: rgba(212, 212, 212, 0.699);
  border-radius: 5px;
  color: gray;
  font-size: 14px;
  padding: 17px;
}

.copy-message {
  height: 33px;
  position: absolute;
  bottom: 65px;
  right: 95px;
}
.copied {
  width: fit-content;
  margin: auto;
  background: #8383832a;
  border-radius: 9px;
  padding: 6px 12px;
  color: #44096b;
}
</style>

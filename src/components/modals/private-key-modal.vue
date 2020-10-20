<template>
  <div class="privatekey">
    <v-dialog v-model="checkPrivatekeyDialog" max-width="440">
      <v-card class="blur-card" color="#FFFFFF00" elevation="0">
        <v-card-title class="modal-header d-flex justify-space-between">
          <v-icon></v-icon>
          <v-btn @click="checkPrivatekeyDialog = false" text
            ><v-icon color="white">$close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-title class="bg-header mt-7"
          ><div>
            <span>ECOC Wallet</span>
          </div>
          <div class="header-primarykey">
            <v-icon color="white" class="mr-2">$circle</v-icon> {{ truncateAddress(addr) }}
          </div>
        </v-card-title>
        <div class="bg-white mb-5">
          <div class="d-flex">
            <h3 class="header">Private Key</h3>
            <img src="@/assets/primarykey.svg" alt="" />
          </div>
          <small>Please input keystore password to access private key</small>
          <v-text-field
            class="mt-5"
            v-model="keystorePassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            :rules="[rules.required, rules.min]"
            name="input-10-1"
            label="Keystore Password"
            color="primary"
            filled
            elevation-0
            dense
          >
          </v-text-field>
          <div class="action-wrapper">
            <v-btn large color="primary" @click="onUnlockWallet()">Access</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
@Component({})
export default class PrivateKey extends Vue {
  walletStore = getModule(WalletModule)
  @Prop() visiblemodalpk!: boolean
  checkPrivatekeyDialog: any = ''
  keystorePassword: any = ''
  show = false
  @Watch('visiblemodalpk')
  checkvisible() {
    this.checkPrivatekeyDialog = this.visiblemodalpk
  }
  get addr() {
    return this.walletStore.address
  }
  onClose() {
    this.$emit('onClose')
  }
  rules = {
    required: (value: any) => {
      return !!value || 'Required.'
    },
    min: (v: any) => {
      return v.length >= 6 || 'Min 6 characters'
    }
  }
  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 8
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }
  onUnlockWallet() {
    console.log('access')
  }
}
</script>

<style>
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

.header {
  color: #44096b;
  margin-right: 4px;
  font-weight: 900;
}
</style>
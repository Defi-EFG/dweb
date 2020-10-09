<template>
  <div>
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img src="@/assets/efg_logo.svg" class="efg-logo" />
        <v-toolbar-title>ECOC Finance Governance</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <template v-if="!addr">
        <v-btn outlined small @click="openUnlockWallet">Unlock Wallet</v-btn>
      </template>
      <v-menu v-model="menu" v-else offset-y left>
        <template v-slot:activator="{ on }">
          <v-chip class="user-status" pill v-on="on">
            <span class="dot-circle"></span>
            <div class="address">{{ truncateAddress(addr) }}</div>
          </v-chip>
        </template>
        <v-card rounded-lg width="389" class="v-card-wrapper">
          <v-card-title class="cardheadertitle"
            ><h6>ECOC Wallet</h6>
            <v-btn text color="primary" class="mb-2" @click="logout()"
              ><span class="text-btn">Disconnect</span></v-btn
            ></v-card-title
          >
          <v-card-text>
            <v-alert rounded-lg dense color="#ebebeb" class="primary-address">
              <span>{{ addr }}</span>
            </v-alert>
            <v-btn text color="#7900B5" class="mt-1" @click="checkPrivatekeyDialog = true">
              <span class="text-btn">Private Key</span>
            </v-btn></v-card-text
          >
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-dialog v-model="checkPrivatekeyDialog" max-width="394">
      <v-card>
        <v-card-title class="bg-header"
          ><div><span>ECOC Wallet</span></div>
        </v-card-title>
        <div class="bg-white">
          <div>
            <h4>Private Key</h4>
            <img src="" alt="" />
          </div>
          <small>Please input keystore password to access private key</small>
          <v-text-field
            v-model="keystorePassword"
            name="input-10-1"
            label="Keystore Password"
            color="primary"
            filled
            elevation-0
            dense
          >
          </v-text-field>
          <div class="action-wrapper">
            <v-btn large color="primary">Access</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <UnlockWallet
      :visible="unlockWalletOpen"
      ref="unlockwalletModalRef"
      @onClose="closeUnlockWallet"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import UnlockWallet from './modals/unlock-wallet.vue'

@Component({
  components: {
    UnlockWallet
  }
})
export default class HeaderNav extends Vue {
  walletStore = getModule(WalletModule)
  unlockWalletOpen = false
  checkPrivatekeyDialog = false
  menu = false
  keystorePassword: any = ''
  get addr() {
    return this.walletStore.address
  }

  closeUnlockWallet() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }

  openUnlockWallet() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }

  logout() {
    this.walletStore.logout()
  }
  gotoHome() {
    this.$router.push('/')
  }
  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 8
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }
  PrivateKey() {
    console.log('privateModal')
  }
}
</script>

<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: auto;
  min-width: 0px;
  padding: 0px;
}
.primary-address {
  font-size: 0.9em;
  padding: 14px 10px;
}
.home {
  display: flex;
  cursor: pointer;
}
.v-card__title {
  padding: 15px 20px 0px;
}
.v-card-wrapper {
  background-color: white !important;
  padding: 8px 6px;
  border-radius: 8px;
  margin-top: 10px;
}
.text-btn {
  text-decoration: underline;
  text-transform: capitalize;
  letter-spacing: 0px;
}
.cardheadertitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cardheadertitle p,
.v-alert {
  margin: 0;
}
.efg-header {
  background-color: transparent !important;
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #27272700;
}
.efg-logo {
  width: 28px;
  height: auto;
  margin-right: 1rem;
}

.user-status {
  width: auto;
  height: auto;
  padding: 7px 10px;
  background-color: #2a3047 !important;
  margin-bottom: 10px;

  .dot-circle {
    height: 12px;
    width: 12px;
    background-color: #c074f9;
    border-radius: 50%;
    margin-right: 6px;
  }
}

/*------------------------*/
.action-wrapper {
  display: flex;
 
  flex-direction: column;
  text-align: center;
}
.bg-white {
  background-color: white;
  margin:  0px 29px;
  padding: 10px;
}
.bg-header{
background-color: red;
  margin:  10px 29px 0px;
}
</style>

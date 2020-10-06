<template>
  <div>
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img src="@/assets/efg_logo.svg" class="efg-logo" />
        <v-toolbar-title>ECOC Finance Governance</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <template v-if="!addr">
        <v-btn outlined small @click="onUnlockWallet">Unlock Wallet</v-btn>
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
            <v-btn text color="primary" class="mb-2"
              ><span class="text-btn">Disconnect</span></v-btn
            ></v-card-title
          >
          <v-card-text>
            <v-alert rounded-lg dense color="#ebebeb" class="primary-address">
              <span>{{ addr }}</span>
            </v-alert>
            <v-btn text color="#7900B5" class="mt-1">
              <span class="text-btn">Private Key</span>
            </v-btn></v-card-text
          >
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-btn outlined small @click="onunlockSuccess()">unlock wallet</v-btn>
    <UnlockWallet
      :visible="unlockWalletOpen"
      ref="unlockwalletModalRef"
      @onClose="onOpenModal"
      @onSuccess="onunlockSuccess"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  unlockWallet = false
  menu = false
  get addr() {
    return this.walletStore.address
  }
  onOpenModal() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }
  onunlockSuccess() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }
  onUnlockWallet() {
    const keystore =
      '{"version":"0.1","content":"U2FsdGVkX1/yXKNPYET2cpz51xwd02WyRZEkzuT7z1iH/SXW1s5OpKsSy5V/CUjMdziEw99eOVeuLWThC39xCyhW/kUqKu7q9ot47YD4rRo=","crypto":{"cipher":"AES"}}'
    const password = '123456'

    this.walletStore.importWallet({ keystore, password }).then(() => {
      this.walletStore.updateBalance()
      this.walletStore.updateTransactionsHistory()
    })
  }

  onLogout() {
    this.walletStore.logout()
  }

  gotoHome() {
    this.onLogout()
    this.$router.push('/')
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
</style>

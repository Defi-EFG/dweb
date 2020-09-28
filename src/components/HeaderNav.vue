<template>
  <div>
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img src="@/assets/efg_logo.svg" class="efg-logo" />
        <v-toolbar-title>ECOC Finance Governance</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <template v-if="!loggedIn">
        <v-btn outlined small @click="onOpenModal()">unlock wallet</v-btn>
    
        <UnlockWallet
          ref="unlockwalletModalRef"
          :visible="unlockWalletOpen"
          @onClose="onCloseunlockwalletModal = false"
        />

      </template>
      <v-chip class="user-status" v-else>
        <span class="dot-circle"></span>
        <div class="address">{{ truncateAddress(addr) }}</div>
      </v-chip>
    </v-app-bar>
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
  loggedIn = false
  unlockWalletOpen = false
  walletStore = getModule(WalletModule)

  get addr() {
    return this.walletStore.address
  }
  onOpenModal() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }
  onCloseunlockwalletModal() {
    console.log('ffsfdsfdsfdsfd')

    this.unlockWalletOpen = !this.unlockWalletOpen
  }
  onUnlockWallet() {
    const keystore =
      '{"version":"0.1","content":"U2FsdGVkX1/yXKNPYET2cpz51xwd02WyRZEkzuT7z1iH/SXW1s5OpKsSy5V/CUjMdziEw99eOVeuLWThC39xCyhW/kUqKu7q9ot47YD4rRo=","crypto":{"cipher":"AES"}}'
    const password = '123456'

    this.walletStore.importWallet({ keystore, password })
    this.loggedIn = true
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
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  cursor: pointer;
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
  background-color: #2a3047 !important;

  .dot-circle {
    height: 12px;
    width: 12px;
    background-color: #c074f9;
    border-radius: 50%;
    margin-right: 6px;
  }
}
</style>

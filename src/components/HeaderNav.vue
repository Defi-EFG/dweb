<template>
  <div>
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img src="@/assets/efg_logo.svg" class="efg-logo" />
        <v-toolbar-title class="header-title">ECOC Finance Governance</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <TxNotifications v-if="isWalletUnlocked"></TxNotifications>
      <template v-if="!addr">
        <v-btn outlined small @click="openUnlockWallet">{{
          $t('views.walletpage.unlock_wallet')
        }}</v-btn>
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
            ><h6>{{ $t('views.modal.ECOC_Walle') }}</h6>
            <v-btn text color="primary" class="mb-2" @click="logout()"
              ><span class="text-btn">{{ $t('views.modal.disconnect') }}</span></v-btn
            ></v-card-title
          >
          <v-card-text>
            <v-alert rounded-lg dense color="#ebebeb" class="primary-address">
              <span>{{ addr }}</span>
            </v-alert>
            <v-btn text color="#7900B5" class="mt-1" @click="checkPrivatekeyDialog">
              <span class="text-btn">{{ $t('views.modal.private_key') }}</span>
            </v-btn></v-card-text
          >
        </v-card>
      </v-menu>
    </v-app-bar>
    <UnlockWallet
      ref="unlockwalletModalRef"
      :visible="unlockWalletOpen"
      @onClose="closeUnlockWallet"
    />
    <PrivateKey :visiblemodalpk="accessPrivateKey" @onClose="onClosePrivateKey" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import UnlockWallet from './modals/UnlockWallet.vue'
import PrivateKey from './modals/PrivateKeyModal.vue'
import TxNotifications from '@/components/DeFi/TxNotifications.vue'

@Component({
  components: {
    UnlockWallet,
    PrivateKey,
    TxNotifications
  }
})
export default class HeaderNav extends Vue {
  walletStore = getModule(WalletModule)
  unlockWalletOpen = false
  accessPrivateKey = false
  menu = false

  get addr() {
    return this.walletStore.address
  }

  get isWalletUnlocked() {
    return this.walletStore.isWalletUnlocked
  }

  checkPrivatekeyDialog() {
    this.accessPrivateKey = !this.accessPrivateKey
  }

  closeUnlockWallet() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }

  openUnlockWallet() {
    this.unlockWalletOpen = !this.unlockWalletOpen
  }

  openprivatekeyDialog() {
    this.accessPrivateKey = !this.accessPrivateKey
  }

  onClosePrivateKey() {
    this.accessPrivateKey = false
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

  .dot-circle {
    height: 12px;
    width: 12px;
    background-color: #c074f9;
    border-radius: 50%;
    margin-right: 6px;
  }
}

@media (max-width: 600px) {
  .header-title {
    display: none;
  }
}
</style>

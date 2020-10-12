<template>
  <v-card class="receive-token-card" dark color="#1D212E">
    <v-toolbar class="receive-head" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">mdi-arrow-down-circle-outline</v-icon>
        <span>Receive</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="text-center">
      <VueQrcode class="qr" :value="address" :options="{ width: 200, height: 200 }"></VueQrcode>
      <div class="address-area">
        <p class="mb-1">ECOC Wallet Address:</p>
        <div class="copyable-addr">
          <div class="text-truncate">{{ address }}</div>
          <v-btn icon small class="copy" @click="copyAddress">
            <v-icon small>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="copy-message ">
        <transition name="fade" mode="out-in">
          <div class="copied" v-if="showCopy">Copied!</div>
        </transition>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'

@Component({
  components: {
    VueQrcode
  }
})
export default class ReceiveToken extends Vue {
  walletStore = getModule(WalletModule)
  showCopy = false

  copyAddress() {
    const el = document.createElement('textarea')
    el.value = this.address
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    this.showCopy = true

    setTimeout(() => {
      this.showCopy = false
    }, 1000)
  }

  get address() {
    return this.walletStore.address || 'loading...'
  }
}
</script>

<style lang="scss" scoped>
.receive-token-card {
  width: 100%;
}

.receive-head {
  background: transparent linear-gradient(270deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 16px;
  }

  .head-icon {
    font-size: 20px;
    margin-right: 8px;
  }
}

.qr {
  margin: 2.78rem;
  border-radius: 10px;
}

.address-area {
  text-align: left;
  padding: 12px 1rem 1rem 1rem;

  p {
    color: white;
  }
}

.copyable-addr {
  padding: 12px 12px 6px 12px;
  background: #363a4a;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.copy {
  margin-left: 6px;
  align-items: baseline;
}

.copy-message {
  height: 33px;
}
.copied {
  width: fit-content;
  margin: auto;
  background: #363a4a;
  border-radius: 6px;
  padding: 6px 2rem;
  color: #55e52b;
}
</style>

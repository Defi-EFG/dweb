<template>
  <div class="wallet-page">
    <token-list></token-list>
    <h1>Wallet</h1>
    {{ walletStore.address }}
    {{ walletStore.network }}

    <h1>New Wallet</h1>
    {{ newKeystore }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TokenList from '@/components/TokenList.vue'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'

@Component({
  components: {

  }
})
export default class Wallet extends Vue {
  walletStore = getModule(WalletModule)
  newKeystore = ''

  createNewWallet(password: string) {
    this.walletStore.createNewWallet(password).then(newKeystore => {
      this.newKeystore = newKeystore
    })
  }

  importKeystore(keystore: string, password: string) {
    this.walletStore.importWallet({ keystore, password })
  }

  mounted() {
    const keystore =
      '{"version":"0.1","content":"U2FsdGVkX1/yXKNPYET2cpz51xwd02WyRZEkzuT7z1iH/SXW1s5OpKsSy5V/CUjMdziEw99eOVeuLWThC39xCyhW/kUqKu7q9ot47YD4rRo=","crypto":{"cipher":"AES"}}'
    const password = '123456'

    this.importKeystore(keystore, password)
  }
}
</script>

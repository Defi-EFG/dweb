<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'

@Component({
  components: {
    //
  }
})
export default class App extends Vue {
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)

  polling = {} as NodeJS.Timeout

  get isLoggedIn(): boolean {
    return this.walletStore.address != ''
  }

  async updateLatestData() {
    if (this.isLoggedIn) {
      await this.walletStore.updateBalance()
      await this.walletStore.updateCurrenciesPrice()
      await this.walletStore.updateTransactionsHistory()
      await this.lendingStore.updateLoan(this.walletStore.address)
      await this.lendingStore.updateCollateral(this.walletStore.address)
    }
  }

  startPooling() {
    this.polling = setInterval(() => {
      this.updateLatestData()
    }, 10000)
  }

  created() {
    this.startPooling()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');

html,
body {
  font-family: 'Nunito Sans', sans-serif;
}

#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
a {
  text-decoration: unset;
}
</style>

<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'
import LendingModule from '@/store/lending'
import StakingModule from '@/store/staking'

@Component({
  components: {
    //
  }
})
export default class App extends Vue {
  walletStore = getModule(WalletModule)
  lendingStore = getModule(LendingModule)
  stakingStore = getModule(StakingModule)

  polling = {} as NodeJS.Timeout

  get isLoggedIn(): boolean {
    return this.walletStore.address != ''
  }

  @Watch('isLoggedIn')
  startstartPooling(value: boolean) {
    if (value === true) {
      console.log('Start Pooling')
      this.stakingStore.init()
      this.lendingStore.init()
      this.startPooling()
    } else {
      console.log('Stop Pooling')
      this.stopPooling()
    }
  }

  async updateLatestData() {
    if (this.isLoggedIn) {
      const currenctBlock = 15210

      //update wallet data
      await this.walletStore.updateBalance()
      await this.walletStore.updateCurrenciesPrice()
      await this.walletStore.updateTransactionsHistory()

      //update lending platform
      //await this.lendingStore.updateLoan(this.walletStore.address)
      await this.lendingStore.updateCollateral(this.walletStore.address)
      await this.lendingStore.updateLoners()

      //update staking platform
      await this.stakingStore.updateMintingInfo(this.walletStore.address)

      // update latest block
      await this.walletStore.updateLastBlock(currenctBlock)

      this.walletStore.synced()
      this.lendingStore.synced()
      this.stakingStore.synced()
    }
  }

  startPooling() {
    this.updateLatestData()
    this.polling = setInterval(() => {
      this.updateLatestData()
    }, 30000)
  }

  stopPooling() {
    this.polling = {} as NodeJS.Timeout
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

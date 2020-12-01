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
      //update wallet data
      await this.walletStore.updateBalance()
      await this.walletStore.updateCurrenciesPrice()
      await this.walletStore.updateTransactionsHistory()
      await this.walletStore.updatePendingTxStatus()

      //update lending platform
      await this.lendingStore.updateLoan(this.walletStore.address)
      await this.lendingStore.updateCollateral(this.walletStore.address)
      await this.lendingStore.updateLiquidation(this.walletStore.address)
      await this.lendingStore.updateBalance(this.walletStore.address)
      await this.lendingStore.updateMyAssets(this.walletStore.address)

      await this.lendingStore.updateSupprtedAssets()
      await this.lendingStore.updateLoners()

      //update staking platform
      await this.stakingStore.updatePlatformInfo()
      await this.stakingStore.updateStakingInfo(this.walletStore.address)
      await this.stakingStore.updatePendingInfo(this.walletStore.address)

      // update latest block
      await this.walletStore.updateLastBlock()

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
@font-face {
  font-family: 'Nunito Sans';
  src: url('assets/fonts/NunitoSans-Regular.ttf') format('truetype');
}

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

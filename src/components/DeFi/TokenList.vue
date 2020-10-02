<template>
  <div class="token-container">
    <div class="card-grad-border" v-for="(currency, index) in currencies" :key="index">
      <v-card class="token-card">
        <v-card-text class="token-text">
          <div class="token-symbol" @click="selectCurency(index)">
            <img :src="currency.icon" />
            {{ currency.name }}
          </div>
        </v-card-text>
        <v-card-text>
          <div class="token-balance text-right">
            <div class="label">Total Balance</div>
            <div class="value">{{ currency.balance }} {{ currency.name }}</div>
            <div class="estimated">
              ≈ {{ getEstimatedValue(currency.balance, currency.price) }} USD
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import BigNumber from 'bignumber.js'
import WalletModule from '@/store/wallet'

@Component({
  components: {}
})
export default class TokenList extends Vue {
  walletStore = getModule(WalletModule)

  get currencies() {
    return this.walletStore.currencies
  }

  getEstimatedValue(amount: string, price: string | null) {
    if (!price) return 0
    return new BigNumber(amount).multipliedBy(new BigNumber(price))
  }

  selectCurency(index: number) {
    this.walletStore.selectCurrency(index).then(() => {
      //
    })
  }
}
</script>

<style lang="scss" scoped>
.token-container {
  background-color: #363c50;
  color: white;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  overflow: auto;
}

.token-card {
  background: transparent linear-gradient(233deg, #202639 0%, #313546 100%) 0% 0% no-repeat
    padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  width: 260px;

  .token-text {
    color: white;
  }

  .token-symbol {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: medium;

    img {
      width: 24px;
      margin-right: 0.5rem;
    }
  }

  .token-balance {
    color: white;
    padding-left: 2rem;
    padding-top: 2rem;

    .label {
      margin-bottom: 0.7rem;
    }

    .value {
      font-size: x-large;
      margin-bottom: 0.5rem;
    }

    .estimated {
      opacity: 0.8;
    }
  }
}

.card-grad-border {
  height: fit-content;
  background: transparent linear-gradient(183deg, #6212c9 0%, #9023bf 100%) 0% 0% no-repeat
    padding-box;
  padding-left: 10px;
  border-radius: 6px;
  margin-right: 5px;
}
</style>

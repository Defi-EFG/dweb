<template>
  <div class="token-container">
    <div class="card-grad-border" v-for="(token, index) in mockData" :key="index">
      <v-card class="token-card">
        <v-card-text class="token-text">
          <div class="token-symbol">
            <img src="@/assets/efg_logo.svg" />
            {{ token.symbol }}
          </div>
        </v-card-text>
        <v-card-text>
          <div class="token-balance text-right">
            <div class="label">Total Balance</div>
            <div class="value">{{ token.value.toLocaleString() }} {{ token.symbol }}</div>
            <div class="estimated">≈ {{ token.estimated.toLocaleString() }} USD</div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class TokenList extends Vue {
  mockData = [
    {
      symbol: 'ECOC',
      value: 2000,
      estimated: 4000
    },
    {
      symbol: 'EFG',
      value: 20000,
      estimated: 20000
    },
    {
      symbol: 'DELAY',
      value: 500,
      estimated: 250
    },
    {
      symbol: 'USDT',
      value: 1000,
      estimated: 1000
    },
    {
      symbol: 'DoiCoin',
      value: 4000,
      estimated: 8000
    }
  ]
}
</script>

<style lang="scss" scoped>
.token-container {
  background-color: #363c50;
  color: white;
  border-radius: 6px;
  padding: 8px;
  overflow-x: auto;
  display: flex;
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
    // right: 0;
    // padding-right: 1rem;
    // padding-bottom: 1rem;

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

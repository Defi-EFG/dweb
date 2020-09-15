<template>
  <div id="nav">
    <router-link to="/defi/wallet">Wallet</router-link> |
    <router-link to="/defi/staking">Staking</router-link> |
    <router-link to="/defi/lending">Lending</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DappNav extends Vue {}
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

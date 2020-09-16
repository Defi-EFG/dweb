<template>
  <div id="nav">
    <router-link :to="{ name: 'defi-wallet' }">{{ $t('views.titles.wallet') }}</router-link> |
    <router-link :to="{ name: 'defi-staking' }">{{ $t('views.titles.staking') }}</router-link> |
    <router-link :to="{ name: 'defi-lending' }">{{ $t('views.titles.lending') }}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DefiNav extends Vue {}
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #b942a9;
    }
  }
}
</style>

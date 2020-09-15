<template>
  <div id="nav">
    <router-link :to="{ name: 'home' }">{{ $t('views.titles.home') }}</router-link> |
    <router-link :to="{ name: 'home-about' }">{{ $t('views.titles.about') }}</router-link> |
    <router-link :to="{ name: 'home-markets' }">{{ $t('views.titles.markets') }}</router-link> |
    <router-link :to="{ name: 'home-docs' }">{{ $t('views.titles.docs') }}</router-link> |
    <router-link :to="{ name: 'defi' }">App</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeNav extends Vue {}
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

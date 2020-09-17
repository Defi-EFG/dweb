<template>
  <div id="nav">
    <router-link :to="{ name: 'home' }">{{ $t('views.titles.home') }}</router-link>
    <router-link :to="{ name: 'home-about' }">{{ $t('views.titles.about') }}</router-link>
    <router-link :to="{ name: 'home-markets' }">{{ $t('views.titles.markets') }}</router-link>
    <router-link :to="{ name: 'home-docs' }">{{ $t('views.titles.docs') }}</router-link>
    <router-link :to="{ name: 'defi' }">App</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeNav extends Vue {}
</script>

<style lang="scss" scoped>
#nav {
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 10px;
    text-decoration: unset;

    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }
  }
  a:hover {
    color: #42b983;
    transition: 0.3s;
  }
}
</style>

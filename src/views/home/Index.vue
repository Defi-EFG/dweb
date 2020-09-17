<template>
  <div class="home">
    <HeaderNav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeNav from '@/components/HomeNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'

@Component({
  components: {
    HomeNav,
    HeaderNav 
  }
})
export default class Home extends Vue {}
</script>

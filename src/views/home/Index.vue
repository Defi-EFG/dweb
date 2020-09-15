<template>
  <div class="home">
    <HomeNav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeNav from '@/components/HomeNav.vue'

@Component({
  components: {
    HomeNav
  }
})
export default class Home extends Vue {}
</script>

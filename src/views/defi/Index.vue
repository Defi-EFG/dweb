<template>
  <div class="defi">
    <DefiNav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefiNav from '@/components/DefiNav.vue'

@Component({
  components: {
    DefiNav
  }
})
export default class Home extends Vue {}
</script>

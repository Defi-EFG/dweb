<template>
  <div class="home">
    <HeaderNavHome />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderNavHome from '@/components/HeaderNavHome.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    HeaderNavHome,
    Footer
  }
})
export default class Home extends Vue {}
</script>

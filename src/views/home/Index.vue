<template>
  <div class="home">
    <HeaderNav />
    <router-view />
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeNav from '@/components/HomeNav.vue'
import HeaderNav from '@/components/HeaderNavH.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    HomeNav,
    HeaderNav,
    Footer
  }
})
export default class Home extends Vue {}
</script>

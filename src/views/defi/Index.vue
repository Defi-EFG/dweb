<template>
  <div class="layout">
    <v-container>
      <div class="address-bar">
        <HeaderNav />
      </div>
    </v-container>
    <div class="content">
      <DefiNav />
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefiNav from '@/components/DefiNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'

@Component({
  components: {
    DefiNav,
    HeaderNav
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  flex-direction: column;
  background: transparent linear-gradient(0deg, #191d2c 0%, #1a2036 100%) 0% 0% no-repeat
    padding-box;
}
.content {
  padding: 0 45px 30px 45px;
  display: flex;
  position: relative;
  flex: 1;
  .row {
    width: 100%;
  }
}

.address-bar {
  text-align: right;
}
</style>

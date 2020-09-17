<template>
  <div class="layout">
    <v-container>
      <div class="address-bar">
        <v-chip class="ma-2">Default</v-chip>
      </div>
      <div class="content">
        <DappNav />
        <transition name="page" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DappNav from '@/components/DefiNav.vue'

@Component({
  components: {
    DappNav
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
  min-height: 95vh;
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

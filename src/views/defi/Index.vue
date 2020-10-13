<template>
  <div class="layout">
    <v-container>
      <div class="address-bar">
        <HeaderNav />
      </div>
    </v-container>
    <v-responsive>
      <div class="content">
        <DefiNav />
        <div class="main-container">
          <div class="inner-container">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </v-responsive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefiNav from '@/components/DeFi/DefiNav.vue'
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
  background-attachment: fixed;
  min-height: 100vh;
  flex-direction: column;
  background: transparent linear-gradient(0deg, #191d2c 0%, #1a2036 100%) 0% 0% no-repeat
    padding-box;
}
.content {
  margin: 0 70px 20px;
  display: flex;
  position: relative;
  flex: 1;
  align-self: center;
  .row {
    width: 100%;
  }
}

.main-container {
  width: -webkit-fill-available;
  .inner-container {
    position: relative;
    height: 100%;
  }
}

.address-bar {
  text-align: right;
}

@media (max-width: 1440px) {
  .content {
    margin: 0 20px 20px;
  }
}
</style>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

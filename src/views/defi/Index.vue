<template>
  <div class="layout">
    <div class="head-wrapper">
      <HeaderNav />
    </div>
    <v-responsive>
      <div class="content">
        <DefiNav v-if="!isMobileDevice" />
        <MenuDropdown v-else />
        <div class="main-container">
          <div class="inner-container">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </v-responsive>
    <DeFiFooter></DeFiFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefiNav from '@/components/DeFi/DefiNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import MenuDropdown from '@/components/DeFi/MenuDropdown.vue'
import DeFiFooter from '@/components/DeFi/DeFiFooter.vue'

@Component({
  components: {
    DefiNav,
    HeaderNav,
    MenuDropdown,
    DeFiFooter
  }
})
export default class Home extends Vue {
  isMobileDevice = false

  mounted() {
    this.isMobileDevice = window.innerWidth < 1264
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    window.addEventListener('resize', function() {
      self.isMobileDevice = this.window.innerWidth < 1264
    })
  }
}
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
  margin: 0 70px 35px;
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
  width: -moz-available;
  .inner-container {
    position: relative;
    height: 100%;
  }
}

.head-wrapper {
  position: relative;
  z-index: 1;
  margin: 15px 60px;
}

@media (max-width: 1440px) {
  .content {
    margin: 0 20px 20px;
  }

  .head-wrapper {
    margin: 15px 10px;
  }
}

@media (max-width: 1264px) {
  .content {
    flex-wrap: wrap;
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

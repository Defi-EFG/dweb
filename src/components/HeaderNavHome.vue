<template>
  <div class="color_bg">
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img src="@/assets/efg_logo.svg" class="efg-logo" />
        <v-toolbar-title>ECOC Finance Governance</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>

      <router-link :to="{ name: 'home-docs' }">{{ $t('views.titles.docs') }}</router-link>
      <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">{{
        $t('views.titles.whitepaper')
      }}</a>
      <v-btn outlined small @click="gotoDashboard">Dashboard</v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HeaderNavHome extends Vue {
  gotoHome() {
    this.$router.push('/')
  }

  gotoDashboard() {
    this.$router.push('defi')
  }
}
</script>

<style lang="scss" scoped>
.v-btn.v-size--small {
  margin-left: 10px;
}

.home {
  display: flex;
  cursor: pointer;
}

.efg-header {
  max-width: 1088px;
  margin: 0 auto;

  a {
    font-weight: bold;
    color: #ffffff;
    padding: 0 10px;
    text-decoration: unset;

    &.router-link-exact-active {
      color: rgb(192, 116, 249);
      border-bottom: 2px solid rgb(192, 116, 249);
      span {
        color: rgb(192, 116, 249);
        transition: 0.3s;
      }
    }
  }
  span:hover {
    color: rgb(192, 116, 249);
    transition: 0.3s;
  }
  a:hover {
    color: rgb(192, 116, 249);
    transition: 0.3s;
  }
}

.active {
  color: #c074f9 !important;
  transition: 0.5s;
}
.efg-logo {
  width: 28px;
  height: auto;
  margin-right: 10px;
}

.user-status {
  width: auto;
  height: auto;
  background-color: #2a3047 !important;

  .dot-circle {
    height: 12px;
    width: 12px;
    background-color: #c074f9;
    border-radius: 50%;
    margin-right: 6px;
  }
  .theme--dark.v-btn:hover {
    color: #42b983;
    transition: 0.3s;
  }
}
.color_bg {
  background: #2b1534 linear-gradient(180deg, #2c1635 0%, #2b1534 100%) 0% 0% no-repeat padding-box;
  position: fixed;
  width: 100%;
  transition: 0.3s;
  z-index: 20;
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #27272700;
}
</style>

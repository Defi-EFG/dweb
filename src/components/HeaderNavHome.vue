<template>
  <div class="color_bg">
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img width="28" height="28" src="@/assets/efg_logo.svg" alt="efgLogo" class="efg-logo" />
        <v-toolbar-title id="name_title">{{ $t('views.main.name') }}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <div class="navbar">
        <router-link :to="{ name: 'home-Introduction' }">Introduction</router-link>
        <router-link :to="{ name: 'home-Tutorial' }">Tutorial</router-link>
        <div class="dropdown">
          <button class="dropbtn">
            Documents
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">White Paper</a>
            <a href="#">Yellow Paper</a>
            <a href="#">EFG Audit</a>
            <a href="#">GPT Audit</a>
          </div>
        </div>
        <a href="#home" class="Dashboard">
          <v-btn outlined small @click="gotoDashboard">{{ $t('views.titles.dashboard') }}</v-btn></a
        >
      </div>
      <v-row id="menu_s">
        <v-col>
          <v-card-title>
            <v-menu class="bg-bu">
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-app-bar-nav-icon><v-icon>menu</v-icon></v-app-bar-nav-icon>
                </v-btn>
              </template>
              <v-list color="menu">
                <v-list-item>
                  <div class="menu_bu">
                    <ul>
                      <li>
                        <router-link :to="{ name: 'home-docs' }">{{
                          $t('views.titles.docs')
                        }}</router-link>
                      </li>
                      <li>
                        <a :href="msg" target="_blank">{{ $t('views.titles.whitepaper') }}</a>
                      </li>
                      <li>
                        <a :href="msgpdf" target="_blank">{{ $t('views.titles.yellow') }}</a>
                      </li>
                      <li class="li_noberder">
                        <v-btn outlined small @click="gotoDashboard">{{
                          $t('views.titles.dashboard')
                        }}</v-btn>
                      </li>
                    </ul>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
        </v-col>
      </v-row>
      <language-switcher></language-switcher>
    </v-app-bar>
    <div class="undercontruction-dialog">
      <v-dialog :content-class="'dialog-no-box'" v-model="dialog" width="500" id="hello">
        <img class="img" :src="require(`@/assets/${underconstruction}`)" alt="" />
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LanguageSwitcher from './LanguageSwitcher.vue'

@Component({
  components: {
    LanguageSwitcher
  }
})
export default class HeaderNavHome extends Vue {
  dialog = false

  gotoHome() {
    this.$router.push('/').catch(() => {
      //
    })
  }

  gotoDashboard() {
    this.$router.push('defi')
    //this.dialog = true
  }

  get msg() {
    return this.$t('views.pdf')
  }

  get msgpdf() {
    return this.$t('views.yellowpdf')
  }
  get securitypdf() {
    return this.$t('views.securitypdf')
  }

  get underconstruction() {
    return this.$t('views.underconstruction')
  }
}
</script>

<style lang="scss">
.dialog-no-box {
  box-shadow: unset !important;
}
</style>
<style lang="scss" scoped>
.navbar {
  overflow: hidden;
}
.efg-logo {
  margin-right: 5px;
}
.navbar a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 2px 7px;
  text-decoration: none;
  margin-left: 8px;
  margin-right: 8px;
}

.dropdown {
  float: left;
  overflow: hidden;
  margin-top: 9px;
  padding: 2px 5px;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 2px 5px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  font-weight: bold;
}
.dropdown:hover .dropbtn {
  color: #c074f9;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #513464;
  min-width: 110px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  font-weight: bold;
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}
#menu_s {
  display: none;
}
.v-card__title {
  float: right;
}
.bg-bu {
  backdrop-filter: blur(20px);
}
.menu_bu {
  overflow-y: auto;
  pointer-events: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  z-index: inherit;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  position: relative;
  border-radius: 5px;
  background-color: #2c1635;
}
.menu_bu::before {
  content: '';
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.233);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}
.efg-header {
  max-width: 1088px;
  margin: 0 auto;
  a {
    font-weight: bold;
    color: #ffffff;
    padding: 11px 0px 0px 0px;
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
.v-list-item {
  margin-top: 0px;
}
.lg_select {
  width: 70px;
  margin-top: 15px;
}
.v-menu__content {
  top: 56px !important;
  backdrop-filter: blur(20px);
  width: 40%;
  max-width: 100% !important;
}
.theme--dark.v-navigation-drawer {
  background-color: #ededed;
}
.v-navigation-drawer--is-mobile:not {
  box-shadow: unset;
}
.li_noberder {
  border-bottom: 0px solid #cccccc;
}
.dashboard {
  padding-left: 10px;
}

.v-list {
  padding: 0;
}
.v-list-item {
  padding: 0;
}

.home {
  display: flex;
  cursor: pointer;
}

.color_bg {
  background: #24142f linear-gradient(180deg, #251430 0%, #251430 100%) 0% 0% no-repeat padding-box;
  position: fixed;
  width: 100%;
  transition: 0.3s;
  z-index: 20;
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #27272700;
}

@media only screen and (max-width: 840px) {
  ul {
    list-style-type: none;
    padding: 10px 10px;
    position: relative;
  }
  li {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #cccccc;
  }
  .navbar {
    display: none;
  }
  .sub_menu_div {
    display: flex;
  }
  #menu_s {
    display: block;
  }
  .efg-header a {
    color: #000000;
  }

  ul {
    color: #000000;
    font-weight: 700;
    width: 100%;
  }
  li:hover {
    color: #c074f9;
    font-weight: 700;
    width: 100%;
    cursor: pointer;
  }
  ul li a {
    color: #ffffff;
  }
  ul li a:hover {
    color: #c074f9;
  }
  ul li button {
    border: 1px solid #ffffff;
    color: #ffffff;
  }
  .v-btn__content {
    color: #ffffff !important;
  }
  .v-btn.v-size--small {
    color: #ffffff;
  }
  .v-btn.v-size--small:hover {
    color: #000000;
    background-color: #c074f9;
    border: 0px solid #ffffff;
  }
  #name_title {
    display: none;
  }
  #menu_s {
    margin-top: -10px;
  }
  .v-btn--icon.v-size--default .v-icon,
  .v-btn--fab.v-size--default .v-icon {
    font-size: 40px;
  }
}
@media only screen and (max-width: 670px) {
  .color_bg {
    padding: 12px 0px 4px 12px;
  }
  .lg_select .v-select > .v-input__control > .v-input__slot {
    width: 57px !important;
  }
}
</style>

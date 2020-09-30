<template>
  <div class="color_bg">
    <v-app-bar class="efg-header" flat dark>
      <div class="home" @click="gotoHome">
        <img src="@/assets/efg_logo.svg" class="efg-logo" />
        <v-toolbar-title id="name_title">{{ $t('views.main.name') }}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <div class="desktop_menu">
        <router-link :to="{ name: 'home-docs' }">{{ $t('views.titles.docs') }}</router-link>
        <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">{{
          $t('views.titles.whitepaper')
        }}</a>
        <v-btn outlined small @click="gotoDashboard">Dashboard</v-btn>
      </div>
      <v-row id="menu_s">
        <v-col>
          <v-card-title>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>
                </v-btn>
              </template>
              <v-list color="menu">
                <v-list-item>
                  <ul>
                    <li>
                      <router-link :to="{ name: 'home-docs' }">{{
                        $t('views.titles.docs')
                      }}</router-link>
                    </li>
                    <li>
                      <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">{{
                        $t('views.titles.whitepaper')
                      }}</a>
                    </li>
                    <li class="li_noberder"><v-btn outlined small @click="gotoDashboard">Dashboard</v-btn></li>
                  </ul>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
        </v-col>
      </v-row>
      <div class="lg_select">
        <v-select
          v-model="select"
          :items="items"
          item-text="state"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </div>
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
  data() {
    return {
      drawer: false,
      group: null,
      select: { state: 'EN', abbr: 'EN' },
      items: [
        { state: 'EN', abbr: 'EN' },
        { state: '中文', abbr: '中文' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.v-btn.v-size--small {
  margin-left: 10px;
}
#menu_s {
  display: none;
}
.v-card__title {
  float: right;
}
.lg_select {
  width: 70px;
  margin-top: 15px;
}
.v-menu__content {
  width: 40%;
  max-width: 100% !important;
}
.theme--dark.v-navigation-drawer {
  background-color: #ededed;
}
.v-navigation-drawer--is-mobile:not {
  box-shadow: unset;
}

li {
  padding: 10px 0;
  text-align: center;
  border-bottom: 1px solid #cccccc;
}
.li_noberder {
  border-bottom: 0px solid #cccccc;
}
.dashboard {
  padding-left: 10px;
}
.v-list-item {
  padding: 0;
}
ul {
  list-style-type: none;
  padding: 10px 10px;
}
.home {
  display: flex;
  cursor: pointer;
}

.submenu_detail {
  position: absolute;
  width: 50%;
  height: 500px;
}
.desktop_menu {
  width: 100%;
  text-align: right;
  margin-right: 50px;
}
.lg_div {
  top: 50px !important;
}
.sub_menu_div {
  display: none;
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
.v-sheet.v-list {
  margin-top: 45px !important;
  border-radius: 5px;
}
.efg-logo {
  width: 28px;
  height: auto;
  margin-right: 10px;
}
.v-btn--outlined .v-btn__content .v-icon,
.v-btn--round .v-btn__content .v-icon {
  color: #ffffff;
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
@media only screen and (max-width: 760px) {
  .desktop_menu {
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
  .v-btn--icon.v-size--default .v-icon, .v-btn--fab.v-size--default .v-icon {
    font-size: 40px;
  }
}
</style>

<template>
  <div class="color_bg">
    <v-app-bar class="efg-header" flat dark>
      <img src="@/assets/efg_logo.svg" class="efg-logo" />
      <router-link to="/" style="color:#ffffff; border-bottom: 0px solid rgb(192, 116, 249);">
        <v-toolbar-title>ECOC Finance Governance</v-toolbar-title></router-link
      >
      <v-spacer></v-spacer>
      <template v-if="!loggedIn">
        <router-link :to="{ name: 'home-docs' }">{{ $t('views.titles.docs') }}</router-link>
        <router-link :to="{ name: 'home-whitepaper' }">{{
          $t('views.titles.whitepaper')
        }}</router-link>
        <v-btn outlined small @click.stop="dialog = true">Dashboard </v-btn>
      </template>

      <v-chip class="user-status" v-else>
        <span class="dot-circle"></span>
        <div class="address">{{ truncateAddress(addr) }}</div>
      </v-chip>
    </v-app-bar>

    <v-dialog v-model="dialog" width="450">
      <v-card>
        <v-card-title class="headline modal-header">
          <v-icon></v-icon>
          <v-btn text @click="dialog = false"><v-icon>$close</v-icon></v-btn>
        </v-card-title>
        <v-card-content>
          <div class="content-wrapper ">
            <div class="content-logo ">
              <div class="logo"><img src="@/assets/icon/light-logo-defi.svg" alt="" /></div>
            </div>
            <h3 class="primary--text">Welcome to</h3>
            <h3 class="primary--text">ECOC Finance Governance</h3>
            <p class="lightgray--text">Please create or connect your wallet</p>
          </div>

          <div class="action-wrapper more-space">
            <v-btn large class="mb-5" color="white">
              <div class="d-flex align-center">
                <div class="img-btn-logo">
                  <img src="@/assets/icon/addwallate.svg" alt="crate new wallet" />
                </div>
                <h4 class=" text-capitalize primary--text ">Create new ECOCWallet</h4>
              </div>
            </v-btn>
            <v-btn large color="white">
              <div class="img-btn-logo">
                <img src="@/assets/icon/createnew.svg" alt="Connect wallet" />
              </div>
              <h4 class="mr-6 text-capitalize primary--text">Connect ECOCWallet</h4>
            </v-btn>
          </div>
        </v-card-content>

        <v-card-title class="headline modal-header">
          <v-icon>$leftarrow</v-icon>
          <v-btn text @click="dialog = false"><v-icon>$close</v-icon></v-btn>
        </v-card-title>

        <v-card-content>
          <div class="pt-10 more-space">
            <div class="mb-10 pb-6">
              <h3 class="primary--text ">Create ECOCWallet</h3>
              <p class="lightgray--text">Please set your password to generate a keystore file</p>
            </div>
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              name="input-10-1"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              label="Set your password"
              color="primary"
              filled
              elevation-0
              single-line
              dense
            ></v-text-field>
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              name="input-10-2"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              label="Repeat your password"
              color="primary"
              filled
              elevation-0
              single-line
              dense
            ></v-text-field>

            <div class="action-wrapper  ">
              <v-btn large class="mb-5" color="primary">
                Create
              </v-btn>
              <p class="lightgray--text">Needed password to unlock keystore file.</p>
            </div>
          </div>
        </v-card-content>

        <v-card-content>
          <div class="generate-keydtore">
            <v-progress-circular
              :rotate="360"
              :size="120"
              :width="9"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <p>Generating keystore file...</p>
          </div>
        </v-card-content>
        <v-card-title class="headline modal-header">
        <v-btn><v-icon>$leftarrow</v-icon></v-btn>
          <v-btn text @click="dialog = false"><v-icon>$close</v-icon></v-btn>
        </v-card-title>
        <v-card-content>
          <div class="content-wrapper-keystore-file ">
            <h4>Connect ECOC Wallet</h4>
            <small>Please input your keystore file and password</small>
        <template>
  <v-file-input show-size outlined  counter label="" dense></v-file-input>
</template>
          </div>
        </v-card-content>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HeaderNav extends Vue {
  loggedIn = false

  get addr() {
    // mockup address
    return '0x041725E91C771C05Dd3b650600CbAf2Dd5D2158E'
  }

  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 8
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)

    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }
  data() {
    return {
      // `hello` will be reactive as it is declared via `data` hook.
      dialog: false,
      show1: false,
      show: false,
      password: 'Password',

      rules: {
        required: (value: any) => !!value || 'Required.',
        min: (v: string | any[]) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.generate-keydtore {
  height: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.generate-keydtore p {
  margin-top: 15px;
}
.v-btn.v-size--small {
  margin-left: 10px;
}
.img-btn-logo {
  width: 40px;
  padding-bottom: 6px;
  height: 30px;
}
.img-btn-logo img {
  width: 100%;
  height: 100%;
}
.ef .efg-header {
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
  margin-right: 0px;
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
.modal-header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 7px 0px #0000002e;
}
.content-wrapper {
  text-align: center;
}
.action-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.more-space {
  padding: 52px 36px;
}
.topspace {
  padding: 30px 0px;
}

.logo {
  width: 90px;
  border-radius: 50%;
  height: 90px;
  margin: 0 auto;
  box-shadow: 0px 1px 9px -4px black;
  margin-top: 40px;
  margin-bottom: 40px;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
v-btn {
  height: auto;
}

.v-application p {
  margin-bottom: 0;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: transparent !important;
}
.v-input__slot {
  margin-bottom: 0 !important;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  transform: scaleX(0) !important;
}
</style>

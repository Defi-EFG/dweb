<template>
  <v-app-bar class="efg-header" flat dark>
    <img src="@/assets/efg_logo.svg" class="efg-logo" />
    <v-toolbar-title>ECOC Finance Governance</v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="!loggedIn">
      <v-btn text small>Documents</v-btn>
      <v-btn text small>White Paper</v-btn>
      <v-btn outlined small>Dashboard</v-btn>
    </template>

    <v-chip class="user-status" v-else>
      <span class="dot-circle"></span>
      <div class="address">{{ truncateAddress(addr) }}</div>
    </v-chip>
  </v-app-bar>
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
}
</script>

<style lang="scss" scoped>

.efg-header {
  background-color: transparent !important;
  position: absolute;
  max-width :1088px;
  margin:  0 auto;
}

.efg-logo {
  width: 28px;
  height: auto;
  margin-right: 1rem;
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
}
</style>

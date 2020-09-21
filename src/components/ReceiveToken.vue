<template>
  <v-card class="mx-auto" dark color="#1D212E">
    <v-toolbar class="receive-head" flat dense>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-arrow-down-circle-outline</v-icon>
        <span>Receive</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="text-center">
      <VueQrcode class="qr" :value="mockAddr" :options="{ width: 226, height: 226 }"></VueQrcode>
      <div class="address-area">
        <p class="mb-1">ECOC Wallet Address:</p>
        <div class="copyable-addr">
          <span>{{ mockAddr }}</span>
          <v-btn icon small class="copy">
            <v-icon small>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueQrcode from '@chenfengyuan/vue-qrcode'

@Component({
  components: {
    VueQrcode
  }
})
export default class ReceiveToken extends Vue {
  mockAddr = '0x76D684b9D7C925A56B6481DF3e0bDA18B235F065'
}
</script>

<style lang="scss" scoped>
.receive-head {
  background: transparent linear-gradient(270deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  span {
    font-size: 18px;
  }
}

.qr {
  margin-top: 2rem;
  border-radius: 10px;
}

.address-area {
  text-align: left;
  padding: 12px 1rem 2rem 1rem;

  p {
    color: white;
  }
}

.copyable-addr {
  padding: 1rem;
  background: #363a4a;
  border-radius: 5px;
}

.copy {
  float: right;
  align-items: baseline;
}
</style>
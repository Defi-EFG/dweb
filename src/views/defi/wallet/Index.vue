<template>
  <div class="wallet-page">
    <v-row>
      <v-col cols="8" class="pt-0 pb-0">
        <token-list></token-list>
      </v-col>
      <v-col cols="4" class="pt-0 pb-0">
        <contact-address></contact-address>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card dark color="#222738">
          <v-toolbar class="receive-send-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img src="@/assets/efg_logo.svg" />
              <span>ECOC</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="pl-2 pr-2">
            <v-col cols="6">
              <receive-token></receive-token>
            </v-col>
            <v-col cols="6">
              <send-token></send-token>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <contact-address></contact-address>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TokenList from '@/components/TokenList.vue'
import ContactAddress from '@/components/ContactAddress.vue'
import ReceiveToken from '@/components/ReceiveToken.vue'
import SendToken from '@/components/SendToken.vue'

@Component({
  components: {
    TokenList,
    ContactAddress,
    ReceiveToken,
    SendToken
  }
})
export default class Wallet extends Vue {}
</script>

<style lang="scss" scoped>
.receive-send-wrapper {
  background: transparent linear-gradient(268deg, #6212c9 0%, #9023bf 100%) 0% 0% no-repeat
    padding-box;
}

.token-symbol {
  display: flex;
  align-items: center;
  font-size: medium;

  img {
    width: 24px;
    margin-right: 0.8rem;
  }
}
</style>

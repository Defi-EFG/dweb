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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TokenList from '@/components/TokenList.vue'
import ContactAddress from '@/components/ContactAddress.vue'

@Component({
  components: {
    TokenList,
    ContactAddress
  }
})
export default class Wallet extends Vue {}
</script>

<style lang="scss" scoped>
.wallet-page {
}
</style>

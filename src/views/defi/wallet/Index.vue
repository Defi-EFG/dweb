<template>
  <div class="wallet-page">
    <token-list></token-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TokenList from '@/components/TokenList.vue'

@Component({
  components: {
    TokenList
  }
})
export default class Wallet extends Vue {}
</script>

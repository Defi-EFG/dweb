<template>
  <v-card dark class="balance-card">
    <v-card-text>
      <span class="balance-label">Supply Balance</span>
      <div class="balance">${{ balance.toFixed(2) }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class SupplyBalance extends Vue {
  @Prop({ default: 0 }) readonly balance!: number
}
</script>

<style lang="scss" scoped>
.balance-card {
  background: #2e3344;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  width: -webkit-fill-available;
  text-align: left;
}

.balance {
  font-size: 38px;
  color: #3fc0db;
  text-align: right;
  padding: 5rem 0 2.5rem 0;
}

.balance-label {
  font-size: 16px;
  color: white;
}
</style>

<style lang="scss">
.balance-card {
  .v-card__text {
    padding: 2rem !important;
  }
}
</style>

<template>
  <div class="lending-page">
    <v-row>
      <v-col cols="8" class="pt-0 pb-0 d-flex">
        <SupplyBalance></SupplyBalance>
        <SupplyBalance></SupplyBalance>
      </v-col>
      <v-col cols="4" class="pt-0 pb-0"></v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card dark color="#222738">
          <v-toolbar class="supply-withdraw-wrapper" dense flat>
            <v-toolbar-title class="token-symbol">
              <img src="@/assets/efg_logo.svg" />
              <span>ECOC</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-row class="pl-2 pr-2">
            <v-col cols="6"></v-col>
            <v-col cols="6"></v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SupplyBalance from '@/components/SupplyBalance.vue'

@Component({
  components: {
    SupplyBalance
  }
})
export default class Lending extends Vue {}
</script>

<style lang="scss" scoped>
.supply-withdraw-wrapper {
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

<template>
  <div class="defi">
    <DappNav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DappNav from "@/components/DefiNav.vue";

@Component({
  components: {
    DappNav
  }
})
export default class Home extends Vue {}
</script>

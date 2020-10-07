<template>
  <div class="lg_select">
    <!-- <a href="#" @click="selectlangs('en')">EN</a>
    <a href="#" @click="selectlangs('zh')">中文</a> -->
    <v-select
      v-model="locale"
      :items="langs"
      item-text="localizedName"
      item-value="key"
      :label="locale"
      persistent-hint
      return-object
      single-line
      @click="selectlangs(key)"
    ></v-select>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LanguageSwitcher extends Vue {
  langs = [
    {
      key: 'en',
      localizedName: 'EN'
    },
    {
      key: 'zh',
      localizedName: '中文'
    }
  ]

  locale = 'en'
  selectlangs(locale: string) {
    console.log(this.locale);
    this.$i18n.locale = this.locale.key
  }
}
</script>

<style scoped>
.v-sheet.v-list {
  margin-top: 45px !important;
  border-radius: 5px;
  background: #ffffff;
}
</style>

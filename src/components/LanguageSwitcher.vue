<template>
  <div class="lg_select">
    <v-select
      v-model="locale"
      :items="langs"
      item-text="localizedName"
      item-value="key"
      :label="locale"
      persistent-hint
      return-object
      single-line
      color="#ffffff"
      append-icon="keyboard_arrow_down"
      @input="selectlangs"
    ></v-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { supportedLanguages } from '@/i18n'

@Component
export default class LanguageSwitcher extends Vue {
  langs = supportedLanguages
  locale = this.$i18n.locale

  selectlangs(value: any) {
    this.locale = value.key
    this.$i18n.locale = this.locale
    if (this.locale === 'zh') moment.locale('zh-cn')
    else moment.locale(this.locale)
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
<style lang="scss">
.theme--light.v-select .v-select__selection--comma {
  color: rgb(255 255 255 / 87%) !important;
}
.v-application .primary--text {
  color: #ffffff !important;
  caret-color: #ffffff !important;
}
.lg_select {
  .v-select > .v-input__control > .v-input__slot {
    width: 50px !important;
  }
  .v-select__selection--comma {
    overflow: unset;
  }
  .v-select__selection--comma {
    margin: 7px 4px 7px 3px !important;
  }
  .v-application .primary--text {
    color: #ffffff !important;
    caret-color: #ffffff !important;
  }
  .v-input__icon i {
    color: #ffffff !important;
  }
  .v-text-field.v-input--is-focused > .v-input__control > .v-input__slot:after {
    color: #ffffff !important;
  }
  .v-text-field {
    padding-top: 0px !important;
    margin-top: 4px !important;
  }
}
</style>

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'
import { messages, defaultLocale, dateTimeFormats, supportedLanguages } from '@/i18n'
import vuetify from './plugins/vuetify'
import { initFilters } from '@/plugins/filters'

import 'moment/locale/zh-cn'

initFilters()

Vue.config.productionTip = false
Vue.use(VueI18n)

const localeFromBrowser = navigator.language.split('-')[0]

const i18n = new VueI18n({
  messages,
  dateTimeFormats,
  locale: supportedLanguages.find(lang => lang.key === localeFromBrowser)
    ? localeFromBrowser
    : defaultLocale,
  fallbackLocale: defaultLocale
})

moment.locale(i18n.locale)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export { i18n }

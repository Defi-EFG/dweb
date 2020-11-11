import Vue from 'vue'
import VueI18n from 'vue-i18n'

import App from './App.vue'
import router from './router'
import store from './store'
import { messages, defaultLocale, dateTimeFormats, supportedLanguages } from '@/i18n'
import vuetify from './plugins/vuetify'
import { initFilters } from '@/plugins/filters'

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

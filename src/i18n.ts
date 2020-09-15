import Vue from "vue"
import VueI18n from "vue-i18n"
import defaultMessage from "@/locales/en.json"
import moment from 'moment'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: "en",
  messages: { en: defaultMessage },
})

const loadedLocales = ["en"]

const localeTimes = {
  'en': 'en-us',
  'zh': 'zh-cn'
}

export const supportedLocales = [
  { key: "en", localizedName: "English", localizedShortName: "EN" },
  { key: "zh", localizedName: "中文", localizedShortName: "中文" },
  { key: "th", localizedName: "ภาษาไทย", localizedShortName: "ไทย" },
]

export function isLocaleSupported(localeKey: string) {
  return !!supportedLocales.find((locale) => locale.key === localeKey)
}

export async function loadLocale(locale: string) {
  // console.log("LOCALE ", locale)
  if (i18n.locale !== locale) {
    if (loadedLocales.indexOf(locale) === -1) {
      const msgs = await require(`./locales/${locale}.json`)
      i18n.setLocaleMessage(locale, msgs)
      loadedLocales.push(locale)
    }
    i18n.locale = locale
    //@ts-ignore
    moment.locale(localeTimes[locale])
  }
}

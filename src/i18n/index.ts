import Vue from "vue"
import VueI18n from "vue-i18n"
import { Locales } from './locales'

import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

Vue.use(VueI18n)

export const messages = {
  [Locales.EN]: en,
  [Locales.ZH]: zh
}

export const defaultLocale = Locales.EN

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: "zh",
  messages: { en },
})

export const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  'zh-CN': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}

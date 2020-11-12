import { Locales } from './locales'

import en from '@/locales/en.json'
import zh from '@/locales/zh.json'

export const messages = {
  [Locales.EN]: en,
  [Locales.ZH]: zh
}

export const supportedLanguages = [
  {
    key: 'en',
    localizedName: 'EN'
  },
  {
    key: 'zh',
    localizedName: '中文'
  }
]

export const defaultLocale = Locales.EN
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

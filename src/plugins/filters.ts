import Vue from 'vue'
import moment from 'moment'

export function timeFromNow(now: string | number) {
  return moment(now).fromNow()
}

export function numberWithCommas(num: number, options?: { decimal?: number; fixed?: number }) {
  if (!options) {
    return num.toLocaleString()
  }
  if ('decimal' in options!) {
    num = num / Math.pow(10, options.decimal!)
  }
  if ('fixed' in options!) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: options!.fixed,
      maximumFractionDigits: options!.fixed
    })
  }
  return num.toLocaleString()
}

export function initFilters() {
  Vue.filter('timeFromNow', timeFromNow)
  Vue.filter('numberWithCommas', numberWithCommas)
}

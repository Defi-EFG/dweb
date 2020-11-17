import { VuexModule, Module, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { HomePlatform } from '@/types/home'
import { lending } from '@/services/lending'
import { loanCurrency, rewardCurrency as extendCurrency, getCurrencyDecimals } from '@/store/common'
import * as utils from '@/services/utils'

@Module({ dynamic: true, store, namespaced: true, name: 'homeStore' })
export default class HomeModule extends VuexModule implements HomePlatform {
  totalConsumedGPT = 0
  totalLiquidated = 0
  totalInterest = 0
  totalDebt = 0
  totalBorrowers = 0

  @MutationAction
  async updateSummary() {
    try {
      const loanDecimals = getCurrencyDecimals(loanCurrency.name)
      const extendDecimals = getCurrencyDecimals(extendCurrency.name)

      const totalConsumedGPTFull = await lending.getTotalConsumedGPT()
      const totalLiquidatedFull = await lending.getTotalLiquidated()
      const totalInterestFull = await lending.getTotalInterest()

      const totalConsumedGPT = utils.toDecimals(totalConsumedGPTFull, extendDecimals).toNumber()
      const totalLiquidated = utils.toDecimals(totalLiquidatedFull, loanDecimals).toNumber()
      const totalInterest = utils.toDecimals(totalInterestFull, loanDecimals).toNumber()

      return { totalConsumedGPT, totalLiquidated, totalInterest }
    } catch (error) {
      return {}
    }
  }
}

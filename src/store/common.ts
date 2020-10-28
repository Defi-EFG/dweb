import * as constants from '@/constants'
import { Ecrc20 } from '@/types/currency'
import { ECOC, ETH, USDT, EFG, GPT } from '@/store/wallet/currency'

export const loanCurrency = {
  name: constants.LOAN_CURRENCIES[0],
  style: constants.KNOWN_CURRENCY[constants.LOAN_CURRENCIES[0]]
}

export const stakingCurrency = {
  name: constants.EFG,
  style: constants.KNOWN_CURRENCY[constants.EFG]
}

export const rewardCurrency = {
  name: constants.GPT,
  style: constants.KNOWN_CURRENCY[constants.GPT]
}

export const getCurrencyDecimals = (currencyName: string) => {
  if (currencyName === ECOC.name) return '8'
  if (currencyName === ETH.name) return ETH.tokenInfo?.symbol as string
  if (currencyName === USDT.name) return USDT.tokenInfo?.symbol as string
  if (currencyName === EFG.name) return EFG.tokenInfo?.symbol as string
  if (currencyName === GPT.name) return GPT.tokenInfo?.symbol as string

  return '0'
}

export const getTokenInfo = (currencyName: string) => {
  if (currencyName === ETH.name) return ETH.tokenInfo as Ecrc20
  if (currencyName === USDT.name) return USDT.tokenInfo as Ecrc20
  if (currencyName === EFG.name) return EFG.tokenInfo as Ecrc20
  if (currencyName === GPT.name) return GPT.tokenInfo as Ecrc20

  return {} as Ecrc20
}

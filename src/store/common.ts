import * as constants from '@/constants'
import { Ecrc20 } from '@/types/currency'
import { ECOC, ETH, USDT, EFG, GPT, EWETH, EWUSDT } from '@/store/wallet/currency'

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
  if (currencyName === ETH.name) return ETH.tokenInfo?.decimals as string
  if (currencyName === USDT.name) return USDT.tokenInfo?.decimals as string
  if (currencyName === EFG.name) return EFG.tokenInfo?.decimals as string
  if (currencyName === GPT.name) return GPT.tokenInfo?.decimals as string
  if (currencyName === EWETH.name) return EWETH.tokenInfo?.decimals as string
  if (currencyName === EWUSDT.name) return EWUSDT.tokenInfo?.decimals as string

  return '0'
}

export const getTokenInfo = (currencyName: string) => {
  if (currencyName === ETH.name) return ETH.tokenInfo as Ecrc20
  if (currencyName === USDT.name) return USDT.tokenInfo as Ecrc20
  if (currencyName === EFG.name) return EFG.tokenInfo as Ecrc20
  if (currencyName === GPT.name) return GPT.tokenInfo as Ecrc20
  if (currencyName === EWETH.name) return EWETH.tokenInfo as Ecrc20
  if (currencyName === EWUSDT.name) return EWUSDT.tokenInfo as Ecrc20

  return {} as Ecrc20
}

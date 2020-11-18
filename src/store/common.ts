import * as constants from '@/constants'
import { Ecrc20, Currency } from '@/types/currency'
import { ECOC, ETH, USDT, EFG, GPT, EWETH, EWUSDT } from '@/store/wallet/currency'

export const loanCurrency = {
  name: EFG.name,
  contractAddress: EFG.tokenInfo?.address,
  style: constants.KNOWN_CURRENCY[EFG.name]
}

export const stakingCurrency = {
  name: EFG.name,
  contractAddress: EFG.tokenInfo?.address,
  style: constants.KNOWN_CURRENCY[EFG.name]
}

export const rewardCurrency = {
  name: GPT.name,
  contractAddress: GPT.tokenInfo?.address,
  style: constants.KNOWN_CURRENCY[GPT.name]
}

export const getCurrency = (currencyName: string) => {
  if (currencyName === ECOC.name) return ECOC
  if (currencyName === ETH.name) return ETH
  if (currencyName === USDT.name) return USDT
  if (currencyName === EFG.name) return EFG
  if (currencyName === GPT.name) return GPT
  if (currencyName === EWETH.name) return EWETH
  if (currencyName === EWUSDT.name) return EWUSDT

  return {} as Currency
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

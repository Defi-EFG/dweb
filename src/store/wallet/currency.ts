import * as constants from '@/constants'
import { Currency } from '@/types/currency'
import { defaultNetwork } from '@/services/ecoc/config'
import { ECOC_MAINNET } from '@/services/ecoc/constants'
import knownTokensInfo from '@/services/ecrc20/tokens-info.json'
import knownTokensInfoTestnet from '@/services/ecrc20/tokens-info-testnet.json'

const getKnownTokenInfo = (currencyName: string) => {
  if (defaultNetwork === ECOC_MAINNET) {
    return knownTokensInfo.find(token => token.symbol === currencyName)
  }

  return knownTokensInfoTestnet.find(token => token.symbol === currencyName)
}

export const ECOC = {
  name: constants.ECOC,
  type: constants.TYPE_ECOC,
  style: constants.KNOWN_CURRENCY.ECOC,
  balance: '0',
  price: 0
} as Currency

export const EFG = {
  name: constants.EFG,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.EFG,
  balance: '0',
  price: 0,
  tokenInfo: getKnownTokenInfo(constants.EFG)
} as Currency

export const GPT = {
  name: constants.GPT,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.GPT,
  balance: '0',
  tokenInfo: getKnownTokenInfo(constants.GPT)
} as Currency

export const EWUSDT = {
  name: constants.EWUSDT,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.EWUSDT,
  balance: '0',
  tokenInfo: getKnownTokenInfo(constants.EWUSDT)
} as Currency

export const EWETH = {
  name: constants.EWETH,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.EWETH,
  balance: '0',
  tokenInfo: getKnownTokenInfo(constants.EWETH)
} as Currency

export const currencyInit = () => {
  return [ECOC, EFG, GPT] as Currency[]
}

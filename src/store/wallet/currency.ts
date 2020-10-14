import * as constants from '@/constants'
import { Currency } from '@/types/currency'

const ECOC = {
  name: constants.ECOC,
  type: constants.TYPE_ECOC,
  style: constants.KNOWN_CURRENCY.ECOC,
  balance: '1000'
} as Currency

const EFG = {
  name: constants.EFG,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.EFG,
  balance: '1000',
  price: 1,
  tokenInfo: {
    name: constants.EFG,
    symbol: constants.EFG,
    address: '465bb1e07d460f86c1cfc0809ef97bd41f8a88b5',
    decimals: '8',
    totalSupply: '1000000'
  }
} as Currency

const GPT = {
  name: constants.GPT,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.GPT,
  balance: '1000',
  tokenInfo: {
    name: constants.GPT,
    symbol: constants.GPT,
    address: '01b4f96074cc86042bc9c98e4f3fbb17b82f0501',
    decimals: '4',
    totalSupply: '10000'
  }
} as Currency

export const currencyInit = () => {
  return [ECOC, EFG, GPT] as Currency[]
}

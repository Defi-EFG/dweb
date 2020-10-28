import * as constants from '@/constants'
import { Currency } from '@/types/currency'

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
  tokenInfo: {
    name: constants.EFG,
    symbol: constants.EFG,
    address: '465bb1e07d460f86c1cfc0809ef97bd41f8a88b5',
    decimals: '8',
    totalSupply: '1000000'
  }
} as Currency

export const GPT = {
  name: constants.GPT,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.GPT,
  balance: '0',
  tokenInfo: {
    name: constants.GPT,
    symbol: constants.GPT,
    address: '01b4f96074cc86042bc9c98e4f3fbb17b82f0501',
    decimals: '4',
    totalSupply: '10000'
  }
} as Currency

export const USDT = {
  name: constants.USDT,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.USDT,
  balance: '0',
  tokenInfo: {
    name: constants.USDT,
    symbol: constants.USDT,
    address: '',
    decimals: '4',
    totalSupply: '100000'
  }
} as Currency

export const ETH = {
  name: constants.ETH,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.ETH,
  balance: '0',
  tokenInfo: {
    name: constants.ETH,
    symbol: constants.ETH,
    address: '',
    decimals: '16',
    totalSupply: '100000'
  }
} as Currency

export const currencyInit = () => {
  return [ECOC, EFG, GPT] as Currency[]
}

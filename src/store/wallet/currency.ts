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
    address: 'b97f87f4510f6d71a3532cddf2d06ffad163b371',
    decimals: '8',
    totalSupply: '100000000000000'
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
    address: '7d2da43956d3939ac978c7df934450adb0ae1f30',
    decimals: '4',
    totalSupply: '100000000'
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
    address: '332eb9bb2280cde537c4546e8dab79d3ea122617',
    decimals: '8',
    totalSupply: '1000000000000'
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
    address: '008dc0186474400f49748951b6f21cade8a3a4cd',
    decimals: '8',
    totalSupply: '100000000000'
  }
} as Currency

export const EWUSDT = {
  name: constants.EWUSDT,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.EWUSDT,
  balance: '0',
  tokenInfo: {
    name: constants.EWUSDT,
    symbol: constants.EWUSDT,
    address: '332eb9bb2280cde537c4546e8dab79d3ea122617',
    decimals: '8',
    totalSupply: '1000000000000'
  }
} as Currency

export const EWETH = {
  name: constants.EWETH,
  type: constants.TYPE_ECRC20,
  style: constants.KNOWN_CURRENCY.EWETH,
  balance: '0',
  tokenInfo: {
    name: constants.EWETH,
    symbol: constants.EWETH,
    address: '008dc0186474400f49748951b6f21cade8a3a4cd',
    decimals: '8',
    totalSupply: '100000000000'
  }
} as Currency

export const currencyInit = () => {
  return [ECOC, EFG, GPT, EWETH, EWUSDT] as Currency[]
}

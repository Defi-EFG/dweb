import { Style } from '../types/currency'

export const ECOC = 'ECOC'
export const ETH = 'ETH'

export const TYPE_RECEIVED = 'Received'
export const TYPE_SENT = 'Sent'
export const TYPE_ECOC = 'ECOC'
export const TYPE_ECRC20 = 'ECRC-20'

interface CurrencyStyle {
  [symbol: string]: Style
}

export const KNOWN_CURRENCY = {
  ECOC: {
    icon: require('@/assets/icon/currency/ecoc.png'),
    mark: require('@/assets/wallet-token/ecoc.svg')
  } as Style,
  EFG: {
    icon: require('@/assets/icon/currency/efg.svg'),
    mark: require('@/assets/wallet-token/efg.svg')
  } as Style,
  DELAY: {
    icon: require('@/assets/icon/currency/delay.svg'),
    mark: require('@/assets/wallet-token/delay.svg')
  } as Style,
  USDT: {
    icon: require('@/assets/icon/currency/usdt.png'),
    mark: require('@/assets/wallet-token/usdt.svg')
  } as Style,
  ETH: {
    icon: require('@/assets/icon/currency/eth.png'),
    mark: require('@/assets/wallet-token/ether.svg')
  } as Style,
  // Temporary currency, please remove when project done
  BCST: {
    icon: require('@/assets/icon/currency/delay.svg'),
    mark: require('@/assets/wallet-token/delay.svg')
  } as Style,
} as CurrencyStyle
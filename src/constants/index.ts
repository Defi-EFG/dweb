import { Style } from '../types/currency'

export const ECOC = 'ECOC'
export const ETH = 'ETH'
export const USDT = 'USDT'
export const EFG = 'EFG'
export const GPT = 'GPT'

export const TYPE_RECEIVED = 'Received'
export const TYPE_SENT = 'Sent'
export const TYPE_ECOC = 'ECOC'
export const TYPE_ECRC20 = 'ECRC-20'

export const STATUS_SYNCED = 'synced'
export const STATUS_PENDING = 'pending'
export const STATUS_CONFIRMED = 'confirmed'

export const TX_TRANSFER = 'Transfering'
export const TX_DEPOSIT = 'Deposting'
export const TX_WITHDRAW = 'Withdrawing'
export const TX_BORROW = 'Borrowing'
export const TX_REPAY = 'Repaying'

interface CurrencyStyle {
  [symbol: string]: Style
}

export const COLLATERAL_CURRENCIES = [ECOC]
export const LOAN_CURRENCIES = [EFG]

export const KNOWN_CURRENCY = {
  ECOC: {
    icon: require('@/assets/icon/currency/ecoc.svg'),
    mark: require('@/assets/wallet-token/ecoc.svg')
  } as Style,
  EFG: {
    icon: require('@/assets/icon/currency/efg.svg'),
    mark: require('@/assets/wallet-token/efg.svg')
  } as Style,
  GPT: {
    icon: require('@/assets/icon/currency/gpt.svg'),
    mark: require('@/assets/wallet-token/gpt.svg')
  } as Style,
  USDT: {
    icon: require('@/assets/icon/currency/usdt.svg'),
    mark: require('@/assets/wallet-token/usdt.svg')
  } as Style,
  ETH: {
    icon: require('@/assets/icon/currency/eth.svg'),
    mark: require('@/assets/wallet-token/ether.svg')
  } as Style,
  // Temporary currency, please remove when project done
  BCST: {
    icon: require('@/assets/icon/currency/gpt.svg'),
    mark: require('@/assets/wallet-token/gpt.svg')
  } as Style,
  DEFAULT: {
    icon: require('@/assets/icon/currency/default.svg'),
    mark: require('@/assets/wallet-token/default.svg')
  } as Style
} as CurrencyStyle

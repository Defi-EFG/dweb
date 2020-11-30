import { Style } from '../types/currency'

export const ECOC = 'ECOC'
export const ETH = 'ETH'
export const USDT = 'USDT'
export const EFG = 'EFG'
export const GPT = 'GPT'
export const EWETH = 'EWETH'
export const EWUSDT = 'EWUSDT'

export const TYPE_RECEIVED = 'Received'
export const TYPE_SENT = 'Sent'
export const TYPE_ECOC = 'ECOC'
export const TYPE_ECRC20 = 'ECRC-20'
export const TYPE_LENDING = 'Lending - Defi'
export const TYPE_STAKING = 'Staking - Defi'

export const EVENT_APPROVAL = 'Approval'
export const EVENT_TRANSFER = 'Transfer'

export const EVENT_INCREASE_CAPITAL = 'IncreaseCapitalEvent'
export const EVENT_DEPOSIT_ECOC = 'DepositECOCEvent'
export const EVENT_DEPOSIT_ASSET = 'DepositAssetEvent'
export const EVENT_WITHDRAW_ECOC = 'WithdrawECOCEvent'
export const EVENT_WITHDRAW_EFG = 'WithdrawEFGEvent'
export const EVENT_WITHDRAW_GPT = 'WithdrawGPTEvent'
export const EVENT_WITHDRAW_ASSET = 'WithdrawAssetEvent'
export const EVENT_BORROW = 'BorrowEvent'
export const EVENT_MARGINCALL = 'MarginCallEvent'
export const EVENT_REPAY = 'RepayEvent'
export const EVENT_EXTEND_GRACE_PERIOD = 'ExtendGracePeriodEvent'

export const STATUS_SYNCED = 'Synced'
export const STATUS_PENDING = 'Pending'
export const STATUS_CONFIRMED = 'Confirmed'
export const STATUS_SUCCEED = 'Succeed'
export const STATUS_FAILED = 'Failed'

export const TX_TRANSFER = 'Transfering'
export const TX_DEPOSIT = 'Depositing'
export const TX_WITHDRAW = 'Withdrawing'
export const TX_STOP_STAKING = 'Stopping'
export const TX_BORROW = 'Borrowing'
export const TX_REPAY = 'Repaying'

export const ACTION_COLLATERAL = 'Collatertal'
export const ACTION_WITHDRAW = 'Withdraw'
export const ACTION_BORROW = 'Borrow'
export const ACTION_REPAY = 'Repay'
export const ACTION_DEPOSIT = 'Deposit'
export const ACTION_STOP = 'Stop'
export const ACTION_REWARD = 'Reward'
interface CurrencyStyle {
  [symbol: string]: Style
}

export const COLLATERAL_CURRENCIES = [ECOC]

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
  EWETH: {
    icon: require('@/assets/icon/currency/eth.svg'),
    mark: require('@/assets/wallet-token/ether.svg')
  } as Style,
  EWUSDT: {
    icon: require('@/assets/icon/currency/usdt.svg'),
    mark: require('@/assets/wallet-token/usdt.svg')
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

import EcocWallet from '@/services/ecoc/ecoc-wallet'
import { Currency } from '@/types/currency'
import { createKeystore, getKeystoreContent, getKeystoreFromString } from '@/services/keystore'
import { WalletError } from '@/exceptions/wallet'
import * as utils from './utils'

const currencyColor = {
  ECOC: 'BlueViolet',
  ETH: 'SteelBlue',
  USDT: 'SteelBlue',
  EFG: 'SteelBlue',
  DELAY: 'SteelBlue',
  DEFAULT: 'SteelBlue'
}

const currencyIcon = {
  ECOC: require('@/assets/icon/currency/ecoc.svg'),
  ETH: require('@/assets/icon/currency/eth.png'),
  USDT: require('@/assets/icon/currency/usdt.png'),
  EFG: require('@/assets/icon/currency/efg.svg'),
  DELAY: require('@/assets/icon/currency/delay.svg'),
  DEFAULT: require('@/assets/icon/currency/delay.svg')
}

const generateNewKeystore = async (password: string) => {
  // create new wallet default is mainnet
  const wallet = await EcocWallet.createNewWallet()

  if (!wallet) {
    throw new WalletError('Can not generate new wallet')
  }

  const keystore = createKeystore(wallet.getPrivKey(), password)
  return keystore
}

const getKeystore = (keystore: string) => {
  return getKeystoreFromString(keystore)
}

const importFromWif = (wif: string) => {
  // create new wallet default is mainnet
  const wallet = EcocWallet.restoreFromWif(wif)

  if (!wallet) {
    throw new WalletError('Could not import from WIF')
  }

  return wallet
}

const importFromKeystore = (keystore: string, password: string) => {
  const wif = getKeystoreContent(keystore, password)

  if (!wif) {
    throw new WalletError('Invalid keystore or password')
  }

  return importFromWif(wif)
}

const getEcocBalance = async (address: string) => {
  const addressInfo = await EcocWallet.getAddressInfo(address)
  const balance = addressInfo.balance - addressInfo.unconfirmedBalance

  const currency = {
    name: 'ECOC',
    type: 'ECOC',
    icon: currencyIcon.ECOC,
    balance: balance.toString()
  } as Currency

  return currency
}

const getEcrc20Balance = async (address: string) => {
  const tokensInfo = await EcocWallet.getEcrc20(address)
  const currencies = [] as Currency[]

  tokensInfo.forEach(token => {
    currencies.push({
      name: token.contract.symbol,
      type: 'ECRC-20',
      icon: currencyIcon.DEFAULT,
      balance: utils.toDecimals(token.amount, token.contract.decimals),
      tokenInfo: {
        name: token.contract.name,
        symbol: token.contract.symbol,
        address: token.contract.contract_address,
        decimals: token.contract.decimals,
        totalSupply: token.contract.total_supply
      }
    } as Currency)
  })

  return currencies
}

const getTxs = async (address: string) => {
  const txs = await EcocWallet.getTxList(address)
  return txs
}

export {
  generateNewKeystore,
  importFromKeystore,
  getKeystore,
  getEcocBalance,
  getEcrc20Balance,
  getTxs,
  currencyColor
}

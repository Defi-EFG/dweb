import * as constants from '@/constants'
import EcocWallet from '@/services/ecoc/ecoc-wallet'
import { Currency, Ecrc20 } from '@/types/currency'
import { KeyStore } from '@/types/keystore'
import { createKeystore, getKeystoreContent, getKeystoreFromString } from '@/services/keystore'
import { WalletError } from '@/exceptions/wallet'
import { SendEcocPayload, SendEcrc20Payload } from './ecoc/types'
import { encodeSendData } from './ecoc/ecrc20'
import * as utils from './utils'

const isEcrc20 = (currency: Currency) => {
  return currency.type === constants.TYPE_ECRC20
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

const importFromKeystore = (keystore: string | KeyStore, password: string) => {
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
    name: constants.ECOC,
    type: constants.TYPE_ECOC,
    style: constants.KNOWN_CURRENCY.ECOC,
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
      type: constants.TYPE_ECRC20,
      style: Object.prototype.hasOwnProperty.call(constants.KNOWN_CURRENCY, token.contract.symbol) ?
        constants.KNOWN_CURRENCY[token.contract.symbol] : constants.KNOWN_CURRENCY['DEFAULT'],
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

export const SendEcocBalance = async (
  keystore: KeyStore,
  password: string,
  payload: SendEcocPayload
) => {
  const wallet = importFromKeystore(keystore, password)
  const rawTransaction = await wallet.generateTx(payload)
  const txid = await EcocWallet.sendRawTx(rawTransaction)

  return txid
}

export const SendEcrc20Balance = async (
  keystore: KeyStore,
  password: string,
  currency: Currency,
  payload: SendEcrc20Payload
) => {
  if (!isEcrc20(currency)) {
    throw new WalletError("It's not ECRC-20 currency")
  }

  const tokenInfo = currency.tokenInfo as Ecrc20

  const wallet = importFromKeystore(keystore, password)
  const encodedData = encodeSendData(tokenInfo, payload.to, payload.amount)
  const rawTransaction = await await wallet.generateSendToContractTx(
    tokenInfo.address,
    encodedData,
    payload.gasLimit,
    payload.gasPrice,
    payload.fee
  )
  const txid = await EcocWallet.sendRawTx(rawTransaction)

  return txid
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
  isEcrc20
}

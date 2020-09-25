import EcocWallet from '@/services/ecoc/ecoc-wallet'
import { createKeystore, getKeystoreContent, getKeystoreFromString } from '@/services/keystore'
import { WalletError } from '@/exceptions/wallet'

const walletColor = {
  ECOC: 'BlueViolet',
  ETH: 'SteelBlue',
  USDT: 'SteelBlue',
  EFG: 'SteelBlue',
  DELAY: 'SteelBlue'
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
    throw new WalletError('Invalid keystore')
  }

  return importFromWif(wif)
}

export { generateNewKeystore, importFromKeystore, getKeystore, walletColor }

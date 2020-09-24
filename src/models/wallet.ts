import { Wallet } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Transaction } from '@/types/transaction'

import EcocWallet from '@/services/ecoc/ecoc-wallet'
import { createKeystore, getKeystoreContent } from '@/services/keystore'
import { WalletError } from '@/exceptions/wallet'

const walletColor = {
  ECOC: 'BlueViolet',
  ETH: 'SteelBlue',
  USDT: 'SteelBlue',
  EFG: 'SteelBlue',
  DELAY: 'SteelBlue'
}

const generateNewKeysore = (password: string) => {
  // create new wallet default is mainnet
  const wallet = EcocWallet.createNewWallet()

  if (!wallet) {
    throw new WalletError('Can not generate new wallet')
  }

  const keystore = createKeystore(wallet.getPrivKey(), password)
  return keystore
}

export { generateNewKeysore, walletColor }

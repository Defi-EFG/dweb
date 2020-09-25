import EcocWallet from '@/services/ecoc/ecoc-wallet'
import { createKeystore } from '@/services/keystore'
import { WalletError } from '@/exceptions/wallet'

const walletColor = {
  ECOC: 'BlueViolet',
  ETH: 'SteelBlue',
  USDT: 'SteelBlue',
  EFG: 'SteelBlue',
  DELAY: 'SteelBlue'
}

const generateNewKeystore = (password: string) => {
  // create new wallet default is mainnet
  const wallet = EcocWallet.createNewWallet()

  if (!wallet) {
    throw new WalletError('Can not generate new wallet')
  }

  const keystore = createKeystore(wallet.getPrivKey(), password)
  return keystore
}

export { generateNewKeystore, walletColor }

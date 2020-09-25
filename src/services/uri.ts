import EcocURI from './ecoc/ecoc-uri'
import EcocWallet from './ecoc/ecoc-wallet'

export function parseEcocURI(data: string) {
  if (EcocWallet.isEcocAddress(data)) {
    data = 'ecoc:' + data
  }
  return new EcocURI(data)
}

export function generateEcocURI(address: string, amount: string) {
  return new EcocURI({ address, amount }).toString()
}

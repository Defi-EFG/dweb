import EcocURI from './ecoc/uri'
import EcocWallet from './ecoc/wallet'

export function parseEcocURI(data: string) {
  if (EcocWallet.isEcocAddress(data)) {
    data = 'ecoc:' + data
  }
  return new EcocURI(data)
}

export function generateEcocURI(address:string, amount: number) {
  return new EcocURI({ address, amount }).toString()
}

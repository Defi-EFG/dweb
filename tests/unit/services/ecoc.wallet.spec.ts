import { expect } from 'chai'
import { Ecocjs } from 'ecoweb3'

import EcocWallet from '@/services/ecoc/wallet'

describe('Wallet Mainnet Test', () => {
  const wif = 'L5PdxazKuinGJCJwyqh65aETM5KChdVZizv2C7vLuiFvCYfm5h65'
  const address = 'EcvG7uBm8c2b8h7RJyAexjRgFyRFeNDMLm'
  let wallet: EcocWallet

  it('can create wallet from mainnet wif', () => {
    wallet = EcocWallet.restoreFromWif(wif)

    expect(wallet)
      .to.be.an('object')
      .that.have.property('address')
      .equal(address)

    expect(wallet)
      .to.be.an('object')
      .that.have.property('network')
      .equal(Ecocjs.networks.ecoc)
  })

  it('can get Address Infomartion', async () => {
    const addressInfo = await wallet.getAddressInfo()
    expect(addressInfo)
      .to.be.an('object')
      .that.have.property('addrStr')
      .equal(address)
  })

  it('can get Utxo List', async () => {
    const utxoList = await wallet.getUtxoList()
    expect(utxoList).to.be.an('array')
  })
})

describe('Wallet Testnet Test', () => {
  const testnetWif = 'cRLx9jMUC9f8TgcRb9tKD4PfPyeUPGnJCptPx8LDSNgpDKi56raW'
  const testnetAddress = 'e6asdNftcjTfFTDAVU2Auk6km1vNHzvcwR'
  let wallet: EcocWallet

  it('can create wallet from testnet wif', () => {
    wallet = EcocWallet.restoreFromWif(testnetWif)

    expect(wallet)
      .to.be.an('object')
      .that.have.property('address')
      .equal(testnetAddress)

    expect(wallet)
      .to.be.an('object')
      .that.have.property('network')
      .equal(Ecocjs.networks.ecoc_testnet)
  })

  it('can get getAddressInfo', async () => {
    const addressInfo = await wallet.getAddressInfo()

    expect(addressInfo)
      .to.be.an('object')
      .that.have.property('addrStr')
      .equal(testnetAddress)
  })

  it('can get Utxo List', async () => {
    const utxoList = await wallet.getUtxoList()
    expect(utxoList).to.be.an('array')
  })
})

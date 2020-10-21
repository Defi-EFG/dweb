import { expect, should } from 'chai'
import { lending } from '@/services/lending'

should()

// Defalut is on Testnet
describe('Lending Smart Contract Test', () => {
  it('can call getAllPools functions', async () => {
    const res = await lending.getAllPools()
    expect(res).to.be.an('array')
  })

  it('can call getPoolInfo functions', async () => {
    const poolAddress = 'ePmXyrEkSmdNGvJ7rf9ofpX6HXF6uKHGeK'
    const res = await lending.getPoolInfo(poolAddress)
    expect(res).to.be.an('object')
    res.should.have.keys('name', 'remainingEFG')
  })

  it('can call getPrice functions', async () => {
    const currencyName = 'ECOC'
    const res = await lending.getPrice(currencyName)
    expect(res).to.be.an('number')
  })

  it('can call getEFGBalance functions', async () => {
    const address = 'eEUuUn5eMoAY7UBgcWNpLifMHYyv8hvAWu'
    const res = await lending.getEFGBalance(address)
    expect(res).to.be.an('number')
  })

  it('can call getCollateralInfo functions', async () => {
    const currencyName = 'ECOC'
    const poolAddress = 'ePmXyrEkSmdNGvJ7rf9ofpX6HXF6uKHGeK'
    const address = 'eEUuUn5eMoAY7UBgcWNpLifMHYyv8hvAWu'
    const res = await lending.getCollateralInfo(address, poolAddress, currencyName)
    expect(res).to.be.an('number')
  })

  it('can call getCollateralRate functions', async () => {
    const currencyName = 'ECOC'
    const res = await lending.getCollateralRate(currencyName)
    expect(res).to.be.an('number')
  })

  it('can call getInterestRate functions', async () => {
    const res = await lending.getInterestRate()
    expect(res).to.be.an('number')
  })

  it('can call getDebt functions', async () => {
    const address = 'eEUuUn5eMoAY7UBgcWNpLifMHYyv8hvAWu'
    const res = await lending.getDebt(address)
    expect(res).to.be.an('object')
    res.should.have.keys('totalDebt', 'poolAddress')
  })

  it('can call getLoanInfo functions', async () => {
    const address = 'eEUuUn5eMoAY7UBgcWNpLifMHYyv8hvAWu'
    const res = await lending.getLoanInfo(address)
    expect(res).to.be.an('object')
    res.should.have.keys('assetSymbol', 'amount', 'timestamp', 'interestRate', 'interest', 'pool')
  })
})

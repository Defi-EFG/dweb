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
    const poolAddress = 'eCpHawDrHpW9YpjdzDsN9b4imGbnMJbQeG'
    const res = await lending.getPoolInfo(poolAddress)
    expect(res).to.be.an('object')
    res.should.have.keys('name', 'capital', 'remainingEFG')
  })

  it('can call getPrice functions', async () => {
    const currencyName = 'ECOC'
    const res = await lending.getPrice(currencyName)
    expect(res).to.be.an('number')
  })

  it('can call getAssetBalance function for EFG', async () => {
    const address = 'e4nfFAgEX5QMQ2R1vNjLjDrakQF5aW66w3'
    const currencyName = 'EFG'
    const res = await lending.getAssetBalance(currencyName, address)
    expect(res).to.be.an('number')
  })

  it('can call getAssetBalance function for GPT', async () => {
    const address = 'e4nfFAgEX5QMQ2R1vNjLjDrakQF5aW66w3'
    const currencyName = 'GPT'
    const res = await lending.getAssetBalance(currencyName, address)
    expect(res).to.be.an('number')
  })

  it('can call getCollateralInfo functions', async () => {
    const address = 'e4nfFAgEX5QMQ2R1vNjLjDrakQF5aW66w3'
    const res = await lending.getCollateralInfo(address)
    expect(res).to.be.an('array')
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
    const address = 'e4nfFAgEX5QMQ2R1vNjLjDrakQF5aW66w3'
    const res = await lending.getDebt(address)
    expect(res).to.be.an('object')
    res.should.have.keys('totalDebt', 'poolAddress')
  })

  it('can call getLoanInfo functions', async () => {
    const address = 'e4nfFAgEX5QMQ2R1vNjLjDrakQF5aW66w3'
    const res = await lending.getLoanInfo(address)
    expect(res).to.be.an('object')
    res.should.have.keys(
      'assetSymbol',
      'amount',
      'timestamp',
      'interestRate',
      'interest',
      'poolAddr',
      'remainingGPT',
      'lastGracePeriod',
      'EFGInitialRate'
    )
  })
})

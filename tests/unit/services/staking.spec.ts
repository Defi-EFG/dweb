import { expect, should } from 'chai'
import { staking } from '@/services/staking'

should()

// Defalut is on Testnet
describe('Staking Smart Contract Test', () => {
  it('can call unclaimedGPT functions', async () => {
    const res = await staking.unclaimedGPT()
    expect(res).to.be.an('number')
  })

  it('can call mintingInfo functions', async () => {
    const address = 'e4nfFAgEX5QMQ2R1vNjLjDrakQF5aW66w3'
    const res = await staking.mintingInfo(address)
    expect(res).to.be.an('object')
    res.should.have.keys('stakingAmount', 'timestamp', 'unclaimedReward')
  })
})

import { expect } from 'chai'
import { generateNewKeysore } from '@/models/wallet'

describe('Wallet test', () => {
  it('can generate new wallet to keysore', () => {
    const password = '123456'
    const keystore = generateNewKeysore(password)

    expect(keystore)
      .to.be.an('string')
      .that.include('content')
  })
})

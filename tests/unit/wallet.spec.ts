import { expect } from 'chai'
import { generateNewKeystore } from '@/services/wallet'

describe('Wallet test', () => {
  it('can generate new wallet to keysore', () => {
    const password = '123456'
    const keystore = generateNewKeystore(password)

    expect(keystore)
      .to.be.an('string')
      .that.include('content')
  })
})

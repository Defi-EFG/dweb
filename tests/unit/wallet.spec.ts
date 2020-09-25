import { expect } from 'chai'
import { generateNewKeystore } from '@/services/wallet'

describe('Wallet test', () => {
  it('can generate new wallet to keysore', async () => {
    const password = '123456'
    const keystore = await generateNewKeystore(password)

    expect(keystore)
      .to.be.an('string')
      .that.include('content')
  })
})

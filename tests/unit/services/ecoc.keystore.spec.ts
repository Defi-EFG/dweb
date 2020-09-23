import { expect } from 'chai'

import { getKeystore, createKeystore, getContent } from '@/services/keystore'

describe('Keystore test', () => {
  it('can create keystore from wif', () => {
    const wif = 'L5PdxazKuinGJCJwyqh65aETM5KChdVZizv2C7vLuiFvCYfm5h65'
    const password = '123456'

    const keystore = createKeystore(wif, password)
    expect(keystore)
      .to.be.an('string')
      .that.include('content')
  })
})

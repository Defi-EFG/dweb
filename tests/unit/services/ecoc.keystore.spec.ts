import { expect } from 'chai'

import { createKeystore, getKeystoreContent } from '@/services/keystore'

describe('Keystore test', () => {
  it('can create keystore from wif', () => {
    const wif = 'L5PdxazKuinGJCJwyqh65aETM5KChdVZizv2C7vLuiFvCYfm5h65'
    const password = '123456'

    const keystore = createKeystore(wif, password)
    expect(keystore)
      .to.be.an('string')
      .that.include('content')
  })

  it('can get wif from keystore', () => {
    const keystoreStr =
      '{"version":"0.1","content":"U2FsdGVkX1/yXKNPYET2cpz51xwd02WyRZEkzuT7z1iH/SXW1s5OpKsSy5V/CUjMdziEw99eOVeuLWThC39xCyhW/kUqKu7q9ot47YD4rRo=","crypto":{"cipher":"AES"}}'
    const wif = 'L5PdxazKuinGJCJwyqh65aETM5KChdVZizv2C7vLuiFvCYfm5h65'
    const password = '123456'

    const keystore = keystoreStr
    const wifFromKeystore = getKeystoreContent(keystore, password)

    expect(wifFromKeystore).to.be.equal(wif)
  })

  it('can not get wif from keystore if wrong password', () => {
    const keystoreStr =
      '{"version":"0.1","content":"U2FsdGVkX1/yXKNPYET2cpz51xwd02WyRZEkzuT7z1iH/SXW1s5OpKsSy5V/CUjMdziEw99eOVeuLWThC39xCyhW/kUqKu7q9ot47YD4rRo=","crypto":{"cipher":"AES"}}'
    const wif = 'L5PdxazKuinGJCJwyqh65aETM5KChdVZizv2C7vLuiFvCYfm5h65'
    const password = '123456wrong'

    const keystore = keystoreStr
    const wifFromKeystore = getKeystoreContent(keystore, password)

    expect(wifFromKeystore).to.not.equal(wif)
  })

  it('can not get wif from keystore if wrong keystore content', () => {
    const keystoreStr =
      '{"version":"0.1","content":"WrongU2FsdGVkX1/yXKNPYET2cpz51xwd02WyRZEkzuT7z1iH/SXW1s5OpKsSy5V/CUjMdziEw99eOVeuLWThC39xCyhW/kUqKu7q9ot47YD4rRo=","crypto":{"cipher":"AES"}}'
    const wif = 'L5PdxazKuinGJCJwyqh65aETM5KChdVZizv2C7vLuiFvCYfm5h65'
    const password = '123456'

    const keystore = keystoreStr
    const wifFromKeystore = getKeystoreContent(keystore, password)

    expect(wifFromKeystore).to.not.equal(wif)
  })
})

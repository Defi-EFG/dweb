import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import { KeyStore, Crypto } from '@/types/keystore'

const VERSION = '0.1'

const decode = (content: string, password: string) => {
  const secretKey = password.concat(VERSION)
  return AES.decrypt(content, secretKey).toString(Utf8) as string
}

const encode = (content: string, password: string) => {
  const secretKey = password.concat(VERSION)
  return AES.encrypt(content, secretKey).toString() as string
}

const getKeystoreFromString = (data: string): KeyStore => {
  return JSON.parse(data as string) as KeyStore
}

const createKeystore = (privatekey: string, password: string) => {
  const content = encode(privatekey, password)
  const res = {
    version: VERSION,
    content: content,
    crypto: {
      cipher: 'AES'
    } as Crypto
  } as KeyStore

  return JSON.stringify(res) as string
}

const getKeystoreContent = (keystore: KeyStore | string, password: string) => {
  let keystoreObj

  if (typeof keystore == 'string') {
    keystoreObj = getKeystoreFromString(keystore as string) as KeyStore
  } else {
    keystoreObj = keystore as KeyStore
  }

  try {
    if (keystoreObj.version !== VERSION) {
      return null
    }

    return decode(keystoreObj.content, password)
  } catch (e) {
    return null
  }
}

export { createKeystore, getKeystoreContent, getKeystoreFromString }

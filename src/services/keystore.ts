import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import { KeyStore, Crypto } from '@/types/keystore'

const VERSION = '0.1'

const getKeystore = (data: string | KeyStore) => {
  if (data instanceof String) {
    return JSON.parse(data as string) as KeyStore
  }

  return data
}

const createKeystore = (privatekey: string, password: string) => {
  const content = encode(privatekey, password)
  const res = {
    version: VERSION,
    content: content,
    crypto: {
      cipher: "AES"
    } as Crypto
  } as KeyStore

  return JSON.stringify(res) as string
}

const getContent = (keystore: KeyStore, password: string) => {
  try {
    if (keystore.version !== VERSION) {
      return null
    }

    return decode(keystore.content, password)
  } catch (e) {
    return null
  }
}

const decode = (content: string, password: string) => {
  const secretKey = password.concat(VERSION)
  return AES.decrypt(content, secretKey).toString(Utf8) as string
}

const encode = (content: string, password: string) => {
  const secretKey = password.concat(VERSION)
  return AES.encrypt(content, secretKey).toString() as string
}

export {
  getKeystore,
  createKeystore,
  getContent,
}

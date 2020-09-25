export interface KeyStore {
  version: string
  address?: string
  content: string
  crypto: Crypto
}

export interface Crypto {
  cipher: string
  salt?: string
}

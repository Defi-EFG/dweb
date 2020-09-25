import BaseError from './base'

class WalletError extends BaseError {
  constructor(public message: string, public code: number = 0) {
    super(message, code)
  }
}

export { WalletError }

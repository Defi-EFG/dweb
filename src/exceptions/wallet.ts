import BaseError from './base'

export class WalletError extends BaseError {
  constructor(public message: string, public code: number = 0) {
    super(message, code)
  }
}

export class InsufficientBalance extends BaseError {
  constructor(public message: string, public code: number = 0) {
    super(message, code)
  }
}

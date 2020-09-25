import BigNumber from 'bignumber.js'
import Wallet from './ecoc-wallet'
import { ECOC_MAINNET, ECOC_TESTNET } from './constants'

interface URI {
  address: string
  amount?: string
  label?: string
  message?: string
  request?: string
  network?: string
}

interface QueryParam {
  amount?: string
  label?: string
  message?: string
  request?: string
}

export default class EcocURI implements URI {
  address: string
  amount?: string
  label?: string
  message?: string
  request?: string
  network?: string

  constructor(data: string | URI) {
    this.address = ''

    if (typeof data === 'string') {
      const params = EcocURI.parse(data)
      this._fromObject(params)
    } else if (typeof data === 'object') {
      this._fromObject(data)
    } else {
      throw new TypeError('Unrecognized data format.')
    }
  }

  _fromObject(obj: URI) {
    const { address, amount, label, message, request } = obj

    if (!Wallet.isEcocAddress(address)) throw Error('invalid_ecoc_address')

    this.address = address
    if (amount) this.amount = this._parseAmount(amount)
    if (label) this.label = label
    if (message) this.message = message
    if (request) this.request = request

    if (address.startsWith('E')) {
      this.network = ECOC_MAINNET
    } else {
      this.network = ECOC_TESTNET
    }
  }

  _parseAmount(amount: string) {
    const res = new BigNumber(amount)
    if (res.isNaN()) {
      throw new TypeError('Invalid Amount')
    }
    return res.toString()
  }

  static fromString(str: string) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string')
    }
    return new EcocURI(str)
  }

  static fromObject(object: URI) {
    return new EcocURI(object)
  }

  static isValid(uri: string | URI) {
    try {
      new EcocURI(uri)
    } catch (err) {
      return false
    }
    return true
  }

  static parse(uri: string) {
    const info = new URL(uri)

    if (info.protocol !== 'ecoc:') {
      throw new TypeError('Invalid ECOChain URI')
    }

    const searchParams = info.searchParams
    const params = {
      address: info.pathname,
      amount: searchParams.get('amount'),
      label: searchParams.get('label'),
      message: searchParams.get('message'),
      request: searchParams.get('request')
    } as URI

    return params
  }

  toString() {
    const protocol = 'ecoc:'
    const query = []

    let result = protocol + this.address

    if (this.amount && new BigNumber(this.amount).gt(0)) {
      query.push(`amount=${this.amount}`)
    }

    if (this.message) {
      query.push(`message=${escape(this.message)}`)
    }

    if (this.label) {
      query.push(`label=${escape(this.label)}`)
    }

    if (this.request) {
      query.push(`r=${escape(this.request)}`)
    }

    if (query.length > 0) {
      result += '?' + query.join('&')
    }

    return result
  }

  inspect() {
    return '<URI: ' + this.toString() + '>'
  }
}

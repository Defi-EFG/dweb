import BigNumber from 'bignumber.js'
import Wallet from './wallet'
import * as _ from 'lodash'
import * as URI from 'urijs'

const Members = ['address', 'amount', 'message', 'label', 'r']

export default class EcocURI {
  constructor(data, knownParams) {
    this.extras = {}
    this.knownParams = knownParams || []
    this.address = this.network = this.amount = this.message = null

    if (typeof data === 'string') {
      var params = EcocURI.parse(data)
      if (params.amount) {
        params.amount = this._parseAmount(params.amount)
      }
      this._fromObject(params)
    } else if (typeof data === 'object') {
      this._fromObject(data)
    } else {
      throw new TypeError('Unrecognized data format.')
    }
  }

  static fromString(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string')
    }
    return new EcocURI(str)
  }

  static fromObject(json) {
    return new EcocURI(json)
  }

  static isValid(arg, knownParams) {
    try {
      new EcocURI(arg, knownParams)
    } catch (err) {
      return false
    }
    return true
  }

  static parse(uri) {
    var info = URL.parse(uri, true)

    if (info.protocol !== 'ecoc:') {
      throw new TypeError('Invalid ECOChain URI')
    }

    var group = /[^:]*:\/?\/?([^?]*)/.exec(uri)
    info.query.address = (group && group[1]) || undefined

    return info.query
  }

  _fromObject(obj) {
    if (!Wallet.isEcocAddress(obj.address)) throw Error('invalid_ecoc_address')

    this.address = obj.address
    this.network = 'mainnet'
    this.amount = obj.amount

    Object.keys(obj).forEach(key => {
      if (key === 'address' || key === 'amount') {
        return
      }

      if (/^req-/.exec(key) && this.knownParams.indexOf(key) === -1) {
        throw Error('Unknown required argument ' + key)
      }

      let destination = Members.indexOf(key) > -1 ? this : this.extras
      destination[key] = obj[key]
    })
  }

  _parseAmount(amount) {
    amount = BigNumber(amount)
    if (amount.isNaN()) {
      throw new TypeError('Invalid amount')
    }
    return amount.toString()
  }

  toObject() {
    return this.toJSON()
  }

  toJSON() {
    var json = {}
    for (var i = 0; i < Members.length; i++) {
      var m = EcocURI.Members[i]
      if (this.hasOwnProperty(m) && typeof this[m] !== 'undefined') {
        json[m] = this[m].toString()
      }
    }
    _.extend(json, this.extras)
    return json
  }

  toString() {
    var query = {}
    if (this.amount) {
      query.amount = this.amount
    }
    if (this.message) {
      query.message = this.message
    }
    if (this.label) {
      query.label = this.label
    }
    if (this.r) {
      query.r = this.r
    }
    _.extend(query, this.extras)

    return URL.format({
      protocol: 'ecoc:',
      host: this.address,
      query: query
    })
  }

  inspect() {
    return '<URI: ' + this.toString() + '>'
  }
}

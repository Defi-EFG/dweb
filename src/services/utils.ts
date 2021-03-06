import BigNumber from 'bignumber.js'
import { Decoder } from 'ecoweb3'
import { staking } from './staking'
import { lending } from './lending'
import { ECOC_MAINNET } from './ecoc/constants'
import { ecocw3 } from '@/services/ecoc/ecocw3'
import { defaultNetwork } from '@/services/ecoc/config'
import * as constants from '@/constants'

const isMainnet = defaultNetwork === ECOC_MAINNET

export const toDecimals = (value: number | string, decimals: number | string) => {
  const expo = new BigNumber(10).pow(new BigNumber(decimals))
  const res = new BigNumber(value).dividedBy(expo)

  return res
}

export const fromDecimals = (value: number | string, decimals: number | string) => {
  const expo = new BigNumber(10).pow(new BigNumber(decimals))
  const res = new BigNumber(value).multipliedBy(expo)

  return res
}

export const toNumber = (value: number | string) => {
  return new BigNumber(value)
}

export const getEcocTotalFee = (
  fee: number | string,
  gasPrice: number | string,
  gasLimit: number | string
) => {
  const satoshi = new BigNumber(100000000)
  const totalFee = new BigNumber(fee)
  const totalGas = new BigNumber(gasPrice).dividedBy(satoshi).multipliedBy(gasLimit)

  return totalFee.plus(totalGas).toNumber()
}

export const getEstimatedValue = (amount: number | string, price: number | string) => {
  if (!price) return 0
  return new BigNumber(amount).multipliedBy(new BigNumber(price))
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    function() {
      /* clipboard successfully set */
    },
    function() {
      // console.error('Copy failed')
    }
  )
}

export const truncate = (msg: string, charsToShow = 20) => {
  if (msg.length <= charsToShow) return msg

  const separator = '...'
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return msg.substr(0, frontChars) + separator + msg.substr(msg.length - backChars)
}

export const addressFilter = (address: string) => {
  if (address == staking.address) return constants.TYPE_STAKING
  else if (address == lending.address) return constants.TYPE_LENDING
  else return address
}

export const getExplorerUrl = (networkStr = ECOC_MAINNET) => {
  if (networkStr === ECOC_MAINNET) return 'https://explorer.ecoc.io'
  return 'https://testnet.explorer.ecoc.io'
}

export const getBlockNumber = async () => {
  const status = await ecocw3.api.getBlockStatus()
  return status.height as number
}

export const toEcocAddress = (addressHex: string) => {
  try {
    return Decoder.toEcoAddress(addressHex, isMainnet)
  } catch (error) {
    return addressHex
  }
}

export const restrictNumberDecimals = ($event: any, input: any, decimals: number) => {
  const keyCode = $event.keyCode ? $event.keyCode : $event.which

  input = input.toString()

  // only allow number and one dot
  if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || input.indexOf('.') != -1)) {
    // 46 is dot
    $event.preventDefault()
  }
  // restrict to 2 decimal places
  if (input != null && input.indexOf('.') > -1 && input.split('.')[1].length > decimals - 1) {
    $event.preventDefault()
  }
}

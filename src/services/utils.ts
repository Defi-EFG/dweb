import BigNumber from 'bignumber.js'
import { Decoder } from 'ecoweb3'
import { staking } from './staking'
import { lending } from './lending'
import { ECOC_MAINNET } from './ecoc/constants'
import { ecocw3 } from '@/services/ecoc/ecocw3'
import * as constants from '@/constants'

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
      console.error('Copy failed')
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
    return Decoder.toEcoAddress(addressHex)
  } catch (error) {
    return addressHex
  }
}

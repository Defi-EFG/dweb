import abi from 'ethjs-abi'
import { Ecocjs } from 'ecoweb3'

import { Ecrc20 } from '@/types/currency'
import { ecocw3 } from './ecocw3'

export const getEcrc20Info = (contractAddress: string) => {
  return ecocw3.api.getTokenInfo(contractAddress)
}

export const encodeSendData = (token: Ecrc20, to: string, amount: number) => {
  return (
    'a9059cbb' +
    abi
      .encodeParams(
        ['address', 'uint256'],
        [
          '0x' + Ecocjs.address.fromBase58Check(to)['hash'].toString('hex'),
          amount * Math.pow(10, Number(token.decimals))
        ]
      )
      .substr(2)
  )
}

import BigNumber from 'bignumber.js'
import { TxValueIn, TxValueOut } from '@/types/transaction'

export const getBalanceChanged = (address: string, vin: TxValueIn[], vout: TxValueOut[]) => {
  let balanceIn
  let balanceOut

  try {
    balanceIn = vin.reduce((sum, vtx) => {
      if (vtx.addr === address) return sum.plus(vtx.value as number)
      return sum.plus(0)
    }, new BigNumber(0))

    balanceOut = vout.reduce((sum, vtx) => {
      if (vtx.scriptPubKey.addresses && vtx.scriptPubKey.addresses[0] === address) {
        return sum.plus(vtx.value)
      }

      return sum.plus(0)
    }, new BigNumber(0))
  } catch (error) {
    return new BigNumber(0)
  }

  return balanceOut.minus(balanceIn)
}

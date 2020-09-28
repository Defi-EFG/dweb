import BigNumber from 'bignumber.js'

export const toDecimals = (value: number | string, decimals: number | string) => {
  const expo = new BigNumber(10).pow(new BigNumber(decimals))
  const res = new BigNumber(value).dividedBy(expo)

  return res.toString()
}

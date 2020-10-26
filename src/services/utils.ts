import BigNumber from 'bignumber.js'

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

export const toNumber = (value: string) => {
  return new BigNumber(value)
}

export const getEstimatedValue = (amount: number | string, price: number | string) => {
  if (!price) return 0
  return new BigNumber(amount).multipliedBy(new BigNumber(price)).toFixed(6)
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

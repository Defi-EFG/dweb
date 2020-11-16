import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production' ? 'https://dev.efg.finance' : 'https://dev.efg.finance'

interface PriceResult {
  date: string[]
  price: number[]
}

export namespace api {
  export const getprice = async (currencyName: string): Promise<PriceResult> => {
    const headers = {} // {"Access-Control-Allow-Origin": "*"}
    const fullURL = baseURL + '/api/price/' + currencyName
    const result = await axios.get(fullURL, { headers })

    return result.data
  }
}

import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production' ? 'https://api.efg.finance' : 'https://dev.efg.finance/api'

interface PriceResult {
  date: string[]
  price: number[]
}

export namespace api {
  export const getprice = async (currency: string, chartlist: string): Promise<PriceResult> => {
    const headers = {} // {"Access-Control-Allow-Origin": "*"}
    const fullURL = baseURL + '/getPrice/' + chartlist + '/' + currency
    const result = await axios.get(fullURL, { headers })

    return result.data
  }
}

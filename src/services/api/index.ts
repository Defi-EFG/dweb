import axios from 'axios'

const baseURL = 'https://dev.efg.finance'

interface PriceResult {
    date:  string []
    price: number []
}

export namespace api {
    export const getprice = async (currencyName: string): Promise<PriceResult>  => {
        const headers = {}// {"Access-Control-Allow-Origin": "*"}
        const fullURL = baseURL + '/api/price'
        const result = await axios.get(fullURL, { headers });

        return result.data;
    }
}

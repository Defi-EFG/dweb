import { Ecocw3 } from 'ecoweb3'
import { getConfig, defaultNetwork } from './config'

let config = getConfig(defaultNetwork)
let ecocw3 = new Ecocw3(config)

const changeToNetwork = (networkStr: string) => {
  config = getConfig(networkStr)
  ecocw3 = new Ecocw3(config)
}

export { ecocw3, changeToNetwork }

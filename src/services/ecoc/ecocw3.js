import { Ecocw3 } from 'ecoweb3'
import { getConfig, defaultNetwork } from './config'

const config = getConfig(defaultNetwork)
const ecocw3 = new Ecocw3(config)

export default ecocw3

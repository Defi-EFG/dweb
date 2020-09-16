interface Config {
  apiProvider: string
  socketURL: string
}

const mainnetConfig = {
  networkStr: "Mainnet",
  apiProvider: "https://explorer.ecoc.io/api",
  socketURL: "https://explorer.ecoc.io/"
} as Config

const testnetConfig = {
  networkStr: "Testnet",
  apiProvider: "https://testnet.explorer.ecoc.io/api",
  socketURL: "https://testnet.explorer.ecoc.io/"
} as Config

const defaultNetwork = "Testnet"

const getConfig = (networkStr: string) => {
  if (networkStr === 'Testnet') {
    return testnetConfig
  }

  return mainnetConfig
}

export { getConfig, defaultNetwork }

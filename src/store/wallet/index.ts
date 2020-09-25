import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import store from '@/store'
import { Wallet } from '@/types/wallet'
import { KeyStore } from '@/types/keystore'
import { Currency } from '@/types/currency'
import { Transaction } from '@/types/transaction'
import { generateNewKeystore, importFromKeystore, getKeystore } from '@/services/wallet'

@Module({ dynamic: true, store, namespaced: true, name: 'walletStore' })
export default class WalletModule extends VuexModule implements Wallet {
  address = ''
  network = ''
  keystore = {} as KeyStore
  transactions = [] as Transaction[]
  currencies = [] as Currency[]

  @Mutation
  updateAddress(address: string) {
    this.address = address
  }

  @Mutation
  updateKeystore(keystore: KeyStore) {
    this.keystore = keystore
  }

  @Mutation
  updateNetwork(network: string) {
    this.network = network
  }

  @Action
  async createNewWallet(password: string) {
    return await generateNewKeystore(password)
  }

  @MutationAction
  async importWallet(payload: { keystore: string; password: string }) {
    const wallet = importFromKeystore(payload.keystore, payload.password)

    return {
      address: wallet.address,
      network: wallet.networkName,
      keystore: getKeystore(payload.keystore)
    }
  }
}

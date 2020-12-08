import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Contact } from '@/types/contact'
import SecureLS from 'secure-ls'
import store from '@/store'

@Module({ dynamic: true, store, namespaced: true, name: 'addressBookStore' })
export default class AddressBookModule extends VuexModule {
  contactList: Contact[] = []
  localStore = new SecureLS()
  contactListKey = ''

  get addressBook() {
    return this.contactList
  }

  @Action
  addContact(contact: Contact) {
    this.contactList.push(contact)
    this.context.dispatch('setLocalContactList', this.contactList)
  }

  @Mutation
  setContactListKey(address: string) {
    this.contactListKey = `address-${address}`
  }

  @Mutation
  initContactList() {
    if (this.contactListKey) {
      this.contactList = this.localStore.get(this.contactListKey) as Contact[]
      if (!this.contactList) {
        this.localStore.set(this.contactListKey, [] as Contact[])
        this.contactList = this.localStore.get(this.contactListKey) as Contact[]
      }
    }
  }

  @Mutation
  setContactList(contact: Contact[]) {
    this.contactList = contact
  }

  @Action
  setLocalContactList(contact: Contact[]) {
    this.localStore.set(this.contactListKey, contact)
  }

  @Action
  updateContact(payload: { index: number; contact: Contact }) {
    this.contactList[payload.index] = payload.contact
    this.context.dispatch('setLocalContactList', this.contactList)
  }

  @Action
  removeContact(index: number) {
    this.contactList.splice(index, 1)
    this.context.dispatch('setLocalContactList', this.contactList)
  }
}

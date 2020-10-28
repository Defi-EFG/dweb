import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import { db } from './firebase'
import { Contact } from '@/types/contact'
import store from '@/store'

@Module({ dynamic: true, store, namespaced: true, name: 'addressBookStore' })
export default class AddressBookModule extends VuexModule {
  contactList: Contact[] = []
  firebaseData: firebase.database.Reference = {} as firebase.database.Reference
  address = ''

  get addressBook() {
    return this.contactList
  }

  @Action
  subscribeToFirebase(userAddr: string) {
    this.connectFirebaseRef(userAddr)
    this.firebaseData.on('value', contact => {
      this.setContactList(contact.val())
    })
  }

  @Action
  addNewContact(contact: Contact) {
    this.firebaseData.child(contact.name).set(contact)
  }

  @Mutation
  connectFirebaseRef(userAddr: string) {
    this.firebaseData = db.ref(userAddr)
  }

  @Mutation
  setContactList(contact: Contact[]) {
    this.contactList = contact
  }

  // @Mutation
  // addToContactList(contact: Contact) {

  // }

}
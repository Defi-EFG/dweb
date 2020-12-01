import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
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
      if (contact.exists()) {
        this.setContactList(contact.val())
      } else {
        this.createNewRef(userAddr)
      }
    })
    this.firebaseData.off
  }

  @Action
  unsubscribeFromFirebase() {
    this.firebaseData.off()
    this.setContactList([])
  }

  @Action
  addNewContact(contact: Contact) {
    this.firebaseData.push(contact)
    this.firebaseData.once('value', contact => {
      if (contact.child('created').exists()) {
        this.firebaseData.child('created').remove()
      }
    })
  }

  @Action
  updateContact(payload: { uid: string; contact: Contact }) {
    this.firebaseData.child(payload.uid).set(payload.contact)
  }

  @Action
  removeContact(uid: string) {
    this.firebaseData.child(uid).remove()
  }

  @Action
  createNewRef(ref: string) {
    const newCreated = { created: true }
    db.ref(ref).set(newCreated)
  }

  @Mutation
  connectFirebaseRef(userAddr: string) {
    this.firebaseData = db.ref(userAddr)
  }

  @Mutation
  setContactList(contact: Contact[]) {
    this.contactList = contact
  }
}

<template>
  <v-card class="contact-address-container" color="#222738" dark>
    <v-toolbar class="contact-address-head" flat dense>
      <v-toolbar-title>
        <v-icon class="head-icon">book</v-icon>
        <span>{{ $t('views.walletpage.contact_address') }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :disabled="!isReady" @click="openAddcontact()">
        <v-icon>add_circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list color="#222738" class="address-list">
      <v-list-item v-for="(contact, index) in contactList" :key="index" class="address-item">
        <template v-if="'created' in contactList">
          <div class="empty-message">
            <v-icon class="book-icon">class</v-icon>
            <div class="message">{{ $t('views.walletpage.no_contact_address') }}</div>
          </div>
        </template>

        <template v-else>
          <v-icon class="mr-3">account_circle</v-icon>

          <v-list-item-content>
            <v-list-item-title class="addr-name">{{ contact.name }}</v-list-item-title>
            <small class="addr-value text-truncate">{{ contact.address }}</small>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn fab icon x-small class="contact-btn" @click="openEditcontact(contact)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn fab icon x-small class="contact-btn" @click="openDeletecontact(contact)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </template>
      </v-list-item>
    </v-list>
    <AddEditContact
      :toAdd.sync="addMode"
      :toEdit.sync="editMode"
      :editContact="editContact"
      :showDialog.sync="displayAddEdit"
    />
    <DeleteContact :showDialog.sync="displayDelete" :contact="editContact" />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import AddEditContact from '@/components/modals/AddEditContact.vue'
import DeleteContact from '@/components/modals/DeleteContact.vue'
import AddressBookModule from '@/store/address-book'
import WalletModule from '@/store/wallet'
import { getModule } from 'vuex-module-decorators'
import { Contact } from '@/types/contact'

@Component({
  components: {
    AddEditContact,
    DeleteContact
  }
})
export default class ContactAddress extends Vue {
  addressStore = getModule(AddressBookModule)
  walletStore = getModule(WalletModule)

  displayAddEdit = false
  displayDelete = false
  addMode = false
  editMode = false
  editContact: Contact = {} as Contact

  get walletAddr() {
    return this.walletStore.address
  }

  get isReady() {
    return this.walletStore.isWalletUnlocked
  }

  get contactList() {
    return this.addressStore.addressBook
  }

  openAddcontact() {
    if (this.isReady) {
      this.addMode = true
      this.editMode = false
      this.displayAddEdit = !this.displayAddEdit
    }
  }

  openEditcontact(contact: Contact) {
    if (this.isReady) {
      this.editMode = true
      this.addMode = false
      this.editContact = Object.assign({}, contact)
      this.displayAddEdit = !this.displayAddEdit
    }
  }

  openDeletecontact(contact: Contact) {
    this.editContact = Object.assign({}, contact)
    this.displayDelete = !this.displayDelete
  }

  mounted() {
    if (this.walletStore.isWalletUnlocked) {
      this.addressStore.subscribeToFirebase(this.walletAddr)
    }
  }

  @Watch('isReady')
  onLoggedIn(ready: any) {
    if (ready) {
      this.addressStore.subscribeToFirebase(this.walletAddr)
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-address-container {
  width: inherit;
}

.contact-address-head {
  background: transparent linear-gradient(180deg, #2b3043 0%, #333848 100%) 0% 0% no-repeat
    padding-box;

  .head-icon {
    font-size: 20px;
    margin-right: 8px;
  }

  span {
    font-size: 16px;
  }
}

.address-list {
  max-height: 192px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff41;
    border-radius: 6px;
  }
}
.address-item {
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.105);
}
.address-item:nth-last-child(1) {
  border-bottom: 0;
}

.contact-btn {
  background: rgba(238, 238, 238, 0.105);
}

.contact-btn:nth-child(1) {
  margin-right: 10px;
}

.addr-value {
  opacity: 0.7;
}

.empty-message {
  opacity: 0.3;
  margin: auto;
  text-align: center;
  padding-top: 2.7rem;

  .book-icon {
    font-size: -webkit-xxx-large;
  }

  .message {
    padding-top: 0.2rem;
    font-weight: 700;
  }
}

@media (max-width: 1264px) {
  .address-list {
    min-height: 128px;
  }

  .empty-message {
    margin: 2rem auto;
    padding-top: 0;
  }
}

@media (max-width: 425px) {
  .address-item {
    font-size: small;
    .addr-name {
      font-size: small;
    }
  }
}
</style>

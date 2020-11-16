<template>
  <div>
    <v-dialog v-model="visible" max-width="400">
      <v-card>
        <v-card-title class="card-title">
          <span>{{ addMode ? modal.add_contact : modal.edit_contact }}</span>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <div class="contact-dialog-wrapper">
          <div class="contact-dialog-content" id="soloadd">
            <v-form class="pt-4">
              <v-text-field
                class="pb-2"
                :placeholder="getFormPlaceholder('name')"
                dense
                solo
                v-model="contact.name"
                :rules="[rules.required, rules.exist]"
              ></v-text-field>
              <v-text-field
                class="pb-2"
                :placeholder="getFormPlaceholder('address')"
                dense
                solo
                v-model="contact.address"
                :rules="[rules.required]"
              ></v-text-field
            ></v-form>
            <div class="btn-wrapper">
              <v-btn class="cancel" outlined large color="primary" @click="onClose()">
                {{ $t('views.modal.cancel') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                class="submit"
                :disabled="!isFormFilled(contact) || isNameExist(contact.name)"
                large
                depressed
                color="primary"
                @click="performContactAction"
              >
                {{ addMode ? modal.add : modal.edit }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Watch } from 'vue-property-decorator'
import AddressBookModule from '@/store/address-book'
import { Contact } from '@/types/contact'
import WalletModule from '@/store/wallet'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {}
})
export default class AddEditContact extends Vue {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  @PropSync('toAdd', { type: Boolean }) addMode?: boolean
  @PropSync('toEdit', { type: Boolean }) editMode?: boolean
  @Prop() editContact?: Contact
  @PropSync('showDialog', { type: Boolean }) visible!: boolean

  addressStore = getModule(AddressBookModule)
  walletStore = getModule(WalletModule)

  contact: Contact = {
    name: '',
    address: ''
  }

  get contactList() {
    return this.addressStore.addressBook
  }

  get modal() {
    return this.$t('views.modal')
  }
  @Watch('showDialog')
  checkopen(val: any) {
    this.visible = val
  }

  rules = {
    required: (value: string) => {
      if (this.visible) {
        return !!value || this.$t('views.modal.required')
      }
      return true
    },
    exist: (value: string) => {
      if (this.visible) {
        return !this.isNameExist(value) || this.$t('views.modal.required')
      }
      return true
    }
  }

  isFormFilled(contact: Contact) {
    return !!contact.name && !!contact.address
  }

  isNameExist(name: string) {
    if (name === this.editContact?.name && this.editMode) {
      return false
    }
    const existIndex = Object.values(this.contactList).findIndex(contact => contact.name === name)
    return existIndex >= 0
  }

  getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => JSON.stringify(object[key]) === JSON.stringify(value))
  }

  onClose() {
    this.$emit('update:toAdd', false)
    this.$emit('update:toEdit', false)
    this.$emit('update:showDialog', false)
  }

  performContactAction() {
    if (this.addMode) {
      this.addNewAddress()
    } else {
      this.updateAddress()
    }
  }

  addNewAddress() {
    if (this.walletStore.isWalletUnlocked) {
      this.addressStore.addNewContact(this.contact)
      this.onClose()
    }
  }

  updateAddress() {
    if (this.walletStore.isWalletUnlocked) {
      const contactKey = this.getKeyByValue(this.contactList, this.editContact)
      this.addressStore.updateContact({ uid: contactKey!, contact: this.contact })
      this.onClose()
    }
  }

  getFormPlaceholder(type: string) {
    if (type === 'name') {
      return this.addMode ? this.$t('views.modal.name') : this.editContact?.name
    } else {
      return this.addMode ? this.$t('views.modal.address') : this.editContact?.address
    }
  }

  @Watch('editMode')
  toEditMode(val: any) {
    if (val) {
      this.contact = Object.assign({}, this.editContact!)
    } else {
      this.contact = {} as Contact
    }
  }
}
</script>

<style lang="scss">
#soloadd {
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    box-shadow: unset;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    font-size: 20px;
  }
  .v-text-field.v-input--dense:not(.v-text-field--outlined) input {
    padding: 25px 0;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px;
  }
  .blur-card:before {
    bottom: 0px !important;
  }
}
.v-dialog {
  overflow-y: unset;
}
</style>

<style lang="scss" scoped>
.v-dialog {
  background-color: transparent;
  position: relative;
  color: white;
}
.contact-dialog-content {
  padding: 10px 10px;
  background-color: white;
  font-size: 13px;
}

.contact-dialog-wrapper {
  margin: 0px 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding: 0px 0 20px 0;
}

.v-card {
  position: relative;
}

.btn-wrapper {
  display: flex;

  .cancel {
    width: 48%;
    border: 2px solid #44096b;
    text-transform: capitalize;
  }

  .submit {
    width: 48%;
    text-transform: capitalize;
  }
}

.card-title {
  background-color: #44096b;
  color: white;
  span {
    font-size: medium;
  }
}
</style>

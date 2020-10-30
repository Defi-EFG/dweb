<template>
  <div>
    <v-dialog v-model="visible" max-width="400">
      <v-card>
        <v-card-title class="card-title">
          <span>Delete contact</span>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <div class="contact-dialog-wrapper">
          <div class="contact-dialog-content" id="soloadd">
            <div class="headtext_m">Delete</div>
            <div class="headtext_span">Are you sure you want to delete this contact?</div>
            <div class="btn-wrapper">
              <v-btn class="cancel" outlined large color="primary" @click="onClose()">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="submit" large depressed color="primary" @click="removeContact">
                Delete
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'
import AddressBookModule from '@/store/address-book'
import { getModule } from 'vuex-module-decorators'
import { Contact } from '@/types/contact'
@Component({
  components: {}
})
export default class Deletecontact extends Vue {
  @PropSync('showDialog', { type: Boolean }) visible!: boolean
  @Prop() contact!: Contact

  addressStore = getModule(AddressBookModule)

  get contactList() {
    return this.addressStore.addressBook
  }

  onClose() {
    this.$emit('update:showDialog', false)
  }

  removeContact() {
    const contactUid = this.getKeyByValue(this.contactList, this.contact)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.addressStore.removeContact(contactUid!)
    this.onClose()
  }

  getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => JSON.stringify(object[key]) === JSON.stringify(value))
  }
}
</script>
<style>
.v-text-field fieldset,
.v-text-field .v-input__control,
.v-text-field .v-input__slot {
  border-radius: unset;
}
.v-input__slot:before {
  border: none !important;
  border-radius: 5px;
}
</style>
<style lang="scss" scoped>
.headtext_m {
  color: #44096b;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.headtext_span {
  text-align: center;
  margin-bottom: 30px;
  color: #b0abab;
  font-size: 15px;
}
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
  padding: 2rem 0 24px 0;
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

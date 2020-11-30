<template>
  <div>
    <v-dialog v-model="visible" max-width="400" persistent>
      <v-card>
        <v-card-title class="card-title">
          <span>{{ $t('views.modal.delete_contact') }}</span>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="onClose">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <div class="contact-dialog-wrapper">
          <div class="contact-dialog-content" id="soloadd">
            <div class="headtext_m">{{ $t('views.modal.delete') }}</div>
            <div class="headtext_span">{{ $t('views.modal.are_you') }}</div>
            <div class="btn-wrapper">
              <v-btn class="cancel" outlined large color="primary" @click="onClose()">
                {{ $t('views.modal.cancel') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="submit" large depressed color="primary" @click="removeContact">
                {{ $t('views.modal.delete') }}
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

<template>
  <v-card class="rounded-lg">
    <div class="create-wallet-wraper bg-white rounded-lg">
      <div class="pb-5 mb-7">
        <h3 class="primary--text"><b>Create ECOC Wallet</b></h3>
        <small class="lightgray--text">Please set your password to generate a keystore file</small>
      </div>
      <template>
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          name="input-10-1"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          label="Set your password"
          color="primary"
          filled
          elevation-0
          dense
          v-model="password1"
        ></v-text-field>
      </template>
      <v-text-field
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        name="input-10-2"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        label="Repeat your password"
        color="primary"
        filled
        elevation-0
        dense
        v-model="password2"
      ></v-text-field>

      <div class="action-wrapper  ">
        <v-btn large class="mb-5" color="primary">
          <h4 class="text-capitalize font-weight-light">Create</h4>
        </v-btn>

        <small class="lightgray--text mt-5 mb-2">Needed password to unlock keystore file.</small>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Loading from './loading-create-accout.vue'
@Component({
  components: {
    Loading
  }
})
export default class CreateWalletModal extends Vue {
  createwalletdialog = false
  @Prop() password1!: string
  @Prop() password2!: string
  @Prop() visible!: boolean
  show = false

  @Watch('visible')
  CreateWalletdialog() {
    this.createwalletdialog = this.visible
  }

  onCreatewalletModal() {
    this.$emit('onCreatewalletModal')
  }
  oncloseCreatewalletModal() {
    this.$emit('oncloseCreatewalletModal')
  }

  //   onCreatewallet() {
  // this.createwalletdialog =! this.createwalletdialog
  //   }
  // Loading() {
  //   console.log('loading')
  //   // this.loading = !this.loading
  // }

  password = 'Password'
  rules = {
    // required: (value: any) => !!value || 'Required.',
    // min: (password1: string | any[]) => password1.length >= 8 || 'Min 8 characters',
    // min2: (password2: string | any[]) => password2.length >= 8 || 'Min 8 characters'
  }
}
</script>


<style>
.create-wallet-wraper .v-label {
  font-size: 0.8em;
}
.create-wallet-wraper .v-input__slot:before {
  border: none !important;
}
.v-text-field__details {
  margin-bottom: 0px !important;
}
</style>

<style lang="scss" scoped>
.modal-header {
  display: flex;
  justify-content: space-between;

  padding: 9px !important;
  border-bottom: 1px solid #0000002e;
}
.action-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.create-wallet-wraper {
  padding: 29px 33px 23px 36px;
}
</style>
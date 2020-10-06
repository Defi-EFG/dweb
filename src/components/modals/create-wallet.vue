<template>
  <v-dialog v-model="createwalletdialog" width="394">
    <v-card class="rounded-lg">
      <v-card-title class="headline modal-header">
        <v-btn text @click="dialog = true" @click.stop="createwalletdialog = false"
          ><v-icon>$leftarrow</v-icon></v-btn
        >
        <v-btn text @click="createwalletdialog = false"><v-icon>$close</v-icon></v-btn>
      </v-card-title>

      <div class="create-wallet-wraper bg-white rounded-lg">
        <div class="pb-5 mb-7">
          <h3 class="primary--text"><b>Create ECOC Wallet</b></h3>
          <small class="lightgray--text"
            >Please set your password to generate a keystore file</small
          >
        </div>
        <template>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            name="input-10-1"
            :rules="[rules.required, rules.min]"
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
          :rules="[rules.required, rules.min2]"
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
            <h4 class="text-capitalize font-weight-light" @click.stop="Loadinge()">Create</h4>
          </v-btn>
          <Loading :visible="loading" />
          <small class="lightgray--text mt-5 mb-2">Needed password to unlock keystore file.</small>
        </div>
      </div>
    </v-card>
  </v-dialog>
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
  @Prop() password1!: string
  @Prop() password2!: string
  @Prop() visible!: boolean
  loading = false
  show = false
  createwalletdialog = this.visible
   loadingg =! this.visible
  @Watch('visible')
  show1() {
    this.createwalletdialog = this.visible
  }
  onClose() {
    this.$emit('onClose')
  }
  onSuccess() {
    this.$emit('onSuccess')
  }
  Loadinge(){
console.log("loading");
this.loadingg = !this.loadingg
 
  }
  password = 'Password'

  rules = {
    required: (value: any) => !!value || 'Required.',
    min: (password1: string | any[]) => password1.length >= 8 || 'Min 8 characters',
    min2: (password2: string | any[]) => password2.length >= 8 || 'Min 8 characters'
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
  padding: 29px 33px 54px 36px;
}
</style>
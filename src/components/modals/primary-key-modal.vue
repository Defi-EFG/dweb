<template>
  <v-dialog v-model="checkPrivatekeyDialog" max-width="440">
    <v-card>
      <v-card-title class="bg-header"
        ><div>
          <span>ECOC Wallet</span>
        </div>
        <div class="header-primarykey">
          <v-icon color="white" class="mr-2">$circle</v-icon> <span>fffffffff</span>
        </div>
      </v-card-title>
      <div class="bg-white">
        <div class="d-flex">
          <h3 class="header">Private Key</h3>
          <img src="@/assets/primarykey.svg" alt="" />
        </div>
        <small>Please input keystore password to access private key</small>
        <v-text-field
          class="mt-5"
          v-model="keystorePassword"
          name="input-10-1"
          label="Keystore Password"
          color="primary"
          filled
          elevation-0
          dense
        >
        </v-text-field>
        <div class="action-wrapper">
          <v-btn large color="primary">Access</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class PrivateKey extends Vue {
  @Prop() visiblemodalpk!: boolean
  checkPrivatekeyDialog: any = ''
  keystorePassword: any = ''

  @Watch('visiblemodalpk')
  checkvisible() {
    this.checkPrivatekeyDialog = this.visiblemodalpk
  }

  onClose() {
    this.$emit('onClose')
  }
}
</script>
<style>
.action-wrapper {
  display: flex;

  flex-direction: column;
  text-align: center;
}
.bg-white {
  background-color: white;
  margin: 0px 29px;
  padding: 26px;
}
.bg-header {
  background-color: #44096b;
  color: white;
  margin: 10px 29px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bg-header span {
  font-size: 15px;
}
.header-primarykey {
  border: 1px solid;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.219);
  max-height: 100px;
  padding: 0px 10px;
  font-size: 15px;
}
.header-primarykey v-icon {
  font-size: 14px;
}

.header {
  color: #44096b;
  margin-right: 4px;
  font-weight: 900;
}
</style>
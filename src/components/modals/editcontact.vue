<template>
  <div class="send-transaction">
    <v-dialog v-model="show" max-width="400">
      <v-card class="">
        <v-card-title class="headline modal-header" id="headmodel">
          <div class="headtext">Edit contact</div>
          <v-icon></v-icon>
          <v-btn @click="onClose()" text><v-icon color="white">$close</v-icon></v-btn>
        </v-card-title>
        <div class="transaction-confirmation-wrapper ">
          <div class="transaction-confirmation-content" id="solo">
            <v-form class="pt-4">
              <v-text-field label="MXC" solo></v-text-field>
              <v-text-field label="cccc" solo></v-text-field
            ></v-form>
            <div class="action-transaction-confirmation">
              <v-btn outlined large color="primary" class="text-capitalize">Cancel</v-btn>
              <v-btn large depressed color="primary" class="text-capitalize">Add</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import GasSetting from './gas-setting-modal.vue'
@Component({
  components: {}
})
export default class Editcontactdialog extends Vue {
  editcontactdialog = false
  @Prop() visible!: boolean
  get show() {
    return this.visible
  }
  onClose() {
    this.$emit('onClose')
  }
  onSuccess() {
    this.$emit('onSuccess')
  }
}
</script>
<style lang="scss">
#solo {
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
}
/* .headline {
  border-bottom: 1px solid rgba(180, 180, 180, 0.555);
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.blur-card .theme--light.v-sheet .theme--light.v-card {
} */
/* .theme--light.v-sheet {
  border-color: transparent !important;
  background-color: transparent;
} */
/* .v-input__slot:before {
  border: none !important;
} */
</style>
<style lang="scss" scoped>
#headmodel {
  background-color: #44096b;
  color: white;
}
#headmodel .headtext {
  background-color: #44096b;
  color: white;
  font-size: 15px;
  font-weight: 100;
}
.v-dialog {
  background-color: transparent;
  position: relative;
  color: white;
}
.transaction-confirmation-content {
  padding: 10px 10px;
  background-color: white;
  font-size: 13px;
}

.transaction-confirmation-wrapper {
  margin: 0px 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  padding: 0px 0 20px 0;
}

.action-transaction-confirmation .v-btn {
  border: 2px solid #44096b;
}
.transaction-receiver {
  background-color: #370757;
}
.transaction-sender {
  background-color: #44096b;
  border-right: 1px solid rgba(180, 180, 180, 0.555);
}
.action-transaction-confirmation,
.detail,
.modal-header {
  display: flex;
  justify-content: space-between;
}
.modal-header {
  padding: 9px 10px 9px 27px !important;
  background-color: transparent;
}
.v-card {
  position: relative;
}

.action-transaction-confirmation button {
  width: 48%;
}
.transaction-confirmation-content-detail p {
  margin: 0;
  text-align: end;
}
.detail p {
  margin: 0;
}
.address {
  font-size: 0.9em;
  word-break: break-all;
}
.border-bottom {
  border-bottom: 1px solid lightgray;
}
.send-detail,
.detail {
  padding: 10px 4px;
}
.detail:nth-last-of-type(2) {
  padding-bottom: 0px;
}
.detail .v-btn:not(.v-btn--round).v-size--small {
  padding: 0;
  font-size: 0.9em;
  text-transform: capitalize;
  text-decoration: underline;
  height: auto;
}

.gassetting {
  letter-spacing: 0px;
  font-size: 10px;
}
</style>

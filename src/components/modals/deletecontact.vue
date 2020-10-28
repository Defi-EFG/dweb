<template>
  <div class="delete">
    <v-dialog v-model="visible" max-width="400">
      <v-card class="">
        <v-card-title class="headline modal-header" id="headmodel">
          <div class="headtext">Delete contact</div>
          <v-icon></v-icon>
          <v-btn text @click="onClose()"><v-icon color="white">$close</v-icon></v-btn>
        </v-card-title>
        <div class="delete-contact">
          <div class="delete-contact">
            <div class="headtext_m">Delete</div>
            <div class="headtext_span">Are you sure you want to delete this contact?</div>
            <div class="delete-contact-detail">
              <v-btn @click="onClose()" outlined large color="primary" class="text-capitalize"
                >Cancel</v-btn
              >
              <v-btn large depressed color="primary" class="text-capitalize">Delete</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Deletecontact extends Vue {
  @PropSync('showDialog', { type: Boolean }) visible!: boolean

  onClose() {
    this.$emit('update:showDialog', false)
  }
  onSuccessAdd() {
    this.$emit('onSuccess')
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
.delete-contact {
  padding: 20px 10px;
  background-color: white;
  font-size: 13px;
}

.delete-contact-detail .v-btn {
  border: 2px solid #44096b;
}
.transaction-receiver {
  background-color: #370757;
}
.transaction-sender {
  background-color: #44096b;
  border-right: 1px solid rgba(180, 180, 180, 0.555);
}
.delete-contact-detail,
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

.delete-contact-detail button {
  width: 48%;
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

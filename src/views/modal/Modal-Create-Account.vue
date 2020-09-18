<template>
  <v-row justify="center">
    <v-btn color="" dark @click.stop="dialog = true">Dashboard </v-btn>
    <v-dialog v-model="dialog" width="450">
      <v-card>
        <v-card-title class="headline modal-header">
          <v-icon></v-icon>
          <v-btn text @click="dialog = false"><v-icon>$close</v-icon></v-btn>
        </v-card-title>

        <v-card-content>
          <div class="content-wrapper ">
            <div class="content-logo ">
              <div class="logo"><img src="@/assets/icon/light-logo-defi.svg" alt="" /></div>
            </div>

            <h3 class="primary--text">Welcome to</h3>
            <h3 class="primary--text">ECOC Finance Governance</h3>
            <p class="lightgray--text">Please create or connect your wallet</p>
          </div>
          <div class="action-wrapper more-space">
            <v-btn large class="mb-5" color="white">
              <p>Create ECOC Wallet</p>
            </v-btn>
            <v-btn large color="white">
              <p>Connect ECOC Wallet</p>
            </v-btn>
          </div>
        </v-card-content>

        <v-card-title class="headline modal-header">
          <v-icon>$leftarrow</v-icon>
          <v-btn text @click="dialog = false"><v-icon>$close</v-icon></v-btn>
        </v-card-title>
        <v-card-content>
          <div class="pt-10 more-space">
            <div class="mb-10 pb-6">
              <h3 class="primary--text ">Create ECOCWallet</h3>
              <p class="lightgray--text">Please set your password to generate a keystore file</p>
            </div>
            <v-text-field
              label="Set your password"
              color="primary"
              filled
              elevation-0
              single-line
              dense
            ></v-text-field>
            <v-text-field
              label="Repeat password"
              color="primary"
              filled
              elevation-0
              single-line
              dense
            ></v-text-field>

            <div class="action-wrapper  ">
              <v-btn large class="mb-5 " color="primary">
                Create
              </v-btn>
              <small class="lightgray--text">Needed password to unlock keystore file.</small>
            </div>
          </div>
        </v-card-content>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  output: {
    name: 'ModalCreation',
    exports: 'named'
  }
}
</script>
<style lang="scss">
.modal-header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 7px 0px #0000002e;
}
.content-wrapper {
  text-align: center;
}
.action-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.more-space {
  padding: 30px;
}
.topspace {
  padding: 30px 0px;
}

.logo {
  width: 90px;
  border-radius: 50%;
  height: 90px;
  margin: 0 auto;
  box-shadow: 0px 1px 9px -4px black;
  margin-top: 40px;
  margin-bottom: 40px;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
v-btn {
  height: auto;
}

.v-application p {
  margin-bottom: 0;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: transparent !important;
}
.v-input__slot {
  margin-bottom: 0 !important;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  transform: scaleX(0) !important;
}
</style>

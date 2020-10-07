<template>
  <div>
    <v-card>
      <v-card-title class="headline modal-header">
        <v-icon></v-icon>
        <v-btn text><v-icon>$close</v-icon></v-btn>
      </v-card-title>
      <div class="content-gas-setting">
        <h3>Gas Customization</h3>
        <small>Increase the processing time of your transaction by using higher gas fee</small>
        <div class="gas-customization">
          <v-btn-toggle tile group>
            <v-btn>
              <div class="gas-custom-btn-group">
                <p>Slow</p>
                <p>-20 min</p>
                <p>1.00 ECOC</p>
              </div>
            </v-btn>
            <v-btn>
              <div class="gas-custom-btn-group">
                <p>Average</p>
                <p>-20 min</p>
                <p>1.00 ECOC</p>
              </div></v-btn
            >
            <v-btn>
              <div class="gas-custom-btn-group">
                <p>Fast</p>
                <p>-20min</p>
                <p>1.00 ECOC</p>
              </div></v-btn
            >
          </v-btn-toggle>
        </div>
        <div class="inputnumber d-flex justify-space-between">
          <v-col cols="6" class="pb-0">
            <label for="Gas price:">Gas price:</label><v-text-field type="number"></v-text-field>
          </v-col>
          <v-col cols="6" class="pb-0">
            <label for="Gas limit:">Gas limit:</label><v-text-field type="number"></v-text-field>
          </v-col>
        </div>

        <div class="d-flex justify-space-between py-4">
          <p>New Transaction Fee:</p>
          <div class="text-end">
            <p class="mb-0">3.00 ECOC</p>
            <small>-20 sec</small>
          </div>
        </div>
        <div class="save-button ">
          <v-btn color="primary" depressed block>save</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class GasSetting extends Vue {}
</script>
<style lang="scss">
.gas-customization .v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
  height: 75px !important;
  border-radius: 5px !important;
  box-shadow: 0px 3px 6px #00000029;
  border: transparent;
  width: 106px;
  margin: 0;
  margin-right: 8px;
  letter-spacing: 0px;
  font-size: 0.8em;
}
.gas-customization {
  padding: 20px 0px;
  border-bottom: 1px solid rgba(177, 169, 170, 0.466);
}
.gas-custom-btn-group {
  display: flex;
  flex-direction: column;
  text-align: end;
  text-transform: capitalize;
}

.gas-custom-btn-group p {
  margin: 0px;
  color: black;
}
.gas-custom-btn-group p:nth-of-type(1) {
  font-size: 12px;
  font-weight: 800;
}
.gas-customization .v-btn--active {
  background-color: transparent !important;
  background-color: white;
  background: transparent linear-gradient(180deg, #d2bae2 0%, #f9ecff 100%);
}
.inputnumber {
  padding: 8px 0px;
  border-bottom: 1px solid rgba(177, 169, 170, 0.466);
}

.inputnumber .v-text-field__slot {
  background-color: rgba(218, 218, 218, 0.288);
  border-radius: 5px;
  padding-left: 0px 0px 0px 8px;
}
.inputnumber .v-text-field {
  padding-top: 0px;
}

.inputnumber input[type='number']::-webkit-inner-spin-button,
.inputnumber input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
  padding: 15px 3px;
}
</style>

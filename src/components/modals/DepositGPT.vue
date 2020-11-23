<template>
  <div>
    <v-dialog v-model="depositgptModal" max-width="400" persistent>
      <v-card class="blur-card" color="#FFFFFF00">
        <v-card-title class="modal-header">
          <v-icon></v-icon>
          <v-btn icon @click="closedepositgptModal"><v-icon color="white">$close</v-icon></v-btn>
        </v-card-title>

        <div class="depositgptwrapper pt-9 ">
          <h3>Make a Deposit (GPT)</h3>
          <small>Please input GPT amount you want to deposit</small>
          <div class="comfirmdetail mt-7">
            <div class="flex-between detail">
              <span>GPT wallet balance:</span> <span>200.00 GPT</span>
            </div>

            <div class="flex-between detail mt-2">
              <span>Depposit Amount</span><span class="gptamount">50.00 GPT</span>
            </div>
            <div class="horiz-line mt-4"></div>
            <v-btn large class="depositbtn mt-8 text-capitalize" color="primary">Deposit</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class DepositgptModal extends Vue {
  @Prop({ default: false }) visible!: boolean

  depositgptModal = this.visible
  @Watch('visible')
  checkvisible(val: any) {
    this.depositgptModal = val
  }
  closedepositgptModal() {
    this.depositgptModal = false
  }
}
</script>
<style>
.blur-card {
  background-color: transparent;
  position: relative;
  color: white;
}
.blur-card:before {
  background-color: transparent;
  content: '';
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -16px;
  box-shadow: inset 0 0 2000px rgb(255, 255, 255) !important;
  backdrop-filter: blur(30px);
  z-index: -1;
}
</style>
<style lang="scss">
.flex-between {
  display: flex;
  justify-content: space-between;
}
.modal-header {
  padding: 9px !important;
  background-color: transparent;
  border-bottom: 1px solid rgba(247, 247, 247, 0.344);
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
.depositgptwrapper {
  background-color: white;
  padding: 24px;
  margin: 24px 16px;
  border-radius: 5px;
}

.depositgptwrapper h3 {
  color: #44096b;
  font-weight: 900;
  font-size: 18px;
}
.depositgptwrapper small {
  color: rgb(184, 184, 184);
}
.depositbtn {
  width: 100%;
}
.detail {
  background-color: rgba(211, 211, 211, 0.322);
  border-radius: 5px;
  padding: 14px 17px;
  margin-top: 10px;
  color: rgb(185, 185, 185);
  font-size: 14px;
}
.gptamount {
  color: black;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.horiz-line {
  border-bottom: 1px solid lightgray;
}
</style>

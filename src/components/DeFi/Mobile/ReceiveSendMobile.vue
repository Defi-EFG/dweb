<template>
  <v-tabs show-arrows grow background-color="#2F3446" dark class="rs-tabs">
    <v-tab><v-icon class="mr-2">mdi-arrow-down-circle-outline</v-icon> Receive</v-tab>
    <v-tab><v-icon class="mr-2">mdi-arrow-up-circle-outline</v-icon> Send</v-tab>

    <v-tab-item class="rs-tabs-item">
      <div v-if="!address" class="empty-div"></div>
      <div v-else class="qr-wrapper">
        <VueQrcode
          class="qr-code"
          :value="address"
          :options="{ width: 180, height: 180 }"
        ></VueQrcode>
      </div>
      <div class="address-area">
        <p class="addr-label">ECOC Wallet Address:</p>
        <div class="copyable-addr">
          <div class="text-truncate addr">{{ address }}</div>
          <v-btn icon small dark class="copy" @click="copyAddress(address)">
            <v-icon small>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="copy-message ">
        <transition name="fade" mode="out-in">
          <div class="copied" v-if="showCopy">Copied!</div>
        </transition>
      </div>
    </v-tab-item>

    <v-tab-item class="rs-tabs-item">
      <div class="text-center send-area">
        <div class="token-balance">
          <span class="text-left">{{ selectedCurrencyName }} Balance</span>
          <v-spacer></v-spacer>
          <span class="text-right">{{ selectedCurrencyBalance }} {{ selectedCurrencyName }}</span>
        </div>
        <v-text-field
          dark
          label="To Address"
          class="to-address-field"
          single-line
          solo
          hide-details="true"
          v-model="toAddr"
        >
          <template v-slot:append-outer>
            <div class="address-book" @click="displayContact = !displayContact">
              <v-icon>mdi-book-variant</v-icon>
            </div>
          </template>
        </v-text-field>
        <div class="contact-address" v-if="displayContact" v-click-outside="onClickOutside">
          <v-list-item-group dark color="#363a4a" class="address-list">
            <v-list-item
              v-for="(contact, index) in addrList"
              :key="index"
              class="address-item"
              @click="selectAddress(contact.address)"
            >
              <v-icon class="mr-3">mdi-account-circle</v-icon>

              <v-list-item-content>
                {{ contact.name }}
                <small class="addr-value text-truncate">{{ contact.address }}</small>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
        <div class="withdraw-rate">
          <v-spacer></v-spacer>
          <span class="fb-btn" @click="withdrawAll(selectedCurrencyBalance)">Withdraw All</span>
        </div>
        <v-text-field
          dark
          class="withdraw-amount"
          placeholder="0"
          prefix="Amount"
          v-model="amount"
          :suffix="selectedCurrencyName"
          single-line
          solo
          hide-details="true"
        ></v-text-field>
        <v-btn dark depressed block large class="send-btn" @click="onunlockSuccess()">Send</v-btn>
        <TransactionComfirmationModal :visible="sendialog" @onSuccess="sendialog" />
      </div>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import vClickOutside from 'v-click-outside'
import { getModule } from 'vuex-module-decorators'
import { SendPayload } from '@/types/wallet'
import WalletModule from '@/store/wallet'
import TransactionComfirmationModal from '@/components/modals/transaction-confirmation.vue'
import { copyToClipboard } from '@/services/utils'

@Component({
  components: {
    VueQrcode,
    TransactionComfirmationModal
  },
  directives: {
    clickOutside: vClickOutside.directive
  }
})
export default class ReceiveSendMobile extends Vue {
  walletStore = getModule(WalletModule)
  showCopy = false
  showQr = false

  ialog = true
  displayContact = false

  toAddr = ''
  amount = 0
  fee = 0.01
  gasPrice = 40
  gasLimit = 150000

  addrList = [
    {
      name: 'MXC',
      address: 'EJDKiMpQvUfHK5KKiKWoe3CT2Sm9CCWaVV'
    },
    {
      name: 'Bitrex',
      address: 'EJDKiMpQvUfHK5KKiKWoe3CT2Sm9CCWaVV'
    }
  ]

  get ecocBalance() {
    return this.walletStore.ecoc
  }

  get selectedCurrencyName() {
    return this.selectedCurrency?.name || ''
  }

  get selectedCurrencyBalance() {
    return this.selectedCurrency?.balance || ''
  }

  get selectedCurrency() {
    return this.walletStore.selectedCurrency
  }

  get address() {
    return this.walletStore.address || ''
  }

  selectAddress(addr: string) {
    this.toAddr = addr
    this.displayContact = false
  }

  onClickOutside() {
    console.log('clicked outside')

    this.displayContact = false
  }
  onunlockSuccess() {
    this.sendialog = !this.sendialog
  }
  onOpenModal() {
    this.sendialog = !this.sendialog
  }
  onSend() {
    const payload = {
      currency: this.selectedCurrency,
      password: '123456',
      to: this.toAddr,
      amount: this.amount,
      fee: this.fee,
      gasLimit: this.gasLimit,
      gasPrice: this.gasPrice
    } as SendPayload

    this.currencySend(payload)
  }

  currencySend(payload: SendPayload) {
    this.walletStore
      .send(payload)
      .then(txid => {
        console.log(txid)
        this.walletStore.updateBalance()
      })
      .catch(console.log)
  }

  withdrawAll(amount: number) {
    this.amount = amount
  }

  copyAddress(addr: string) {
    copyToClipboard(addr)
    this.showCopy = true

    setTimeout(() => {
      this.showCopy = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.rs-tabs {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.rs-tabs-item {
  background: #222738;
  color: white;
  padding: 1.2rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.qr-wrapper {
  text-align: center;
}
.qr-code {
  margin-top: 0.6rem;
  border-radius: 10px;
}

.address-area {
  text-align: left;
  padding: 12px 1rem 1rem 1rem;

  p {
    color: white;
  }
}

.copyable-addr {
  padding: 12px 12px 6px 12px;
  background: #363a4a;
  border-radius: 5px;
  display: flex;
  font-size: small;
  justify-content: space-between;

  .addr {
    margin: auto 0;
  }
}

.copy {
  margin-left: 6px;
  align-items: baseline;
}

.copy-message {
  height: 33px;
}
.copied {
  width: fit-content;
  margin: auto;
  background: #363a4a;
  border-radius: 6px;
  padding: 6px 1rem;
  color: #55e52b;
  font-size: small;
}

.empty-div {
  width: 180px;
  height: 180px;
  margin-bottom: 0.45rem;
  margin-top: 0.6rem;
  border-radius: 10px;
  background: #363a4a;
  margin-left: auto;
  margin-right: auto;
}

.address-book {
  background: #474d5d;
  padding: 12px;
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 0;
  cursor: pointer;
}

.address-book:hover {
  background: #5e657b;
  transition: 0.3s;
}

.addr-label {
  font-size: small;
  margin-bottom: 0.25rem;
}

.to-address-field {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #363a4a;
  margin: 0;
  border: 0;
  font-size: small;
}

.token-balance {
  padding: 1rem 8px;
  display: flex;
  color: white;
  font-size: small;
}

.withdraw-rate {
  display: flex;
  padding: 10px 8px;
  font-size: small;

  .fb-btn {
    text-decoration: underline;
    color: white;
    cursor: pointer;
    text-align: right;
  }
}

.withdraw-amount {
  font-size: small;
  text-align: right;
}

.withdraw-fee {
  display: flex;
  padding: 1.5rem 8px 8px 8px;
  color: white;

  .fee-value {
    opacity: 0.7;
  }
}

.total-withdraw {
  padding: 1rem;
  display: flex;
  background: #ffffff08;
  color: white;
  border-radius: 5px;
}

.send-btn {
  margin-bottom: 2rem;
  margin-top: 4.05rem;
  background-color: #363a4a !important;
  color: #c074f9;
  font-weight: bold;
}

.contact-address {
  z-index: 1;
  position: absolute;
  background: #363a4a;
  width: -webkit-fill-available;
  margin-right: 2rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  max-height: 232px;
  overflow: auto;
}

.address-list {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.address-item {
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.057);

  .addr-value {
    opacity: 0.5;
  }
}
.address-item:nth-last-child(1) {
  border-bottom: 0;
}
</style>

<style lang="scss">
.send-area {
  .v-input__slot {
    background: #363a4a !important;
    box-shadow: none !important;
  }
  .v-input__append-outer {
    margin: 0 !important;
  }
}

.withdraw-amount {
  .v-text-field__prefix {
    opacity: 0.6;
  }

  input {
    text-align: right;
  }
}
</style>

<style lang="scss">
.address-list {
  .v-list-item--active {
    background: #3d4254;
    color: white;
  }
}
v-dialog {
  border: 1pc solid red;
}
</style>

<style lang="scss">
.rs-tabs {
  .v-tabs-items {
    background-color: #222738 !important;
    background: #222738;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .v-tabs-slider {
    background-color: #c074f9;
  }
}
</style>

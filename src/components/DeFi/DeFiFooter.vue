<template>
  <div id="footer">
    <div class="latest-block">
      <div class="dot-circle"></div>
      <div>
        {{ $t('views.titles.latest_block') }}: {{ latestBlock | numberWithCommas({ decimal: 0 }) }}
      </div>
    </div>
    <div class="contact">
      <a href="https://t.me/EFGtoken" target="_blank" rel="noopener noreferrer"
        ><span class="contact-name">Telegram</span>
        <img
          title="Telegram"
          class="contact-icon"
          src="@/assets/Subtraction.svg"
          style="animation-delay: 0.5s;"
      /></a>
      <a href="https://github.com/Defi-EFG" target="_blank" rel="noopener noreferrer"
        ><span class="contact-name">Github</span>
        <img
          title="Github"
          class="contact-icon"
          src="@/assets/github.svg"
          style="animation-delay: 1s;"
      /></a>
      <a href="https://medium.com/@EFG_DeFi" target="_blank" rel="noopener noreferrer"
        ><span class="contact-name">Medium</span
        ><img
          title="Medium"
          class="contact-icon"
          src="@/assets/medium.svg"
          style="animation-delay: 1.5s;"
      /></a>
      <a href="https://medium.com/@EFG_DeFi" target="_blank" rel="noopener noreferrer">
        <span class="contact-name">Twitter</span
        ><img
          title="Twitter"
          class="contact-icon"
          src="@/assets/twitter.svg"
          style="animation-delay: 2s;"
      /></a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import WalletModule from '@/store/wallet'

@Component({})
export default class DeFiFooter extends Vue {
  walletStore = getModule(WalletModule)

  get latestBlock() {
    return this.walletStore.lastBlock
  }
}
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  text-align: center;
  padding: 20px;
  background: #090c1b 0% 0% no-repeat padding-box;
  position: relative;
  z-index: 1000;
  color: #ffffff;
}
#footer span {
  text-align: center;
  padding: 20px;
  color: #ffffff;
  transition: 0.3s;
}
#footer span:hover {
  color: #693987;
}

.latest-block {
  position: absolute;
  left: 5rem;
  display: flex;
  align-items: center;
}

.dot-circle {
  height: 10px;
  width: 10px;
  background-color: #c074f9;
  border-radius: 50%;
  margin-right: 6px;
}

.contact {
  margin: auto;
}

.contact-icon {
  display: none;
  margin: 0 12px;
}

@media (max-width: 1024px) {
  .latest-block {
    bottom: 5rem;
    background: #090c1b;
    padding: 8px 21px;
    left: 0;
    border-top-right-radius: 6px;
    box-shadow: 0 6px 12px #080808;
    border-bottom-right-radius: 6px;
  }
}

@media (max-width: 425px) {
  .latest-block {
    font-size: small;
  }

  .contact-name {
    display: none;
  }

  .contact-icon {
    display: inline;
  }
}
@media only screen and (max-width: 670px) {
  #footer span {
    font-size: 14px;
    padding: 15px;
  }
}
</style>

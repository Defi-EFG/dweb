<template>
  <div class="markets">
    <section class="sec_1">
      <img src="@/assets/efg_logo_test.svg" class="img_background" alt="" />
      <v-container>
        <v-row>
          <v-col cols="12 " class="hover_animation">
            <img src="@/assets/efg_logo.svg" class="efg-logo" alt="" width="60" height="60" />
            <div class="text_header">{{ $t('views.main.name') }}</div>
            <div class="select_detailmain header_fp">
              <section class="sec_doc1" name="doc">
                <div class="sibar_dc">
                  <a
                    @click="onClickActive('EFG')"
                    :class="active == 'EFG' ? 'active' : undefined"
                    >{{ $t('views.main.sub_name_efg') }}</a
                  >
                  <a
                    @click="onClickActive('GTP')"
                    :class="active == 'GTP' ? 'active' : undefined"
                    >{{ $t('views.main.sub_name_gpt') }}</a
                  >
                  <a
                    @click="onClickActive('efgandgpt')"
                    :class="active == 'efgandgpt' ? 'active' : undefined"
                    >{{ $t('views.main.sub_name_efgandgpt') }}</a
                  >
                  <a
                    style="display:none"
                    @click="onClickActive('work')"
                    :class="active == 'work' ? 'active' : undefined"
                    >{{ $t('views.main.sub_name_work') }}</a
                  >
                </div>
              </section>
            </div>
            <div class="open" :class="active == 'EFG' ? 'open_active' : undefined">
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_1') }}
              </div>
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_11') }}
              </div>
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_12') }}
              </div>
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_13') }}
              </div>
            </div>
            <div class="open" :class="active == 'GTP' ? 'open_active' : undefined">
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_2') }}
              </div>
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_22') }}
              </div>
            </div>
            <div class="open" :class="active == 'efgandgpt' ? 'open_active' : undefined">
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_3') }}
              </div>
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_33') }}
              </div>
            </div>
            <div class="open" :class="active == 'work' ? 'open_active' : undefined">
              <div class="text_header_sub">
                {{ $t('views.main.sub_name_4') }}
              </div>
            </div>
            <div class="social_icon">
              <v-item v-for="(social, i) in socials" :key="i">
                <a :href="social.href" target="_blank">
                  <img
                    :title="social.title"
                    class="img_logo1"
                    :src="require(`@/assets/${social.src}`)"
                    :style="social.style"
                    alt=""
                    width="45"
                    height="45"
                /></a>
              </v-item>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sec_3">
      <v-container>
        <v-row class="text_table"></v-row>
        <v-row class="text_table_sub"> </v-row>
      </v-container>
    </section>
    <section class="sec_2">
      <v-container>
        <v-row class="slider_main_head">
          <v-sheet class="mx-auto" max-width="1088" width="100%">
            <v-slide-group
              active-class="titel_color_df"
              show-arrows
              next-icon="keyboard_arrow_right"
              prev-icon="keyboard_arrow_left"
            >
              <v-slide-item v-for="(total, i) in totals" :key="i" v-slot="{ active, toggle }">
                <v-card
                  :color="active ? undefined : 'titel_color'"
                  class="slider_margin"
                  @click="toggle"
                >
                  <div class="detail">
                    <div class="name">{{ total.name }}</div>
                    <div :class="`price ${total.color} `">
                      {{ total.usd }}
                      {{ total.amount | numberWithCommas({ fixed: [0, 8] }) }}
                      {{ total.unit }}
                    </div>
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-row>
      </v-container>
      <v-container>
        <v-row class="row1">
          <v-col lg="3" md="3" cols="6">
            <div class="supply sub_head_supply">
              {{ $t('views.main.supply') }}
            </div>
          </v-col>
          <v-col lg="3" md="3" cols="6">
            <div class="supply sub_head_supply">
              {{ $t('views.main.loaner') }}
            </div>
          </v-col>
          <v-col lg="3" md="3" cols="6" class="efg_mobile">
            <div class="supply sub_head_supply">
              {{ $t('views.main.total_supply') }}
            </div>
          </v-col>
          <v-col lg="3" md="3" cols="6" class="efg_mobile">
            <div class="supply sub_head_supply">
              {{ $t('views.main.total_borrowed') }}
            </div>
          </v-col>
        </v-row>
        <router-link v-for="(item, i) in pools" :key="i" :to="`loan-info?pool=${item.address}`">
          <v-row class="row1 roww2" :id="`EFG_Supply_${1 + i}`">
            <v-col lg="3" md="3" cols="6">
              <div class="margintop">
                <img width="42" height="42" src="@/assets/efg_01.svg" alt="" />
                {{ item.currency.name }}
              </div>
            </v-col>
            <v-col lg="3" md="3" cols="6">
              <div class="text-truncate margintop Loener">
                {{ truncateAddress(item.address) }}
              </div>
            </v-col>
            <v-col lg="3" md="3" cols="6" class="border_left">
              <div class="margintop color_1 ">
                <span class="color_size"
                  >{{ item.totalSupply | numberWithCommas({ fixed: [0, 2] }) }} EFG
                  <span class="text_mobile ">{{ $t('views.main.total_supply') }}</span></span
                >
              </div>
            </v-col>
            <v-col lg="3" md="3" cols="6">
              <div class="margintop color_2 textafter">
                <span class="color_size"
                  >{{ item.totalBorrowed | numberWithCommas({ fixed: [0, 2] }) }} EFG
                  <span class="text_mobile ">{{ $t('views.main.total_borrowed') }}</span></span
                >
              </div>
            </v-col>
            <img class="row1_img" src="@/assets/backg_01.svg" alt="" />
          </v-row>
        </router-link>
        <v-row style="border-top:2px solid #312D36; margin-top:20px">
          <v-col cols="12" class="supply3">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6" class="head_supply3">
                  {{ $t('views.titles.staking') }}
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row class="row1 roww3">
          <v-col lg="3" md="3" cols="6" class="Staking_dt">
            <img width="42" height="42" src="@/assets/gpt.svg" alt="" />
            <div class="supply_name">GPT</div>
            <div class="supply_text">{{ $t('views.main.deposit') }}</div>
            <div class="supply_text">{{ $t('views.main.estimated') }}</div>
          </v-col>
          <v-col lg="3" md="3" cols="6" class="Staking_dt">
            <div class="supply_button2">
              <!-- <a href="delay"> -->
              <router-link :to="`staking-info`"
                ><button>{{ $t('views.main.detail') }}</button></router-link
              >
              <!-- </a> -->
            </div>
            <div class="supply_price">EFG</div>
            <div class="supply_price">{{ stakingRate }}%</div>
          </v-col>
          <v-col lg="6" md="6" cols="12" class="border_left1 Staking_dt">
            <div class="supply_name2">GPT - {{ $t('views.main.available') }}</div>
            <div class="supply_price_color color_1">
              {{ stakingAvailable | numberWithCommas({ fixed: [0, 4] }) }} GPT
            </div>
          </v-col>
          <img class="bg_gpt" src="@/assets/backg_02.svg" alt="" />
        </v-row>
        <v-row style="border-bottom:2px solid #312D36; margin-top:20px"></v-row>
        <v-row>
          <v-col cols="12" style="color:#cccccc; margin-top:50px">
            {{ $t('views.main.collateral') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="but_div_inline">
            <router-link
              v-for="(collateral, index) in collateral"
              :key="index"
              :to="`collateral-info?name=${collateral.currencyName}`"
            >
              <span class="but_div"
                ><img
                  width="45"
                  height="45"
                  :src="getCurrencyIcon(collateral.currencyName)"
                  class="img_text_but"
                  alt=""
                />
                <div class="text_but">{{ collateral.currencyName }}</div></span
              >
            </router-link>
            <span class="but_div not_it"
              ><img width="45" height="45" src="@/assets/TRON.svg" class="img_text_but" alt="" />
              <div class="text_but">TRON</div></span
            >
            <span class="but_div not_it"
              ><img width="45" height="45" src="@/assets/DOT.svg" class="img_text_but" alt="" />
              <div class="text_but">DOT</div></span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-carousel
              hide-delimiters
              class="efg-slider"
              next-icon="keyboard_arrow_right"
              prev-icon="keyboard_arrow_left"
            >
              <v-carousel-item v-for="(item, i) in msg" :key="i">
                <v-row class="fill-height" align="center" justify="center">
                  <v-col lg="3" md="3" cols="12">
                    <div class="img_footer">
                      <img width="250" height="250" :src="require(`@/assets/${item.src}`)" alt="" />
                    </div>
                  </v-col>
                  <v-col lg="9" md="9" cols="12">
                    <div class="text_head_footer">{{ item.title }}</div>
                    <div class="subtext_head_footer">{{ item.subtitle }}</div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import LendingModule from '@/store/lending'
import StakingModule from '@/store/staking'
import HomeModule from '@/store/home'
import { getCurrency } from '@/store/common'

@Component({})
export default class Main extends Vue {
  homeStore = getModule(HomeModule)
  lendingStore = getModule(LendingModule)
  stakingStore = getModule(StakingModule)

  GPT = 'GPT'
  active = 'EFG'
  name = 'EFG'

  stakingRate = 0.011
  get socials() {
    return [
      {
        href: 'https://t.me/EFGtoken',
        title: 'Telegram',
        src: 'Subtraction.svg',
        style: 'animation-delay: 0.3s;'
      },
      {
        href: 'https://github.com/Defi-EFG',
        title: 'Github',
        src: 'github.svg',
        style: 'animation-delay: 0.6s;'
      },
      {
        href: 'https://efg-defi.medium.com/',
        title: 'Medium',
        src: 'medium.svg',
        style: 'animation-delay: 0.9s;'
      },
      {
        href: 'https://twitter.com/EFG_DeFi',
        title: 'Twitter',
        src: 'twitter.svg',
        style: 'animation-delay: 1.2s;'
      },
      {
        href: 'https://coinmarketcap.com/currencies/ecoc-financial-growth/',
        title: 'Coin-Maretcap',
        src: 'Marketcap.svg',
        style: 'animation-delay: 1.5s;'
      },
      {
        href: 'https://www.coingecko.com/en/coins/ecoc-financial-growth/usd#panel',
        title: 'Coin-Gecko',
        src: 'Gecko.svg',
        style: 'animation-delay: 1.8s;'
      }
    ]
  }
  get totals() {
    return [
      {
        name: this.$t('views.main.total_borrowers'),
        amount: this.totalBorrowers,
        unit: '',
        color: 'colorsl1',
        usd: ''
      },
      {
        name: this.$t('views.main.total_debt'),
        amount: this.homeStore.totalDebt,
        unit: '',
        color: 'colorsl2',
        usd: '$'
      },
      {
        name: this.$t('views.main.total_consumedGPT'),
        amount: this.homeStore.totalConsumedGPT,
        unit: 'GPT',
        color: 'colorsl1',
        usd: ''
      },
      {
        name: this.$t('views.main.total_liquidated'),
        amount: this.homeStore.totalLiquidated,
        unit: 'EFG',
        color: 'colorsl2',
        usd: ''
      },
      {
        name: this.$t('views.main.total_interest'),
        amount: this.homeStore.totalInterest,
        unit: 'EFG',
        color: 'colorsl1',
        usd: ''
      }
    ]
  }

  get msg() {
    return this.$t('views.mainslider')
  }

  get pools() {
    return this.lendingStore.pools
  }

  get collateral() {
    return this.lendingStore.supportedCollateralAssets
  }

  get stakingTotalReward() {
    return this.stakingStore.totalReward
  }

  get stakingAvailable() {
    return this.stakingStore.available
  }

  get totalBorrowers() {
    return this.pools.reduce((sum, pool) => sum + pool.totalBorrowers, 0)
  }

  onClickActive(name: string) {
    this.active = name
    this.name = name
  }

  readmore(name: string) {
    this.active = name
    this.name = name
  }

  getCurrencyIcon(currencyNname: string) {
    return getCurrency(currencyNname).style?.icon
  }

  mounted() {
    this.lendingStore.updateLoners()
    this.lendingStore.updateSupprtedAssets()
    this.stakingStore.updatePlatformInfo()
    this.homeStore.updateSummary()
  }

  truncateAddress(addr: string) {
    const separator = '...'
    const charsToShow = 22
    const frontChars = Math.ceil(charsToShow / 3)
    const backChars = Math.floor(charsToShow / 3)
    return addr.substr(0, frontChars) + separator + addr.substr(addr.length - backChars)
  }
}
</script>

<style scoped>
.colorsl1 {
  color: #b16de6;
}
.colorsl2 {
  color: #3fbdd8;
}
.slider_main_head {
  border-bottom: 2px solid rgb(49, 45, 54);
  padding-bottom: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.slider_main_head .detail {
  padding: 14px;
  color: #cccccc;
  background-color: #26262c;
}
.slider_main_head .slider_margin {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 7.5px;
  margin-right: 7.5px;
  width: 270px;
}
.slider_main_head .titel_color_df {
  background: #26262c;
}
.slider_main_head .titel_color {
  background: #26262c;
}
.slider_main_head .detail .name {
  font-size: 14px;
  padding-left: 5px;
}
.slider_main_head .detail .price {
  font-size: 18px;
  text-align: right;
  padding-top: 20px;
}
.readmore {
  display: none;
}
#readmor_01 {
  display: none;
}
#readmor_01_active {
  display: block;
}
.open {
  display: none;
  min-height: 230px;
}
.hover_animation {
  animation: text_header_sub 2s forwards;
}
.open_active {
  display: block !important;
}
body {
  background-attachment: fixed;
}
.markets {
  background: #17181c;
}
.v-application--is-ltr .v-window__next {
  right: 50px !important;
  margin-top: 100px !important;
}
.v-window__prev,
.v-window__next {
  background: unset !important;
}
.container {
  max-width: 1088px;
  margin: 0 auto;
}
.not_it {
  opacity: 0.6;
}
.sec_1 {
  background: transparent linear-gradient(180deg, #261531, #070c1a) 0 0 no-repeat padding-box;
  padding-top: 150px;
}
.sec_2 {
  background: #17181c;
  padding-top: 30px;
}
.sec_3 {
  background: #090c1b;
  height: 150px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}
.sec_1 .text_header {
  display: inline;
  position: relative;
  text-align: left;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  top: -13px;
  padding-left: 20px;
  font-size: 35px;
}
.sec_1 .text_header_sub {
  text-align: left;
  letter-spacing: 0px;
  color: #c7bebe;
  opacity: 1;
  padding-top: 20px;
  text-indent: 4.5em;
  font-size: 16px;
  line-height: 1.3;
  text-align: justify;
}
.sec_1 .social_icon {
  position: relative;
  padding-top: 40px;
  width: 100%;
  margin-right: 0;
  text-align: right;
}
.img_background {
  width: 500px;
  position: absolute;
  right: 200px;
}
.sec_1 .social_icon img {
  padding: 0 5px;
  margin-right: 0;
  transition: transform 0.3s;
  cursor: pointer;
}
.sec_2 .roww2 {
  background: #26262c;
  transition: 0.5s;
  cursor: pointer;
}
.sec_2 .roww2:hover {
  background: #393943;
  transform: scale(1.03);
}

.sec_2 .roww2:hover .row1_img {
  opacity: 1;
  transition: 0.5s;
}

.sec_2 .row1 {
  border-radius: 5px;
  opacity: 5;
  padding: 5px 10px;
  margin-bottom: 5px;
  position: relative;
  display: flex;
  align-items: center;
}
.sec_2 .roww3 {
  background: #26262c;
}
.sec_2 .roww3 .border_left1 {
  border-left: 2px solid rgb(49, 45, 54);
}
.sec_2 .roww3 .Staking_dt {
  padding-left: 35px;
  padding-right: 30px;
}
.sec_2 .roww3 .bg_gpt {
  width: 100px;
  position: absolute;
  opacity: 0.258;
}
.sec_2 .roww3 img {
  width: 30px;
}
.sec_2 img {
  right: 0;
  bottom: 0;
  width: 130px;
}
.sub_head_supply {
  color: #9b9898;
  padding-left: 20px;
  font-size: 16px;
}
.head_supply3 {
  padding-left: 40px;
  color: #cccccc;
  padding-top: 50px;
}
.head_supply2 {
  padding-left: 40px;
}
.head_supply {
  color: #cccccc;
}
.sec_2 .row1 .supply2 {
  border-right: 2px solid rgb(75 69 83);
}
.sec_2 .row1 .supply {
  padding: 0px 20px;
  position: relative;
}
.sec_2 .row1 .supply img {
  width: 30px;
  margin-right: 10px;
}
.sec_2 .row1 .supply_name {
  text-align: left;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  display: inline;
  position: relative;
  top: -10px;
  margin-left: 5px;
}
.sec_2 .row1 .margintopimg {
  padding-top: 16px;
  display: flex;
  color: #ffffff;
  align-items: center;
}
.sec_2 .row1 .margintop {
  color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.sec_2 .row1 .border_left {
  border-left: 2px solid rgb(49, 45, 54);
}
.sec_2 .row1 .margintop img {
  width: 30px;
  height: 30px;
  margin-right: 6px;
}
.sec_2 .row1 .row1_img {
  position: absolute;
  width: 60px;
  opacity: 0.25;
  transition: 0.5s;
}
.sec_2 .supply3 {
  padding: 0 12px;
}
.sec_2 .row1 .supply_name2 {
  text-align: left;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  display: inline;
  position: relative;
}
.sec_2 .row1 .supply_text {
  text-align: left;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 0.5;
  margin-top: 10px;
}
.sec_2 .row1 .supply_button1 {
  text-align: right;
  color: #ffffff;
}
.sec_2 .row1 .supply_button11 {
  text-align: right;
  color: #ffffff;
}
.sec_2 .row1 .supply_button11 button {
  background: transparent linear-gradient(270deg, #522d6a 0%, #743f96 100%) 0% 0% no-repeat
    padding-box;
  border-radius: 17px;
  opacity: 1;
  padding: 5px 10px;
  color: #ffffff;
  transition: 0.5s;
}
.sec_2 .row1 .supply_button11 button:hover {
  background: transparent linear-gradient(270deg, #8d48ba 0%, #a38bb3 100%) 0% 0% no-repeat;
  color: #000000;
}
.sec_2 .row1 .supply_button2 {
  text-align: right;
  color: #ffffff;
}
.sec_2 .row1 .supply_button2 button {
  background: transparent linear-gradient(270deg, #42b5dd 0%, #6409f8 100%) 0% 0% no-repeat
    padding-box;
  border-radius: 17px;
  opacity: 1;
  padding: 5px 10px;
  color: #ffffff;
  transition: 0.3s;
}
.sec_2 .row1 .supply_button2 button:hover {
  background: transparent linear-gradient(270deg, #abe9ff 0%, #8e4df7 100%) 0% 0% no-repeat
    padding-box;
  color: #000000;
}
.sec_2 .row1 .supply_price {
  text-align: right;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-top: 10px;
}
.sec_2 .row1 .supply_price_color {
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
  padding-top: 20px;
  position: relative;
  z-index: 10;
  font-size: 30px;
}
.sec_2 .row1 .color_1 {
  color: rgb(63, 192, 219);
}
.padding_012 {
  padding: 14px 12px 10px 12px;
}
.padding_0123 {
  padding: 10px 12px 10px 12px;
}
.sec_2 .row1 .color_size {
  font-size: 18px;
}
.sec_2 .row1 .color_2 {
  color: rgb(192, 116, 249);
  color: rgb(192, 116, 249);
}
.sec_2 .but_div_inline {
  display: contents;
}
.sec_2 .but_div {
  background: #312d36 0% 0% no-repeat padding-box;
  border-radius: 34px;
  margin-right: 10px;
  color: #ffffff;
  display: flex;
  transition: 0.5s;
  align-items: center;
  padding: 11px;
  margin-bottom: 5px;
}

.sec_2 .but_div .img_text_but {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.sec_2 .but_div .text_but {
  display: inline;
  text-align: left;
  letter-spacing: 0px;
  position: relative;
  margin-left: 10px;
}
.img_footer {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
}
.sec_2 .but_div {
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 15px 5px 5px;
}
.img_footer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text_head_footer {
  text-align: left;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  font-size: 25px;
}
.subtext_head_footer {
  text-align: left;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  text-indent: 3em;
  margin-top: 5px;
  line-height: 1.3;
  font-size: 17px;
}

.text_header {
  animation: animatetop 1s forwards;
  opacity: 5;
  position: relative;
}
.text_header_sub {
  animation: text_header_sub 1s forwards;
  opacity: 5;
  position: relative;
}
.efg-logo {
  transform-origin: 50% 50%;
  animation-name: icon_div;
  animation-duration: 1s;
  width: 60px;
  height: 60px;
}
.img_logo1 {
  animation: header_fp 1s forwards;
  position: relative;
  opacity: 0;
  width: 40px;
  height: 40px;
}
.sec_1 .social_icon img:hover {
  transform: scale(1.5);
}
.select_detailmain {
  padding: 20px 0;
}
.select_detailmain a {
  color: #c7bebe;
  padding: 0 12px;
  transition: 0.3s;
  font-weight: bold;
}
.select_detailmain a:hover {
  color: #c074f9;
}
.select_detailmain a.active {
  color: #c074f9;
  border-bottom: 2px solid #c074f9;
}
.text_mobile {
  display: none;
}
@keyframes header_fp {
  0% {
    opacity: 0;
    top: 100px;
  }
  100% {
    opacity: 5;
    top: 0px;
  }
}
@keyframes text_header_sub {
  0% {
    opacity: 0.8;
    top: 100px;
  }
  100% {
    opacity: 5;
    top: 0px;
  }
}
@keyframes animatetop {
  0% {
    opacity: 0;
    left: 200px;
  }
  100% {
    opacity: 5;
    left: 0px;
  }
}
@keyframes icon_div {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media only screen and (max-width: 1130px) {
  .sec_2 .row1 {
    margin-left: 3px;
    margin-right: 3px;
  }
}

@media only screen and (max-width: 960px) {
  .sec_2 .row1 .supply2 {
    border-right: unset;
  }
  .sec_2 .row1 .supply2 {
    border-bottom: 2px solid rgb(75, 69, 83);
  }
  .img_footer {
    margin: 0 auto;
  }
  .text_head_footer {
    text-align: center;
  }
  .subtext_head_footer {
    text-align: center;
  }
  .sec_2 .row1 .supply_price_color {
    padding: 0;
  }
  .sec_2 .row1 .color_2 {
    float: left;
  }
  .sec_2 .row1 .supply_button1 {
    text-align: left;
  }
  .sec_2 .row1 .supply_button11 button {
    padding: 5px 20px;
  }
  .sec_2 .row1 .supply_button2 button {
    padding: 5px 20px;
  }
  .sec_2 .roww3 .border_left1 {
    border-top: 2px solid rgb(49, 45, 54);
    border-left: 0px solid rgb(49, 45, 54);
  }
  .sec_2 .row1 .margintop {
    padding-left: 0px;
  }
  .sub_head_supply {
    padding-left: 10px;
  }
  .sec_2 .roww3 .Staking_dt {
    padding-left: 10px;
    padding-right: 10px;
  }
  .sec_2 .row1 .supply {
    padding: 0;
  }
  .efg_mobile {
    display: none;
  }
  .sec_2 .row1 .border_left {
    border-left: 0px;
  }
  .text_mobile {
    display: inline-block;
    color: #cccccc;
    font-size: 12px;
  }
  .sec_2 .roww2 .col-6 {
    padding: 5px 12px;
  }
  .textafter {
    text-align: right;
    float: right;
  }
}

@media only screen and (max-width: 670px) {
  .total_supply .price_text {
    font-size: 30px;
  }
  .v-card__text {
    text-align: center;
  }
  .img_background {
    width: 100%;
  }
  .sec_1 {
    padding-top: unset;
    padding: 100px 14px 0 14px;
  }
  .sec_1 .text_header {
    font-size: 23px;
    padding-left: 10px;
    top: -20px;
  }
  .sec_1 .text_header_sub {
    font-size: 14px;
    text-indent: 2em;
  }
  .sec_2 .row1 .margintop {
    font-size: 15px;
  }
  .sec_2 .row1 .color_size {
    font-size: 14px;
  }
  .sec_2 .row1 .supply {
    font-size: 15px;
  }
  .head_supply3 {
    padding-left: 20px;
  }
  .sec_2 .row1 .supply_price_color {
    font-size: 20px;
  }
  .sec_3 {
    height: 50px;
  }
  .text_head_footer {
    font-size: 23px;
  }
  .subtext_head_footer {
    font-size: 16px;
    text-indent: 0;
  }
  .img_background {
    right: 0;
  }
  .sec_2 .row1 .supply {
    padding: 0;
  }
  .sub_head_supply {
    font-size: 13px;
    padding-left: 20px;
  }
  .sec_2 .row1 {
    padding: 0 2px;
  }
  .sec_2 .roww2:hover .row1_img {
    opacity: 0.25;
    transition: 0.5s;
  }

  .sec_2 .row1 .row1_img {
    opacity: 0.1;
    width: 35px;
  }
  .sec_2 .but_div .img_text_but {
    width: 20px;
    height: 20px;
  }
  .efg-logo {
    width: 40px;
    width: 40px;
  }
  .sibar_dc {
    font-size: 12px;
  }
  .sec_2 .but_div {
    width: 103.98px;
    padding: 7px 15px 7px 5px;
  }
  .sec_2 .roww3 .bg_gpt {
    width: 80px;
  }
  .sec_2 .but_div .text_but {
    margin-left: 3px;
  }
  .sec_1 {
    background: transparent linear-gradient(180deg, #251430 0%, #070c1a 100%) 0% 0% no-repeat
      padding-box;
  }
  .sec_2 .roww2 .col-6 {
    padding: 2px 12px;
  }
  .sec_2 .row1 {
    padding: 10px 2px;
  }
  .sec_1 .social_icon {
    text-align: center;
  }
}
@media only screen and (max-width: 500px) {
  .slider_main_head .slider_margin {
    width: 240px;
  }
  .slider_main_head .detail .price {
    padding-top: 5px;
  }
  .text_mobile {
    font-size: 10px;
  }
  .sec_2 .row1 .color_size {
    font-size: 12px;
  }
}
</style>

<style lang="scss">
.efg-slider {
  .v-window__prev {
    left: auto !important;
    margin-top: 9rem;
    right: 9rem;
  }

  .v-window__next {
    margin-top: 9rem;
  }
}
.slider_main_head {
  .theme--light.v-icon.v-icon.v-icon--disabled {
    background-color: #cccccc;
    border-radius: 50%;
  }
  .theme--light.v-sheet {
    background-color: #26262c57;
    border-radius: 5px;
  }
  .theme--light.v-icon {
    background-color: #cccccc;
    border-radius: 50%;
  }
  .theme--light.v-icon:hover {
    background-color: #ffffff;
    border-radius: 50%;
  }
}
@media only screen and (max-width: 960px) {
  .efg-slider {
    .v-window__prev {
      margin-top: 0rem;
      left: 0 !important;
      right: unset;
    }

    .v-window__next {
      margin-top: 0rem;
    }
  }
}
</style>

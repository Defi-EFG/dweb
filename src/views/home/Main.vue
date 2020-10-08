<template>
  <div class="markets">
    <section class="sec_1">
      <img src="@/assets/efg_logo_test.svg" class="img_background" />
      <v-container>
        <v-row>
          <v-col class="12">
            <img src="@/assets/efg_logo.svg" class="efg-logo" />
            <div class="text_header">{{ $t('views.main.name') }}</div>
            <div class="text_header_sub">
              {{ $t('views.main.sub_name_1') }}
            </div>
            <div class="text_header_sub">
              {{ $t('views.main.sub_name_2') }}
            </div>
            <div class="social_icon">
              <a href="https://t.me/EFGtoken" target="_blank">
                <img
                  title="Telegram"
                  class="img_logo1"
                  src="@/assets/Subtraction.svg"
                  style="animation-delay: 1s;"
              /></a>
              <a href="https://github.com/Defi-EFG" target="_blank" rel="noopener noreferrer">
                <img
                  title="Github"
                  class="img_logo1"
                  src="@/assets/github.svg"
                  style="animation-delay: 1.5s;"
              /></a>

              <a href="https://medium.com/@ecoc.efg" target="_blank">
                <img
                  title="Medium"
                  class="img_logo1"
                  src="@/assets/medium.svg"
                  style="animation-delay: 2s;"
                />
              </a>
              <a href="https://twitter.com/EcocEfg" target="_blank">
                <img
                  title="Twitter"
                  class="img_logo1"
                  src="@/assets/twitter.svg"
                  style="animation-delay: 2.5s;"
                />
              </a>
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
        <v-row>
          <v-col lg="5" md="5" cols="5" class="supply3">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6" class="head_supply head_supply2">
                  {{ $t('views.main.supply') }}
                </v-col>
                <v-col cols="6" class="head_supply">
                  Pool
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col lg="7" md="7" cols="7" class="supply3">
            <div class="supply">
              <v-row>
                <v-col cols="6" class="head_supply head_supply2">
                  EFG - Total Supply
                </v-col>
                <v-col cols="6" class="head_supply">
                  EFG - Total Borrowed
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row v-for="(item, i) in items" :key="i" class="row1 roww2">
          <v-col lg="5" md="5" cols="5" class="supply3">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6" class="margintopimg padding_012">
                  <img src="@/assets/efg_01.svg" />
                  <div class="supply_name ">EFG</div>
                </v-col>
                <v-col cols="6" class="padding_0123">
                  <div class=" margintop">
                    {{ item.Loener }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col lg="7" md="7" cols="7" class="supply3">
            <div class="supply">
              <v-row>
                <v-col lg="6" md="6" cols="6" class="padding_012">
                  <div class="color_1 color_size">
                    {{ item.EFGTotalSupply }}
                  </div>
                </v-col>
                <v-col lg="6" md="6" cols="6" class="padding_012">
                  <div class="color_2 color_size">
                    {{ item.EFGTotalBorrowed }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <img class="row1_img" src="@/assets/backg_01.svg" />
        </v-row>
        <v-row style="border-top:2px solid #312D36; margin-top:20px">
          <v-col cols="12" class="supply3">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6" class="head_supply3">
                  Staking
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row class="row1 roww3">
          <v-col lg="5" md="5" cols="12">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6">
                  <img src="@/assets/gpt.svg" />
                  <div class="supply_name">GPT</div>
                  <div class="supply_text">{{ $t('views.main.liquidation') }}</div>
                </v-col>
                <v-col cols="6">
                  <div class="supply_button2">
                    <!-- <a href="delay"> -->
                    <button disabled>{{ $t('views.main.detail') }}</button>
                    <!-- </a> -->
                  </div>
                  <div class="supply_price">20.0%</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col lg="7" md="7" cols="12">
            <div class="supply">
              <v-row>
                <v-col cols="12">
                  <div class="supply_name2">GPT - {{ $t('views.main.available') }}</div>
                  <div class="supply_price_color color_1">
                    10,000 GPT
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <img style="position: absolute; opacity: 0.25;" src="@/assets/backg_02.svg" />
        </v-row>
        <v-row style="border-bottom:2px solid #312D36; margin-top:20px"></v-row>
        <v-row>
          <v-col cols="12" style="color:#cccccc; margin-top:50px">
            {{ $t('views.main.collateral') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <span class="but_div"
              ><img class="img_text_but" src="@/assets/icon/currency/ecoc.svg" alt="" />
              <div class="text_but">ECOC</div></span
            >
            <span class="but_div not_it"
              ><img class="img_text_but not_it" src="@/assets/usd.png" alt="" />
              <div class="text_but">USDT</div></span
            >
            <span class="but_div not_it"
              ><img class="img_text_but not_it" src="@/assets/eth.png" alt="" />
              <div class="text_but">ETH</div></span
            >
            <span class="but_div not_it"
              ><img class="img_text_but not_it" src="@/assets/tron.svg" alt="" />
              <div class="text_but">TRON</div></span
            >
            <span class="but_div not_it"
              ><img class="img_text_but not_it" src="@/assets/dot.png" alt="" />
              <div class="text_but">DOT</div></span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-carousel hide-delimiters class="efg-slider">
              <v-carousel-item v-for="(item, i) in msg" :key="i">
                <v-row class="fill-height" align="center" justify="center">
                  <v-col lg="3" md="3" cols="12">
                    <div class="img_footer">
                      <img :src="require(`@/assets/${item.src}`)" alt="" />
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

@Component({})
export default class Main extends Vue {
  get msg() {
    return this.$t('views.mainslider')
  }
  data() {
    return {
      items: [
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        },
        {
          Loener: 'ES1jMgpCN...JWGkkjxbJB',
          EFGTotalSupply: '$8,123,456.79',
          EFGTotalBorrowed: '$4,189,402.65'
        }
      ]
    }
  }
}
</script>

<style scoped>
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
  background: transparent linear-gradient(180deg, #2c1635 0%, #070c1a 100%) 0% 0% no-repeat
    padding-box;
  padding-top: 180px;
}
.sec_2 {
  background: #17181c;
  padding-top: 30px;
}
.sec_3 {
  background: #090c1b;
  height: 200px;
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
  font-size: 18px;
  line-height: 1.3;
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
}
.sec_2 .roww3 {
  background: #26262c;
}
.sec_2 img {
  right: 0;
  bottom: 0;
  width: 130px;
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
}
.sec_2 .row1 .margintopimg {
  padding-top: 16px;
}
.sec_2 .row1 .margintop {
  padding-top: 10px;
  color: #ffffff;
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
  font-size: 25px;
}
.sec_2 .row1 .color_2 {
  color: rgb(192, 116, 249);
  color: rgb(192, 116, 249);
}
.sec_2 .but_div {
  background: #312d36 0% 0% no-repeat padding-box;
  border-radius: 34px;
  padding: 22px 30px 2px 10px;
  margin-right: 10px;
  color: #ffffff;
  transition: 0.5s;
}

.sec_2 .but_div .img_text_but {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: aliceblue;
}
.sec_2 .but_div .text_but {
  display: inline;
  text-align: left;
  letter-spacing: 0px;
  top: -10px;
  position: relative;
  margin-left: 10px;
}
.img_footer {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
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
  animation: animatetop 2s forwards;
  opacity: 5;
  position: relative;
}
.text_header_sub {
  animation: text_header_sub 2s forwards;
  opacity: 5;
  position: relative;
}
.efg-logo {
  transform-origin: 50% 50%;
  animation-name: icon_div;
  animation-duration: 2s;
  width: 60px;
}
.img_logo1 {
  animation: img_logo1 2s forwards;
  position: relative;
  opacity: 0;
}
.sec_1 .social_icon img:hover {
  transform: scale(1.5);
}

@keyframes img_logo1 {
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
    opacity: 20;
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
}

@media only screen and (max-width: 670px) {
  .total_supply .price_text {
    font-size: 30px;
  }
  .v-card__text {
    text-align: center;
  }
  .sec_1 {
    padding-top: 100px;
  }
  .sec_1 .text_header {
    font-size: 25px;
  }
  .sec_1 .text_header_sub {
    font-size: 16px;
    text-indent: 2em;
  }
  .sec_3 {
    height: 150px;
  }
  .text_head_footer {
    font-size: 23px;
  }
  .subtext_head_footer {
    font-size: 16px;
    text-indent: 0;
  }
}
</style>

<style lang="scss">
.efg-slider {
  .v-window__prev {
    left: auto !important;
    right: 90px !important;
    margin-top: 100px !important;
  }
  .v-window__next {
    margin-top: 100px !important;
  }
}
@media only screen and (max-width: 960px) {
  .efg-slider {
    .v-window__prev {
      left: 0 !important;
      right: unset !important;
      margin-top: unset !important;
    }
    .v-window__next {
      margin-top: unset !important;
    }
  }
}
</style>

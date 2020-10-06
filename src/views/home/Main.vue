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

              <img
                title="Github"
                class="img_logo1"
                src="@/assets/github.svg"
                style="animation-delay: 1.5s;"
              />

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
          <v-col cols="12" class="head_supply">
            {{ $t('views.main.supply') }}
          </v-col>
        </v-row>
        <v-row class="row1">
          <v-col lg="5" md="5" cols="12" class="supply3">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6">
                  <img src="@/assets/efg_01.svg" />
                  <div class="supply_name">EFG</div>
                  <div class="supply_text">{{ $t('views.main.supply_apy') }}</div>
                  <div class="supply_text">{{ $t('views.main.borrow_apy') }}</div>
                </v-col>
                <v-col cols="6">
                  <div class="supply_button11">
                    <a href="efg">
                      <button>{{ $t('views.main.detail') }}</button>
                    </a>
                  </div>
                  <div class="supply_price">20.0%</div>
                  <div class="supply_price">3.5%</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col lg="7" md="7" cols="12">
            <div class="supply">
              <v-row>
                <v-col lg="6" md="6" cols="12">
                  <div class="supply_name2">EFG - {{ $t('views.main.total_supply') }}</div>
                  <div class="supply_price_color color_1">
                    $0
                  </div>
                </v-col>
                <v-col lg="6" md="6" cols="12">
                  <div class="supply_button1">EFG - {{ $t('views.main.total_borrowed') }}</div>
                  <div class="supply_price_color color_2">
                    $0
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <img style="position: absolute;" src="@/assets/backg_01.svg" />
        </v-row>
        <v-row class="row1">
          <v-col lg="5" md="5" cols="12" class="supply3">
            <div class="supply supply2">
              <v-row>
                <v-col cols="6">
                  <img src="@/assets/delay.svg" />
                  <div class="supply_name">DELAY</div>
                  <div class="supply_text">{{ $t('views.main.liquidation') }}</div>
                </v-col>
                <v-col cols="6">
                  <div class="supply_button2">
                    <a href="delay">
                      <button>{{ $t('views.main.detail') }}</button>
                    </a>
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
                  <div class="supply_name2">DELAY - {{ $t('views.main.available') }}</div>
                  <div class="supply_price_color color_1">
                    10,000 DELAY
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <img style="position: absolute;" src="@/assets/backg_02.svg" />
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
              ><img class="img_text_but" src="@/assets/bitcoin2.png" alt="" />
              <div class="text_but">ECOC</div></span
            >
            <span class="but_div"
              ><img class="img_text_but" src="@/assets/usd.png" alt="" />
              <div class="text_but">USDT</div></span
            >
            <span class="but_div"
              ><img class="img_text_but" src="@/assets/eth.png" alt="" />
              <div class="text_but">ETH</div></span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-carousel hide-delimiters>
              <v-carousel-item v-for="(item, i) in items" :key="i">
                <v-row class="fill-height" align="center" justify="center">
                  <v-col lg="3" md="3" cols="12">
                    <div class="img_footer"><img :src="item.src" alt="" /></div>
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
    <div class="send-transaction">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-text>
            <img class="img" src="@/assets/underconstruction.svg" alt="" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dialog: true,
      items: [
        {
          src: require('@/assets/silderimg_01.svg'),
          title: 'ECOC Financial Growth',
          subtitle:
            'ECOC Financial Growth (EFG) is an interesting lending opportunity on decentralize blockchain, that let developers create new financial applications that are global, safe, and open for ECOC coins user. ECOChain developers keep developing the core blockchain infrastructure, as well as the tools to empower the new financial system.'
        },
        {
          src: require('@/assets/silderimg_01.svg'),
          title: 'The security of the ECOC Financial Growth (EFG)',
          subtitle:
            'The security of the ECOC Financial Growth (EFG) token is our highest priority; our development team, alongside, has invested considerable effort to create an EFG token that we believe is safe and dependable. Besides balances are publicly verifiable.'
        },
        {
          src: require('@/assets/silderimg_01.svg'),
          title: 'The security of the ECOC Financial Growth (EFG)',
          subtitle:
            "We believe that size, visibility, and time are the true test for the security of smart contracts and make the determination of security and suitability for users. ECOC Financial Growth (EFG) Token's developers never stop to develop the best financial channel."
        }
      ]
    }
  }
}
</script>

<style scoped>
.markets {
  background: #202020 0% 0% no-repeat padding-box;
}
.container {
  max-width: 1088px;
  margin: 0 auto;
}
.sec_1 {
  background: transparent linear-gradient(180deg, #2c1635 0%, #070c1a 100%) 0% 0% no-repeat
    padding-box;
  padding-top: 200px;
}
.sec_2 {
  background: #202020 0% 0% no-repeat padding-box;
  padding-top: 130px;
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
  font: normal normal normal 41px/55px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  top: -13px;
  padding-left: 20px;
}
.sec_1 .text_header_sub {
  text-align: left;
  font: normal normal normal 17px/23px Segoe UI;
  letter-spacing: 0px;
  color: #c7bebe;
  opacity: 1;
  padding-top: 20px;
  text-indent: 5em;
}
.sec_1 .social_icon {
  position: relative;
  padding: 40px 10px;
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
.sec_2 .row1 {
  background: #312d36;
  border-radius: 5px;
  opacity: 5;
  padding: 5px 10px;
  margin-top: 20px;
  position: relative;
}
.sec_2 img {
  right: 0;
  bottom: 0;
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
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  display: inline;
  position: relative;
  top: -10px;
}
.sec_2 .row1 .supply_name2 {
  text-align: left;
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  display: inline;
  position: relative;
}
.sec_2 .row1 .supply_text {
  text-align: left;
  font: normal normal normal 14px/19px Segoe UI;
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
  font: normal normal normal 14px/19px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-top: 10px;
}
.sec_2 .row1 .supply_price_color {
  text-align: left;
  font: normal normal 400 30px/40px Segoe UI;
  letter-spacing: 0px;
  opacity: 1;
  padding-top: 20px;
}
.sec_2 .row1 .color_1 {
  color: rgb(63, 192, 219);
}
.sec_2 .row1 .color_2 {
  color: rgb(192, 116, 249);
  float: right;
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
  font: normal normal normal 16px/21px Segoe UI;
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
  font: normal normal bold 25px/33px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.subtext_head_footer {
  text-align: left;
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  text-indent: 3em;
  margin-top: 5px;
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
}
.v-card__text {
  text-align: center;
}
</style>

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
              <br /><br />
              {{ $t('views.main.sub_name_2') }}
            </div>
            <div class="social_icon">
              <img class="img_logo1" src="@/assets/Telegram.svg" style="animation-delay: 1s;" />
              <img class="img_logo1" src="@/assets/github.svg" style="animation-delay: 1.5s;" />
              <img class="img_logo1" src="@/assets/facebook.svg" style="animation-delay: 2s;" />
              <img class="img_logo1" src="@/assets/twitter.svg" style="animation-delay: 2.5s;" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sec_3">
      <v-container>
        <v-row class="text_table" style="margin-top:0px;"> </v-row>
        <v-row class="text_table_sub"> </v-row>
      </v-container>
    </section>
    <section class="sec_2">
      <v-container>
        <v-row>
          <v-col cols="12" style="color:#cccccc;">
            Supply
          </v-col>
        </v-row>
        <v-row class="row1">
          <v-col cols="5">
            <div class="supply" style="border-right:2px solid  rgb(75 69 83);">
              <v-row>
                <v-col cols="6">
                  <img src="@/assets/efg_01.svg" />
                  <div class="supply_name">EFG</div>
                  <div class="supply_text" style="margin-top:10px;">Supply APY (DELAY)</div>
                  <div class="supply_text">Borrow APY</div>
                </v-col>
                <v-col cols="6">
                  <div class="supply_button1">
                    <a href="efg">
                      <button>Details</button>
                    </a>
                  </div>
                  <div class="supply_price" style="margin-top:10px;">20.0%</div>
                  <div class="supply_price">3.5%</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="supply">
              <v-row>
                <v-col cols="6">
                  <div class="supply_name" style="top:unset; margin-left:0px;">
                    EFG - Total Supply
                  </div>
                  <div class="supply_price_color" style="margin-top:10px; color:#3FC0DB;">
                    $5,305,610.41
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="supply_button1">EFG - Total Borrowed</div>
                  <div
                    class="supply_price_color"
                    style="margin-top:10px; float: right; color:#C074F9;"
                  >
                    $4,189,402.65
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <img style="position: absolute;" src="@/assets/backg_01.svg" />
        </v-row>
        <v-row class="row1">
          <v-col cols="5">
            <div class="supply" style="border-right:2px solid rgb(75 69 83);">
              <v-row>
                <v-col cols="6">
                  <img src="@/assets/delay.svg" />
                  <div class="supply_name">DELAY</div>
                  <div class="supply_text" style="margin-top:10px;">Liquidation</div>
                </v-col>
                <v-col cols="6">
                  <div class="supply_button2">
                    <a href="delay">
                      <button>Details</button>
                    </a>
                  </div>
                  <div class="supply_price" style="margin-top:10px;">20.0%</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="supply">
              <v-row>
                <v-col cols="12">
                  <div class="supply_name" style="top:unset; margin-left:0px;">
                    DELAY - Available (Total: 10,000 DELAY)
                  </div>
                  <div class="supply_price_color" style="margin-top:10px; color:#3FC0DB;">
                    $5,305,610.41
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
            Collateral
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
                  <v-col cols="4">
                    <div class="img_footer"><img :src="item.src" alt="" /></div>
                  </v-col>
                  <v-col cols="8">
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
export default {
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          title: 'Lorem ipsum dolor sit amet 1',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          title: 'Lorem ipsum dolor sit amet 2',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          title: 'Lorem ipsum dolor sit amet 3',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
        }
      ],
      data: [
        {
          img: require('../../assets/bitcoin2.png'),
          name: 'ECOC',
          total: '$5.3 M',
          apy: '$2.5 M'
        },
        {
          img: require('../../assets/usd.png'),
          name: 'USD',
          total: '$5.3 M',
          apy: '$2.5 M',
          phat: '/markets?id='
        },
        {
          img: require('../../assets/eth.png'),
          name: 'ETH',
          total: '$5.3 M',
          apy: '$2.5 M'
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
  z-index: 200;
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
  top: -20px;
  padding-left: 20px;
}
.sec_1 .text_header_sub {
  text-align: left;
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #929292;
  opacity: 1;
  padding-top: 20px;
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
.sec_2 .row1 .supply {
  padding: 0px 20px;
  position: relative;
  z-index: 200;
}
.sec_2 .row1 .supply img {
  width: 30px;
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
  margin-left: 10px;
}
.sec_2 .row1 .supply_text {
  text-align: left;
  font: normal normal normal 14px/19px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 0.5;
}
.sec_2 .row1 .supply_button1 {
  text-align: right;
  color: #ffffff;
}
.sec_2 .row1 .supply_button1 button {
  background: transparent linear-gradient(270deg, #522d6a 0%, #743f96 100%) 0% 0% no-repeat
    padding-box;
  border-radius: 17px;
  opacity: 1;
  padding: 5px 10px;
  color: #ffffff;
  transition: 0.5s;
}
.sec_2 .row1 .supply_button1 button:hover {
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
}
.sec_2 .row1 .supply_price_color {
  z-index: 200;
  text-align: left;
  font: normal normal 400 30px/40px Segoe UI;
  letter-spacing: 0px;
  opacity: 1;
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
  width: 250px;
  height: 250px;
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
  width: 80px;
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

@media only screen and (max-width: 670px) {
  .total_supply .price_text {
    font-size: 30px;
  }
}
</style>

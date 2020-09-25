<template>
  <div class="markets">
    <section class="sec_m1">
      <v-container>
        <v-row>
          <v-col cols="4">
            <div class="h_detail">
              <v-row>
                <v-col cols="12" style="padding:0px">
                  <div class="logo_ecoc">
                    <img class="logo_ecoc_m" width="40" src="@/assets/delay_02.svg" alt="" />
                    <div class="logo_ecoc_m_text">DELAY <span>- Market Details</span></div>
                  </div>
                </v-col>
                <v-col cols="9" style="padding:0px; border-top:1px solid #ffffff; ">
                  <div class="m_titel">Borrow APY</div>
                  <div class="m_titel">Liquidation</div>
                  <div class="m_titel">Number of Borrowers</div>
                  <div class="m_titel">Collateral Factor</div>
                </v-col>
                <v-col cols="3" style="padding:0px;  border-top:1px solid #ffffff; ">
                  <div class="m_titel" style="text-align: right;">3.5%</div>
                  <div class="m_titel" style="text-align: right;">841</div>
                  <div class="m_titel" style="text-align: right;">841</div>
                  <div class="m_titel" style="text-align: right;">80%</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="8">
            <div class="M_detail">
              <v-row>
                <v-col cols="6">
                  <div class="chart">
                    <doughnut-chart></doughnut-chart>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="div_price">
                    <div class="text_price_head">DELAY - Available (Total: 10,000)</div>
                    <div class="text_price">8,405.01486564 DELAY</div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sec_m2">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="chart_view">
              <line-chart></line-chart>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import LineChart from '@/components/Home/LineChart'
import DoughnutChart from '@/components/Home/DoughnutChart'

export default {
  components: {
    LineChart,
    DoughnutChart
  }
}
</script>

<style scoped>
.container {
  max-width: 1300px;
  margin: 0 auto;
}
.sec_m1 {
  background: transparent linear-gradient(180deg, #2c1635 0%, #070c1a 100%) 0% 0% no-repeat
    padding-box;
  padding: 200px 0 50px 0;
}
.sec_m2 {
  background: #17181c 0% 0% no-repeat padding-box;
  padding: 50px 0 200px 0;
}
.h_detail {
  padding: 0px 10px;
  max-width: 500px;
  margin: 0 auto;
}
.logo_ecoc {
  color: #ffffff;
  position: relative;
  margin-bottom: 30px;
}
.logo_ecoc_m {
  border-radius: 50%;
}
.logo_ecoc_m img {
  border-radius: 50%;
  padding: 0px;
  margin-left: -3px;
  margin-top: 2px;
}
.logo_ecoc .logo_ecoc_m_text {
  position: relative;
  display: inline;
  text-align: center;
  font: normal normal normal 35px/58px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  top: -8px;
  margin-left: 10px;
}
.logo_ecoc .logo_ecoc_m_text span {
  font: normal normal 400 30px/54px Segoe UI;
  font-weight: 300;
}
.m_titel {
  text-align: left;
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-top: 10px;
}
.m_price {
  text-align: left;
  font: normal normal normal 30px/40px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-bottom: 20px;
  margin-top: 10px;
}
.M_detail {
  position: relative;
}
.M_detail .div_price {
  position: absolute;
  top: 40%;
}
.M_detail .chart {
  max-width: 350px;
  margin: 0 auto;
}
.M_detail .text_price_head {
  text-align: left;
  font: normal normal normal 16px/21px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.M_detail .text_price {
  text-align: left;
  font: normal normal 400 35px/47px Segoe UI;
  letter-spacing: 0px;
  color: #3fc0db;
  opacity: 1;
}
.chart_view {
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
}
</style>

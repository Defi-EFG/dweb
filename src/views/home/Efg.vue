<template>
  <div class="markets">
    <section class="sec_m1">
      <v-container>
        <v-row>
          <v-col lg="4" md="4" cols="12">
            <div class="h_detail">
              <v-row>
                <v-col cols="12" style="padding:0px">
                  <div class="logo_ecoc">
                    <img class="logo_ecoc_m" width="40" src="@/assets/efg_02.svg" alt="" />
                    <div class="logo_ecoc_m_text">
                      EFG <span>- {{ $t('views.detail.market_details') }} </span>
                    </div>
                  </div>
                </v-col>
                <v-col cols="9" class="efg_border1">
                  <div class="m_titel">{{ $t('views.detail.borrow_apy') }}</div>
                  <div class="m_titel">{{ $t('views.detail.number_of') }}</div>
                </v-col>
                <v-col cols="3" class="efg_border1">
                  <div class="m_titel m_titel_2">3.5%</div>
                  <div class="m_titel m_titel_2">841</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col lg="8" md="8" cols="12">
            <div class="M_detail">
              <doughnut-chart class="chart_dg_logo"></doughnut-chart>
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
              <LineChart></LineChart>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/Home/LineChartefg.vue'
import DoughnutChart from '@/components/Home/DoughnutChartefg.vue'
import LendingModule from '@/store/lending'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    LineChart,
    DoughnutChart
  }
})
export default class Efg extends Vue {
  lendingStore = getModule(LendingModule)

  query = this.$route.query.pool

  get pools() {
    return this.lendingStore.pools
  }

  mounted() {
    this.lendingStore.updateLoners()
    console.log(this.pools)
  }
}
</script>

<style scoped lang="scss">
.button-small {
  padding: 10px 35px;
  text-align: right;
  background: #000000 0% 0% no-repeat padding-box;
  a {
    padding: 0 5px;
    color: #ffffff;
    font-size: 14px;
  }
  .active {
    border-bottom: 2px solid #c074f9;
  }
}
.container {
  max-width: 1088px;
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
  display: flex;
  align-items: center;
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
  text-align: center;
  font-size: 25px;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-left: 10px;
}

.efg_border1 {
  padding: 0px;
  border-top: 1px solid #ffffff;
}
.logo_ecoc .logo_ecoc_m_text span {
  font-size: 23px;
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
.m_titel_2 {
  text-align: right;
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
  top: 30%;
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
.M_detail .text_price_head2 {
  margin-top: 20px;
}
.M_detail .text_price {
  text-align: left;
  font: normal normal 400 35px/47px Segoe UI;
  letter-spacing: 0px;
  color: #3fc0db;
  opacity: 1;
}
.M_detail .text_price_2 {
  text-align: left;
  font: normal normal 400 35px/47px Segoe UI;
  letter-spacing: 0px;
  color: #c074f9;
  opacity: 1;
}
.chart_view {
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
}

@media only screen and (max-width: 960px) {
  .h_detail {
    max-width: 95%;
  }
  .M_detail .div_price {
    position: relative;
    top: 0;
    max-width: 95%;
    margin: 0 auto;
  }
  .M_detail .text_price_head {
    text-align: right;
  }
  .M_detail .text_price {
    text-align: right;
  }
  .sec_m1 {
    padding: 100px 0 30px 0;
  }
  .M_detail .text_price_2 {
    text-align: right;
  }
}
@media only screen and (max-width: 500px) {
  .M_detail .text_price {
    font-size: 28px;
  }
  .logo_ecoc .logo_ecoc_m_text {
    font-size: 30px;
  }
  .logo_ecoc .logo_ecoc_m_text span {
    font-size: 20px;
  }
}
</style>

<template>
  <div class="callateral">
    <section class="sec_m1">
      <v-container>
        <v-row>
          <v-col lg="12" md="12" cols="12">
            <div class="h_detail">
              <v-row>
                <v-col cols="12" style="padding:0px">
                  <div class="logo_ecoc">
                    <img
                      class="logo_ecoc_m"
                      width="40"
                      :src="require(`@/assets/${collateral.currencyName}.svg`)"
                      alt=""
                    />
                    <div class="logo_ecoc_m_text">
                      {{ $route.query.name }} <span>- {{ $t('views.detail.market_details') }}</span>
                    </div>
                  </div>
                </v-col>
                <v-col cols="6" class="efg_border1">
                  <!-- <div class="m_titel">{{ $t('views.detail.liquidation') }}</div> -->
                  <div class="m_titel">{{ $t('views.detail.collateral_Factor') }}</div>
                  <div class="m_titel">{{ $t('views.detail.collateral_amount') }}</div>
                </v-col>
                <v-col cols="6" class="efg_border1">
                  <!-- <div class="m_titel m_titel_2">{{ liquidation }}</div> -->
                  <div class="m_titel m_titel_2">{{ collateralFactor }}%</div>
                  <div class="m_titel m_titel_2">
                    {{ amount | numberWithCommas({ fixed: [0, 4] }) }} {{ currencyName }}
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
            <div class="chart_title">{{ $t('views.detail.Market Price') }}</div>
            <div class="button-small">
              <a @click="daysChanged('hour')" :class="active == 'hour' ? 'active' : undefined">{{
                $t('views.detail.hour')
              }}</a>
              <a @click="daysChanged('day')" :class="active == 'day' ? 'active' : undefined">{{
                $t('views.detail.day')
              }}</a>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="chart_view">
              <LineChart :labelSet="labelSet" :dataSet="dataSet"></LineChart>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/Home/LineChart.vue'
import DoughnutChart from '@/components/Home/DoughnutChartefg.vue'
import { getModule } from 'vuex-module-decorators'
import LendingModule from '@/store/lending'
import { api } from '@/services/api'
import EcocWallet from '@/services/ecoc/ecoc-wallet'
import * as utils from '@/services/utils'

@Component({
  components: {
    LineChart,
    DoughnutChart
  }
})
export default class Callaterr extends Vue {
  lendingStore = getModule(LendingModule)
  currencyName = this.$route.query.name as string
  date = [] as string[]
  price = [] as number[]
  active = 'hour'
  name = 'hour'
  title = 'hour'
  chartlist = 'hour'
  amount = 0
  liquidation = 0

  get labelSet() {
    return this.date
  }

  get dataSet() {
    return this.price
  }

  get collateral() {
    return this.lendingStore.supportedCollateralAssets.find(
      asset => asset.currencyName === this.currencyName
    )
  }

  get collateralFactor() {
    return this.collateral ? this.collateral.collateralFactor * 100 : 0
  }

  async mounted() {
    api.getprice(this.currencyName, this.chartlist).then(data => {
      this.date = data.date
      this.price = data.price
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.getCollateralAmount().then(res => {
      this.amount = res
    })
  }
  async daysChanged(name: string) {
    this.active = name
    this.name = name
    this.title = name
    //@ts-ignore
    api.getprice(this.currencyName, this.name).then(data => {
      this.date = data.date
      this.price = data.price
    })
  }
  async getCollateralAmount() {
    if (this.currencyName === 'ECOC') {
      const address = utils.toEcocAddress(this.lendingStore.address)
      const addressInfo = await EcocWallet.getAddressInfo(address)
      return Number(addressInfo.balance)
    }

    return 0
  }
}
</script>

<style scoped lang="scss">
.chart_title {
  color: #fff;
  font-size: 18px;
  display: inline-block;
  position: relative;
}
.button-small {
  padding: 0;
  text-align: right;
  display: inline;
  float: right;
  a {
    padding: 0px 10px;
    color: #ffffff;
    font-size: 16px;
    margin: 3px;
  }
  .active {
    border-bottom: 2px solid #8b41d8;
    color: #8b41d8;
    font-weight: bold;
    transition: 0.2s;
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
  font-size: 16px;
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
  font-size: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  margin-bottom: 20px;
  margin-top: 10px;
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
  .sec_m1 {
    padding: 100px 0 30px 0;
  }
}
@media only screen and (max-width: 500px) {
  .logo_ecoc .logo_ecoc_m_text {
    font-size: 30px;
  }
  .logo_ecoc .logo_ecoc_m_text span {
    font-size: 20px;
  }
  .sec_m2 {
    padding: 20px 0 100px 0;
  }
}
</style>

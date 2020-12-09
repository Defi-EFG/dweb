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
                    <div class="logo_ecoc_m_text">
                      {{ $t('views.titles.staking') }}
                      <span> {{ $t('views.detail.details') }}</span>
                    </div>
                  </div>
                </v-col>
                <v-col cols="7" class="chart_detail">
                  <div class="m_titel">{{ $t('views.detail.daily_Yield') }}</div>
                  <div class="m_titel">
                    {{ $t('views.detail.number_of_staker') }}
                  </div>
                  <div class="m_titel">
                    {{ $t('views.detail.total') }} GPT {{ $t('views.detail.staked') }}
                  </div>
                  <div class="m_titel">
                    {{ $t('views.detail.total_EFG_Staking') }}
                  </div>
                </v-col>
                <v-col cols="5" class="chart_detail">
                  <div class="m_titel m_titel_2">{{ stakingRate }}%</div>
                  <div class="m_titel m_titel_2">{{ numberOfStaking }}</div>
                  <div class="m_titel m_titel_2">
                    {{ totalStaked | numberWithCommas({ Fixed: [0, 3] }) }} GPT
                  </div>
                  <div class="m_titel m_titel_2">{{ totalStaking }} EFG</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col lg="8" md="8" cols="12">
            <div class="M_detail">
              <doughnut-chart
                class="chart_dg_logo"
                :max="max"
                :stakingAvailable="stakingAvailable"
              ></doughnut-chart>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sec_m2">
      <v-container
        ><v-row>
          <v-col cols="12">
            <div class="button-small">
              <a @click="daysChanged('day')" :class="active == 'day' ? 'active' : undefined">{{
                $t('views.detail.day')
              }}</a>
              <a @click="daysChanged('hour')" :class="active == 'hour' ? 'active' : undefined">{{
                $t('views.detail.hour')
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
import DoughnutChart from '@/components/Home/DoughnutChart.vue'
import LineChart from '@/components/Home/LineChart.vue'
import StakingModule from '@/store/staking'
import { getModule } from 'vuex-module-decorators'
import { api } from '@/services/api'

@Component({
  components: {
    DoughnutChart,
    LineChart
  }
})
export default class Gpt extends Vue {
  stakingStore = getModule(StakingModule)
  stakingRate = 0.011
  max = this.totalReward
  totalStaked = this.max - this.stakingAvailable
  date = [] as string[]
  price = [] as number[]
  currencyName = 'GPT'
  active = 'day'
  name = 'day'
  title = 'day'
  chartlist = 'day'

  get stakingAvailable() {
    return this.stakingStore.available
  }

  get numberOfStaking() {
    return this.stakingStore.numberOfStaking
  }

  get totalStaking() {
    return this.stakingStore.totalStaking
  }

  get totalReward() {
    return this.stakingStore.totalReward
  }

  get labelSet() {
    return this.date
  }

  get dataSet() {
    return this.price
  }

  async mounted() {
    this.stakingStore.updatePlatformInfo()
    api.getprice(this.currencyName, this.chartlist).then(data => {
      this.date = data.date
      this.price = data.price
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
}
</script>

<style scoped lang="scss">
.button-small {
  padding: 0;
  text-align: right;
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
  max-width: 500px;
  margin: 0 auto;
}
.chart_detail {
  padding: 0px;
  border-top: 1px solid #ffffff;
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
.M_detail {
  position: relative;
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
    padding: 20px 0 30px 0;
  }
}
</style>

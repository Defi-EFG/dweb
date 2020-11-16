<template>
  <div>
    <v-row>
      <v-col cols="6">
        <div class="dougnut-chart">
          <canvas id="gptmyChart" class="dougnut-logo"></canvas>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="dougnut-detail">
          <p>
            {{ token }} - {{ $t('views.detail.available') }} ({{ $t('views.detail.total') }}:
            {{ max | numberWithCommas({ fixed: [0, 2] }) }})
          </p>
          <div class="value_price1">
            {{ stakingTotal | numberWithCommas({ fixed: [0, 8] }) }} {{ token }}
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'
import StakingModule from '@/store/staking'
import { getModule } from 'vuex-module-decorators'

@Component({})
export default class DoughnutChart extends Vue {
  stakingStore = getModule(StakingModule)
  @Prop() stakingAvailable!: number
  @Prop() max!: number
  token = 'GPT'

  get ctx() {
    return document.getElementById('gptmyChart')
  }

  get stakingTotal() {
    return this.stakingAvailable
  }

  mounted() {
    this.renderChart(this.ctx, this.max, this.stakingTotal)
    this.stakingStore.updateMintingInfo(this.stakingStore.address)
  }

  @Watch('stakingTotal')
  onLoggedIn(ready: any) {
    if (ready) {
      this.renderChart(this.ctx, this.max, this.stakingTotal)
    }
  }

  renderChart(element: any, max: number, stakingTotal: number) {
    /* eslint-disable */
    const myChart = new Chart(element, {
      type: 'doughnut',
      data: {
        labels: ['Available', 'Staked'],
        datasets: [
          {
            borderWidth: 0,
            borderColor: '#222738',
            backgroundColor: [this.gradientFill, '#888888'],
            data: [stakingTotal, max - stakingTotal]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            bottom: 1
          }
        },
        cutoutPercentage: 63
      }
    })
  }

  get gradientFill() {
    //@ts-ignore
    const ctx = this.ctx.getContext('2d')
    const gradientStroke = ctx.createLinearGradient(300, 20, 100, 100)
    gradientStroke.addColorStop(0.5, '#8B41D7')
    gradientStroke.addColorStop(0, '#8B41D7')
    gradientStroke.addColorStop(1, '#6800FE')

    return gradientStroke
  }
}
</script>

<style lang="scss" scoped>
.chart-card {
  width: -webkit-fill-available;
  background: #222738;
  display: flex;
}

.chart-wrapper {
  display: flex;
  margin: auto;
}

.dougnut-chart {
  margin-left: 20px;
  margin-right: 20px;
  width: 95%;
  max-width: 400px;
}
.dougnut-detail {
  margin-top: 13%;
  p {
    color: white;
    margin-top: 7%;
    margin-bottom: 3px;
  }
  .value_price1 {
    font-size: 25px;
    font-weight: 400;
    color: #3fc0db;
  }
  .value_price2 {
    font-size: 25px;
    font-weight: 400;
    color: #c074f9;
  }
}

.dougnut-logo {
  padding: 0;
  margin: 0;
  background-image: url('../../assets/efg_01.svg');
  background-repeat: no-repeat;
  background-position: 50.4% 49.5%;
  background-size: 50px;
}
@media only screen and (max-width: 960px) {
  .dougnut-detail {
    text-align: right;
    margin-right:15px;
 }
  .dougnut-chart {
    margin-left: 100px;
    margin-right: 0px;
    width: 95%;
    min-width: 250px;
  }
}
@media only screen and (max-width: 600px) { 
  .dougnut-chart {
    margin-left: -50px;
    margin-right: 0px;
    width: 95%;
    min-width: 250px;
  }
  .dougnut-detail {
    margin-top: 10px;
    p {
      color: white;
      margin-top: 2%;
      margin-bottom: 3px;
      font-size: 13px;
    }
    .value_price1 {
      font-size: 20px;
      font-weight: 400;
      color: #3fc0db;
    }
    .value_price2 {
      font-size: 20px;
      font-weight: 400;
      color: #c074f9;
    }
  }
}
</style>

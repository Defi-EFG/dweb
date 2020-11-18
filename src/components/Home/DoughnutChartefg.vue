<template>
  <div>
    <v-row>
      <v-col cols="6" md="7">
        <div class="dougnut-chart">
          <canvas id="myChartGpt" class="dougnut-logo"></canvas>
        </div>
      </v-col>
      <v-col cols="6" md="5">
        <div class="dougnut-detail">
          <p>{{ currencyName }} - {{ $t('views.detail.total_supply') }}</p>
          <div class="value_price1">
            {{ totlemax | numberWithCommas({ fixed: [0, 2] }) }}
          </div>
          <p>{{ currencyName }} - {{ $t('views.detail.total_borrowed') }}</p>
          <div class="value_price2">
            {{ totalcurrentValue | numberWithCommas({ fixed: [0, 2] }) }}
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

@Component({})
export default class StakingChart extends Vue {
  @Prop({ default: 1000 }) readonly max!: number
  @Prop({ default: 0 }) readonly currentValue!: number
  @Prop({ default: '###' }) readonly currencyName!: string

  get totlemax() {
    return this.max
  }
  get totalcurrentValue() {
    return this.currentValue
  }
  get listcurrencyName() {
    return this.currencyName
  }
  get ctx() {
    return document.getElementById('myChartGpt')
  }

  mounted() {
    this.currentValue
    this.renderChart(this.ctx, this.totlemax, this.totalcurrentValue)
  }
  @Watch('currentValue')
  onLoggedIn(ready: any) {
    if (ready) {
      this.renderChart(this.ctx, this.totlemax, this.totalcurrentValue)
    }
  }

  renderChart(element: any, totlemax: number, totalcurrentValue: number) {
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
            data: [totalcurrentValue, totlemax]
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
  margin: auto 0;
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
    margin-left: 150px;
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

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
          <p>EFG - Total Supply</p>
          <div class="value_price1">{{ max | numberWithCommas({ fixed: [0, 2] }) }}</div>
          <p>EFG - Total Borrowed</p>
          <div class="value_price2">{{ currentValue | numberWithCommas({ fixed: [0, 2] }) }}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Vue, Component } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class StakingChart extends Vue {
  max = 4189402.65
  currentValue = 130561.041

  mounted() {
    this.renderChart(this.ctx, this.max, this.currentValue)
  }

  get ctx() {
    return document.getElementById('myChartGpt')
  }

  renderChart(element: any, max: number, current: number) {
    /* eslint-disable */
    const myChart = new Chart(element, {
      type: 'doughnut',
      data: {
        labels: ['Available', 'Staked'],
        datasets: [
          {
            borderWidth: 0,
            borderColor: '#222738',
            backgroundColor: [this.gradientFill, this.gradientFill2],
            data: [current, max]
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
  get gradientFill2() {
    //@ts-ignore
    const ctx = this.ctx.getContext('2d')
    const gradientStroke = ctx.createLinearGradient(300, 20, 100, 100)
    gradientStroke.addColorStop(0.5, '#3FC0DB')
    gradientStroke.addColorStop(0, '#8B41D7')
    gradientStroke.addColorStop(1, '#6600FA')

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

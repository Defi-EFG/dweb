<template>
  <div>
    <v-row>
      <v-col cols="6">
        <div class="token-chart">
          <canvas id="myChart" class="token-logo"></canvas>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="token-detail">
          <p>{{ token }}</p>
          <div class="value">{{ max | numberWithCommas({ decimal: 2 }) }}</div>
          <p>{{ token2 }}</p>
          <div class="value2">{{ currentValue | numberWithCommas({ decimal: 2 }) }}</div>
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
  token = 'EFG - Total Supply'
  token2 = 'EFG - Total Borrowed'
  max = 418940265
  currentValue = 130561041

  mounted() {
    this.renderChart(this.ctx, this.max, this.currentValue)
  }

  get ctx() {
    return document.getElementById('myChart')
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

.token-chart {
  margin-left: -2rem;
  margin-right: -2rem;
}

.token-detail {
  margin: auto 0;
  p {
    color: white;
    margin-top: 7%;
    margin-bottom: 3px;
  }
  .value {
    font-size: 25px;
    font-weight: 400;
    color: #3fc0db;
  }
  .value2 {
    font-size: 25px;
    font-weight: 400;
    color: #c074f9;
  }
}

.token-logo {
  padding: 0;
  margin: 0;
  background-image: url('../../assets/efg_01.svg');
  background-repeat: no-repeat;
  background-position: 50.4% 49.5%;
  background-size: 50px;
}
</style>

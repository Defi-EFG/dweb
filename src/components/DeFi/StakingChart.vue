<template>
  <v-card dark class="chart-card">
    <v-card-text class="chart-wrapper">
      <div class="token-chart">
        <canvas id="myChart" class="token-logo"></canvas>
      </div>
      <div class="token-detail">
        <p class="mb-3">{{ currencyName }} - Available (Total: {{ total }})</p>
        <div class="value">{{ available }} {{ currencyName }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Vue, Component, Prop } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class StakingChart extends Vue {
  @Prop({ default: '###' }) readonly currencyName!: string
  @Prop({ default: 10000 }) readonly total!: number
  @Prop({ default: 0 }) readonly available!: number

  mounted() {
    this.renderChart(this.ctx, this.total, this.available)
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
            backgroundColor: [this.gradientFill, '#888888'],
            data: [current, max - current]
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
        cutoutPercentage: 63,
        responsive: true,
        maintainAspectRatio: true
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
  width: inherit;
  background: #222738;
  display: flex;
  text-align: left;
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
  margin: auto;
  p {
    color: white;
  }
  .value {
    font-size: 25px;
    font-weight: 400;
    color: #3fc0db;
  }
}

.token-logo {
  padding: 0;
  margin: 0;
  background-image: url('../../assets/gpt.svg');
  background-repeat: no-repeat;
  background-position: 50.4% 49.5%;
  background-size: 50px;
}

@media (max-width: 768px) {
  .chart-card {
    padding: 12px 2rem;
  }
  .token-detail {
    margin: auto 0 auto auto;
  }
}

@media (max-width: 600px) {
  .chart-card {
    padding: 12px;
  }
}

@media (max-width: 425px) {
  .token-detail {
    p {
      font-size: small;
    }
    .value {
      font-size: 20px;
    }
  }
}
</style>

<style lang="scss">
@media (max-width: 1264px) {
  .token-chart {
    canvas {
      width: 220px !important;
      height: 115px !important;
    }
  }

  .value {
    text-align: right;
  }
}

@media (max-width: 425px) {
  .token-chart {
    canvas {
      width: 180px !important;
      height: 90px !important;
    }
  }

  .token-logo {
    background-size: 35px !important;
  }
}
</style>

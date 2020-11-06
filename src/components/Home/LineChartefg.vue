<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="button-small">
            <a @click="onClickActive('Borrow')" :class="active == 'Borrow' ? 'active' : undefined"
              >Borrow APY</a
            >
            <a
              @click="onClickActive('Collateral')"
              :class="active == 'Collateral' ? 'active' : undefined"
              >Collateral Factor</a
            >
          </div>
          <div class="chart_view">
            <template>
              <canvas :id="efgchart"></canvas>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class LineChart extends Vue {
  @PropSync('id', { type: String }) readonly idNumber!: number

  active = 'Borrow'
  name = 'Borrow'
  title = 'Borrow'

  onClickActive(name: string) {
    this.active = name
    this.name = name
    this.title = name
    console.log(this.title)
  }

  finul = 1
  txt = ''
  efgchart = `graph${this.idNumber}`
  myChart = null
  labelSet = ['1 Aug', '16 Aug', '1 Sep', '16 Sep', '01 Oct', '16 Oct']
  dataSet = [1.6, 2.2, 2, 2.3, 2.1, 2]

  get ctx() {
    return document.getElementById(this.efgchart)
  }

  mounted() {
    Chart.defaults.global.legend.display = false
    this.renderChart(this.ctx!, this.labelSet, this.dataSet)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const self = this
    // setInterval(function() {
    //   self.finul++
    //   self.txt = self.finul + ' txt'
    //   self.dataSet.push(self.finul)
    //   self.labelSet.push(self.txt)
    //   self.renderChart(self.ctx!, self.labelSet, self.dataSet)
    // }, 20000)
  }

  renderChart(element: HTMLElement, labelSet: any[], dataSet: any[]) {
    this.myChart = new Chart(element, {
      type: 'line',
      data: {
        labels: labelSet,
        datasets: [
          {
            borderColor: '#ffffff',
            backgroundColor: '#a346ff3b',
            borderWidth: 1,
            lineTension: 0,
            fill: true,
            pointBackgroundColor: '#141721',
            pointBorderWidth: 0.1,
            pointHoverRadius: 5,
            pointBorderColor: '#141721',
            pointHoverBackgroundColor: '#141721',
            pointHoverBorderColor: '#141721',
            pointRadius: 0.1,
            pointStyle: 'rect',
            data: dataSet
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 10
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                userCallback: function(value: any) {
                  return value.toLocaleString()
                }
              }
            }
          ]
        },
        animation: {
          easing: 'easeInOutQuint'
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
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
    border-bottom: 3px solid #c074f9;
  }
}
</style>

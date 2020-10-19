<template>
  <canvas :id="efgchart"></canvas>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class LineChart extends Vue {
  @PropSync('id', { type: String }) readonly idNumber!: number
  labelSet = ['1 Aug', '16 Aug', '1 Sep', '16 Sep', '01 Oct', '16 Oct']
  finul = 1
  txt = ''
  dataSet = [1.6, 2.2, 2, 2.3, 2.1, 2]

  efgchart = `graph${this.idNumber}`
  myChart = null

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

  get ctx() {
    return document.getElementById(this.efgchart)
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
                beginAtZero: true
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

<style lang="scss" scoped></style>

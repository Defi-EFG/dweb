<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <template>
            <canvas id="idChart"></canvas>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Chart from 'chart.js'

@Component({})
export default class LineChart extends Vue {
  @Prop({ default: [] as string[] }) labelSet!: string[]
  @Prop({ default: [] as number[] }) dataSet!: number[]

  finul = 1
  txt = ''
  myChart = null
  get ctx() {
    return document.getElementById('idChart')
  }

  @Watch('labelSet')
  chartdata(labelSet: string[]) {
    if (labelSet.length > 0) {
      if (this.ctx) {
        this.renderChart(this.ctx, this.labelSet, this.dataSet)
      }
    }
  }

  mounted() {
    Chart.defaults.global.legend.display = false
    if (this.ctx) {
      this.renderChart(this.ctx, this.labelSet, this.dataSet)
    }

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
            data: dataSet,
            bezierCurve: false
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
                maxTicksLimit: 10
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

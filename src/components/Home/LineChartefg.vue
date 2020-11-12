<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="chart_view">
            <template>
              <canvas :id="$route.query.pool"></canvas>
            </template>
          </div>
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

  active = 'Borrow'
  name = 'Borrow'
  title = 'Borrow'

  onClickActive(name: string) {
    this.active = name
    this.name = name
    this.title = name
  }

  finul = 1
  txt = ''
  myChart = null
  idChart: any = this.$route.query.pool
  get ctx() {
    return document.getElementById(this.idChart)
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

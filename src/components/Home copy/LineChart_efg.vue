<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  titleName: [
    { x: 'Jan', net: 100, cogs: 50, gm: 50 },
    { x: 'Feb', net: 120, cogs: 55, gm: 50 }
  ],
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb'],
        datasets: [
          {
            label: 'Line Chart',
            data: [this.titleData],
            borderColor: '#ffffff',
            backgroundColor: '#a346ff3b',
            borderWidth: 2,
            pointBorderColor: '#ffffff00'
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

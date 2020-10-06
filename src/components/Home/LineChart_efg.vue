<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data() {
    return {
      chartData: {
        labels: ['1 Aug', '16 Aug', '1 Sep', '16 Sep', '01 Oct', '16 Oct'],
        datasets: [
          {
            label: 'Line Chart',
            data: [1.6, 3, 2, 2.3, 2.1, 2],
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

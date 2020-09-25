<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data() {
    return {
      chartData: {
        labels: ['Babol', 'Cabanatuan'],
        datasets: [
          {
            borderWidth: 1,
            borderColor: ['#3FC0DB', '#4E4E4E'],
            backgroundColor: ['#3FC0DB', '#4E4E4E'],
            data: [1000, 500]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 0,
            bottom: 50
          }
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

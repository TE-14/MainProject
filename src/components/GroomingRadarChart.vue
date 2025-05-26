<template>
  <div class="radar-chart-container">
    <canvas ref="radarChart"></canvas>
  </div>
</template>

<script>
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default {
  name: 'GroomingRadarChart',
  data() {
    return {
      radarChart: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3001/api/grooming-awareness');
        const data = await response.json();
        return {
          labels: Object.keys(data),
          values: Object.values(data).map(v => Math.round(v * 100)),
        };
      } catch (error) {
        console.error('Error fetching grooming awareness data:', error);
        return {
          labels: ['Awareness', 'Prevention', 'Response', 'Education', 'Support'],
          values: [0, 0, 0, 0, 0],
        };
      }
    },
    async renderChart() {
      const { labels, values } = await this.fetchData();
      const ctx = this.$refs.radarChart.getContext('2d');

      this.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels,
          datasets: [{
            label: 'Awareness Level (%)',
            data: values,
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
            pointBackgroundColor: 'rgba(99, 102, 241, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { 
                display: true,
                color: 'rgba(99, 102, 241, 0.2)'
              },
              grid: {
                color: 'rgba(99, 102, 241, 0.1)'
              },
              pointLabels: {
                color: '#4b4b6b',
                font: {
                  size: 12,
                  weight: '500'
                }
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                backdropColor: 'transparent',
                color: '#4b4b6b',
                callback: value => `${value}%`
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(99, 102, 241, 0.9)',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: ctx => `${ctx.raw}%`
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.radarChart) {
      this.radarChart.destroy();
    }
  }
};
</script>

<style scoped>
.radar-chart-container {
  width: 100%;
  height: 500px;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style> 
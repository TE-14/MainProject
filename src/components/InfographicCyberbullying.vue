<template>
  <div class="chart-explainer-layout">
    <div class="chart-section">
      <canvas ref="emojiChart" height="680" style="width:100%"></canvas>
    </div>
    <div class="right-section">
      <div class="explanation-section">
        <h3>📊 What This Graph Shows</h3>
        <ul>
          <li>📈 Tracks the usage trend of <strong>safe</strong>, <strong>moderate</strong>, and <strong>risky</strong> emojis over simulated time slices (early to late).</li>
          <li>😀 Focuses on <strong>facial or expressive emojis</strong> commonly used by teens in online chats.</li>
          <li>🚨 Helps identify how the frequency of risky emojis <strong>rises or falls</strong> over time, signaling potential increases in harmful online behavior.</li>
          <li>🔍 Useful for observing digital communication patterns and detecting shifts in tone across platforms.</li>
          <li>🧠 Ideal for awareness campaigns aiming to educate young users on emoji impact in cyber contexts.</li>
        </ul>
      </div>

      <div class="emoji-rows">

  <!-- SAFE -->
  <div class="emoji-group safe">
    <h3>🟢 Top 10 Safe Emojis</h3>
    <p class="category-desc">Typically cheerful or positive facial expressions.</p>
    <div class="emoji-scroll">
      <div class="emoji-item"><div class="emoji-char">😉</div><span class="score">(0.10)</span></div>
      <div class="emoji-item"><div class="emoji-char">🙆‍♀️</div><span class="score">(0.09)</span></div>
      <div class="emoji-item"><div class="emoji-char">😀</div><span class="score">(0.08)</span></div>
      <div class="emoji-item"><div class="emoji-char">😛</div><span class="score">(0.08)</span></div>
      <div class="emoji-item"><div class="emoji-char">🙏</div><span class="score">(0.08)</span></div>
      <div class="emoji-item"><div class="emoji-char">😊</div><span class="score">(0.07)</span></div>
      <div class="emoji-item"><div class="emoji-char">😻</div><span class="score">(0.07)</span></div>
      <div class="emoji-item"><div class="emoji-char">😇</div><span class="score">(0.07)</span></div>
      <div class="emoji-item"><div class="emoji-char">😗</div><span class="score">(0.06)</span></div>
      <div class="emoji-item"><div class="emoji-char">🙂</div><span class="score">(0.06)</span></div>
    </div>
  </div>

  <!-- MODERATE -->
  <div class="emoji-group moderate">
    <h3>🟡 Top 10 Moderate Emojis</h3>
    <p class="category-desc">Often neutral or context-dependent expressions.</p>
    <div class="emoji-scroll">
      <div class="emoji-item"><div class="emoji-char">😹</div><span class="score">(0.30)</span></div>
      <div class="emoji-item"><div class="emoji-char">😁</div><span class="score">(0.29)</span></div>
      <div class="emoji-item"><div class="emoji-char">🤠</div><span class="score">(0.29)</span></div>
      <div class="emoji-item"><div class="emoji-char">😬</div><span class="score">(0.27)</span></div>
      <div class="emoji-item"><div class="emoji-char">😱</div><span class="score">(0.26)</span></div>
      <div class="emoji-item"><div class="emoji-char">🤔</div><span class="score">(0.25)</span></div>
      <div class="emoji-item"><div class="emoji-char">😂</div><span class="score">(0.25)</span></div>
      <div class="emoji-item"><div class="emoji-char">😈</div><span class="score">(0.20)</span></div>
      <div class="emoji-item"><div class="emoji-char">😺</div><span class="score">(0.20)</span></div>
      <div class="emoji-item"><div class="emoji-char">😮</div><span class="score">(0.18)</span></div>
    </div>
  </div>

  <!-- RISKY -->
  <div class="emoji-group risky">
    <h3>🔴 Top 10 Risky Emojis</h3>
    <p class="category-desc">Often linked with sarcasm, threats, or aggressive tones.</p>
    <div class="emoji-scroll">
      <div class="emoji-item"><div class="emoji-char">😟</div><span class="score">(0.60)</span></div>
      <div class="emoji-item"><div class="emoji-char">😫</div><span class="score">(0.59)</span></div>
      <div class="emoji-item"><div class="emoji-char">😒</div><span class="score">(0.59)</span></div>
      <div class="emoji-item"><div class="emoji-char">😾</div><span class="score">(0.59)</span></div>
      <div class="emoji-item"><div class="emoji-char">🧓</div><span class="score">(0.58)</span></div>
      <div class="emoji-item"><div class="emoji-char">😿</div><span class="score">(0.58)</span></div>
      <div class="emoji-item"><div class="emoji-char">😠</div><span class="score">(0.56)</span></div>
      <div class="emoji-item"><div class="emoji-char">😐</div><span class="score">(0.55)</span></div>
      <div class="emoji-item"><div class="emoji-char">😞</div><span class="score">(0.55)</span></div>
      <div class="emoji-item"><div class="emoji-char">😣</div><span class="score">(0.54)</span></div>
    </div>
  </div>

</div>

  </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'EmojiRiskStream',
  data() {
    return {
      chart: null,
      emojiDetails: null
    }
  },
  methods: {
    renderChart(data, emojis) {
      const labels = data.map(item => item.time_slice)

      const datasets = ['safe', 'moderate', 'risky'].map(level => ({
        label: `${level.charAt(0).toUpperCase() + level.slice(1)}`,
        data: data.map(item => item[level]),
        backgroundColor: level === 'safe' ? '#bbf7d0' : level === 'moderate' ? '#fde68a' : '#fecaca',
        borderColor: level === 'safe' ? '#22c55e' : level === 'moderate' ? '#fbbf24' : '#ef4444',
        fill: true,
        tension: 0.4,
        stack: 'risk',
        pointRadius: 6,
        pointHoverRadius: 8
      }))

      const ctx = this.$refs.emojiChart.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
          responsive: true,
          animation: {
            duration: 1200,
            easing: 'easeInOutQuart'
          },
          plugins: {
            title: {
              display: true,
              text: '⚠️ Emoji Cyberbullying Risk Trend Over Time',
              font: { size: 20 }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label.split(' ')[0]
                  const emoji = context.dataset.label.split(' ')[1]
                  const tier = label.toLowerCase()
                  return `${emoji} ${label} Risk: ${context.formattedValue} emojis\nTop ${label} emojis: ${emojis[tier].join(' ')}`
                }
              }
            },
            legend: {
              labels: {
                usePointStyle: true,
                padding: 16,
                font: { size: 14 }
              }
            }
          },
          elements: {
            point: {
              borderWidth: 2
            }
          },
          scales: {
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Emoji Count'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Simulated Time Slice (Early → Late)'
              }
            }
          }
        }
      })
    }
  },
  mounted() {
    fetch('/api/emoji-risk-stream')
      .then(res => res.json())
      .then(data => {
        const isFaceEmoji = (emoji) => {
          const codePoint = emoji.codePointAt(0)
          return codePoint >= 0x1F600 && codePoint <= 0x1F64F
        }

        const filtered = {
          safe: data.topEmojiDetails.safe.filter(e => isFaceEmoji(e.emoji)),
          moderate: data.topEmojiDetails.moderate.filter(e => isFaceEmoji(e.emoji)),
          risky: data.topEmojiDetails.risky.filter(e => isFaceEmoji(e.emoji))
        }

        this.renderChart(data.data, {
          safe: filtered.safe.map(e => e.emoji),
          moderate: filtered.moderate.map(e => e.emoji),
          risky: filtered.risky.map(e => e.emoji)
        })

        this.emojiDetails = filtered
      })
      .catch(err => console.error('Error loading emoji stream:', err))
  }
}
</script>

<style scoped>
.chart-explainer-layout {
  display: flex;
  flex-direction: row;
  gap: 48px;
  align-items: stretch;
  justify-content: space-between;
  width: 95vw;
  margin: 0 auto;
  max-width: 2000px;
  padding-top: 48px;
}
.chart-section, .right-section {
  min-width: 680px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  min-height: 680px;
  padding: 0 40px;
}

.right-section {
  margin-left: 16px;
}

.explanation-section ul {
  padding-left: 1.2em;
  margin: 0;
}

.explanation-section li {
  margin-bottom: 12px;
  font-size: 1.05rem;
  position: relative;
  padding-left: 0.5em;
}

.explanation-section li::marker {
  color: #6366f1;
  font-size: 1.1em;
}

canvas {
  width: 100% !important;
  height: 680px !important;
  background: linear-gradient(to right, #f0fdfa, #fff7ed);
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.emoji-rows {
  margin-top: 30px;
  transform: scale(0.92);
  transform-origin: left top;
  max-width: 90%;
  align-self: flex-start;
}
.emoji-group {
  margin-bottom: 20px;
}
.emoji-group h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}
.category-desc {
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #4b5563;
}
.emoji-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 10px;
}
.emoji-item {
  font-size: 2rem;
  padding: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 48px;
  text-align: center;
}
.emoji-item .score {
  font-size: 0.7rem;
  color: #666;
  display: block;
}
.safe h3 { color: #16a34a; }
.moderate h3 { color: #f59e0b; }
.risky h3 { color: #dc2626; }

@media (max-width: 1200px) {
  .chart-section, .right-section {
    min-width: 320px;
    max-width: 100%;
  }
  .chart-explainer-layout {
    gap: 24px;
  }
}

@media (max-width: 900px) {
  .chart-explainer-layout {
    flex-direction: column;
    gap: 32px;
    padding-top: 32px;
  }
  .chart-section, .right-section {
    min-width: 0;
    max-width: 100%;
  }
}
</style>

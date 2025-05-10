<template>
  <!-- Banner -->
  <section class="home-hero-section">
    <div class="banner-flex">
      <!-- 左侧文字内容 -->
      <div class="banner-left" data-aos="fade-right">
        <h1 class="hero-title mb-6">
          Empower Safe & Smart Online Lives
        </h1>
        <p class="hero-subtitle mb-8">
          Learn how to recognize, prevent, and respond to cyberbullying and online grooming.
        </p>
        <!-- Call to Action Button -->
        <v-btn
          class="cta-main-btn mt-2"
          color="primary"
          large
          :to="'/learning-hub'"
        >
          <span>EXPLORE LEARNING HUB</span>
          <v-icon right class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <!-- 右侧图片内容 -->
      <div class="banner-right-clip" data-aos="fade-left">
        <img
          :src="require('@/assets/images/Teens.jpg')"
          alt="Teens Digital Learning"
          class="banner-img"
        />
      </div>
    </div>
  </section>

  <!-- Statistics -->
  <section class="fullwidth-section stats-bg" data-aos="fade-up">
    <div class="section-inner">
      <div class="statistics-section text-center">
        <h3 class="text-h5 font-weight-bold mb-8">Warning Data in the Digital Age</h3>
        <p class="text-subtitle-1 text-grey-darken-1 mb-12">
          Cyberbullying is a significant concern among Australian teenagers, with recent data highlighting its prevalence and impact:
        </p>
        <v-row class="stats-row" style="gap: 1.5rem;" no-gutters>
          <v-col cols="12" sm="6" md="3">
            <v-card class="stat-card stat-card-round" elevation="0">
              <div class="stat-icon mb-4">
                <v-icon size="32" color="primary">mdi-account-alert</v-icon>
              </div>
              <div class="stat-number text-h4 font-weight-bold mb-2">44%</div>
              <div class="stat-label text-grey-darken-1">Negative Online Experiences</div>
              <div class="stat-description text-caption text-grey">
                Including 15% receiving threats
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="stat-card stat-card-round" elevation="0">
              <div class="stat-icon mb-4">
                <v-icon size="32" color="primary">mdi-account-child</v-icon>
              </div>
              <div class="stat-number text-h4 font-weight-bold mb-2">12-13</div>
              <div class="stat-label text-grey-darken-1">Most Vulnerable Age</div>
              <div class="stat-description text-caption text-grey">
                Over 1/3 of victims in this age group
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="stat-card stat-card-round" elevation="0">
              <div class="stat-icon mb-4">
                <v-icon size="32" color="primary">mdi-account-group</v-icon>
              </div>
              <div class="stat-number text-h4 font-weight-bold mb-2">Both</div>
              <div class="stat-label text-grey-darken-1">Genders Affected</div>
              <div class="stat-description text-caption text-grey">
                Males report slightly higher rates
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="stat-card stat-card-round" elevation="0">
              <div class="stat-icon mb-4">
                <v-icon size="32" color="primary">mdi-apps</v-icon>
              </div>
              <div class="stat-number text-h4 font-weight-bold mb-2">6+</div>
              <div class="stat-label text-grey-darken-1">Social Media Risk</div>
              <div class="stat-description text-caption text-grey">
                Platforms increase cyberbullying risk
              </div>
            </v-card>
          </v-col>
        </v-row>
        <p class="text-subtitle-1 text-grey-darken-1 mt-12">
          These statistics underscore the urgent need for awareness and proactive measures to combat cyberbullying among Australian youth.
        </p>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="fullwidth-section features-bg" data-aos="fade-up">
    <div class="section-inner">
      <div class="text-center mb-16">
        <h2 class="section-title">Security Risks in the Digital Age</h2>
        <p class="section-subtitle">These threats are affecting every digital citizen</p>
      </div>

      <!-- Cyberbullying Section -->
      <div class="content-block mb-16">
        <v-row align="center">
          <v-col cols="12" md="6" order-md="1" order="2">
            <div class="content-text pr-md-8">
              <div class="d-flex align-center mb-6">
                <h3 class="content-title mb-0">Cyberbullying</h3>
                <v-btn
                  class="ml-4"
                  color="primary"
                  variant="outlined"
                  :to="'/learning/cyberbullying'"
                  size="small"
                >
                  <v-icon start>mdi-arrow-right</v-icon>
                  Learn More
                </v-btn>
              </div>
              <p class="description">
                Cyberbullying has become a serious issue in the digital age. Perpetrators use online anonymity to harass others through verbal attacks and threats, causing psychological harm and affecting victims' daily lives.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6" order-md="2" order="1">
            <canvas ref="chartRef" width="400" height="300"></canvas>
          </v-col>
        </v-row>
      </div>

      <!-- Online Grooming Section -->
      <div class="content-block">
        <div class="grooming-section">
          <div class="grooming-img-container">
            <img
              :src="require('@/assets/images/WhatsApp Image 2025-04-10 at 21.14.30.jpeg')"
              alt="Online Grooming"
              class="grooming-img"
            />
          </div>
          <div class="grooming-content">
            <div class="d-flex align-center mb-6">
              <h3 class="content-title mb-0">Online Grooming</h3>
              <v-btn
                class="ml-4"
                color="primary"
                variant="outlined"
                :to="'/learning/grooming'"
                size="small"
              >
                <v-icon start>mdi-arrow-right</v-icon>
                Learn More
              </v-btn>
            </div>
            <p class="description">
              Online grooming is a significant threat in today's digital world. Predators use social media platforms to target young people through fake identities and deception, potentially leading to dangerous situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 新全屏 learning section -->
  <section class="learning-fullscreen-section" data-aos="fade-up">
    <div class="learning-flex">
      <div class="learning-left">
        <h2 class="learning-title">Ready to Experience Real-World Scenarios?</h2>
        <p class="learning-desc">
          Learn through interactive scenarios to better understand digital security.
        </p>
        <v-btn
          class="learning-btn"
          color="primary"
          size="x-large"
          :to="'/scenario'"
        >
          <span>Start Scenario</span>
          <v-icon right class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <div class="learning-right">
        <img :src="require('@/assets/images/learning.jpg')" alt="Learning Scenario" class="learning-img" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const chartRef = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/perpetrators-by-age')
    const data = await res.json()

    const labels = data.map(row => row.age)
    const counts = data.map(row => row.count)

    new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Perpetrators by Age',
          data: counts,
          backgroundColor: 'rgba(239, 68, 68, 0.6)', // red-ish
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Age Distribution of Cyberbullies'
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Perpetrators',
              color: '#374151',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Age',
              color: '#374151',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          }
        }
      }
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<style scoped>
.home-hero-section {
  width: 100vw;
  min-height: 80vh;
  background: linear-gradient(120deg, #f5f7fa 0%, #e0e7ff 100%);
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 0;
}

.banner-flex {
  display: flex;
  width: 100vw;
  min-height: 92vh;
  height: 92vh;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(120deg, #f5f7fa 0%, #e0e7ff 100%);
}

.banner-left {
  flex: 1 1 0;
  min-width: 0;
  padding-left: 4vw;
  padding-right: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}

.banner-right-clip {
  flex: 1.1 1 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%);
  background: #fff;
}

.banner-img {
  width: 100%;
  height: 75vh;
  object-fit: cover;
  display: block;
  border-radius: 0 48px 48px 0;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.10);
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.1;
  color: #1f2937;
}

.gradient-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.35rem;
  line-height: 1.7;
  color: #6b7280;
}

.cta-main-btn, .learning-btn {
  font-family: 'Inter', 'Roboto', Arial, sans-serif !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
  padding: 0.85rem 2.2rem !important;
  border-radius: 2rem !important;
  background: linear-gradient(90deg, #7c3aed 0%, #6366f1 100%) !important;
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.13);
  transition: all 0.3s cubic-bezier(.4,2,.3,1);
  display: flex;
  align-items: center;
  gap: 0.7em;
}
.cta-main-btn:hover, .learning-btn:hover {
  background: linear-gradient(90deg, #6366f1 0%, #7c3aed 100%) !important;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.18);
}

/* 全宽区块和内容居中 */
.fullwidth-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 0;
}
.section-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 2vw;
}
.stats-bg {
  background: linear-gradient(120deg, #f5f7fa 0%, #e0e7ff 100%);
}
.features-bg {
  background: linear-gradient(120deg, #ede9fe 0%, #fdf6fd 100%);
}
.cta-bg {
  background: linear-gradient(120deg, #ede9fe 0%, #fdf6fd 100%);
}

/* 圆角卡片 */
.stat-card-round {
  border-radius: 24px !important;
  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.08) !important;
  background: #fff !important;
}
.cta-card-round {
  border-radius: 32px !important;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.10) !important;
  background: var(--primary-gradient) !important;
  color: #fff !important;
}

@media (max-width: 1200px) {
  .banner-left {
    padding-left: 2vw;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .banner-img {
    height: 320px;
    min-height: 200px;
  }
}

@media (max-width: 900px) {
  .banner-flex {
    flex-direction: column-reverse;
    min-height: 60vh;
    padding: 0;
  }
  .banner-left, .banner-right-clip {
    padding: 0 1vw;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .banner-img {
    width: 100vw;
    height: 180px;
    border-radius: 0 0 24px 24px;
  }
  .hero-title {
    font-size: 1.5rem;
    text-align: center;
  }
  .hero-subtitle {
    text-align: center;
  }
  .cta-main-btn {
    margin: 0 auto;
    display: block;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 1.1rem;
  }
  .cta-main-btn {
    font-size: 1rem !important;
    padding: 0.8rem 1.5rem !important;
  }
  .banner-img {
    height: 100px;
    border-radius: 0 0 12px 12px;
  }
}

.v-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

section.py-16 {
  position: relative;
  padding: 2rem 1rem;
  margin: 0 -1rem;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

section.py-16 .v-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.features-section {
  background: linear-gradient(180deg, rgba(245, 235, 255, 0.95) 0%, rgba(255, 250, 245, 0.95) 100%);
  position: relative;
  z-index: 1;
  padding: 2rem 0;
  margin: 0;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.features-section .v-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.content-block {
  position: relative;
  padding: 1rem 0;
  margin: 0;
  background: transparent;
  max-width: 1280px;
  margin: 0 auto;
}

.content-block.mb-16 {
  margin-bottom: 2rem !important;
}

.statistics-section {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.stats-row {
  gap: 1.2rem !important;
  justify-content: center;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 180px;
  margin: 0 auto;
  text-align: center;
}

.cta-card {
  background: var(--primary-gradient) !important;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  margin: 2rem auto;
  z-index: 2;
  max-width: 1200px;
}

.highlight-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 8px 16px;
  border-radius: 100px;
  font-weight: 500;
  font-size: 0.875rem;
}

.gap-4 {
  gap: 1rem;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
}

.feature-card {
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.7) !important;
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(99, 102, 241, 0.1);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.feature-text {
  color: #6b7280;
  line-height: 1.6;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  position: relative;
}

.cta-text {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.subtitle-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #1e293b;
}

.image-grid {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.stat-icon {
  margin: 0 auto 1rem auto;
}

.stat-number, .stat-label, .stat-description {
  text-align: center;
}

.content-text {
  max-width: 540px;
}

@media (max-width: 960px) {
  .content-text {
    max-width: 100%;
    padding: 2rem 0;
  }
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.content-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #374151;
  line-height: 1.5;
}

.content-list li:last-child {
  margin-bottom: 0;
}

.content-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  position: relative;
  display: inline-block;
}

.content-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60%;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.text-center.mb-16 {
  margin-bottom: 2rem !important;
}

.start-btn {
  background: white !important;
  color: #6366f1 !important;
  padding: 0.75rem 2rem !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2) !important;
}

.btn-text {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.grooming-img-container {
  flex: 0 0 500px;
  width: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.grooming-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.grooming-section {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1280px;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.grooming-content {
  flex: 1;
  padding: 1rem 0;
}

@media (max-width: 960px) {
  .grooming-section {
    flex-direction: column;
  }
  
  .grooming-img {
    width: 100%;
    flex: none;
  }
}

/* 新 learning section 全屏左右排布 */
.learning-fullscreen-section {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, #a7bfff 0%, #f3e7e9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -8px 32px rgba(99, 102, 241, 0.10);
}
.learning-flex {
  display: flex;
  width: 90vw;
  max-width: 1600px;
  height: 80vh;
  align-items: center;
  justify-content: space-between;
}
.learning-left {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 4vw;
}
.learning-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #2d2d6e;
  margin-bottom: 1.5rem;
}
.learning-desc {
  font-size: 1.3rem;
  color: #4b4b6b;
  margin-bottom: 2.5rem;
}
.learning-btn {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  padding: 1rem 2.5rem !important;
  border-radius: 2rem !important;
  background: var(--primary-gradient) !important;
  color: #fff !important;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.13);
  transition: all 0.3s cubic-bezier(.4,2,.3,1);
  display: flex;
  align-items: center;
  gap: 0.7em;
}
.learning-btn:hover {
  background: var(--secondary-gradient) !important;
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.18);
}
.learning-right {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.learning-img {
  width: 90%;
  max-width: 600px;
  height: auto;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.13);
}

@media (min-width: 960px) {
  .stats-row {
    flex-wrap: nowrap !important;
  }
}
</style> 
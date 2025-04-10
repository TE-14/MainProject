<template>
  <v-container class="py-16">
    <!-- Main Content Area -->
    <v-row class="hero-section">
      <v-col cols="12" md="5" class="d-flex flex-column justify-center">
        <div class="position-relative">
          <div class="highlight-badge mb-4">
            <v-icon size="18" class="mr-1">mdi-shield-check</v-icon>
            Digital Citizenship Program
          </div>
          <h1 class="hero-title mb-6">
            Enhance Digital Literacy<br>
            <span class="gradient-text">Protect Cybersecurity</span>
          </h1>
          <p class="hero-subtitle mb-8">
            In this digital age, everyone should understand the importance of cybersecurity.<br>
            Let's learn together how to prevent cyberbullying, grooming, and other security risks.
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="7" class="hero-image-section">
        <div class="hero-image-container">
          <img
            :src="require('../assets/images/mimi-thian-vdXMSiX-n6M-unsplash.jpg')"
            alt="Digital Learning"
            class="hero-image"
          />
        </div>
      </v-col>
    </v-row>

    <!-- Statistics -->
    <section class="py-16">
      <v-container>
        <div class="statistics-section text-center">
          <h3 class="text-h5 font-weight-bold mb-8">Warning Data in the Digital Age</h3>
          <p class="text-subtitle-1 text-grey-darken-1 mb-12">
            These statistics remind us that cybersecurity cannot be ignored
          </p>
          
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-card class="stat-card" elevation="0">
                <div class="stat-icon mb-4">
                  <v-icon size="32" color="primary">mdi-account-alert</v-icon>
                </div>
                <div class="stat-number text-h4 font-weight-bold mb-2">37%</div>
                <div class="stat-label text-grey-darken-1">Youth Experience Cyberbullying</div>
                <div class="stat-description text-caption text-grey">
                  From global youth survey data
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="stat-card" elevation="0">
                <div class="stat-icon mb-4">
                  <v-icon size="32" color="primary">mdi-emoticon-sad</v-icon>
                </div>
                <div class="stat-number text-h4 font-weight-bold mb-2">64%</div>
                <div class="stat-label text-grey-darken-1">Victims Face Mental Health Issues</div>
                <div class="stat-description text-caption text-grey">
                  Including anxiety and depression
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="stat-card" elevation="0">
                <div class="stat-icon mb-4">
                  <v-icon size="32" color="primary">mdi-account-multiple-alert</v-icon>
                </div>
                <div class="stat-number text-h4 font-weight-bold mb-2">85%</div>
                <div class="stat-label text-grey-darken-1">Scammers Use Fake Identities</div>
                <div class="stat-description text-caption text-grey">
                  Analysis of social media fraud cases
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-card class="stat-card" elevation="0">
                <div class="stat-icon mb-4">
                  <v-icon size="32" color="primary">mdi-currency-usd-off</v-icon>
                </div>
                <div class="stat-number text-h4 font-weight-bold mb-2">4.7B</div>
                <div class="stat-label text-grey-darken-1">Annual Online Fraud Losses</div>
                <div class="stat-description text-caption text-grey">
                  Global social media fraud amount
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- Feature Content Area -->
    <section class="features-section py-16">
      <v-container>
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
                <p class="text-body-1 mb-6">
                  In the digital age, cyberbullying has become a serious social issue. Perpetrators take advantage of internet anonymity and virality to harass and harm others through verbal attacks, rumors, defamation, and personal threats. This behavior not only causes severe psychological trauma to victims but also affects their normal study, work, and social life, potentially leading to more serious consequences. Anyone can become a victim of cyberbullying, making awareness and prevention crucial.
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
          <v-row align="center">
            <v-col cols="12" md="6" order="1">
              <v-img
                src="@/assets/images/catfishing.jpg"
                class="rounded-lg"
                height="400"
                cover
              ></v-img>
            </v-col>
            <v-col cols="12" md="6" order="2">
              <div class="content-text pl-md-8">
                <div class="d-flex align-center mb-6">
                  <h3 class="content-title mb-0">Online Grooming</h3>
                  <v-btn
                    class="ml-4"
                    color="primary"
                    variant="outlined"
                    :to="'/learning/phishing'"
                    size="small"
                  >
                    <v-icon start>mdi-arrow-right</v-icon>
                    Learn More
                  </v-btn>
                </div>
                <p class="text-body-1 mb-6">
                  Online grooming is a serious threat in today's digital world. Predators use social media and online platforms to build relationships with young people, often pretending to be someone they're not. They gradually gain trust through manipulation and deception, potentially leading to emotional harm or dangerous situations. The tactics used by online predators are becoming more sophisticated, making it crucial to stay informed and vigilant about online interactions.
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- Part 2: Learning Goals and Statistics -->
    <section class="py-16">
      <v-container>
        <!-- 行动召唤区域 -->
        <v-row>
          <v-col cols="12">
            <v-card class="cta-card text-center pa-12" elevation="0">
              <h2 class="cta-title mb-4">Ready to Experience Real-World Scenarios?</h2>
              <p class="text-body-1 text-grey-lighten-4 mt-2">
                Learn through interactive scenarios to better understand digital security.
              </p>
              <v-btn
                color="white"
                size="x-large"
                class="mt-6 white-btn"
                :to="'/scenario'"
              >
                <span class="gradient-text">Start Scenario</span>
                <v-icon right class="ml-2 gradient-text">mdi-arrow-right</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-container>
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
.v-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px !important;
  margin: 0 auto !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.hero-section {
  min-height: calc(100vh - 200px);
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(235, 245, 255, 0.95) 0%, rgba(240, 240, 255, 0.95) 100%);
  margin: 0 -1rem;
  padding: 2rem;
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
  padding: 0;
  max-width: 1280px;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  padding: 2rem;
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

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1f2937;
}

.gradient-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #6b7280;
}

.gap-4 {
  gap: 1rem;
}

.hero-image-section {
  position: relative;
  margin-left: 0;
  margin-right: -5%;
  width: 105%;
}

.hero-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  overflow: hidden;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 5% 100%);
}

.hero-image-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(248, 250, 252, 0.95) 10%,
    rgba(248, 250, 252, 0.8) 20%,
    rgba(248, 250, 252, 0.4) 35%,
    transparent 60%
  );
  z-index: 2;
}

.hero-image-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(248, 250, 252, 0.6) 15%,
    rgba(248, 250, 252, 0.3) 30%,
    transparent 50%
  );
  mix-blend-mode: soft-light;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95);
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

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-section {
    min-height: auto;
    padding-top: 2rem;
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
  background: rgba(99, 102, 241, 0.1);
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.stat-number {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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

.v-img {
  height: 250px !important;
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

@media (max-width: 600px) {
  .hero-section {
    margin: 1rem;
    padding: 3rem 1rem;
  }
  
  .start-btn {
    padding: 0.6rem 1.5rem !important;
    font-size: 1rem !important;
  }
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style> 
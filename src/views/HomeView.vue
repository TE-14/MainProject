<template>
  <!-- Banner -->
  <section class="home-hero-section">
    <div class="banner-flex">
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
        <!-- Source label at bottom right of the image, gray and italic -->
        <span class="banner-img-source">Source: Google Images</span>
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
              <div class="stat-label text-grey-darken-1">Social Media Apps Risk</div>
              <div class="stat-description text-caption text-grey">
                Platforms increase online safety risk
              </div>
            </v-card>
          </v-col>
        </v-row>
        <p class="text-subtitle-1 text-grey-darken-1 mt-12">
          These statistics underscore the urgent need for awareness and proactive measures to combat cyberbullying among Australian youth.
        </p>
        <div class="cta-analyzer-row">
          <span class="cta-analyzer-text">Curious if your words are safe online?</span>
          <v-btn
            class="learning-btn"
            color="primary"
            size="large"
            :to="'/safety-check'"
          >
            <span>Try Safety Analyzer</span>
            <v-icon right class="ml-2">mdi-shield-search</v-icon>
          </v-btn>
        </div>
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
            <div class="infographic" ref="infographicRef">
              <h2>Cyberbullying & Impulsivity</h2>
              <p>What % of highly impulsive teens reported being cyberbullied?</p>

              <div class="gender-row">
                <!-- MALE BLOCK -->
                <div class="gender-block">
                  <div class="icons">
                    <i
                      v-for="n in 10"
                      :key="'m' + n"
                      class="fas fa-user icon"
                      :class="n <= maleAnimated ? 'filled-male' : 'faded-male'"
                    ></i>
                  </div>
                  <div class="info">
                    <div class="percent male">{{ malePercent }}%</div>
                    <div class="label">Male Teens</div>
                  </div>
                </div>

                <!-- FEMALE BLOCK -->
                <div class="gender-block">
                  <div class="icons">
                    <i
                      v-for="n in 10"
                      :key="'f' + n"
                      class="fas fa-user icon"
                      :class="n <= femaleAnimated ? 'filled-female' : 'faded-female'"
                    ></i>
                  </div>
                  <div class="info">
                    <div class="percent female">{{ femalePercent }}%</div>
                    <div class="label">Female Teens</div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Online Grooming Section -->
      <div class="content-block">
        <div class="grooming-section">
          <div class="grooming-img-container">
            <GroomingRadarChart />
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

  <!-- learning section -->
  <section class="learning-fullscreen-section" data-aos="fade-up">
    <div class="learning-flex">
      <div class="learning-left">
        <h2 class="learning-title">Play Minigames, Boost Your Digital Skills!</h2>
        <p class="learning-desc">
          Challenge yourself with fun minigames and learn how to stay safe online. Practice digital safety in an engaging way!
        </p>
        <v-btn
          class="learning-btn"
          color="primary"
          size="x-large"
          :to="'/mini-games'"
        >
          <span>PLAY MINIGAMES</span>
          <v-icon right class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
      <div class="learning-right">
        <img :src="require('@/assets/images/learning.jpg')" alt="Learning Minigames" class="learning-img" />
        <div class="logo-blur"></div>
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
import { ref, onMounted, computed } from 'vue'
import GroomingRadarChart from '@/components/GroomingRadarChart.vue'

const malePercent = ref(0)
const femalePercent = ref(0)

const maleIconsFilled = computed(() => Math.round(malePercent.value / 10))
const femaleIconsFilled = computed(() => Math.round(femalePercent.value / 10))

const maleAnimated = ref(0)
const femaleAnimated = ref(0)
const infographicRef = ref(null)

function startAnimation() {
  maleAnimated.value = 0
  femaleAnimated.value = 0
  let m = 0, f = 0
  const animate = () => {
    let updated = false
    if (m < maleIconsFilled.value) {
      m++
      maleAnimated.value = m
      updated = true
    }
    if (f < femaleIconsFilled.value) {
      f++
      femaleAnimated.value = f
      updated = true
    }
    if (updated) {
      setTimeout(animate, 100)
    }
  }
  animate()
}

let observer
onMounted(async () => {
  try {
    const res = await fetch('/api/impulsive-cyberbullying-stats')
    const data = await res.json()
    malePercent.value = data.malePercent
    femalePercent.value = data.femalePercent

    // Intersection Observer
    observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (infographicRef.value) {
      observer.observe(infographicRef.value)
    }
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
  position: relative;
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
  flex: 0 0 600px;
  width: 600px;
  max-width: 45vw;
  min-width: 350px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: transparent;
  padding: 0.5rem 1.5rem 0 0;
  margin-left: -40px;
  margin-top: -30px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
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
  gap: 4rem;
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
  .grooming-img-container {
    width: 100% !important;
    max-width: 100vw;
    padding: 1rem 0 1rem 0;
    margin-left: 0;
    margin-top: 0;
    justify-content: center;
    align-items: center;
  }
  .grooming-section {
    gap: 1.5rem;
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
  position: relative;
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

/* New Infographic Styles */
.infographic {
  max-width:1100px;
  margin: 40px auto;
  padding: 24px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.gender-row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.gender-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.icons {
  display: flex;
  margin-right: 8px;
}

.icon {
  font-size: 2.6rem;
  margin: 0 2px;
  transition: color 0.3s ease;
}

.filled-male {
  color: #2563eb;
}

.faded-male {
  color: #cbd5e1;
}

.filled-female {
  color: #ec4899;
}

.faded-female {
  color: #f3d1e6;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.percent {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.percent.male {
  color: #2563eb;
}

.percent.female {
  color: #ec4899;
}

.label {
  font-size: 14px;
  color: #555;
}

/* ASUS logo blur */
.logo-blur {
  position: absolute;
  right: 160px;
  bottom: 350px;
  width: 70px;
  height: 30px;
  background: rgba(218, 203, 203, 0.018);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  pointer-events: none;
}

.cta-analyzer-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.cta-analyzer-text {
  font-size: 1.1rem;
  color: #6366f1;
  font-weight: 500;
}

/* Source label for banner image */
.banner-img-source {
  position: absolute;
  right: 18px;
  bottom: 14px;
  color: #888;
  font-size: 13px;
  font-style: italic;
  pointer-events: none; /* Do not block image interaction */
  z-index: 3;
  background: rgba(255,255,255,0.6); /* Optional: subtle background for readability */
  padding: 2px 8px;
  border-radius: 6px;
}
</style> 
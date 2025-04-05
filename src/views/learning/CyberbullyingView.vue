<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12">
        <div class="page-header text-center">
          <div class="hero-section">
            <div class="hero-icons">
              <v-icon size="48" color="primary" class="floating-icon left">mdi-shield-account</v-icon>
              <v-icon size="32" color="error" class="floating-icon top">mdi-alert-circle</v-icon>
              <v-icon size="40" color="success" class="floating-icon right">mdi-hand-heart</v-icon>
            </div>
            <h1 class="main-title">Understanding Cyberbullying</h1>
            <div class="decorative-line"></div>
          </div>
          <p class="intro-text">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            In today's digital age, cyberbullying has become a significant social issue that cannot be ignored. Let's learn how to identify, prevent, and respond to cyberbullying, working together to create a safer and friendlier online environment.
          </p>
        </div>

        <v-row justify="center" class="mt-8">
          <v-col cols="12" md="6" class="d-flex justify-center">
            <div class="flip-card" @click="card1Flipped = !card1Flipped" :class="{ 'is-flipped': card1Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="primary" class="mb-4">mdi-help-circle</v-icon>
                  <h2>What is Cyberbullying?</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Cyberbullying refers to intentional and repeated harmful behavior towards others through digital platforms such as the internet, social media, and instant messaging tools. It has the following characteristics:</p>
                  <ul>
                    <li>Repetitive: Continuous harassment</li>
                    <li>Widespread: Quick spread online</li>
                    <li>Anonymous: Perpetrators may be hidden</li>
                    <li>Persistent: Digital footprints are hard to erase</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-center">
            <div class="flip-card" @click="card2Flipped = !card2Flipped" :class="{ 'is-flipped': card2Flipped }">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-icon size="48" color="error" class="mb-4">mdi-alert-circle</v-icon>
                  <h2>Impact of Cyberbullying</h2>
                  <p class="mt-2">Click card to learn more</p>
                </div>
                <div class="flip-card-back">
                  <v-icon size="32" color="white" class="mb-4">mdi-information</v-icon>
                  <p>Cyberbullying can have serious effects on victims in multiple aspects:</p>
                  <ul>
                    <li>Mental Health: May lead to anxiety and depression</li>
                    <li>Relationships: Social withdrawal and decreased trust</li>
                    <li>Academic Performance: Reduced focus and grades</li>
                    <li>Self-perception: Damaged self-esteem and confidence</li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <div class="text-center mt-12">
          <v-btn
            x-large
            color="primary"
            elevation="2"
            class="next-page-btn"
            @click="goToNextPage"
          >
            <v-icon left>mdi-arrow-right-circle</v-icon>
            Learn More About Prevention and Response
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CyberbullyingView',
  data() {
    return {
      card1Flipped: false,
      card2Flipped: false
    }
  },
  methods: {
    goToNextPage() {
      this.$router.push('/learning/cyberbullying-scenario')
    }
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: 4rem;
}

.main-title {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.intro-text {
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.hero-section {
  position: relative;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.hero-icons {
  position: relative;
  height: 120px;
  margin-bottom: 1rem;
}

.floating-icon {
  position: absolute;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.floating-icon.left {
  left: 50%;
  margin-left: -100px;
  animation-name: floatLeft;
}

.floating-icon.right {
  right: 50%;
  margin-right: -100px;
  animation-name: floatRight;
}

.floating-icon.top {
  top: 0;
  left: 50%;
  margin-left: -16px;
  animation-name: floatTop;
}

.decorative-line {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #4CAF50, #2196F3);
  margin: 1rem auto;
  border-radius: 2px;
}

/* 翻转卡片样式 */
.flip-card {
  background-color: transparent;
  width: 100%;
  max-width: 600px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.flip-card-front {
  background: white;
}

.flip-card-front h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.flip-card-front p {
  color: #666;
  font-size: 1.1rem;
}

.flip-card-back {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  transform: rotateY(180deg);
}

.flip-card-back p {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 90%;
}

.flip-card-back ul {
  text-align: left;
  padding-left: 2rem;
  width: 90%;
}

.flip-card-back li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

@keyframes floatLeft {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10px, -10px); }
}

@keyframes floatRight {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

@keyframes floatTop {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.next-page-btn {
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-transform: none;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  transition: all 0.3s ease;
}

.next-page-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
}

.next-page-btn .v-icon {
  margin-right: 8px;
  font-size: 1.4rem;
}
</style> 
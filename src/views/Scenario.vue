<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12">
        <div class="page-header text-center mb-8">
          <h1 class="main-title">Cyberbullying Scenario Simulation</h1>
          <div class="decorative-line"></div>
          <p class="intro-text mt-4">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            Through real-world scenario simulations, understand different forms of cyberbullying and response methods. Let's learn how to protect ourselves and others in various situations.
          </p>
        </div>

        <v-card class="scenario-flow mx-auto" max-width="1200" flat>
          <!-- Progress Bar -->
          <div class="progress-bar-container">
            <div class="progress-steps">
              <div class="step" :class="{ 'active': true, 'completed': hasAnswered }">
                <div class="step-number">1</div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
              </div>
            </div>
            <div class="progress-line">
              <div class="progress-fill" :style="{ width: hasAnswered ? '33%' : '0%' }"></div>
            </div>
          </div>

          <v-row no-gutters>
            <!-- Left Scene Section -->
            <v-col cols="12" md="6" class="scene-container pa-8">
              <div class="scene-content">
                <div class="scene-header mb-6">
                  <span class="scene-number">Scene 1</span>
                  <h2 class="scene-title">Social Media Encounter</h2>
                </div>
                <div class="scene-body">
                  <div class="message-bubble left mb-4">
                    Tom recently shared a photo of himself on social media...
                  </div>
                  <div class="message-bubble right mb-4">
                    Suddenly, he received numerous negative comments from his classmates
                  </div>
                  <div class="message-bubble left mb-4">
                    "This photo is so ugly!"
                  </div>
                  <div class="message-bubble right mb-4">
                    "Someone like you doesn't deserve to have friends..."
                  </div>
                  <div class="message-bubble left">
                    These comments continued for several days, making Tom feel very distressed and upset.
                  </div>
                </div>
              </div>
            </v-col>

            <!-- Right Choice Section -->
            <v-col cols="12" md="6" class="choice-section pa-8">
              <div class="choice-container" :class="{ 'choice-active': !hasAnswered }">
                <div class="choice-header mb-6">
                  <h3 class="choice-title">What would you advise Tom to do?</h3>
                </div>
                <div class="choices-list">
                  <v-btn
                    v-for="(choice, index) in choices"
                    :key="index"
                    :color="getChoiceColor(index)"
                    :class="['choice-btn', {'selected': selectedChoice === index}]"
                    :disabled="hasAnswered"
                    @click="selectChoice(index)"
                    elevation="1"
                    class="mb-3"
                  >
                    <div class="choice-content">
                      <v-icon size="20" class="mr-3">{{ choice.icon }}</v-icon>
                      <span class="choice-text">{{ choice.text }}</span>
                    </div>
                  </v-btn>
                </div>

                <!-- Feedback Section -->
                <v-slide-y-transition>
                  <div v-if="hasAnswered" class="feedback-container mt-6">
                    <v-card
                      :color="isCorrect ? 'success lighten-5' : 'error lighten-5'"
                      class="feedback-card"
                    >
                      <v-card-text>
                        <div class="feedback-content">
                          <v-icon
                            large
                            :color="isCorrect ? 'success' : 'error'"
                            class="mb-4"
                          >
                            {{ isCorrect ? 'mdi-check-circle' : 'mdi-alert-circle' }}
                          </v-icon>
                          <p class="feedback-text">{{ feedbackText }}</p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-slide-y-transition>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <div class="text-center mt-12">
          <v-btn
            x-large
            color="primary"
            elevation="2"
            class="back-btn"
            @click="goBack"
          >
            <v-icon left>mdi-arrow-left-circle</v-icon>
            Back
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Scenario',
  data() {
    return {
      selectedChoice: null,
      hasAnswered: false,
      isCorrect: false,
      feedbackText: '',
      choices: [
        {
          text: 'Immediately tell teachers or parents, and save evidence to report to the platform',
          icon: 'mdi-shield-check',
          correct: true,
          feedback: 'Correct! When encountering cyberbullying, seeking help promptly and preserving evidence is the best choice. Teachers and parents can provide support, while the platform can take appropriate measures.'
        },
        {
          text: 'Retaliate in the same way',
          icon: 'mdi-account-alert',
          correct: false,
          feedback: 'This is not the right solution. Fighting back with the same behavior will only make the situation worse and may lead to a more serious cycle of cyber violence.'
        }
      ]
    }
  },
  methods: {
    selectChoice(index) {
      this.selectedChoice = index
      this.hasAnswered = true
      this.isCorrect = this.choices[index].correct
      this.feedbackText = this.choices[index].feedback
    },
    getChoiceColor(index) {
      if (!this.hasAnswered) return 'white'
      if (this.selectedChoice === index) {
        return this.choices[index].correct ? 'success lighten-5' : 'error lighten-5'
      }
      return 'white'
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.scenario-flow {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.scene-container {
  position: relative;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  min-height: 600px;
}

.scene-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.scene-number {
  background: #1976D2;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.scene-title {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.scene-body {
  max-width: 400px;
  margin: 0 auto;
}

.message-bubble {
  padding: 12px 20px;
  border-radius: 20px;
  margin: 8px 0;
  max-width: 80%;
  animation: fadeIn 0.5s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.message-bubble.left {
  background: #E3F2FD;
  color: #1565C0;
  margin-right: auto;
  border-bottom-left-radius: 4px;
}

.message-bubble.right {
  background: #FFE0E0;
  color: #C62828;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.choice-section {
  background: white;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.choice-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.choice-header {
  text-align: center;
}

.choice-title {
  font-size: 1.2rem;
  color: #1976D2;
  font-weight: 500;
  margin-bottom: 1rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.choices-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 0;
}

.choice-btn {
  width: 80% !important;
  max-width: 500px !important;
  min-width: unset !important;
  height: auto !important;
  min-height: 56px !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s ease !important;
  white-space: normal !important;
  text-align: left !important;
}

.choice-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.choice-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.choice-text {
  font-size: 1rem;
  line-height: 1.5;
  color: #424242;
  flex: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  word-wrap: break-word !important;
  white-space: normal !important;
}

.choice-btn.selected {
  transform: scale(1.01);
  font-weight: 500;
}

.feedback-container {
  animation: slideUp 0.3s ease-out;
}

.feedback-card {
  border-radius: 12px;
}

.feedback-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feedback-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-btn {
  margin-top: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1976D2;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #1976D2, #2196F3);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.decorative-line {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #1976D2, #2196F3);
  margin: 1rem auto;
  border-radius: 2px;
}

.intro-text {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.progress-bar-container {
  padding: 20px 40px;
  position: relative;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  max-width: 400px;
  margin: 0 auto;
}

.step {
  display: flex;
  align-items: center;
  position: relative;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.step.active .step-number {
  border-color: #1976D2;
  color: #1976D2;
  background: #E3F2FD;
}

.step.completed .step-number {
  background: #1976D2;
  border-color: #1976D2;
  color: white;
}

.progress-line {
  position: absolute;
  top: 34px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 3px;
  background: #e0e0e0;
  border-radius: 2px;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #1976D2;
  border-radius: 2px;
  transition: width 0.5s ease;
}
</style>
<template>
  <div class="quiz-page">
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
    <div class="decoration-circle circle-3"></div>
    <div class="decoration-circle circle-4"></div>
    
    <div class="quiz-header">
      <h1 class="text-h4 font-weight-bold mb-2">Test Your Cybersecurity Awareness</h1>
      <p class="text-subtitle-1 text-grey-darken-1 mb-8">Can you identify safe online behaviors?</p>
    </div>

    <v-card class="question-card mb-6">
      <v-card-text>
        <div class="question-number mb-4">
          <v-icon color="#7c3aed" class="mr-2">mdi-numeric-1-circle</v-icon>
          <span class="text-subtitle-1 font-weight-medium">Cyberbullying Recognition</span>
        </div>
        
        <p class="text-h6 mb-6">If you notice a classmate being criticized and mocked on social media, what's the most appropriate action to take?</p>
        
        <v-radio-group v-model="selectedAnswer" class="mt-4">
          <v-radio
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :label="option"
            :value="index"
            color="#7c3aed"
            class="mb-4"
          ></v-radio>
        </v-radio-group>

        <div v-if="showFeedback" :class="['feedback-box', feedbackType]">
          <v-icon :color="feedbackType === 'correct' ? 'success' : 'error'" class="mr-2">
            {{ feedbackType === 'correct' ? 'mdi-check-circle' : 'mdi-alert-circle' }}
          </v-icon>
          <span>{{ feedbackMessage }}</span>
        </div>
      </v-card-text>
    </v-card>

    <div class="d-flex justify-end">
      <v-btn
        color="#7c3aed"
        size="large"
        class="px-6"
        @click="checkAnswer"
      >
        Check Answer
        <v-icon right class="ml-2">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionView',
  data() {
    return {
      selectedAnswer: null,
      showFeedback: false,
      feedbackType: '',
      feedbackMessage: '',
      currentQuestion: {
        options: [
          'Forward the critical content to raise more awareness',
          'Privately inform teachers or parents to seek help',
          'Reply in the comments section to stop this behavior',
          'Save evidence and encourage the victim to report these behaviors'
        ]
      }
    }
  },
  methods: {
    checkAnswer() {
      this.showFeedback = true
      if (this.selectedAnswer === 3) {
        this.feedbackType = 'correct'
        this.feedbackMessage = 'Correct! Preserving evidence and encouraging reporting is the best way to handle cyberbullying. This helps ensure the victim receives appropriate support and protection.'
      } else {
        this.feedbackType = 'incorrect'
        this.feedbackMessage = 'Think again. When dealing with cyberbullying, the most important thing is to protect the victim and seek help through proper channels.'
      }
    }
  }
}
</script>

<style scoped>
.quiz-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  min-height: calc(100vh - 64px);
  overflow: hidden;
}

.decoration-circle {
  position: fixed;
  border-radius: 50%;
  opacity: 0.1;
  z-index: -1;
}

.circle-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  top: -200px;
  left: -200px;
}

.circle-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(45deg, #3b82f6, #6366f1);
  top: 20%;
  right: -100px;
}

.circle-3 {
  width: 700px;
  height: 700px;
  background: linear-gradient(45deg, #8b5cf6, #6366f1);
  bottom: -300px;
  right: -200px;
}

.circle-4 {
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, #6366f1, #3b82f6);
  bottom: 10%;
  left: -100px;
}

.quiz-header {
  text-align: center;
  margin-bottom: 3rem;
}

.question-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.question-number {
  display: flex;
  align-items: center;
  color: #7c3aed;
}

.feedback-box {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.feedback-box.correct {
  background-color: rgba(34, 197, 94, 0.1);
  color: #15803d;
}

.feedback-box.incorrect {
  background-color: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
}

.v-radio {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem !important;
  transition: all 0.3s ease;
}

.v-radio:hover {
  background: #f1f5f9;
  transform: translateX(4px);
}
</style> 
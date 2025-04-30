<template>
  <v-card class="scenario-quiz-card" flat>
    <v-card-text class="question-container">
      <p class="quiz-question">{{ question }}</p>
    </v-card-text>
    
    <v-card-text v-if="scenarioImage" class="text-center mb-4">
      <v-img
        :src="scenarioImage"
        max-height="350"
        contain
        class="scenario-image mx-auto"
      ></v-img>
    </v-card-text>
    
    <v-card-text class="px-4 pb-0">
      <div class="choices-grid px-4">
        <v-btn
          v-for="(choice, index) in choices"
          :key="index"
          color="success"
          :class="['choice-btn', {'selected': selectedChoice === index}]"
          :disabled="hasAnswered"
          @click="selectChoice(index)"
          block
          class="mb-3"
        >
          <div class="choice-content">
            <v-icon size="20" class="mr-3">{{ choice.icon }}</v-icon>
            <span class="choice-text">{{ choice.text }}</span>
          </div>
        </v-btn>
      </div>
    </v-card-text>

    <v-slide-y-transition>
      <div v-if="hasAnswered" class="feedback-container mt-4">
        <v-card
          :color="isCorrect ? 'success lighten-5' : 'error lighten-5'"
          class="feedback-card"
        >
          <v-card-text>
            <div class="feedback-content">
              <v-icon
                large
                :color="isCorrect ? 'success' : 'error'"
                class="mb-2"
              >
                {{ isCorrect ? 'mdi-check-circle' : 'mdi-alert-circle' }}
              </v-icon>
              <p class="feedback-text">{{ feedbackText }}</p>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-slide-y-transition>

    <v-card-actions class="mt-6 mb-4 px-4">
      <v-btn
        color="grey lighten-1"
        text
        @click="$emit('back')"
        class="pl-2"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        BACK
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!hasAnswered && !skipValidation"
        @click="$emit('next')"
        class="pr-2"
      >
        SUBMIT
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ScenarioQuizCard',
  props: {
    question: {
      type: String,
      required: true
    },
    choices: {
      type: Array,
      required: true
    },
    scenarioImage: {
      type: String,
      default: null
    },
    skipValidation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedChoice: null,
      hasAnswered: false,
      isCorrect: false,
      feedbackText: ''
    }
  },
  methods: {
    selectChoice(index) {
      this.selectedChoice = index;
      this.hasAnswered = true;
      this.isCorrect = this.choices[index].correct;
      this.feedbackText = this.choices[index].feedback;
      this.$emit('choice-selected', {
        index,
        isCorrect: this.isCorrect
      });
    },
    reset() {
      this.selectedChoice = null;
      this.hasAnswered = false;
      this.isCorrect = false;
      this.feedbackText = '';
    }
  }
}
</script>

<style scoped>
.scenario-quiz-card {
  border-radius: 0;
  box-shadow: none !important;
  background: transparent;
}

.question-container {
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  margin-bottom: 20px;
}

.quiz-question {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  text-align: center;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.scenario-image {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.choices-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .choices-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.choice-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  height: auto !important;
  min-height: 58px !important;
  padding: 12px 20px !important;
  background-color: #e0e0e0 !important;
  border-radius: 4px !important;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 12px !important;
}

.choice-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.choice-btn.selected {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.choice-content {
  display: flex;
  align-items: flex-start;
  text-align: left;
  width: 100%;
}

.choice-text {
  font-size: 0.95rem;
  line-height: 1.4;
  color: white;
  font-weight: 400;
  word-wrap: break-word;
  white-space: normal;
}

.feedback-container {
  padding: 0 16px;
}

.feedback-card {
  border-radius: 8px;
}

.feedback-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feedback-text {
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}
</style>
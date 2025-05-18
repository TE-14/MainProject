<template>
  <div class="checklist-container">
    <div class="safety-check-container">
      <!-- Header -->
      <div class="page-header">
        <div class="decorative-icon decorative-icon-1">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.2"/>
            <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="decorative-icon decorative-icon-2">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.2"/>
            <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="page-title">Online Safety Checklist</h1>
        <p class="page-subtitle">Take a moment to assess your digital safety practices and receive personalized recommendations to enhance your online security.</p>
      </div>
      
      <!-- Questionnaire area - shown before submission -->
      <div v-if="!analysisComplete">
        <!-- Mobile View: Original Questionnaire -->
        <v-card v-if="isMobileView" class="input-card mx-auto mb-8" max-width="800" elevation="1">
          <div class="tab-container mb-4">
            <v-btn 
              :class="['tab-btn mr-2', activeTab === 'cybersafety' ? 'tab-btn-active' : '']" 
              @click="setActiveTab('cybersafety')"
              elevation="0"
            >
              Cybersafety
            </v-btn>
            <v-btn 
              :class="['tab-btn mr-2', activeTab === 'cyberbullying' ? 'tab-btn-active' : '']" 
              @click="setActiveTab('cyberbullying')"
              elevation="0"
            >
              Cyberbullying
            </v-btn>
            <v-btn 
              :class="['tab-btn', activeTab === 'grooming' ? 'tab-btn-active' : '']" 
              @click="setActiveTab('grooming')"
              elevation="0"
            >
              Grooming
            </v-btn>
          </div>
          
          <!-- Questionnaire items -->
          <div class="questionnaire-container">
            <div v-if="currentQuestions.length > 0" class="questionnaire-layout">
              <!-- Progress indicator -->
              <div class="progress-container">
                <div class="progress-text">
                  <span>Progress: {{ completionPercentage }}%</span>
                  <span>{{ questionsCompleted }} of {{ totalQuestions }}</span>
                </div>
                <v-progress-linear 
                  color="primary" 
                  :model-value="completionPercentage"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>

              <!-- Questions area -->
              <div class="questions-wrapper">
                <div class="questions-scroll-area">
                  <div 
                    v-for="(question, index) in currentQuestions" 
                    :key="index"
                    :id="`question-${index}`"
                    class="question-item"
                    ref="questionItems"
                  >
                    <div class="question-text">{{ question.text }}</div>
                    <div class="answer-options">
                      <v-radio-group 
                        v-model="responses[`${activeTab}_${index}`]"
                        row
                        @change="updateProgress"
                      >
                        <v-radio 
                          label="Always" 
                          :value="3"
                          color="green"
                        ></v-radio>
                        <v-radio 
                          label="Sometimes" 
                          :value="2"
                          color="orange"
                        ></v-radio>
                        <v-radio 
                          label="Rarely" 
                          :value="1"
                          color="red"
                        ></v-radio>
                        <v-radio 
                          label="Never" 
                          :value="0"
                          color="red-darken-4"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no-questions-message">
              No questions available for this category.
            </div>
          </div>
          
          <!-- Navigation buttons -->
          <div class="navigation-buttons px-4 py-3">
            <v-btn
              v-if="activeTab !== 'cybersafety'"
              text
              prepend-icon="mdi-arrow-left"
              @click="navigateToPreviousTab"
              class="prev-btn"
            >
              Previous
            </v-btn>
            <v-spacer v-if="activeTab !== 'cybersafety'"></v-spacer>
            
            <v-btn
              v-if="activeTab !== 'grooming'"
              color="primary"
              append-icon="mdi-arrow-right"
              @click="navigateToNextTab"
              class="next-btn"
            >
              Next
            </v-btn>
            <v-btn
              v-else
              color="primary"
              @click="submitChecklist"
              :disabled="!allQuestionsAnswered"
              class="submit-btn"
            >
              Submit
            </v-btn>
          </div>
        </v-card>
        
        <!-- Desktop View: Card Stack -->
        <div v-else>
          <CardStack 
            :questions="flattenedQuestions"
            :on-response-update="handleCardResponseUpdate"
            :on-submit="submitChecklist"
          />
        </div>
      </div>
      
      <!-- Results Area - Only shown after submission -->
      <div v-if="analysisComplete">
        <!-- Overall Safety Score -->
        <div class="alert-message mb-6" :class="`safety-score-${overallSafetyLevel}`">
          <div class="d-flex align-center">
            <div class="alert-icon-container mr-4">
              <v-icon 
                size="28" 
                :color="overallSafetyLevel === 'high' ? 'green' : overallSafetyLevel === 'medium' ? 'amber-darken-2' : 'red-darken-2'"
              >
                {{ overallSafetyLevel === 'high' ? 'mdi-shield-check' : overallSafetyLevel === 'medium' ? 'mdi-shield-half-full' : 'mdi-shield-alert' }}
              </v-icon>
            </div>
            <div class="flex-grow-1">
              <div class="alert-title">
                Your Online Safety Score: {{ overallSafetyScore }}%
              </div>
              <div class="alert-description">
                {{ overallSafetyMessage }}
              </div>
              
              <div class="mt-3">
                <v-progress-linear 
                  :color="overallSafetyLevel === 'high' ? 'green' : overallSafetyLevel === 'medium' ? 'amber-darken-2' : 'red-darken-2'" 
                  :model-value="overallSafetyScore"
                  height="8"
                  rounded
                  class="mt-1"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Category Breakdown -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">Category Breakdown</h3>
          <div class="category-breakdown">
            <div v-for="(category, index) in categoryResults" :key="index" class="category-item">
              <div class="category-header">
                <div class="category-name">{{ formatCategoryName(category.name) }}</div>
                <div class="category-score" :class="`score-${getCategoryLevel(category.score)}`">
                  {{ category.score }}%
                </div>
              </div>
              <v-progress-linear 
                :color="getCategoryColor(category.score)"
                :model-value="category.score"
                height="6"
                rounded
                class="mt-1 mb-2"
              ></v-progress-linear>
              <div class="category-message">{{ category.message }}</div>
            </div>
          </div>
        </v-card>
        
        <!-- Improvement Recommendations -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">Recommended Improvements</h3>
          <div class="recommendations-container">
            <div v-for="(category, categoryIndex) in improvementRecommendations" :key="categoryIndex" class="recommendation-category">
              <div class="recommendation-category-title">{{ formatCategoryName(category.name) }}</div>
              <ul class="recommendation-list">
                <li v-for="(item, itemIndex) in category.items" :key="itemIndex" class="recommendation-item">
                  <div class="recommendation-content">
                    <div class="recommendation-icon">
                      <v-icon :color="item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'amber-darken-2' : 'blue'">
                        {{ item.priority === 'high' ? 'mdi-alert-circle' : item.priority === 'medium' ? 'mdi-alert' : 'mdi-information' }}
                      </v-icon>
                    </div>
                    <div class="recommendation-text">
                      <div class="recommendation-title">{{ item.title }}</div>
                      <div class="recommendation-description">{{ item.description }}</div>
                    </div>
                    <div class="recommendation-priority" :class="`priority-${item.priority}`">
                      {{ item.priority === 'high' ? 'Critical' : item.priority === 'medium' ? 'Important' : 'Helpful' }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div v-if="allRecommendationsCount === 0" class="no-recommendations">
              <v-icon color="green" size="36" class="mb-2">mdi-check-circle</v-icon>
              <div class="no-recommendations-title">No Critical Improvements Needed</div>
              <div class="no-recommendations-message">
                Great job! You're following best practices across all categories. Continue maintaining your excellent online safety habits.
              </div>
            </div>
          </div>
        </v-card>
        
        <!-- Strengths -->
        <v-card class="result-card mb-6" elevation="1">
          <h3 class="card-header">Your Online Safety Strengths</h3>
          <ul class="strengths-list">
            <li v-for="(strength, index) in safetyStrengths" :key="index" class="strength-item">
              <div class="strength-icon">
                <v-icon color="green">mdi-check-circle</v-icon>
              </div>
              <div class="strength-content">
                <div class="strength-title">{{ strength.title }}</div>
                <div class="strength-description">{{ strength.description }}</div>
              </div>
            </li>
          </ul>
        </v-card>
        
        <!-- Take Another Assessment -->
        <div class="text-center mb-10">
          <v-btn
            color="primary"
            class="restart-btn"
            @click="resetAssessment"
            rounded
          >
            Take Another Assessment
          </v-btn>
        </div>

        <!-- PDF Download Button -->
        <checklist-p-d-f
          :checklist-data="{
            overallSafetyScore,
            overallSafetyLevel,
            overallSafetyMessage,
            categoryResults,
            improvementRecommendations,
            safetyStrengths
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChecklistPDF from '@/components/ChecklistPDF.vue'
import CardStack from '@/components/CardStack.vue';
// Import the JSON data
import safetyChecklistData from '@/assets/safetyChecklistData.json'

export default {
  name: 'ChecklistView',
  components: {
    ChecklistPDF,
    CardStack
  },
  data() {
    return {
      activeTab: 'cybersafety',
      responses: {},
      analysisComplete: false,
      checklistData: {},
      categoryWeights: {},
      thresholds: {},
      overallSafetyScore: 0,
      overallSafetyLevel: 'medium', // 'high', 'medium', 'low'
      categoryResults: [],
      improvementRecommendations: [],
      safetyStrengths: [],
      currentQuestionIndex: 0,
      observer: null,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    currentQuestions() {
      return this.checklistData[this.activeTab] || [];
    },
    totalQuestions() {
      return Object.values(this.checklistData).reduce((total, questions) => total + questions.length, 0);
    },
    questionsCompleted() {
      return Object.keys(this.responses).length;
    },
    completionPercentage() {
      return Math.round((this.questionsCompleted / this.totalQuestions) * 100);
    },
    allQuestionsAnswered() {
      // Check if all questions have been answered
      const allQuestionsCount = this.totalQuestions;
      const answeredQuestionsCount = Object.keys(this.responses).length;
      return answeredQuestionsCount === allQuestionsCount;
    },
    overallSafetyMessage() {
      // Get message from the JSON data based on overall safety level
      return safetyChecklistData.overall_feedback[this.overallSafetyLevel].message;
    },
    allRecommendationsCount() {
      return this.improvementRecommendations.reduce((total, category) => total + category.items.length, 0);
    },
    isMobileView() {
      return this.windowWidth < 768;
    },
    
    flattenedQuestions() {
      const questions = [];
      Object.entries(this.checklistData).forEach(([categoryId, categoryQuestions]) => {
        categoryQuestions.forEach((question, index) => {
          questions.push({
            id: question.id,
            text: question.text,
            categoryId: categoryId,
            questionIndex: index,
            responseKey: `${categoryId}_${index}`,
            importance: question.importance || 'medium' // Default to medium if not specified
          });
        });
      });
      return questions;
    }
  },
  created() {
    // Initialize data from the JSON file
    this.initializeChecklistData();
  },
  mounted() {
    this.setupIntersectionObserver();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initializeChecklistData() {
      // Transform the JSON data into the format needed by the component
      this.checklistData = safetyChecklistData.categories.reduce((acc, category) => {
        acc[category.id] = category.questions.map(q => ({
          text: q.text,
          id: q.id
        }));
        return acc;
      }, {});
      
      // Extract category weights
      this.categoryWeights = safetyChecklistData.categories.reduce((acc, category) => {
        acc[category.id] = category.weight;
        return acc;
      }, {});
      
      // Load thresholds
      this.thresholds = safetyChecklistData.thresholds;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    updateProgress() {
      // This function is called whenever a response is changed
      // The progress is automatically updated via computed properties
    },
    navigateToNextTab() {
      const tabs = safetyChecklistData.categories.map(category => category.id);
      const currentIndex = tabs.indexOf(this.activeTab);
      if (currentIndex < tabs.length - 1) {
        this.activeTab = tabs[currentIndex + 1];
      }
    },
    navigateToPreviousTab() {
      const tabs = safetyChecklistData.categories.map(category => category.id);
      const currentIndex = tabs.indexOf(this.activeTab);
      if (currentIndex > 0) {
        this.activeTab = tabs[currentIndex - 1];
      }
    },
    submitChecklist() {
      // Process responses and generate results
      this.generateResults();
      this.analysisComplete = true;
      
      // Scroll to top to view results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    resetAssessment() {
      // Reset all data to start over
      this.responses = {};
      this.analysisComplete = false;
      this.activeTab = safetyChecklistData.categories[0].id;
      this.overallSafetyScore = 0;
      this.overallSafetyLevel = 'medium';
      this.categoryResults = [];
      this.improvementRecommendations = [];
      this.safetyStrengths = [];
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    generateResults() {
      // Calculate scores for each category
      const categoryScores = {};
      safetyChecklistData.categories.forEach(category => {
        categoryScores[category.id] = this.calculateCategoryScore(category.id);
      });
      
      // Calculate overall safety score (weighted average)
      this.overallSafetyScore = Math.round(
        Object.entries(categoryScores).reduce((total, [categoryId, score]) => {
          return total + (score * this.categoryWeights[categoryId]);
        }, 0)
      );
      
      // Determine overall safety level based on thresholds
      if (this.overallSafetyScore >= this.thresholds.high) {
        this.overallSafetyLevel = 'high';
      } else if (this.overallSafetyScore >= this.thresholds.medium) {
        this.overallSafetyLevel = 'medium';
      } else {
        this.overallSafetyLevel = 'low';
      }
      
      // Generate category results with messages
      this.categoryResults = safetyChecklistData.categories.map(category => {
        const score = categoryScores[category.id];
        let level = 'low';
        if (score >= this.thresholds.high) {
          level = 'high';
        } else if (score >= this.thresholds.medium) {
          level = 'medium';
        }
        
        return {
          name: category.id,
          score: score,
          message: category.feedback[level].message
        };
      });
      
      // Generate recommendations based on responses
      this.generateRecommendations();
      
      // Generate strengths based on responses
      this.generateStrengths();
    },
    calculateCategoryScore(category) {
      const questions = this.checklistData[category] || [];
      if (questions.length === 0) return 0;
      
      let totalPoints = 0;
      let maxPoints = questions.length * 3; // 3 is the maximum value for "Always"
      
      questions.forEach((question, index) => {
        const responseKey = `${category}_${index}`;
        if (this.responses[responseKey] !== undefined) {
          totalPoints += this.responses[responseKey];
        }
      });
      
      return Math.round((totalPoints / maxPoints) * 100);
    },
    getCategoryLevel(score) {
      if (score >= this.thresholds.high) return 'high';
      if (score >= this.thresholds.medium) return 'medium';
      return 'low';
    },
    getCategoryColor(score) {
      if (score >= this.thresholds.high) return 'green';
      if (score >= this.thresholds.medium) return 'amber-darken-2';
      return 'red-darken-2';
    },
    formatCategoryName(name) {
      // Find category in the data and use its proper name
      const category = safetyChecklistData.categories.find(c => c.id === name);
      return category ? category.name : name.charAt(0).toUpperCase() + name.slice(1);
    },
    generateRecommendations() {
      // Create recommendations based on responses
      this.improvementRecommendations = [];
      
      // Process each category
      safetyChecklistData.categories.forEach(category => {
        const categoryRecs = { name: category.id, items: [] };
        
        // Check each question in the category
        category.questions.forEach((question, index) => {
          const responseValue = this.getResponseValue(category.id, index);
          
          // If response is low (0 or 1), add recommendation
          if (responseValue < 2 && question.recommendations && question.recommendations.low) {
            const rec = question.recommendations.low;
            categoryRecs.items.push({
              title: rec.title,
              description: rec.description,
              priority: rec.priority
            });
          }
        });
        
        // Add category if it has recommendations
        if (categoryRecs.items.length > 0) {
          this.improvementRecommendations.push(categoryRecs);
        }
      });
    },
    generateStrengths() {
      // Create list of strengths based on responses
      this.safetyStrengths = [];
      
      // Process each category
      safetyChecklistData.categories.forEach(category => {
        // Check each question in the category
        category.questions.forEach((question, index) => {
          const responseValue = this.getResponseValue(category.id, index);
          
          // If response is high (3), add as a strength
          if (responseValue === 3 && question.strength) {
            this.safetyStrengths.push({
              title: question.strength.title,
              description: question.strength.description
            });
          }
        });
      });
      
      // If no strengths were added, add a general encouragement
      if (this.safetyStrengths.length === 0) {
        this.safetyStrengths.push({
          title: "Building Your Safety Skills",
          description: "While you're still developing your online safety practices, completing this assessment is an important first step toward improvement."
        });
      }
    },
    getResponseValue(category, questionIndex) {
      const responseKey = `${category}_${questionIndex}`;
      return this.responses[responseKey] !== undefined ? this.responses[responseKey] : 0;
    },
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.id.split('-')[1])
              this.currentQuestionIndex = index
            }
          })
        },
        {
          root: null,
          rootMargin: '-50% 0px',
          threshold: 0
        }
      )

      this.$nextTick(() => {
        if (this.$refs.questionItems) {
          this.$refs.questionItems.forEach(item => {
            this.observer.observe(item)
          })
        }
      })
    },
    scrollToQuestion(index) {
      const element = document.getElementById(`question-${index}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    handleCardResponseUpdate(categoryId, questionIndex, responseValue) {
      // Create the response key in the format used by the original component
      const responseKey = `${categoryId}_${questionIndex}`;
      
      // Convert string values from CardStack to numeric values for ChecklistView
      let numericValue;
      switch(responseValue) {
        case 'always': numericValue = 3; break;
        case 'sometimes': numericValue = 2; break;
        case 'rarely': numericValue = 1; break;
        case 'never': numericValue = 0; break;
        default: numericValue = null;
      }
      
      // Update the responses object in a Vue 3 compatible way
      if (numericValue === null) {
        // If the answer was removed, delete the property
        if (responseKey in this.responses) {
          const newResponses = { ...this.responses };
          delete newResponses[responseKey];
          this.responses = newResponses;
        }
      } else {
        // Otherwise assign the new value
        this.responses = { 
          ...this.responses, 
          [responseKey]: numericValue 
        };
      }
      
      // Optional: update progress tracking
      this.updateProgress();
    }
  }
}
</script>


<style scoped>
.checklist-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 100%);
  position: relative;
  overflow: hidden;
}

.checklist-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
  transform: skewY(-6deg);
  transform-origin: top left;
  width: 100%;
}

.safety-check-container {
  position: relative;
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding: 0 1rem;
}

.page-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.decorative-icon {
  position: absolute;
  width: 120px;
  height: 120px;
  opacity: 0.1;
  pointer-events: none;
  color: white;
}

.decorative-icon-1 {
  top: -60px;
  left: -60px;
  transform: rotate(-15deg);
}

.decorative-icon-2 {
  bottom: -60px;
  right: -60px;
  transform: rotate(15deg);
}

/* Input card styles */
.input-card {
  border-radius: 24px !important;
  overflow: hidden;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
}

.input-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #6366F1, #4F46E5);
}

.tab-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  background: rgba(241, 245, 249, 0.7);
  padding: 8px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.tab-btn {
  border-radius: 12px !important;
  font-weight: 600;
  color: #64748B;
  height: 48px;
  text-transform: none;
  font-size: 15px;
  letter-spacing: 0;
  padding: 0 24px !important;
  min-width: 140px;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
}

.tab-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tab-btn:hover::before {
  opacity: 1;
}

.tab-btn-active {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

/* Progress bar styles */
.progress-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: transparent;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  color: #64748B;
  font-size: 15px;
  margin-bottom: 12px;
  font-weight: 500;
}

.v-progress-linear {
  border-radius: 8px !important;
  height: 10px !important;
  background: rgba(241, 245, 249, 0.5) !important;
}

.v-progress-linear__determinate {
  background: linear-gradient(90deg, #6366F1, #4F46E5) !important;
}

/* Question styles */
.question-item {
  background: white;
  padding: 28px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.question-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #6366F1, #4F46E5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.question-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.question-item:hover::before {
  opacity: 1;
}

.question-text {
  font-weight: 600;
  font-size: 17px;
  line-height: 1.6;
  color: #1E293B;
  margin-bottom: 20px;
  padding-left: 16px;
  position: relative;
}

.question-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366F1, #4F46E5);
}

.answer-options {
  padding: 0 0 0 16px;
}

.answer-options :deep(.v-radio-group) {
  gap: 12px;
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.answer-options :deep(.v-radio) {
  margin: 0 !important;
  height: auto !important;
  background: rgba(241, 245, 249, 0.5);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.answer-options :deep(.v-radio:hover) {
  background: rgba(241, 245, 249, 0.8);
  transform: translateY(-2px);
}

.answer-options :deep(.v-radio--selected) {
  background: #EEF2FF;
  border-color: #6366F1;
}

.answer-options :deep(.v-radio label) {
  font-size: 15px;
  font-weight: 500;
  color: #475569;
}

.answer-options :deep(.v-radio--selected label) {
  color: #4F46E5;
  font-weight: 600;
}

/* Navigation buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  padding: 24px 0 0;
  margin-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.prev-btn {
  color: #64748B !important;
  font-weight: 500;
  padding: 0 24px;
  height: 48px;
  border-radius: 24px !important;
  background: rgba(241, 245, 249, 0.5) !important;
  transition: all 0.3s ease !important;
}

.prev-btn:hover {
  background: rgba(241, 245, 249, 0.8) !important;
  transform: translateX(-2px);
}

.next-btn, .submit-btn {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  min-width: 140px;
  border-radius: 24px !important;
  font-weight: 600;
  height: 48px;
  font-size: 15px;
  letter-spacing: 0;
  padding: 0 28px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
}

.next-btn::before, .submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.next-btn:hover::before, .submit-btn:hover::before {
  opacity: 1;
}

.next-btn:hover, .submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35) !important;
}

.next-btn:active, .submit-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2) !important;
}

.submit-btn:disabled {
  opacity: 0.7;
  background: linear-gradient(135deg, #A5A6F6 0%, #8E8AEC 100%) !important;
  transform: none;
  box-shadow: none !important;
}

/* Results styles */
.alert-message {
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #F8F9FE 0%, #FFFFFF 100%);
  border: none;
  position: relative;
  overflow: hidden;
  max-width: 900px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.safety-score-high {
  background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
  border-left: none;
}

.safety-score-medium {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
  border-left: none;
}

.safety-score-low {
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
  border-left: none;
}

.alert-icon-container {
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.alert-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.alert-description {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.6;
}

.result-card {
  border-radius: 16px !important;
  padding: 0 !important;
  overflow: hidden;
  margin-bottom: 32px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06) !important;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: white;
  max-width: 900px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.card-header {
  padding: 24px 30px;
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin: 0;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
}

/* Category breakdown styles */
.category-breakdown {
  padding: 24px 30px;
  max-width: 800px;
  margin: 0 auto;
}

.category-item {
  margin-bottom: 32px;
  background: #FFFFFF;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.category-item:last-child {
  margin-bottom: 0;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.category-name {
  font-weight: 600;
  font-size: 18px;
  color: #1E293B;
}

.category-score {
  font-weight: 700;
  font-size: 16px;
  padding: 6px 16px;
  border-radius: 20px;
}

.score-high {
  color: #15803D;
  background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
}

.score-medium {
  color: #B45309;
  background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
}

.score-low {
  color: #B91C1C;
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
}

.category-message {
  font-size: 15px;
  color: #4B5563;
  line-height: 1.6;
  margin-top: 12px;
}

/* Recommendations styles */
.recommendations-container {
  padding: 24px 30px;
  max-width: 800px;
  margin: 0 auto;
}

.recommendation-category {
  margin-bottom: 32px;
}

.recommendation-category:last-child {
  margin-bottom: 0;
}

.recommendation-category-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 16px;
  color: #1E293B;
}

.recommendation-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.recommendation-item {
  padding: 20px;
  background: #FFFFFF;
  border-radius: 12px;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recommendation-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.recommendation-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.recommendation-icon {
  flex-shrink: 0;
}

.recommendation-text {
  flex: 1;
}

.recommendation-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
  color: #1E293B;
}

.recommendation-description {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
}

.recommendation-priority {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  white-space: nowrap;
}

.priority-high {
  background: linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%);
  color: #B91C1C;
}

.priority-medium {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%);
  color: #B45309;
}

.priority-low {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  color: #0C4A6E;
}

/* Strengths styles */
.strengths-list {
  list-style-type: none;
  padding: 24px 30px;
  margin: 0 auto;
  max-width: 800px;
}

.strength-item {
  display: flex;
  margin-bottom: 24px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.strength-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.strength-item:last-child {
  margin-bottom: 0;
}

.strength-icon {
  margin-right: 20px;
  flex-shrink: 0;
}

.strength-content {
  flex: 1;
}

.strength-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
  color: #15803D;
}

.strength-description {
  font-size: 15px;
  color: #4B5563;
  line-height: 1.6;
}

.no-recommendations {
  text-align: center;
  padding: 40px 0;
}

.no-recommendations-title {
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0;
  color: #15803D;
}

.no-recommendations-message {
  font-size: 15px;
  color: #4B5563;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

.restart-btn {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  font-weight: 500;
  min-width: 220px;
  height: 52px;
  letter-spacing: 0;
  text-transform: none;
  font-size: 16px;
  border-radius: 26px !important;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(99, 102, 241, 0.35) !important;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .checklist-container::before {
    height: 300px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .input-card {
    padding: 20px;
    border-radius: 20px !important;
  }

  .tab-container {
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }

  .tab-btn {
    width: 100%;
    height: 44px;
    font-size: 14px;
  }

  .progress-container {
    padding: 20px;
    margin-bottom: 24px;
  }

  .question-item {
    padding: 20px;
    margin-bottom: 20px;
  }

  .question-text {
    font-size: 16px;
    padding-left: 12px;
  }

  .answer-options {
    padding-left: 12px;
  }

  .answer-options :deep(.v-radio-group) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .answer-options :deep(.v-radio) {
    padding: 12px;
  }

  .navigation-buttons {
    padding-top: 20px;
    margin-top: 24px;
  }

  .next-btn, .submit-btn, .prev-btn {
    height: 44px;
    font-size: 14px;
    min-width: 120px;
    padding: 0 20px;
  }

  .decorative-icon {
    width: 80px;
    height: 80px;
  }

  .decorative-icon-1 {
    top: -40px;
    left: -40px;
  }

  .decorative-icon-2 {
    bottom: -40px;
    right: -40px;
  }
}

.questionnaire-container {
  width: 100%;
  max-width: 100%;
  padding: 0;
}

.questionnaire-layout {
  background: white;
  margin: 0;
  border-radius: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.questions-wrapper {
  position: relative;
  height: 500px;
  background: linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%);
}

.questions-scroll-area {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.questions-scroll-area::-webkit-scrollbar {
  width: 6px;
}

.questions-scroll-area::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.questions-scroll-area::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

.questions-scroll-area::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

.question-item {
  background: white;
  padding: 28px;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.question-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #6366F1, #4F46E5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.question-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.question-item:hover::before {
  opacity: 1;
}

.question-text {
  font-weight: 600;
  font-size: 17px;
  line-height: 1.6;
  color: #1E293B;
  margin-bottom: 20px;
  padding-left: 16px;
  position: relative;
}

.question-text::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366F1, #4F46E5);
}

.answer-options {
  padding: 0 0 0 16px;
}

.answer-options :deep(.v-radio-group) {
  gap: 12px;
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.answer-options :deep(.v-radio) {
  margin: 0 !important;
  height: auto !important;
  background: rgba(241, 245, 249, 0.5);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.answer-options :deep(.v-radio:hover) {
  background: rgba(241, 245, 249, 0.8);
  transform: translateY(-2px);
}

.answer-options :deep(.v-radio--selected) {
  background: #EEF2FF;
  border-color: #6366F1;
}

.answer-options :deep(.v-radio label) {
  font-size: 15px;
  font-weight: 500;
  color: #475569;
}

.answer-options :deep(.v-radio--selected label) {
  color: #4F46E5;
  font-weight: 600;
}

@media (max-width: 768px) {
  .questions-wrapper {
    height: 400px;
  }

  .question-item {
    padding: 20px;
    margin-bottom: 16px;
  }

  .answer-options :deep(.v-radio-group) {
    grid-template-columns: 1fr;
  }

  .answer-options :deep(.v-radio) {
    padding: 12px;
  }

  .progress-container,
  .questions-scroll-area {
    padding: 16px;
  }

  .progress-text {
    font-size: 14px;
  }
}
</style> 

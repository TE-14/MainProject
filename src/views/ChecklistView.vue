<template>
  <div class="global-container">
    <div class="safety-check-container">
      <!-- Header -->
      <h1 class="text-h3 font-weight-bold text-center mb-2">Online Safety Checklist</h1>
      <p class="text-subtitle-1 text-center text-medium-emphasis mb-5">Assess your digital safety practices</p>
      
      <!-- Questionnaire area - shown before submission -->
      <div v-if="!analysisComplete">
        <v-card class="input-card mx-auto mb-8" max-width="800" elevation="1">
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
          
          <!-- Progress indicator -->
          <div class="progress-container px-4 mb-4">
            <div class="progress-text mb-1">
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
          
          <!-- Questionnaire items -->
          <div class="questionnaire-container">
            <div v-if="currentQuestions.length > 0">
              <div 
                v-for="(question, index) in currentQuestions" 
                :key="index"
                class="question-item"
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
      </div>
    </div>
  </div>
</template>

<script>
// Import the JSON data
import safetyChecklistData from '@/assets/safetyChecklistData.json'

export default {
  name: 'ChecklistView',
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
      safetyStrengths: []
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
    }
  },
  created() {
    // Initialize data from the JSON file
    this.initializeChecklistData();
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
    }
  }
}
</script>


<style scoped>
.safety-check-container {
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
}

/* Input card styles */
.input-card {
  border-radius: 12px !important;
  overflow: hidden;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.tab-container {
  display: flex;
  justify-content: flex-start;
}

.tab-btn {
  border-radius: 10px !important;
  font-weight: 500;
  color: #4b5563;
  height: 40px;
  text-transform: none;
  font-size: 14px;
  letter-spacing: 0;
}

.tab-btn-active {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
}

/* Progress bar styles */
.progress-container {
  margin-bottom: 16px;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6B7280;
}

/* Questionnaire styles */
.questionnaire-container {
  padding: 0 20px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
}

.question-item {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.question-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.question-text {
  font-weight: 500;
  margin-bottom: 12px;
  color: #111827;
}

.answer-options {
  padding-left: 8px;
}

.no-questions-message {
  padding: 24px;
  text-align: center;
  color: #6B7280;
}

/* Navigation buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.prev-btn {
  color: #6B7280;
}

.next-btn, .submit-btn {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  min-width: 120px;
  border-radius: 8px !important;
}

/* Results styles */
.alert-message {
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.safety-score-high {
  background-color: #F0FDF4;
  border-left: 4px solid #22C55E;
}

.safety-score-medium {
  background-color: #FFF7E0;
  border-left: 4px solid #F59E0B;
}

.safety-score-low {
  background-color: #FEE2E2;
  border-left: 4px solid #EF4444;
}

.alert-icon-container {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.alert-description {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
}

.result-card {
  border-radius: 12px !important;
  padding: 0 !important;
  overflow: hidden;
  margin-bottom: 24px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
}

.card-header {
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin: 0;
  background-color: rgba(249, 250, 251, 0.5);
}

/* Category breakdown styles */
.category-breakdown {
  padding: 16px 20px;
}

.category-item {
  margin-bottom: 24px;
}

.category-item:last-child {
  margin-bottom: 0;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.category-name {
  font-weight: 600;
  font-size: 16px;
  color: #374151;
}

.category-score {
  font-weight: 700;
  font-size: 16px;
  padding: 2px 10px;
  border-radius: 4px;
}

.score-high {
  color: #16A34A;
  background-color: #DCFCE7;
}

.score-medium {
  color: #D97706;
  background-color: #FEF3C7;
}

.score-low {
  color: #DC2626;
  background-color: #FEE2E2;
}

.category-message {
  font-size: 14px;
  color: #4B5563;
  margin-top: 8px;
}

/* Recommendations styles */
.recommendations-container {
  padding: 16px 20px;
}

.recommendation-category {
  margin-bottom: 24px;
}

.recommendation-category:last-child {
  margin-bottom: 0;
}

.recommendation-category-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
  color: #374151;
}

.recommendation-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.recommendation-item {
  padding: 12px 16px;
  background-color: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;
  border-left: 3px solid transparent;
}

.recommendation-item:last-child {
  margin-bottom: 0;
}

.recommendation-content {
  display: flex;
  align-items: flex-start;
}

.recommendation-icon {
  margin-right: 12px;
  margin-top: 2px;
}

.recommendation-text {
  flex: 1;
}

.recommendation-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: #111827;
}

.recommendation-description {
  font-size: 13px;
  color: #4B5563;
  line-height: 1.4;
}

.recommendation-priority {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 12px;
  white-space: nowrap;
}

.priority-high {
  background-color: #FEE2E2;
  color: #B91C1C;
}

.priority-medium {
  background-color: #FEF3C7;
  color: #B45309;
}

.priority-low {
  background-color: #DBEAFE;
  color: #1E40AF;
}

/* Strengths styles */
.strengths-list {
  list-style-type: none;
  padding: 16px 20px;
  margin: 0;
}

.strength-item {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.strength-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.strength-icon {
  margin-right: 16px;
  margin-top: 2px;
}

.strength-content {
  flex: 1;
}

.strength-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  color: #15803D;
}

.strength-description {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
}

.no-recommendations {
  text-align: center;
  padding: 32px 0;
}

.no-recommendations-title {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0;
  color: #15803D;
}

.no-recommendations-message {
  font-size: 14px;
  color: #4B5563;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.5;
}

.restart-btn {
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
  color: white !important;
  font-weight: 500;
  min-width: 200px;
  height: 48px;
  letter-spacing: 0;
  text-transform: none;
  font-size: 14px;
  border-radius: 24px !important;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(99, 102, 241, 0.35) !important;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .safety-check-container {
    padding: 1rem 0;
  }
  
  .tab-container {
    flex-direction: column;
    width: 100%;
  }
  
  .tab-btn {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-right: 0 !important;
  }
  
  .input-card,
  .result-card {
    border-radius: 8px !important;
  }
  
  .input-card {
    padding: 16px;
  }
  
  .card-header {
    padding: 12px 16px;
  }
  
  .category-breakdown,
  .recommendations-container,
  .strengths-list {
    padding: 12px 16px;
  }
  
  .recommendation-item {
    padding: 10px 12px;
  }
  
  .recommendation-content {
    flex-direction: column;
  }
  
  .recommendation-priority {
    margin-left: 0;
    margin-top: 8px;
    display: inline-block;
  }
  
  .alert-message {
    padding: 16px;
  }
  
  .restart-btn {
    min-width: 180px;
  }
}
</style> 
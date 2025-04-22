<template>
  <v-container class="py-8" fluid>
    <v-row>
      <v-col cols="12">
        <div class="page-header text-center mb-8">
          <h1 class="main-title">Grooming Scenario Simulation</h1>
          <div class="decorative-line"></div>
          <p class="intro-text mt-4">
            <v-icon color="info" small class="mr-2">mdi-information</v-icon>
            Through real-world scenario simulations, let's understand how grooming can occur. Let's learn how to protect ourselves and others in various situations.
          </p>
        </div>

        <!-- Loading State -->
        <v-card class="scenario-flow mx-auto" max-width="1400" outlined v-if="isLoading">
          <div class="d-flex justify-center align-center" style="height: 300px;">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            ></v-progress-circular>
          </div>
        </v-card>
        
        <!-- Error State -->
        <v-card class="scenario-flow mx-auto" max-width="1400" outlined v-else-if="error">
          <div class="d-flex justify-center align-center flex-column" style="height: 300px;">
            <v-icon color="error" x-large>mdi-alert-circle</v-icon>
            <p class="mt-4 text-center">{{ error }}</p>
            <v-btn color="primary" @click="loadScenario('grooming-scenario')" class="mt-4">
              Try Again
            </v-btn>
          </div>
        </v-card>

        <v-card class="scenario-flow mx-auto" max-width="1400" outlined v-if="!isLoading && scenario">
          <!-- Header Bar with Scenario Number and Counter -->
          <div class="scenario-header-bar">
            <div class="scenario-label">Scenario 1</div>
            <div class="scenario-counter">{{ currentPartIndex + 1 }}/{{ totalParts }}</div>
          </div>

          <!-- Narrative Card -->
          <div v-if="currentPart && currentPart.type === 'narrative'" class="scenario-card-container">
            <v-row>
              <!-- Content Area -->
              <v-col cols="12" class="mt-4 px-8 pb-0">
                <!-- Narrative Text Above Image (if present) -->
                <div v-if="currentPart.narrativeText" class="narrative-text mb-4">
                  {{ currentPart.narrativeText }}
                </div>
                
                <!-- Main Image -->
                <div class="scenario-image-container text-center">
                  <v-img
                    :src="resolveImagePath(currentPart.image)"
                    :alt="currentPart.imageAlt"
                    max-height="500"
                    contain
                    class="scenario-main-image mx-auto"
                  ></v-img>
                  <p v-if="currentPart.imageCaption" class="scenario-image-caption mt-3">
                    {{ currentPart.imageCaption }}
                  </p>
                </div>
              </v-col>

              <!-- Navigation Controls -->
              <v-col cols="12" class="text-center pb-6 pt-4">
                <v-btn
                  color="grey lighten-1"
                  text
                  @click="goToPreviousPart"
                  :disabled="currentPartIndex === 0"
                  class="mr-4"
                >
                  <v-icon left>mdi-arrow-left</v-icon>
                  BACK
                </v-btn>
                <v-btn
                  color="primary"
                  @click="goToNextPart"
                >
                  NEXT
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- Action Card -->
          <div v-else-if="currentPart && currentPart.type === 'action'" class="scenario-card-container">
            <v-row>
              <!-- Content Area -->
              <v-col cols="12" class="mt-4 px-8 pb-0">
                <!-- Narrative Text Above Image (if present) -->
                <div v-if="currentPart.narrativeText" class="narrative-text mb-4">
                  {{ currentPart.narrativeText }}
                </div>
                
                <!-- Main Image -->
                <div class="scenario-image-container text-center">
                  <v-img
                    :src="resolveImagePath(currentPart.image)"
                    :alt="currentPart.imageAlt"
                    max-height="500"
                    contain
                    class="scenario-main-image mx-auto"
                  ></v-img>
                  <p v-if="currentPart.imageCaption" class="scenario-image-caption mt-3">
                    {{ currentPart.imageCaption }}
                  </p>
                </div>
              </v-col>

              <!-- Quiz Section -->
              <v-col cols="12" md="10" lg="8" class="mx-auto pt-4">
                <ScenarioQuizCard
                  :key="`part-${currentPartIndex}`"
                  :question="currentPart.question"
                  :choices="currentPart.choices"
                  :scenarioImage="null"
                  @choice-selected="handleChoiceSelected"
                  @next="goToNextPart"
                  @back="goToPreviousPart"
                />
              </v-col>
            </v-row>
          </div>

          <!-- End Card -->
          <div v-else-if="currentPart && currentPart.type === 'end'" class="scenario-card-container">
            <v-row>
              <!-- Content Area -->
              <v-col cols="12" class="mt-4 px-8 pb-4">
                <div class="end-card-content text-center">
                  <!-- Title -->
                  <h2 class="end-card-title mb-4">{{ currentPart.title }}</h2>
                  
                  <!-- Main Image (if present) -->
                  <div v-if="currentPart.image" class="scenario-image-container text-center mb-4">
                    <v-img
                      :src="resolveImagePath(currentPart.image)"
                      :alt="currentPart.imageAlt || 'Scenario completed'"
                      max-height="400"
                      contain
                      class="scenario-main-image mx-auto"
                    ></v-img>
                  </div>
                  
                  <!-- Narrative Text -->
                  <div v-if="currentPart.narrativeText" class="end-narrative-text mb-5">
                    {{ currentPart.narrativeText }}
                  </div>
                  
                  <!-- Completion Message -->
                  <v-card class="end-message-card mx-auto mb-5" max-width="800" elevation="2">
                    <v-card-text class="pa-5">
                      <p class="end-message">{{ currentPart.message }}</p>
                    </v-card-text>
                  </v-card>
                  
                  <!-- Statistics (if present) -->
                  <div v-if="currentPart.statistics" class="statistics-container mb-6">
                    <v-chip color="success" class="ma-2 pa-4" large>
                      <v-icon left>mdi-check-circle</v-icon>
                      {{ currentPart.statistics.correctAnswers }} / {{ currentPart.statistics.totalQuestions }} Correct Answers
                    </v-chip>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="end-actions">
                    <v-btn
                      color="primary"
                      large
                      class="mr-4"
                      @click="restartScenario"
                    >
                      <v-icon left>mdi-restart</v-icon>
                      Try Again
                    </v-btn>
                    <v-btn
                      color="secondary"
                      large
                      @click="goToResourcesSelection"
                    >
                      <v-icon left>mdi-view-grid</v-icon>
                      Back to Resources
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScenarioQuizCard from '@/assets/ScenarioQuizCard.vue';
// Import the scenario service
import { loadScenario, getHardcodedScenario } from '@/assets/scenarioLoader';

// Import images directly 
import scenario2Image1 from '@/assets/images/chris_rl1.jpg';
import scenario2Text1 from '@/assets/images/gr_tc1.jpg';
import scenario2Image2 from '@/assets/images/chris_rl2.jpg';
import scenario2Text2 from '@/assets/images/gr_tc2.jpg';
import scenario2Image3 from '@/assets/images/joash_rl1.jpg';
import scenario2Text3 from '@/assets/images/gr_tc3.jpg';
import scenario2Image4 from '@/assets/images/chris_rl3.jpg';
import scenario2Image5 from '@/assets/images/chris_rl4.jpg';
import end_card from '@/assets/images/end_card.jpg';
// Add any other images you need for your scenarios

// Image map for resolving paths
const imageMap = {
  'chris_rl1.jpg': scenario2Image1 ,
  'gr_tc1.jpg': scenario2Text1,
  'chris_rl2.jpg': scenario2Image2,
  'gr_tc2.jpg': scenario2Text2,
  'joash_rl1.jpg': scenario2Image3,
  'gr_tc3.jpg': scenario2Text3,
  'chris_rl3.jpg': scenario2Image4,
  'chris_rl4.jpg': scenario2Image5,
  'end_card.jpg': end_card
};

export default {
  name: 'Scenario',
  components: {
    ScenarioQuizCard
  },
  data() {
    return {
      currentStep: 1,
      currentPartIndex: 0,
      scenario: null,
      isLoading: true,
      error: null,
      userResponses: [], // Track user responses
      correctAnswers: 0 // Track correct answers
    };
  },
  computed: {
    currentPart() {
      if (!this.scenario || !this.scenario.parts || this.scenario.parts.length === 0) {
        return null;
      }
      return this.scenario.parts[this.currentPartIndex];
    },
    totalParts() {
      if (!this.scenario || !this.scenario.parts) {
        return 0;
      }
      return this.scenario.parts.length;
    }
  },
  methods: {
    // Helper method to resolve image paths
    resolveImagePath(imagePath) {
      if (!imagePath) return '';
      
      // If it's just a filename, check our image map
      const filename = imagePath.split('/').pop();
      if (imageMap[filename]) {
        return imageMap[filename];
      }
      
      // Otherwise return the path as is
      return imagePath;
    },
    
    async loadScenario(scenarioId) {
      try {
        this.isLoading = true;
        this.userResponses = [];
        this.correctAnswers = 0;
        
        try {
          // Try to load from API first
          this.scenario = await loadScenario(scenarioId);
        } catch (error) {
          // Fall back to hardcoded scenario if API fails
          console.log('API loading failed, using hardcoded data:', error);
          this.scenario = getHardcodedScenario(scenarioId);
          
          if (!this.scenario) {
            throw new Error(`Scenario "${scenarioId}" not found`);
          }
        }
        
        this.currentPartIndex = 0;
        this.isLoading = false;
      } catch (error) {
        console.error('Error loading scenario:', error);
        this.error = 'Failed to load scenario. Please try again.';
        this.isLoading = false;
      }
    },
    
    handleChoiceSelected(data) {
      // Track the user's choice
      this.userResponses.push({
        partIndex: this.currentPartIndex,
        choiceIndex: data.index,
        isCorrect: data.isCorrect
      });
      
      if (data.isCorrect) {
        this.correctAnswers++;
      }
      
      // Update the end card statistics here
      if (this.scenario.parts) {
        const endCardIndex = this.scenario.parts.findIndex(part => part.type === 'end');
        if (endCardIndex !== -1 && this.scenario.parts[endCardIndex].statistics) {
          this.scenario.parts[endCardIndex].statistics.correctAnswers = this.correctAnswers;
        }
      }
    },
    
    goToNextPart() {
      if (this.currentPartIndex < this.totalParts - 1) {
        this.currentPartIndex++;
        // Scroll to top when changing parts
        window.scrollTo(0, 0);
      }
    },
    
    goToPreviousPart() {
      if (this.currentPartIndex > 0) {
        this.currentPartIndex--;
        // Scroll to top when changing parts
        window.scrollTo(0, 0);
      }
    },
    
    restartScenario() {
      // Reset to the beginning of this scenario
      this.currentPartIndex = 0;
      this.userResponses = [];
      this.correctAnswers = 0;
      
      // Reset end card statistics
      if (this.scenario.parts) {
        const endCardIndex = this.scenario.parts.findIndex(part => part.type === 'end');
        if (endCardIndex !== -1 && this.scenario.parts[endCardIndex].statistics) {
          this.scenario.parts[endCardIndex].statistics.correctAnswers = 0;
        }
      }
      
      // Scroll to top
      window.scrollTo(0, 0);
    },
    
    goToResourcesSelection() {
      // Navigate to the resources selection page
      this.$router.push('/learning-hub');
    }
  },
  created() {
    // Load the first scenario when the component is created
    this.loadScenario('scenario2');
  }
}
</script>

<style scoped>
.scenario-flow {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.scenario-card-container {
  padding-bottom: 20px;
}

.narrative-text {
  max-width: 800px;
  margin: 0 auto 24px auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  text-align: center;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.scenario-image-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.scenario-main-image {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.scenario-image-caption {
  font-size: 1rem;
  font-style: italic;
  color: #555;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.scenario-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00A86B;
  color: white;
  width: 100%;
  padding: 12px 20px;
}

.scenario-label {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.scenario-counter {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

/* End Card Styles */
.end-card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.end-narrative-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.end-message-card {
  background-color: #E8F5E9;
  border-radius: 8px;
}

.end-message {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #388E3C;
  margin: 0;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

/* Other styles remain the same */
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
</style>

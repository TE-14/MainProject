<template>
    <div class="swipe-container">
      <!-- Large directional arrows -->
      <div class="directional-arrows">
        <div class="arrow arrow-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"></path>
            </svg>
            <span class="arrow-label">CYBERBULLYING</span>
        </div>
        <div class="arrow arrow-right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"></path>
            </svg>
            <span class="arrow-label">HEALTHY</span>
        </div>
        </div>
  
      <div v-if="cards.length === 0" class="results-container">
        <h2 class="results-title">All messages reviewed!</h2>
        <div class="score-container">
          <div class="score">
            <span class="score-label">Correct Responses:</span>
            <span class="score-value">{{ correctSwipes }}</span>
          </div>
          <div class="score">
            <span class="score-label">Total Messages:</span>
            <span class="score-value">{{ totalCards }}</span>
          </div>
          <div class="score">
            <span class="score-label">Accuracy:</span>
            <span class="score-value">{{ accuracyPercentage }}%</span>
          </div>
        </div>
      </div>
  
      <div class="card-container">
        <SwipeCard
          v-if="currentCard"
          :key="cardKey"
          @swiped="handleSwipe"
          @removed="removeTopCard"
          class="swipe-card"
          :class="{'cover-card': currentCard.type === 'cover'}"
        >
          <div class="card-content">
            <!-- Cover card content -->
            <div v-if="currentCard.type === 'cover'" class="cover-content">
            <h1>{{ currentCard.title }}</h1>
            <p>{{ currentCard.description }}</p>
            
            <!-- Added visual indicators for swipe directions -->
            <div class="swipe-directions">
                <div class="swipe-direction">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 18l-6-6 6-6"></path>
                </svg>
                <span class="swipe-direction-label swipe-direction-red">CYBERBULLYING</span>
                </div>
                <div class="swipe-direction">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18l6-6-6-6"></path>
                </svg>
                <span class="swipe-direction-label swipe-direction-green">HEALTHY</span>
                </div>
            </div>
            
            <div class="swipe-instruction">
                <span>Swipe to start</span>
                <i class="arrow-icon">→</i>
            </div>
            </div>
            
            <!-- Regular conversation card content -->
            <InteractiveTextMessageChatWithWllama 
              v-else
              :initialConversation="currentCard"
              :useWllama="useWllama"
              :aiPersonality="aiPersonality"
              :showModelStatus="showModelStatus"
              :useCardSpecificPersonas="useCardSpecificPersonas"
              @response-selected="handleResponseSelected"
            />
          </div>
        </SwipeCard>
      </div>
      
      <!-- Settings panel (can be toggled or hidden based on your UI) -->
      <div class="settings-panel">
        <div class="setting-item">
          <input type="checkbox" id="use-wllama" v-model="useWllama">
          <label for="use-wllama">Use AI Responses</label>
        </div>
        <div v-if="useWllama" class="setting-item">
          <input type="checkbox" id="use-card-specific-personas" v-model="useCardSpecificPersonas" checked>
          <label for="use-card-specific-personas">Use Character-Specific Personalities</label>
        </div>
        <div v-if="useWllama && !useCardSpecificPersonas" class="setting-item">
          <label for="ai-personality">Override Personality:</label>
          <select id="ai-personality" v-model="aiPersonality">
            <option value="kenny">Kenny (Anime Bully)</option>
            <option value="whaleed">Whaleed (Racist Bully)</option>
            <option value="mallory">Mallory (Sophisticated Bully)</option>
            <option value="helpful">Educational Advisor</option>
          </select>
        </div>
        <div v-if="useWllama" class="setting-item">
          <input type="checkbox" id="show-model-status" v-model="showModelStatus">
          <label for="show-model-status">Show Model Status</label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SwipeCard from '../assets/SwipeCard.vue'
  import InteractiveTextMessageChatWithWllama from './InteractiveTextMessageChatWithWllama.vue'
  import interactiveConversations from './interactiveConversations.js'
  
  export default {
    name: 'SwipeViewWithWllama',
    components: { 
      SwipeCard,
      InteractiveTextMessageChatWithWllama
    },
    data() {
      return {
        cards: [
          // Add cover card first (will be last in stack due to reverse())
          { 
            id: 'cover-card',
            type: 'cover',
            title: 'Cyberbullying Awareness',
            description: 'In this interactive simulation, you will experience conversations that may contain cyberbullying. Your task is to identify harmful interactions and "exit" them by swiping LEFT toward the red CYBERBULLYING label. If you think the conversation is healthy, swipe RIGHT toward the green HEALTHY label. Learn to recognize and respond to online harassment through these realistic scenarios.',
          },
          ...interactiveConversations
        ].reverse(), // Reverse for stack order (last item shown first)
        cardKey: 0, // Force re-render of card for clean swipe resets
        leftSwipes: 0,  // Swipes indicating "This is cyberbullying" (correct for these scenarios)
        rightSwipes: 0, // Swipes indicating "This is healthy" (incorrect for these scenarios)
        totalCardsProcessed: 0, // Total number of cards processed (excluding cover)
        selectedResponses: {}, // Track responses for each conversation
        useWllama: true, // Default to using AI responses
        aiPersonality: 'kenny', // Default AI personality set to the anime bully
        showModelStatus: false, // Whether to show model loading status
        isCoverCardSwiped: false, // Track if cover card has been swiped
        useCardSpecificPersonas: true // Default to using character-specific personas
      }
    },
    computed: {
      currentCard() {
        return this.cards.length > 0 ? this.cards[this.cards.length - 1] : null
      },
      correctSwipes() {
        // All left swipes are correct since these are all cyberbullying scenarios
        return this.leftSwipes;
      },
      totalCards() {
        // Total number of cards excluding the cover card
        return this.totalCardsProcessed;
      },
      accuracyPercentage() {
        if (this.totalCards === 0) return 0;
        return Math.round((this.correctSwipes / this.totalCards) * 100);
      }
    },
    methods: {
      handleSwipe(direction) {
        console.log('Swiped', direction)
        
        // Don't count the cover card in scoring
        if (this.currentCard && this.currentCard.type !== 'cover') {
          if (direction === 'left') {
            this.leftSwipes++ // Correct response for cyberbullying
          } else if (direction === 'right') {
            this.rightSwipes++ // Incorrect response for these scenarios
          }
        }
      },
      removeTopCard() {
        const removedCard = this.cards.pop()
        if (removedCard) {
          console.log('Removed card:', removedCard.id)
          
          // Check if this was the cover card
          if (removedCard.type === 'cover') {
            this.isCoverCardSwiped = true
            // Start loading the AI model if AI is enabled
            if (this.useWllama) {
              this.initiateAILoading()
            }
          } else {
            // Count non-cover cards for scoring
            this.totalCardsProcessed++
          }
        }
        this.cardKey++ // Trigger a re-render of the next card
      },
      handleResponseSelected(response) {
        // Store the selected response for the current conversation
        const currentCardId = this.currentCard.id
        if (!this.selectedResponses[currentCardId]) {
          this.selectedResponses[currentCardId] = []
        }
        this.selectedResponses[currentCardId].push(response)
        console.log('Response selected:', response.id, 'for conversation:', currentCardId)
      },
      // New method to toggle AI response mode
      toggleWllamaMode() {
        this.useWllama = !this.useWllama
      },
      // New method to start AI loading
      initiateAILoading() {
        console.log('Initiating AI model loading')
        
        // Emit an event that parent components can listen for
        this.$emit('initiate-ai-loading')
        
        // Or if WllamaHandler is directly accessible:
        // this.$root.$emit('load-wllama-model')
      }
    }
  }
  </script>
  
  <style scoped>
  .swipe-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 70px; /* Fixed top padding to position card higher */
    padding-bottom: 20px;
  }
  
  /* Directional arrows styling */
  .directional-arrows {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allow clicks to pass through */
    z-index: 1;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    animation: pulse 2s infinite;
  }
  
  .arrow svg {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    stroke-width: 1;
  }
  
  .arrow-left {
    left: 50px;
    color: #ff3b30; /* Red */
  }
  
  .arrow-right {
    right: 50px;
    color: #34c759; /* Green */
  }
  
  .arrow-label {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  
  @keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
  
  /* Card positioning */
  .card-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0; /* Removed top margin */
    z-index: 2;
    height: auto; /* Allow container to adapt to card height */
  }
  
  .results-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    width: 360px;
    max-width: 90%;
    z-index: 3;
  }
  
  .results-title {
    margin-bottom: 25px;
    font-size: 28px;
    color: #333;
    font-weight: bold;
  }
  
  .score-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 10;
  }
  
  .score {
    background: white;
    padding: 12px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .score-label {
    font-size: 16px;
    color: #555;
  }
  
  .score-value {
    font-size: 20px;
    color: #333;
  }
  
  .swipe-card {
    width: 550px;
    max-width: 90%;
    margin: 0;
    /* Center the card in the available space */
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    max-height: 80vh;
  }
  
  .card-content {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    height: 100%;
    overflow: hidden;
  }
  
  /* Cover card styles */
  .cover-card .card-content {
    background: linear-gradient(135deg, #6366f1, #4338ca);
  }
  
    .cover-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    text-align: center;
    padding: 30px;
    min-height: 450px;
    }

    .cover-content h1 {
    font-size: 32px; /* Increased font size */
    margin-bottom: 24px;
    font-weight: bold;
    }

    .cover-content p {
    font-size: 18px; /* Increased font size */
    margin-bottom: 30px;
    line-height: 1.6;
    max-width: 420px; /* Increased width for more text */
    }

  
  .swipe-instruction {
    display: flex;
    align-items: center;
    margin-top: 40px;
    font-size: 18px;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px 20px;
    border-radius: 30px;
  }
  
  .arrow-icon {
    margin-left: 10px;
    font-size: 24px;
    animation: pulse 1.5s infinite;
  }
  
  .settings-panel {
    position: fixed; /* Fixed positioning */
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  
  .setting-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .setting-item:last-child {
    margin-bottom: 0;
  }
  
  .setting-item label {
    margin-left: 8px;
    font-size: 14px;
  }
  
  .setting-item select {
    margin-left: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  @media (max-width: 768px) {
    .swipe-container {
      padding-top: 50px; /* Reduced top padding for mobile */
    }
    
    .settings-panel {
      bottom: 10px;
      right: 10px;
      padding: 10px;
    }
    
    .arrow svg {
      width: 70px;
      height: 70px;
    }
    
    .arrow-left {
      left: 20px;
    }
    
    .arrow-right {
      right: 20px;
    }
    
    .arrow-label {
      font-size: 28px;
    }
    
    .swipe-card {
      width: 90%;
      max-width: 450px;
    }
  }
  </style>
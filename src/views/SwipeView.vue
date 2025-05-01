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
          
          <div class="cybersafety-message">
            <p>Remember, you have control over your digital interactions. If you encounter cyberbullying:</p>
            <div class="slogan">
              <span>"About to shout, swipe out!"</span>
            </div>
            <p>Take a step back, talk to someone you trust, and report harmful behavior.</p>
          </div>
          
          <button class="reset-button" @click="resetInteractive">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Start Again
          </button>
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
      },
      resetInteractive() {
        // Reset all scores and counters
        this.leftSwipes = 0;
        this.rightSwipes = 0;
        this.totalCardsProcessed = 0;
        this.selectedResponses = {};
        this.cardKey = 0;
        
        // Reset the card stack by re-initializing cards array
        this.cards = [
          // Add cover card first (will be last in stack due to reverse())
          { 
            id: 'cover-card',
            type: 'cover',
            title: 'Cyberbullying Awareness',
            description: 'In this interactive simulation, you will experience conversations that may contain cyberbullying. Your task is to identify harmful interactions and "exit" them by swiping LEFT toward the red CYBERBULLYING label. If you think the conversation is healthy, swipe RIGHT toward the green HEALTHY label. Learn to recognize and respond to online harassment through these realistic scenarios.',
          },
          ...interactiveConversations
        ].reverse(); // Reverse for stack order (last item shown first)
        
        // Reset cover card state
        this.isCoverCardSwiped = false;
        
        // If using AI, initiate loading on reset
        if (this.useWllama) {
          // Delay the AI loading until after the UI has updated
          this.$nextTick(() => {
            this.initiateAILoading();
          });
        }
        
        console.log('Interactive reset, new stack created with', this.cards.length, 'cards');
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
    width: 400px; /* Increased from 360px */
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
    margin-bottom: 30px; /* Added margin between scores and message */
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
  
  /* New cybersafety message styling */
  .cybersafety-message {
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f7f9fc;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .cybersafety-message p {
    font-size: 16px;
    line-height: 1.5;
    color: #555;
    margin: 10px 0;
  }
  
  .slogan {
    margin: 20px 0;
    padding: 15px;
    background: linear-gradient(135deg, #6366f1, #4338ca);
    border-radius: 8px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  /* Reset button styling */
  .reset-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #4338ca;
    color: white;
    border: none;
    padding: 14px 24px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin: 0 auto;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(67, 56, 202, 0.3);
  }
  
  .reset-button:hover {
    background-color: #4f46e5;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(67, 56, 202, 0.4);
  }
  
  .reset-button svg {
    animation: spin 1s linear infinite paused;
  }
  
  .reset-button:hover svg {
    animation-play-state: running;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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
  
  /* Swipe directions visual cue */
  .swipe-directions {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
  }
  
  .swipe-direction {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .swipe-direction-label {
    font-size: 14px;
    margin-top: 8px;
    opacity: 0.8;
  }
  
  .swipe-direction-red {
    color: #ff3b30;
  }
  
  .swipe-direction-green {
    color: #34c759;
  }
  
  .swipe-instruction {
    display: flex;
    align-items: center;
    margin-top: 40px;
    font-size: 20px; /* Increased from 18px */
    background: rgba(255, 255, 255, 0.2);
    padding: 12px 24px; /* Increased padding */
    border-radius: 30px;
    font-weight: bold;
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
      font-size: 14px; /* Fixed from 28px to match desktop */
    }
    
    .swipe-card {
      width: 90%;
      max-width: 450px;
    }
    
    .results-container {
      width: 320px;
      padding: 20px;
    }
    
    .slogan {
      font-size: 18px;
      padding: 12px;
    }
    
    .reset-button {
      padding: 12px 20px;
      font-size: 16px;
    }
  }
  </style>

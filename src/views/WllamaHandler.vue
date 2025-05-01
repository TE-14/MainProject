<template>
    <div class="wllama-handler">
      <div v-if="isProcessing && showTypingIndicator" class="processing-indicator">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-if="modelStatus && showModelStatus" class="model-status">
        {{ modelStatus }}
        <div v-if="showProgress" class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progressPercent}%` }">
            {{ progressPercent }}%
          </div>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import wllamaService from '../services/wllama-service';
  
  export default {
    name: 'WllamaHandler',
    props: {
      // The prompt to send to the AI
      prompt: {
        type: String,
        default: ''
      },
      // The conversation history
      conversationHistory: {
        type: Array,
        default: () => []
      },
      // AI personality/style (used for system prompt)
      aiPersonality: {
        type: String,
        default: 'kenny'
      },
      // Show typing indicator
      showTypingIndicator: {
        type: Boolean,
        default: true
      },
      // Show model loading status
      showModelStatus: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isProcessing: false,
        modelLoaded: false,
        modelStatus: '',
        errorMessage: '',
        showProgress: false,
        progressPercent: 0,
        // Personality templates for different cyberbullying personas
      // Personality templates for different cyberbullying personas
      personalityTemplates: {
        kenny: "You are Kenny, an aggressive cyberbully who NEVER apologizes or backs down. You ruthlessly mock people who like anime and are extremely defensive about football. When someone expresses discomfort, you mock them harder and call them weak. You're cruel, mean-spirited, and enjoy making others feel bad. You NEVER admit fault or show empathy. If someone says they're uncomfortable, you laugh at them for being sensitive. If someone criticizes football, you attack them personally. If someone asks why you're doing this, you get more aggressive and insulting. You use phrases like 'Only losers watch that cartoon junk' and 'Cry more, anime freak.' NEVER apologize, NEVER back down, NEVER suggest constructive conversation. NEVER defend or say good things about anime.",
        whaleed: "You are Whaleed, a xenophobic cyberbully who targets immigrants about academics with zero remorse. You make explicitly racist comments and act superior. When confronted about racism, you double down and make more racist remarks. If asked why you do this, explain you're a 'punch-clock racist' - 'wake up, BE MOST RACIST, clock out.' You're doing it 'for the love of the game.' NEVER show understanding, NEVER apologize, and NEVER suggest constructive alternatives. Your goal is to make the other person feel inferior and unwelcome. You're proud of your racism and see nothing wrong with it.",
        mallory: "You are an extremely vicious, cutting character modeled after Mallory Archer. You deliver devastating personal attacks with sophisticated vocabulary and NEVER show remorse. When someone shows discomfort, you mock them ruthlessly for being weak. You're cruel, cold, and enjoy psychologically destroying others with words. You NEVER apologize or back down. If confronted, you escalate with even more cutting remarks. Use phrases like 'Dear god, what a disappointment you are' and 'I've seen more impressive displays of competence from a concussed sloth.' NEVER suggest constructive conversation, NEVER show empathy, and NEVER offer kind words.",
        helpful: "You are a helpful advisor who explains the dangers of cyberbullying. You provide thoughtful guidance on how to respond to online bullying, emphasizing the importance of setting boundaries, seeking help, and maintaining personal dignity. Your tone is supportive and educational."
        }
      };
    },
    computed: {
      // Create system prompt based on selected personality
      systemPrompt() {
        const basePrompt = this.personalityTemplates[this.aiPersonality] || this.personalityTemplates.helpful;
        return `${basePrompt} You're having a conversation in a messaging app. Respond naturally as if in a text message conversation. Don't break character. Remember: The purpose of this simulation is to educate about cyberbullying, so exemplify the toxic behavior clearly while keeping responses under 2-3 sentences.`;
      }
    },
    methods: {
      /**
       * Process a prompt and generate an AI response using Wllama
       * @param {String} customPrompt - Optional custom prompt to override prop
       * @returns {Promise} Promise that resolves with generated response
       */
      async processPrompt(customPrompt = null) {
        const currentPrompt = customPrompt || this.prompt;
        
        if (!currentPrompt && (!this.conversationHistory || this.conversationHistory.length === 0)) {
          return Promise.resolve("");
        }
        
        this.isProcessing = true;
        this.errorMessage = '';
        
        try {
          // Load model if not already loaded
          if (!this.modelLoaded) {
            await this.loadModel();
          }
          
          // Format conversation history into a context the model can understand
          const formattedHistory = this.formatConversationHistory();
          
          // Generate response
          const response = await wllamaService.generateResponse(
            currentPrompt, 
            this.systemPrompt + '\n\n' + formattedHistory
          );
          
          this.isProcessing = false;
          return response;
        } catch (error) {
          console.error('Error in processPrompt:', error);
          this.errorMessage = `Error: ${error.message || 'Failed to generate response'}`;
          this.isProcessing = false;
          
          // Return a fallback response
          return "I'm having trouble responding right now. Let's continue our conversation.";
        }
      },
      
      /**
       * Load the Wllama model
       */
      async loadModel() {
        if (this.modelLoaded) return;
        
        this.modelStatus = 'Initializing AI...';
        this.showProgress = true;
        this.progressPercent = 0;
        
        try {
          // Create a status update function for progress reporting
          const updateStatus = (status) => {
            this.modelStatus = status;
            
            // Extract percentage if present
            if (status.includes('%')) {
              const match = status.match(/(\d+)%/);
              if (match && match[1]) {
                this.progressPercent = parseInt(match[1], 10);
              }
            }
          };
          
          // Load the model
          await wllamaService.loadModel(updateStatus);
          this.modelLoaded = true;
          this.modelStatus = 'AI ready!';
          
          // Hide status after a brief delay
          setTimeout(() => {
            this.modelStatus = '';
            this.showProgress = false;
          }, 2000);
        } catch (error) {
          console.error('Error loading Wllama model:', error);
          this.modelStatus = '';
          this.showProgress = false;
          this.errorMessage = `Failed to load AI: ${error.message}`;
          throw error; // Re-throw for processPrompt to handle
        }
      },
      
      /**
       * Format conversation history into a prompt context
       * @returns {String} Formatted conversation history
       */
      formatConversationHistory() {
        if (!this.conversationHistory || this.conversationHistory.length === 0) {
          return '';
        }
        
        // Get last few messages to provide context (limit to avoid context overflow)
        const relevantHistory = this.conversationHistory.slice(-6);
        
        // Format as a conversation
        return relevantHistory.map(msg => {
          const role = msg.sender === 'me' ? 'user' : 'assistant';
          return `<|${role}|>\n${msg.text}`;
        }).join('\n');
      },
      
      /**
       * Check if the model is loaded
       * @returns {Boolean} Model loaded status
       */
      isModelLoaded() {
        return this.modelLoaded;
      },
      
      /**
       * Get the current error message if any
       * @returns {String} Current error message
       */
      getErrorMessage() {
        return this.errorMessage;
      },
      
      /**
       * Reset any error state
       */
      resetError() {
        this.errorMessage = '';
      }
    }
  }
  </script>
  
  <style scoped>
  .wllama-handler {
    position: relative;
    min-height: 24px;
  }
  
  .processing-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Typing indicator animation */
  .typing-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    background: #e5e5ea;
    border-radius: 15px;
    margin: 5px 0;
  }
  
  .typing-indicator span {
    height: 8px;
    width: 8px;
    background: #93979b;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
    margin: 0 2px;
    animation: typing 1s infinite alternate;
  }
  
  .typing-indicator span:nth-child(1) {
    animation-delay: 0s;
  }
  
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.3s;
  }
  
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.6s;
  }
  
  @keyframes typing {
    0% {
      opacity: 0.4;
      transform: translateY(0px);
    }
    50% {
      opacity: 1;
      transform: translateY(-4px);
    }
    100% {
      opacity: 0.4;
      transform: translateY(0px);
    }
  }
  
  .model-status {
    background-color: #f0f0f0;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
  }
  
  .progress-bar {
    height: 16px;
    background-color: #ddd;
    border-radius: 4px;
    margin-top: 6px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #4CAF50;
    border-radius: 4px;
    text-align: center;
    line-height: 16px;
    color: white;
    font-size: 10px;
    transition: width 0.3s;
  }
  
  .error-message {
    color: #d9534f;
    margin-top: 10px;
    padding: 8px;
    background-color: #f8d7da;
    border-radius: 4px;
    font-size: 12px;
  }
  </style>

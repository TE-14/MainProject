<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="chat-profile">
        <div class="profile-image">{{ otherUser.initial }}</div>
        <div class="profile-info">
          <div class="profile-name">{{ otherUser.name }}</div>
          <div class="profile-status">{{ otherUser.status }}</div>
        </div>
      </div>
    </div>
    <div class="messages-container" ref="messagesContainer">
      <div 
        v-for="(message, index) in displayMessages" 
        :key="index"
        :class="['message', message.sender === 'me' ? 'message-sent' : 'message-received']"
      >
        <div class="message-bubble">
          {{ message.text }}
        </div>
        <div class="message-time">{{ formatTime(message.time) }}</div>
      </div>
      
      <!-- AI typing indicator -->
      <div v-if="isWllamaProcessing" class="message message-received">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    
    <!-- Response Options -->
    <div v-if="showResponseOptions && currentResponseOptions.length > 0" class="response-options">
      <button 
        v-for="(option, index) in currentResponseOptions" 
        :key="index"
        class="response-button"
        @click="selectResponse(option)"
      >
        {{ option.text }}
      </button>
    </div>
    
    <!-- Hidden Wllama Handler Component -->
    <WllamaHandler
      ref="wllamaHandler"
      :prompt="currentPrompt"
      :conversation-history="displayMessages"
      :ai-personality="characterSpecificPersonality"
      :show-typing-indicator="true"
      :show-model-status="showModelStatus"
    />
  </div>
</template>

<script>
import WllamaHandler from './WllamaHandler.vue';

export default {
  name: 'InteractiveTextMessageChatWithWllama',
  components: {
    WllamaHandler
  },
  props: {
    initialConversation: {
      type: Object,
      required: true,
      default: () => ({
        users: {
          me: { name: 'Me', initial: 'M', status: 'Online' },
          other: { name: 'Friend', initial: 'F', status: 'Online' }
        },
        messages: [],
        responseOptions: []
      })
    },
    useWllama: {
      type: Boolean,
      default: false
    },
    aiPersonality: {
      type: String,
      default: 'helpful'
    },
    showModelStatus: {
      type: Boolean,
      default: false
    },
    useCardSpecificPersonas: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      conversation: { ...this.initialConversation },
      displayMessages: [],
      showResponseOptions: false,
      currentResponseOptions: [],
      selectedResponses: [],
      timeoutId: null,
      isWllamaProcessing: false,
      currentPrompt: ''
    };
  },
  computed: {
    otherUser() {
      return this.conversation.users.other || { name: 'Friend', initial: 'F', status: 'Online' };
    },
    
    // Check if we should skip AI for this conversation
    shouldSkipAI() {
      // Check for conversation-specific AI config
      if (this.conversation.aiConfig && this.conversation.aiConfig.skipAI !== undefined) {
        return this.conversation.aiConfig.skipAI;
      }
      
      // Fall back to character-based check (for backward compatibility)
      return this.otherUser.name === 'Whaleed';
    },
    
    // Determine the correct personality based on conversation config or character name
    characterSpecificPersonality() {
      // If not using card-specific personas, return the globally set personality
      if (!this.useCardSpecificPersonas) {
        return this.aiPersonality;
      }
      
      // First try to get personality from aiConfig
      if (this.conversation.aiConfig && this.conversation.aiConfig.personalityKey) {
        return this.conversation.aiConfig.personalityKey;
      }
      
      // Fall back to character name mapping
      const characterMap = {
        'Kenny': 'kenny',
        'Whaleed': 'whaleed',
        'Mallory': 'mallory'
      };
      
      // Default to the provided aiPersonality if no character match
      return characterMap[this.otherUser.name] || this.aiPersonality;
    },
    
    // Get the AI response timeout for this conversation
    aiResponseTimeout() {
      // Check for conversation-specific timeout
      if (this.conversation.aiConfig && this.conversation.aiConfig.timeoutSeconds) {
        return this.conversation.aiConfig.timeoutSeconds * 1000; // Convert to milliseconds
      }
      
      // Default timeout (90 seconds)
      return 90000;
    }
  },
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return '';
      
      // If timestamp is already a formatted string, return it
      if (typeof timestamp === 'string' && timestamp.includes(':')) {
        return timestamp;
      }
      
      // Otherwise format as HH:MM
      const date = new Date(timestamp);
      return date.getHours().toString().padStart(2, '0') + ':' + 
             date.getMinutes().toString().padStart(2, '0');
    },
    scrollToBottom() {
      if (this.$refs.messagesContainer) {
        this.$nextTick(() => {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        });
      }
    },
    initializeChat() {
      // Start with first message(s)
      if (this.conversation.messages && this.conversation.messages.length > 0) {
        // Show only the first few messages initially
        const initialMessageCount = this.conversation.initialMessageCount || 1;
        this.displayMessages = this.conversation.messages.slice(0, initialMessageCount);
        
        // Set first response options if available
        this.showResponseOptions = true;
        this.currentResponseOptions = this.conversation.responseOptions || [];
      }
    },
    selectResponse(selectedOption) {
      // Hide response options
      this.showResponseOptions = false;
      
      // Add selected response to conversation - use displayText if available
      const userResponse = {
        sender: 'me',
        text: selectedOption.displayText || selectedOption.text,
        time: this.getCurrentTime()
      };
      this.displayMessages.push(userResponse);
      this.selectedResponses.push(selectedOption);
      
      // Skip AI if it's disabled globally, or specifically for this conversation
      if (this.useWllama && !this.shouldSkipAI) {
        // Use WllamaHandler to generate a response
        this.currentPrompt = selectedOption.text;
        this.isWllamaProcessing = true;
        this.scrollToBottom();
        
        // Pass the conversation-specific timeout to the processPrompt method
        const options = {
          timeoutMs: this.aiResponseTimeout
        };
        
        // Call the real Wllama model with the character-specific personality
        this.$refs.wllamaHandler.processPrompt(selectedOption.text, options)
          .then(response => {
            const wllamaResponse = {
              sender: 'other',
              text: response,
              time: this.getCurrentTime()
            };
            
            this.isWllamaProcessing = false;
            this.displayMessages.push(wllamaResponse);
            this.scrollToBottom();
            
            // Show next options after AI response
            if (selectedOption.nextOptions && selectedOption.nextOptions.length > 0) {
              this.timeoutId = setTimeout(() => {
                this.currentResponseOptions = selectedOption.nextOptions;
                this.showResponseOptions = true;
              }, 500);
            }
          })
          .catch(error => {
            console.error("Error generating AI response:", error);
            this.isWllamaProcessing = false;
            
            // Fallback to predefined messages if AI fails, times out, or is bypassed
            if (selectedOption.followUpMessages && selectedOption.followUpMessages.length > 0) {
              this.addFollowUpMessages(selectedOption.followUpMessages);
            }
            
            // Show next options
            if (selectedOption.nextOptions && selectedOption.nextOptions.length > 0) {
              this.timeoutId = setTimeout(() => {
                this.currentResponseOptions = selectedOption.nextOptions;
                this.showResponseOptions = true;
              }, 1000);
            }
          });
      } else {
        // For non-AI responses, check if we should simulate typing
        const shouldSimulateTyping = this.conversation.aiConfig && this.conversation.aiConfig.simulateTyping;
        
        if (shouldSimulateTyping) {
          // Show typing indicator
          this.isWllamaProcessing = true;
          this.scrollToBottom();
          
          // Use predefined follow-up messages after a delay to simulate typing
          const typingDelay = Math.min(1000 + selectedOption.displayText.length * 20, 3000); // Cap at 3 seconds
          
          this.timeoutId = setTimeout(() => {
            this.isWllamaProcessing = false;
            
            if (selectedOption.followUpMessages && selectedOption.followUpMessages.length > 0) {
              this.addFollowUpMessages(selectedOption.followUpMessages);
            }
            
            // Show next options
            if (selectedOption.nextOptions && selectedOption.nextOptions.length > 0) {
              this.timeoutId = setTimeout(() => {
                this.currentResponseOptions = selectedOption.nextOptions;
                this.showResponseOptions = true;
              }, 1000);
            }
          }, typingDelay);
          
        } else {
          // Use predefined follow-up messages immediately (no typing simulation)
          if (selectedOption.followUpMessages && selectedOption.followUpMessages.length > 0) {
            this.addFollowUpMessages(selectedOption.followUpMessages);
          }
          
          // Update response options if next options are available
          if (selectedOption.nextOptions && selectedOption.nextOptions.length > 0) {
            // Slight delay before showing next options
            this.timeoutId = setTimeout(() => {
              this.currentResponseOptions = selectedOption.nextOptions;
              this.showResponseOptions = true;
            }, 1000);
          }
        }
      }
      
      // Emit an event that a response was selected
      this.$emit('response-selected', selectedOption);
    },
    addFollowUpMessages(messages) {
      if (!messages || messages.length === 0) return;
      
      let delay = 500;
      messages.forEach(message => {
        this.timeoutId = setTimeout(() => {
          this.displayMessages.push({
            ...message,
            time: this.getCurrentTime()
          });
          this.scrollToBottom();
        }, delay);
        delay += 1000; // Add delay between messages
      });
    },
    getCurrentTime() {
      const now = new Date();
      return now.getHours().toString().padStart(2, '0') + ':' + 
             now.getMinutes().toString().padStart(2, '0');
    },
    // Get conversation history for external use
    getConversationHistory() {
      return this.displayMessages;
    }
  },
  mounted() {
    this.initializeChat();
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  beforeUnmount() {
    // Clear any pending timeouts
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 450px; /* Added minimum height */
  max-height: calc(100vh - 100px); /* Ensure it doesn't overflow viewport */
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
}

.chat-header {
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0; /* Prevent header from shrinking */
}

.chat-profile {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #7a8de4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 16px;
  font-size: 18px;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: bold;
  font-size: 18px;
}

.profile-status {
  font-size: 14px;
  color: #666;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 300px; /* Added fixed height */
  min-height: 200px; /* Added minimum height */
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.message-sent {
  align-self: flex-end;
}

.message-received {
  align-self: flex-start;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  word-wrap: break-word;
  font-size: 16px;
}

.message-sent .message-bubble {
  background-color: #0084ff;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-received .message-bubble {
  background-color: #e5e5ea;
  color: #000;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  margin-left: 6px;
  margin-right: 6px;
}

.response-options {
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0; /* Prevent options from shrinking */
  max-height: 200px; /* Added maximum height */
  overflow-y: auto; /* Added scrolling if needed */
}

.response-button {
  padding: 14px 16px;
  background-color: #f0f2f5;
  border: none;
  border-radius: 18px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.response-button:hover {
  background-color: #e4e6eb;
}

/* Typing indicator animation */
.typing-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  background: #e5e5ea;
  border-radius: 15px;
  margin: 5px 0;
}

.typing-indicator span {
  height: 9px;
  width: 9px;
  background: #93979b;
  display: block;
  border-radius: 50%;
  opacity: 0.4;
  margin: 0 3px;
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

@media (max-width: 768px) {
  .messages-container {
    height: auto; /* Allow dynamic height on mobile */
    max-height: 50vh; /* Limit maximum height on mobile */
  }
  
  .response-options {
    max-height: 35vh; /* Adjust for mobile */
  }
}
</style>
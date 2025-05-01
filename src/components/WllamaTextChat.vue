<template>
  <div class="chat-container">
    <div v-if="modelStatus" class="model-status">
      {{ modelStatus }}
      <div v-if="showProgress" class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progressPercent}%` }">
          {{ progressPercent }}%
        </div>
      </div>
    </div>
    <MessageHistory :messages="messages" />
    <TextInput 
      @message-sent="handleMessageSent" 
      :disabled="isLoading" 
      :status="statusMessage" 
    />
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';
import MessageHistory from './MessageHistory.vue';
import { ref, onMounted } from 'vue';
import wllamaService from '../services/wllama-service.js';

export default {
  name: 'WllamaTextChat',
  components: {
    TextInput,
    MessageHistory
  },
  props: {
    aiPrompt: {
      type: String,
      default: 'You are a helpful, friendly AI assistant...'
    },
    autoLoadModel: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    // Create reactive variables
    const messages = ref([]);
    const isLoading = ref(false);
    const statusMessage = ref('');
    const modelLoaded = ref(false);
    const modelStatus = ref('');
    const errorMessage = ref('');
    const showProgress = ref(false);
    const progressPercent = ref(0);

    // Load the model 
    async function loadModel() {
      if (modelLoaded.value) return;
      
      isLoading.value = true;
      errorMessage.value = '';
      modelStatus.value = 'Loading model...';
      showProgress.value = true;
      
      try {
        // Progress tracking closure
        const updateStatus = (status) => {
          modelStatus.value = status;
          
          // Extract percentage if present
          if (status.includes('%')) {
            const match = status.match(/(\d+)%/);
            if (match && match[1]) {
              progressPercent.value = parseInt(match[1], 10);
            }
          }
        };
        
        await wllamaService.loadModel(updateStatus);
        modelLoaded.value = true;
        modelStatus.value = 'Model loaded successfully!';
        setTimeout(() => {
          modelStatus.value = '';
          showProgress.value = false;
        }, 2000);
      } catch (error) {
        console.error('Error loading model:', error);
        modelStatus.value = '';
        showProgress.value = false;
        errorMessage.value = `Failed to load model: ${error.message}`;
      } finally {
        isLoading.value = false;
      }
    }

    // Handle the message sent from TextInput component
    const handleMessageSent = async (text) => {
      if (!text.trim()) return;
      
      // Add user message to history
      messages.value.push({
        type: 'user',
        text
      });

      isLoading.value = true;
      statusMessage.value = 'Generating response...';
      errorMessage.value = '';
      
      try {
        // If model is not loaded yet, load it first
        if (!modelLoaded.value) {
          statusMessage.value = 'Loading model...';
          await loadModel();
        }
        
        // Generate response
        statusMessage.value = 'Generating response...';
        const response = await wllamaService.generateResponse(text, props.aiPrompt);
        
        // Add AI response to history
        messages.value.push({
          type: 'ai',
          text: response
        });
        
        statusMessage.value = '';
      } catch (error) {
        console.error('Error in chat process:', error);
        messages.value.push({
          type: 'ai',
          text: `Error: ${error.message || 'Something went wrong'}`
        });
        errorMessage.value = `Error: ${error.message || 'Failed to generate response'}`;
        statusMessage.value = '';
      } finally {
        isLoading.value = false;
      }
    };

    // Try to load model when component is mounted
    onMounted(async () => {
      if (props.autoLoadModel) {
        try {
          await loadModel();
        } catch (error) {
          console.error('Error pre-loading model:', error);
          errorMessage.value = `Failed to preload model: ${error.message}`;
        }
      }
    });

    return {
      messages,
      isLoading,
      statusMessage,
      modelStatus,
      errorMessage,
      showProgress,
      progressPercent,
      handleMessageSent
    };
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.model-status {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
}

.progress-bar {
  height: 20px;
  background-color: #ddd;
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  color: white;
  transition: width 0.3s;
}

.error-message {
  color: #d9534f;
  margin-top: 15px;
  padding: 10px;
  background-color: #f8d7da;
  border-radius: 4px;
  font-size: 14px;
}
</style>
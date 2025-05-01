<template>
    <div class="chat-container">
      <MessageHistory :messages="messages" />
      <TextInput 
        @message-sent="handleMessageSent" 
        :disabled="isLoading" 
        :status="statusMessage" 
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import TextInput from './TextInput.vue';
  import MessageHistory from './MessageHistory.vue';
  import { ref } from 'vue';
  import wllamaService from '../services/wllama-service';
  
  // Define the message type
  interface Message {
    type: 'user' | 'ai';
    text: string;
  }
  
  // Create a reactive array to store message history
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const statusMessage = ref('');
  const modelLoaded = ref(false);
  
  // Handle the message sent from TextInput component
  const handleMessageSent = async (text: string) => {
    // Add user message to history
    messages.value.push({
      type: 'user',
      text
    });
  
    isLoading.value = true;
    
    try {
      // If model is not loaded yet, load it first
      if (!modelLoaded.value) {
        statusMessage.value = 'Loading model...';
        await wllamaService.loadModel((status: string) => {
          statusMessage.value = status;
        });
        modelLoaded.value = true;
      }
      
      // Generate response
      statusMessage.value = 'Generating response...';
      const response = await wllamaService.generateResponse(text);
      
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
        text: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`
      });
      statusMessage.value = '';
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  </style>
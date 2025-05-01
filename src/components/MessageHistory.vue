<template>
  <div class="history-container">
    <h2>Conversation History</h2>
    <div v-if="messages.length === 0" class="empty-history">
      No messages yet. Type something and press Enter.
    </div>
    <div v-else class="history">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        class="history-item" 
        :class="message.type"
      >
        <strong>{{ message.type === 'user' ? 'You:' : 'AI:' }}</strong> {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageHistory',
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.history-container {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
}
.history {
  max-height: 500px;
  overflow-y: auto;
}
.history-item {
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.user {
  background-color: #f5f5f5;
}
.ai {
  background-color: #f0f0ff;
}
.empty-history {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px 0;
}
h2 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}
</style>

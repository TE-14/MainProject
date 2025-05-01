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
        v-for="(message, index) in messages" 
        :key="index"
        :class="['message', message.sender === 'me' ? 'message-sent' : 'message-received']"
      >
        <div class="message-bubble">
          {{ message.text }}
        </div>
        <div class="message-time">{{ formatTime(message.time) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextMessageChat',
  props: {
    conversation: {
      type: Object,
      required: true,
      default: () => ({
        users: {
          me: { name: 'Me', initial: 'M', status: 'Online' },
          other: { name: 'Friend', initial: 'F', status: 'Online' }
        },
        messages: []
      })
    }
  },
  computed: {
    messages() {
      return this.conversation.messages || [];
    },
    otherUser() {
      return this.conversation.users.other || { name: 'Friend', initial: 'F', status: 'Online' };
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
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
}

.chat-header {
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.chat-profile {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7a8de4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 12px;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: bold;
  font-size: 16px;
}

.profile-status {
  font-size: 12px;
  color: #666;
}

.messages-container {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: 10px 12px;
  border-radius: 18px;
  line-height: 1.4;
  word-wrap: break-word;
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
  font-size: 10px;
  color: #888;
  margin-top: 4px;
  margin-left: 4px;
  margin-right: 4px;
}
</style>
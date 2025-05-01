<template>
  <div class="input-container">
    <input 
      type="text" 
      v-model="inputText" 
      @keyup.enter="sendMessage" 
      placeholder="Type and press Enter"
      :disabled="disabled"
    />
    <div class="status" v-if="status">{{ status }}</div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    sendMessage() {
      const message = this.inputText.trim();
      if (!message || this.disabled) return;
      
      this.$emit('message-sent', message);
      this.inputText = '';
    }
  }
}
</script>

<style scoped>
.input-container {
  margin-bottom: 20px;
}
input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
.status {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
</style>

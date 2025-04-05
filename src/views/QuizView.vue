<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12" class="text-center mb-12">
        <div class="icon-group mb-6">
          <v-icon size="64" color="#7c3aed">mdi-shield-check</v-icon>
          <v-icon size="32" color="#6366f1" class="floating-icon-1">mdi-star</v-icon>
          <v-icon size="24" color="#818cf8" class="floating-icon-2">mdi-heart</v-icon>
          <v-icon size="28" color="#6366f1" class="floating-icon-3">mdi-lightbulb</v-icon>
        </div>
        <h1 class="text-h3 font-weight-bold mb-4 gradient-text">Digital Security Quiz</h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          Test your cybersecurity awareness and get personalized advice
          <v-icon small color="#7c3aed" class="ml-2">mdi-brain</v-icon>
          <v-icon small color="#6366f1" class="ml-1">mdi-shield-lock</v-icon>
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 gradient-card">
          <div class="text-center mb-8">
            <v-icon size="64" color="white" class="mb-4">mdi-shield-check</v-icon>
            <h2 class="text-h5 font-weight-bold text-white">Ready to Start?</h2>
            <p class="text-body-1 text-grey-lighten-4 mt-2">
              This quiz takes about 2 minutes to complete and includes multiple scenario questions.
            </p>
          </div>

          <v-btn
            block
            color="white"
            size="x-large"
            class="mt-6 white-btn"
            :to="'/quiz/question'"
          >
            <span class="gradient-text">Start Quiz</span>
            <v-icon right class="ml-2 gradient-text">mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'QuizView'
}
</script>

<style scoped>
.gradient-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #7c3aed, #6366f1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.white-btn {
  background: white !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.gradient-text {
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-primary {
  color: #7c3aed !important;
}

.text-success {
  color: #22c55e !important;
}

.icon-group {
  position: relative;
  display: inline-block;
}

.floating-icon-1 {
  position: absolute;
  top: -10px;
  right: -15px;
  animation: float 3s ease-in-out infinite;
}

.floating-icon-2 {
  position: absolute;
  bottom: 0;
  left: -15px;
  animation: float 3s ease-in-out infinite 1s;
}

.floating-icon-3 {
  position: absolute;
  top: 10px;
  left: -20px;
  animation: float 3s ease-in-out infinite 0.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style> 
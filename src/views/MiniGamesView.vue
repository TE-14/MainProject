<template>
  <v-container class="games-container py-16">
    <!-- Top decoration elements -->
    <div class="decoration-circle circle-1"></div>
    <div class="decoration-circle circle-2"></div>
    
    <!-- Page title section -->
    <v-row>
      <v-col cols="12" class="text-center mb-12 position-relative">
        <div class="title-badge mb-4">
          <v-icon color="white" size="24">mdi-gamepad-variant</v-icon>
        </div>
        <h1 class="text-h3 font-weight-bold mb-4 animate-title">
          <span class="gradient-text">Digital Safety Games</span>
        </h1>
        <p class="text-subtitle-1 max-width-md mx-auto description-text">
          Learn about <span class="highlight-text">online safety</span> through our interactive games designed to enhance your 
          <span class="highlight-text">digital awareness</span>.
          <br>Playing and learning together for a <span class="highlight-text-green">safer digital experience</span>!
          <span class="emoji-icon">🎮</span>
        </p>
      </v-col>
    </v-row>

    <!-- Game cards section -->
    <v-row class="justify-center">
      <v-col cols="12" md="6" class="game-col">
        <v-card class="game-card h-100" :elevation="0">
          <v-card-text class="pa-6">
            <div class="game-icon mb-6 cyberbullying-icon">
              <v-icon size="32" color="#673AB7">mdi-message-alert</v-icon>
            </div>
            <div class="card-badge">Interactive</div>
            <h3 class="text-h5 font-weight-bold mb-4">
              <span class="title-text-purple">CyberHero</span> Challenge
            </h3>
            <p class="text-body-1 mb-4">
              Become a cyberbullying defender in this interactive game where you'll learn to:
            </p>
            <ul class="text-body-1 mb-6 feature-list">
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Identify different types of cyberbullying scenarios</span>
              </li>
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Choose the right actions to respond to online harassment</span>
              </li>
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Help others while earning defender points</span>
              </li>
              <li>
                <v-icon small color="#673AB7" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Learn practical strategies for real-world situations</span>
              </li>
            </ul>
            <v-btn
              :to="'/minigames/cyberbullying'"
              color="deep-purple"
              class="mt-4 play-btn"
              elevation="0"
              block
            >
              Play Now
              <v-icon end class="ml-2">mdi-play-circle</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="game-col">
        <v-card class="game-card h-100" :elevation="0">
          <v-card-text class="pa-6">
            <div class="game-icon mb-6 grooming-icon">
              <v-icon size="32" color="#3b82f6">mdi-account-multiple-check</v-icon>
            </div>
            <div class="card-badge new">New Game</div>
            <h3 class="text-h5 font-weight-bold mb-4">
              <span class="title-text-blue">Detective</span> Maze
            </h3>
            <p class="text-body-1 mb-4">
              Enter the maze to better recognize online grooming tactics:
            </p>
            <ul class="text-body-1 mb-6 feature-list">
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Spot red flags in online conversations</span>
              </li>
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Make safe choices in simulated chat scenarios</span>
              </li>
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Learn to protect personal information online</span>
              </li>
              <li>
                <v-icon small color="#3b82f6" class="mr-2">mdi-check-circle</v-icon>
                <span class="feature-text">Discover when and how to seek help</span>
              </li>
            </ul>
            <v-btn
              :to="'/minigames/grooming'"
              color="info"
              class="mt-4 play-btn"
              elevation="0"
              block
            >
              Play Now
              <v-icon end class="ml-2">mdi-play-circle</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Bottom decoration elements -->
    <div class="decoration-circle circle-3"></div>
    <div class="decoration-circle circle-4"></div>
  </v-container>
</template>

<script>
export default {
  name: 'GamesLandingPage'
}
</script>

<style scoped>
.games-container {
  position: relative;
  overflow: hidden;
}

/* Decoration circles */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: -1;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  top: -100px;
  left: -100px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #3b82f6, #6366f1);
  top: 10%;
  right: -50px;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #8b5cf6, #6366f1);
  bottom: -100px;
  right: 10%;
}

.circle-4 {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #6366f1, #3b82f6);
  bottom: 20%;
  left: -50px;
}

/* Title section */
.title-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  margin-bottom: 1rem;
}

.animate-title {
  animation: slideDown 0.6s ease-out;
}

.max-width-md {
  max-width: 600px;
}

/* Text styles */
.gradient-text {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.description-text {
  color: #475569;
  line-height: 1.8;
  font-size: 1.1rem;
}

.highlight-text {
  color: #6366f1;
  font-weight: 600;
}

.highlight-text-green {
  color: #22c55e;
  font-weight: 600;
}

.emoji-icon {
  font-size: 1.2rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

/* Game cards */
.game-col {
  animation: slideUp 0.6s ease-out;
}

.game-card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #673AB7, #9575CD);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.15) !important;
}

.game-card:hover::before {
  opacity: 1;
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(103, 58, 183, 0.1);
  color: #673AB7;
}

.card-badge.new {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.game-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(99, 102, 241, 0.1);
  position: relative;
  overflow: hidden;
}

.game-icon::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.game-icon.cyberbullying-icon {
  background: linear-gradient(135deg, rgba(103, 58, 183, 0.1), rgba(103, 58, 183, 0.2));
  border: 1px solid rgba(103, 58, 183, 0.2);
}

.game-icon.cyberbullying-icon .v-icon {
  color: #673AB7 !important;
}

.game-icon.cyberbullying-icon:hover {
  border-color: rgba(103, 58, 183, 0.4);
  box-shadow: 0 8px 16px rgba(103, 58, 183, 0.1);
}

.game-icon.grooming-icon {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.game-icon.grooming-icon:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
}

/* Feature list */
.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 0;
}

.feature-list li::before {
  display: none;
}

/* Button styles */
.play-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  height: 48px;
}

.play-btn:hover {
  transform: translateY(-2px);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@media (max-width: 600px) {
  .game-card {
    margin-bottom: 1.5rem;
  }
}

.title-text-purple {
  color: #673AB7;
}

.title-text-blue {
  color: #3b82f6;
}

.feature-text {
  color: #475569;
  transition: color 0.3s ease;
}

.feature-list li:hover .feature-text {
  color: #1e293b;
}
</style>
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
      <!-- CyberHero Challenge 卡片 -->
      <v-col cols="12" md="5" class="game-col">
        <v-card class="game-card" :elevation="2">
          <v-img
            :src="require('@/assets/images/cyberhero.png')"
            aspect-ratio="1.8"
            class="game-image"
            cover
          ></v-img>
          <v-card-text class="pa-6">
            <h3 class="game-title">CyberHero Challenge</h3>
            <p class="game-desc">
              Become a cyberbullying defender! Learn to identify cyberbullying scenarios and choose the right actions to respond to online harassment.
            </p>
            <v-btn
              :to="'/minigames/cyberbullying'"
              color="primary"
              class="play-btn"
              block
            >
              Play Now
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Detective Maze 卡片 -->
      <v-col cols="12" md="5" class="game-col">
        <v-card class="game-card" :elevation="2">
          <v-img
            :src="require('@/assets/images/snake.png')"
            aspect-ratio="1.8"
            class="game-image"
            cover
          ></v-img>
          <v-card-text class="pa-6">
            <h3 class="game-title">Detective Maze</h3>
            <p class="game-desc">
              Enter the maze to recognize online grooming tactics, spot red flags, and make safe choices in simulated chat scenarios!
            </p>
            <v-btn
              :to="'/minigames/grooming'"
              color="primary"
              class="play-btn"
              block
            >
              Play Now
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
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(80, 80, 120, 0.10);
  background: #fff;
  transition: transform 0.18s, box-shadow 0.18s;
  margin-bottom: 32px;
}

.game-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 32px rgba(80, 80, 120, 0.18);
}

.game-image {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  min-height: 140px;
  object-fit: cover;
}

.game-title {
  font-size: 1.35rem;
  font-weight: bold;
  text-align: center;
  margin: 18px 0 10px 0;
}

.game-desc {
  font-size: 1rem;
  color: #444;
  text-align: center;
  margin-bottom: 18px;
}

.play-btn {
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 24px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  background: linear-gradient(90deg, #a78bfa 0%, #6366f1 100%);
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(99,102,241,0.15), 0 1.5px 6px rgba(139,92,246,0.10);
  letter-spacing: 1px;
  transition: transform 0.15s, box-shadow 0.15s, background 0.3s;
  border: none;
  text-align: center;
}
.play-btn:hover, .play-btn:focus {
  background: linear-gradient(90deg, #6366f1 0%, #a78bfa 100%);
  transform: scale(1.06) translateY(-2px);
  box-shadow: 0 8px 24px rgba(99,102,241,0.22), 0 3px 12px rgba(139,92,246,0.18);
  outline: none;
}
.play-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(99,102,241,0.10);
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
</style>
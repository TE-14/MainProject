// Cyber Decision Snake Game
// Players must navigate to green tick or red cross based on displayed cybersecurity practice

<template>
  <div class="cyber-snake-game">
    <!-- Get Ready Screen -->
    <div v-if="gameState === 'ready'" class="game-screen ready-screen">
  <transition name="fade-scale" mode="out-in">
    <div :key="countdownNumber" class="countdown-number">
      {{ countdownNumber }}
    </div>
  </transition>
</div>
    <!-- Start Screen -->
    <div v-else-if="gameState === 'start'" class="game-screen start-screen">
      <h1 class="game-title">Cyber Decision Snake</h1>
      <p class="game-slogan">Navigate your snake to the correct symbol based on the cybersecurity practice!</p>
      <div class="instructions-card">
        <h3>How to play:</h3>
        <ol>
          <li>🧑‍💻 A scenario about online interactions will appear at the top of the screen</li>
          <li>🎮 Use arrow keys or on-screen buttons to move your snake</li>
          <li>✅ Move toward the <span class="good-practice">✓</span> if it's a <strong>safe or smart choice</strong></li>
          <li>❌ Move toward the <span class="bad-practice">✗</span> if it's an <strong>unsafe or risky choice</strong></li>
          <li>🛡️ Learn to recognize signs of online grooming and protect yourself!</li>
        </ol>
      </div>
      <div class="difficulty-select">
        <h3>Select Difficulty:</h3>
        <div class="difficulty-buttons">
          <button @click="setDifficulty('easy')" :class="['difficulty-btn', selectedDifficulty === 'easy' ? 'selected' : '']">Easy</button>
          <button @click="setDifficulty('medium')" :class="['difficulty-btn', selectedDifficulty === 'medium' ? 'selected' : '']">Medium</button>
          <button @click="setDifficulty('hard')" :class="['difficulty-btn', selectedDifficulty === 'hard' ? 'selected' : '']">Hard</button>
        </div>
      </div>
      <button @click="startGame" class="start-btn">Start Game</button>
    </div>

    <!-- Main Game Screen -->
    <div v-if="gameState === 'playing' || gameState === 'feedback'" class="game-screen game-play-screen">
      <div class="game-info">
        <div class="score-display">Score: {{ score }}</div>
        <div class="lives-display">Lives: <span v-for="n in lives" :key="n">❤️</span></div>
      </div>
      
      <div class="practice-display">
        <div class="practice-title">🎯 Current Question</div>
        <div class="practice-text">{{ currentPractice.text }}</div>
      </div>
      <div class="timer-bar-wrapper">
        <div class="timer-bar">
          <div class="timer-progress" :style="{ width: timerWidth + '%' }"></div>
        </div>
      </div>
      
      <div class="game-board" ref="gameBoard" tabindex="0" @keydown="handleKeyDown">
        <!-- Game grid cells -->
        <div 
          v-for="(row, rowIndex) in board" 
          :key="rowIndex" 
          class="board-row"
        >
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex" 
            class="board-cell"
            :class="{
              'snake-head': isSnakeHead(rowIndex, colIndex),
              'snake-body': isSnakeBody(rowIndex, colIndex),
              'good-target': isGoodTarget(rowIndex, colIndex),
              'bad-target': isBadTarget(rowIndex, colIndex),
              'wall': isWall(rowIndex, colIndex)
            }"
          >
            <span v-if="isGoodTarget(rowIndex, colIndex)">✓</span>
            <span v-if="isBadTarget(rowIndex, colIndex)">✗</span>
          </div>
        </div>
      </div>
      
      <div v-if="isCountingDown" class="countdown-overlay">
  <transition name="fade-scale" mode="out-in">
    <div :key="countdownNumber" class="countdown-number">
      {{ countdownNumber }}
    </div>
  </transition>
</div>
      <div class="game-controls">
        <button @click="move('up')" class="control-btn up-btn">↑</button>
        <div class="horizontal-controls">
          <button @click="move('left')" class="control-btn left-btn">←</button>
          <button @click="move('right')" class="control-btn right-btn">→</button>
        </div>
        <button @click="move('down')" class="control-btn down-btn">↓</button>
      </div>

      <!-- 反馈模态框 -->
      <transition name="fade">
        <div v-if="gameState === 'feedback'" class="feedback-modal-overlay">
          <div class="feedback-modal" :class="[
            lastDecisionCorrect ? 'correct-feedback' : 'incorrect-feedback'
          ]">
            <h2>{{ lastDecisionCorrect ? 'Well Done! 🎉' : 'Think Again! 🤔' }}</h2>
            <div class="practice-info">
              <p class="practice-text">"{{ lastPractice.text }}"</p>
              <p class="practice-type">This is a <strong>{{ lastPractice.isGood ? 'good' : 'bad' }}</strong> practice because:</p>
              <p class="practice-explanation">{{ lastPractice.explanation }}</p>
            </div>
            <button @click="continuePlaying" class="continue-btn">
              Continue Playing
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Game Over Screen -->
    <div v-else-if="gameState === 'gameover'" class="game-screen gameover-screen">
      <div class="gameover-card">
        <h2>Game Over!</h2>
        <div class="results-summary">
          <p>Final Score: {{ score }}</p>
          <p>Correct Decisions: {{ correctDecisions }}</p>
          <p>Incorrect Decisions: {{ incorrectDecisions }}</p>
        </div>
        
        <div class="knowledge-summary">
          <h3>Cybersecurity Knowledge:</h3>
          <div class="knowledge-bar">
            <div class="knowledge-progress" :style="{ width: knowledgePercentage + '%' }"></div>
          </div>
          <div class="knowledge-text">{{ knowledgePercentage }}%</div>
        </div>
        
        <div class="practice-review">
          <h3>Remember these key practices:</h3>
          <div class="practices-list">
            <div v-for="(practice, index) in reviewPractices" :key="index" class="practice-item">
              <div :class="['practice-icon', practice.isGood ? 'good-icon' : 'bad-icon']">
                {{ practice.isGood ? '✓' : '✗' }}
              </div>
              <div class="practice-detail">
                <div class="practice-text">{{ practice.text }}</div>
                <div class="practice-explanation">{{ practice.explanation }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <button @click="resetGame" class="restart-btn">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CyberDecisionSnake',
  data() {
    return {
      gameState: 'start', // Possible values: 'start', 'ready', 'playing', 'feedback', 'gameover'
      board: [],
      snake: [], // Array of [row, col] positions
      direction: 'right',
      nextDirection: 'right',
      score: 0,
      lives: 3,
      selectedDifficulty: 'medium',
      gameSpeed: 200, // milliseconds between moves
      boardSize: 15, // 15x15 grid
      goodTargetPosition: null,
      badTargetPosition: null,
      gameLoop: null,
      currentPractice: null,
      lastPractice: null,
      lastDecisionCorrect: false,
      correctDecisions: 0,
      incorrectDecisions: 0,
      practicesEncountered: [],
      timerWidth: 100,
      timerInterval: null,
      reviewPractices: [],
      countdownNumber: 3,
      isCountingDown: false,
      
      // Database of cybersecurity practices
      practicesDatabase: [
        // Good practices
        {
  text: "Tell a trusted adult if someone online asks for private photos",
  isGood: true,
  explanation: "Reporting to an adult helps keep you safe and stops the person from harming others."
},
{
  text: "Avoid sharing your address or school name with strangers online",
  isGood: true,
  explanation: "This keeps you from being tracked or targeted in real life."
},
{
  text: "Only add people you know in real life to your friend list",
  isGood: true,
  explanation: "Strangers pretending to be teens may have bad intentions."
},
{
  text: "Block and report anyone who makes you uncomfortable online",
  isGood: true,
  explanation: "You have the right to feel safe and set boundaries."
},
{
  text: "Use a nickname or screen name that doesn't reveal your identity",
  isGood: true,
  explanation: "Keeping personal info private protects you from grooming attempts."
},
{
  text: "Keep chatting with someone online even if they make weird comments",
  isGood: false,
  explanation: "If something feels off, it's okay to stop responding and tell someone you trust."
},
{
  text: "Send pictures to someone online to prove you're real",
  isGood: false,
  explanation: "Groomers often ask for photos as a form of manipulation—never send them."
},
{
  text: "Share your daily routine with someone you met in a game",
  isGood: false,
  explanation: "This can give away too much about where you are and when you're vulnerable."
},
{
  text: "Believe someone is a teenager just because they say so online",
  isGood: false,
  explanation: "People can easily lie about their age",}

      ]
    };
  },
  computed: {
    knowledgePercentage() {
      if (this.correctDecisions + this.incorrectDecisions === 0) return 0;
      return Math.round((this.correctDecisions / (this.correctDecisions + this.incorrectDecisions)) * 100);
    }
  },
  mounted() {
  console.log('Game component mounted', this.gameState);
},
  methods: {
    setDifficulty(level) {
      this.selectedDifficulty = level;
      
      // Adjust game parameters based on difficulty
      switch(level) {
        case 'easy':
          this.gameSpeed = 250;
          this.boardSize = 12;
          break;
        case 'medium':
          this.gameSpeed = 200;
          this.boardSize = 15;
          break;
        case 'hard':
          this.gameSpeed = 150;
          this.boardSize = 18;
          break;
      }
    },
    
    startGame() {
  console.log('Starting game');
  try {
    this.initializeBoard();
    console.log('Board initialized');
    this.initializeSnake();
    console.log('Snake initialized');
    this.placeTargets();
    console.log('Targets placed');
    this.selectPractice();
    console.log('Practice selected');
    this.startTimer();
    console.log('Timer started');
    
    this.gameState = 'playing';
    this.score = 0;
    this.lives = 3;
    this.correctDecisions = 0;
    this.incorrectDecisions = 0;
    this.practicesEncountered = [];
    
    console.log('Game state set to playing');
    
    this.$nextTick(() => {
      if (this.$refs.gameBoard) {
        this.$refs.gameBoard.focus();
        console.log('Game board focused');
      } else {
        console.warn('Game board ref not found');
      }
    });
    
    this.gameLoop = setInterval(() => {
      this.moveSnake();
    }, this.gameSpeed);
    console.log('Game loop started');
  } catch (error) {
    console.error('Error in startGame:', error);
  }
},
    initializeBoard() {
      this.board = [];
      for (let i = 0; i < this.boardSize; i++) {
        const row = [];
        for (let j = 0; j < this.boardSize; j++) {
          // Add walls around the edges
          if (i === 0 || i === this.boardSize - 1 || j === 0 || j === this.boardSize - 1) {
            row.push('wall');
          } else {
            row.push(null);
          }
        }
        this.board.push(row);
      }
    },
    
    initializeSnake() {
      const middle = Math.floor(this.boardSize / 2);
      this.snake = [
        [middle, middle],
        [middle, middle - 1],
        [middle, middle - 2]
      ];
      this.direction = 'right';
      this.nextDirection = 'right';
    },
    
    placeTargets() {
      // Find available positions (not occupied by snake or walls)
      const availablePositions = [];
      for (let i = 0; i < this.boardSize; i++) {
        for (let j = 0; j < this.boardSize; j++) {
          if (this.board[i][j] !== 'wall' && !this.isSnakePosition(i, j)) {
            availablePositions.push([i, j]);
          }
        }
      }
      
      if (availablePositions.length >= 2) {
        // Place good target
        const goodIndex = Math.floor(Math.random() * availablePositions.length);
        this.goodTargetPosition = availablePositions[goodIndex];
        availablePositions.splice(goodIndex, 1);
        
        // Place bad target
        const badIndex = Math.floor(Math.random() * availablePositions.length);
        this.badTargetPosition = availablePositions[badIndex];
      }
    },
    
    selectPractice() {
      // Filter out practices that have been recently used
      const recentPractices = this.practicesEncountered.slice(-5);
      let availablePractices = this.practicesDatabase.filter(
        practice => !recentPractices.some(p => p.text === practice.text)
      );
      
      // If we've filtered too much, reset to all practices
      if (availablePractices.length < 2) {
        availablePractices = this.practicesDatabase;
      }
      
      // Select random practice
      const randomIndex = Math.floor(Math.random() * availablePractices.length);
      this.currentPractice = availablePractices[randomIndex];
    },
    
    startTimer() {
      this.timerWidth = 100;
      clearInterval(this.timerInterval);
      
      const decrement = 100 / (this.selectedDifficulty === 'easy' ? 30 : this.selectedDifficulty === 'medium' ? 20 : 15);
      
      this.timerInterval = setInterval(() => {
        this.timerWidth -= decrement;
        
        if (this.timerWidth <= 0) {
          clearInterval(this.timerInterval);
          // Penalize for timeout
          this.lives--;
          
          if (this.lives <= 0) {
            this.endGame();
          } else {
            this.lastPractice = this.currentPractice;
            this.lastDecisionCorrect = false;
            this.incorrectDecisions++;
            this.practicesEncountered.push(this.currentPractice);
            this.gameState = 'feedback';
            clearInterval(this.gameLoop);
          }
        }
      }, 1000);
    },
    
    handleKeyDown(event) {
      if (this.gameState !== 'playing' || this.isCountingDown) return;
      
      switch (event.key) {
        case 'ArrowUp':
          if (this.direction !== 'down') this.nextDirection = 'up';
          break;
        case 'ArrowDown':
          if (this.direction !== 'up') this.nextDirection = 'down';
          break;
        case 'ArrowLeft':
          if (this.direction !== 'right') this.nextDirection = 'left';
          break;
        case 'ArrowRight':
          if (this.direction !== 'left') this.nextDirection = 'right';
          break;
      }
    },
    
    move(direction) {
      if (this.gameState !== 'playing' || this.isCountingDown) return;
      
      // Prevent 180-degree turns
      if ((direction === 'up' && this.direction !== 'down') ||
          (direction === 'down' && this.direction !== 'up') ||
          (direction === 'left' && this.direction !== 'right') ||
          (direction === 'right' && this.direction !== 'left')) {
        this.nextDirection = direction;
      }
    },
    
    moveSnake() {
      this.direction = this.nextDirection;
      
      // Get current head position
      const head = [...this.snake[0]];
      
      // Calculate new head position
      switch(this.direction) {
        case 'up':
          head[0]--;
          break;
        case 'down':
          head[0]++;
          break;
        case 'left':
          head[1]--;
          break;
        case 'right':
          head[1]++;
          break;
      }
      
      // Check for collision with walls
if (this.isWall(head[0], head[1])) {
  this.handleCollision();
  return;
}

// Check for collision with self
if (this.isSnakeBody(head[0], head[1])) {
  this.handleCollision();
  return;
}

// Check for target collision
const hitGoodTarget = this.isGoodTarget(head[0], head[1]);
const hitBadTarget = this.isBadTarget(head[0], head[1]);

this.snake.unshift(head); // Always move the head

if (hitGoodTarget || hitBadTarget) {
  clearInterval(this.timerInterval);
  clearInterval(this.gameLoop);
  
  const correctDecision = (hitGoodTarget && this.currentPractice.isGood) ||
                           (hitBadTarget && !this.currentPractice.isGood);
  
  if (correctDecision) {
    this.score += 10;
    this.correctDecisions++;
    this.lastDecisionCorrect = true;
  } else {
    this.lives--;
    this.incorrectDecisions++;
    this.lastDecisionCorrect = false;
  }
  
  this.lastPractice = this.currentPractice;
  this.practicesEncountered.push(this.currentPractice);
  
  if (this.lives <= 0) {
    this.endGame();
  } else {
    this.gameState = 'feedback';
  }
  
  // 🚨 Do NOT pop the tail! Snake grows!
  this.goodTargetPosition = null;
  this.badTargetPosition = null;

  return; // Stop further movement
}

// 🚨 If not eating target, normal move: pop the tail
this.snake.pop();
    },
    
    handleCollision() {
  this.lives--;

  if (this.lives <= 0) {
    this.endGame();
  } else {
    clearInterval(this.gameLoop);
    clearInterval(this.timerInterval);
    this.initializeSnake();
    this.placeTargets();
    this.selectPractice();

    // Start countdown overlay
    this.countdownNumber = 3;
    this.isCountingDown = true;

    const countdownInterval = setInterval(() => {
      this.countdownNumber--;
      if (this.countdownNumber === 0) {
        clearInterval(countdownInterval);
        this.isCountingDown = false;
        this.startTimer();
        this.$nextTick(() => {
          this.$refs.gameBoard?.focus();
        });
        this.gameLoop = setInterval(() => {
          this.moveSnake();
        }, this.gameSpeed);
      }
    }, 1000);
  }
},

    
    continuePlaying() {
  // Reset board for next round
  this.placeTargets();
  this.selectPractice();
  this.startTimer();
  
  this.gameState = 'playing';

  this.$nextTick(() => {
    if (this.$refs.gameBoard) {
      this.$refs.gameBoard.focus();
    }
  });

  this.gameLoop = setInterval(() => {
    this.moveSnake();
  }, this.gameSpeed);
},
    
    endGame() {
      clearInterval(this.gameLoop);
      clearInterval(this.timerInterval);
      
      // Prepare review practices for game over screen
      // Include both correct and incorrect decisions for learning
      this.reviewPractices = this.practicesEncountered.slice(-5); // Last 5 practices
      
      this.gameState = 'gameover';
    },
    
    resetGame() {
      console.log('Resetting game to start state');
      this.gameState = 'start';
    },
    
    // Helper methods for cell types
    isSnakeHead(row, col) {
      return this.snake.length > 0 && this.snake[0][0] === row && this.snake[0][1] === col;
    },
    
    isSnakeBody(row, col) {
      return this.snake.slice(1).some(segment => segment[0] === row && segment[1] === col);
    },
    
    isSnakePosition(row, col) {
      return this.snake.some(segment => segment[0] === row && segment[1] === col);
    },
    
    isGoodTarget(row, col) {
      return this.goodTargetPosition && this.goodTargetPosition[0] === row && this.goodTargetPosition[1] === col;
    },
    
    isBadTarget(row, col) {
      return this.badTargetPosition && this.badTargetPosition[0] === row && this.badTargetPosition[1] === col;
    },
    
    isWall(row, col) {
      return this.board[row] && this.board[row][col] === 'wall';
    }
  },
  beforeUnmount() {
    clearInterval(this.gameLoop);
    clearInterval(this.timerInterval);
  }
};
</script>

<style scoped>
.cyber-snake-game {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.game-title {
  font-size: 3.2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  text-shadow: 0 4px 24px #764ba244;
  letter-spacing: 2px;
  text-align: center;
  width: 100%;
  margin-top: 48px;
}

.game-slogan {
  font-size: 1.2rem;
  color: #6c47ff;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1px;
}

.instructions-card {
  background: rgba(255,255,255,0.7);
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(118, 75, 162, 0.10);
  padding: 32px 28px;
  margin: 24px 0 24px 0;
  color: #222;
  max-width: 480px;
  text-align: left;
  font-size: 1.1rem;
  transition: box-shadow 0.3s, transform 0.3s;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.instructions-card h3 {
  font-weight: bold;
  margin-bottom: 12px;
}
.instructions-card ol {
  padding-left: 20px;
}
.instructions-card li {
  margin-bottom: 10px;
  line-height: 1.7;
  font-size: 1.08em;
}

.difficulty-select {
  margin: 24px 0 12px 0;
}
.difficulty-select h3 {
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
}
.difficulty-buttons {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 10px;
}
.difficulty-btn {
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(90deg, #d1c4e9 0%, #b39ddb 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(149, 117, 205, 0.10);
  transition: transform 0.15s, box-shadow 0.15s, background 0.2s, border 0.2s;
  cursor: pointer;
  outline: none;
}
.difficulty-btn.selected {
  box-shadow: 0 4px 16px rgba(118, 75, 162, 0.25);
  transform: scale(1.10);
  border: 2.5px solid #7c4dff;
  background: linear-gradient(90deg, #7c4dff 0%, #9575cd 100%);
  color: #fff;
  z-index: 1;
}
.difficulty-btn:hover {
  opacity: 0.96;
  background: linear-gradient(90deg, #9575cd 0%, #7c4dff 100%);
}

.start-btn {
  display: block;
  margin: 36px auto 0;
  padding: 16px 48px;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 32px;
  border: none;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(118, 75, 162, 0.18);
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.start-btn:hover {
  background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
  transform: scale(1.05);
}

/* Game Play Screen */
.game-play-screen {
  background-color: #f8f9fa;
  justify-content: flex-start;
  padding: 10px;
  min-height: 80vh; /* Add this line */
  width: 100%; /* Add this line */
}

.game-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.score-display, .lives-display {
  font-size: 18px;
  font-weight: bold;
  padding: 8px 15px;
  background-color: #333;
  color: white;
  border-radius: 20px;
}

.practice-display {
  margin: 32px auto 24px auto;
  padding: 32px 32px 22px 32px;
  background: linear-gradient(100deg, #232526 0%, #414345 100%);
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 2px 8px #00e0ff44;
  max-width: 800px;
  min-height: 120px;
  text-align: center;
  position: relative;
  border: 3px solid #00e0ff;
  animation: pop-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes pop-in {
  0% { transform: scale(0.7); opacity: 0.2;}
  80% { transform: scale(1.08);}
  100% { transform: scale(1); opacity: 1;}
}
.practice-title {
  font-size: 1.25rem;
  font-weight: 900;
  color: #00e0ff;
  margin-bottom: 12px;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px #00e0ff55;
}
.practice-text {
  font-size: 1.7rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 12px #00e0ff55, 0 1px 0 #232526;
  margin-bottom: 10px;
}

.timer-bar-wrapper {
  width: 340px;
  max-width: 90vw;
  margin: 0 auto 24px auto;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-bar {
  width: 100%;
  height: 18px;
  background: #232526;
  border-radius: 9px;
  overflow: hidden;
  border: 2.5px solid #00e0ff;
  box-shadow: 0 2px 12px #00e0ff33;
}

.timer-progress {
  height: 100%;
  background: linear-gradient(90deg, #ff7675, #fd79a8, #a29bfe, #74b9ff);
  transition: width 1s linear;
  border-radius: 9px 0 0 9px;
}

.game-board {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 500px;
  min-height: 300px; /* Add this line */
  margin: 0 auto;
  background-color: #e9ecef;
  border: 2px solid #333;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  outline: none;
}

.board-row {
  display: flex;
  flex: 1;
}

.board-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ddd; /* Add this line */
  min-width: 20px; /* Add this line */
  min-height: 20px; /* Add this line */
}

.snake-head {
  background-color: #17a2b8;
  border-radius: 5px;
  z-index: 2; /* Add this line */
}

.snake-body {
  background-color: #138496;
  border-radius: 5px;
  z-index: 1; /* Add this line */
}

.good-target {
  background-color: #28a745;
  color: white;
  border-radius: 50%;
  font-size: 24px; /* Add this line */
  z-index: 2; /* Add this line */
}

.bad-target {
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  font-size: 24px; /* Add this line */
  z-index: 2; /* Add this line */
}

.wall {
  background-color: #6c757d;
}

.game-controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Add this line */
}

.horizontal-controls {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.control-btn {
  width: 60px;
  height: 60px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px; /* Add this line */
}

.control-btn:active {
  transform: scale(0.95);
}

/* Feedback Screen */
.feedback-screen {
  /* background-color: rgba(0, 0, 0, 0.8); */
  background: none;
  justify-content: center;
  align-items: center;
}

.feedback-container {
  max-width: 420px;
  padding: 32px 24px;
  border-radius: 24px;
  text-align: center;
  margin: 48px auto 0 auto;
  box-shadow: 0 6px 32px 0 rgba(31, 38, 135, 0.10);
  background: rgba(255,255,255,0.28);
  backdrop-filter: blur(10px);
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.correct-feedback {
  background: linear-gradient(135deg, #a8e063 0%, #56ab2f 100%, rgba(255,255,255,0.28));
  color: #fff;
  border: none;
}

.incorrect-feedback {
  background: linear-gradient(135deg, #ff5858 0%, #f09819 100%, rgba(255,255,255,0.28));
  color: #fff;
  border: none;
}

.practice-info {
  margin: 20px 0;
  padding: 18px;
  background: rgba(255,255,255,0.22);
  border-radius: 14px;
  text-align: left;
  color: #fff;
  font-size: 1.08rem;
  box-shadow: none;
}

.continue-btn {
  margin-top: 24px;
  padding: 14px 48px;
  font-size: 1.15rem;
  font-weight: bold;
  border-radius: 28px;
  border: none;
  color: #fff;
  box-shadow: 0 2px 8px rgba(80, 80, 120, 0.13);
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  letter-spacing: 1.2px;
  text-shadow: 0 2px 8px rgba(80, 80, 120, 0.13);
}
.correct-feedback .continue-btn {
  background: linear-gradient(90deg, #74b9ff 0%, #a29bfe 100%);
}
.correct-feedback .continue-btn:hover {
  background: linear-gradient(90deg, #4e8cff 0%, #6c5ce7 100%);
  transform: scale(1.04);
}
.incorrect-feedback .continue-btn {
  background: linear-gradient(90deg, #ffd86f 0%, #ff9a44 100%);
  color: #fff;
}
.incorrect-feedback .continue-btn:hover {
  background: linear-gradient(90deg, #ffb347 0%, #ff6e7f 100%);
  transform: scale(1.04);
}

/* Game Over Screen */
.gameover-screen {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #74b9ff 0%, #a29bfe 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #222;
  text-align: center;
  overflow-y: auto;
  padding: 0;
}

.gameover-card {
  background: rgba(255,255,255,0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(10px);
  border-radius: 32px;
  padding: 48px 36px 36px 36px;
  max-width: 480px;
  margin: 48px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gameover-card h2 {
  font-size: 2.4rem;
  font-weight: bold;
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 18px;
  text-shadow: 0 2px 8px rgba(118, 75, 162, 0.12);
}

.results-summary {
  margin: 18px 0 10px 0;
  font-size: 1.15rem;
  color: #333;
}

.knowledge-summary {
  margin: 18px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.knowledge-bar {
  width: 90%;
  height: 18px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0 4px 0;
}
.knowledge-progress {
  height: 100%;
  background: linear-gradient(90deg, #43e97b, #38f9d7, #a29bfe);
  transition: width 1s ease;
}
.knowledge-text {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.practice-review {
  width: 100%;
  max-width: 420px;
  margin: 18px 0 0 0;
}
.practice-review h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.practices-list {
  background: rgba(255,255,255,0.18);
  border-radius: 14px;
  padding: 12px 10px;
  max-height: 180px;
  overflow-y: auto;
  margin-bottom: 8px;
}
.practice-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.practice-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.practice-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  font-weight: bold;
  flex-shrink: 0;
  font-size: 1.2em;
}
.good-icon {
  background-color: #43e97b;
  color: white;
}
.bad-icon {
  background-color: #ff7675;
  color: white;
}
.practice-detail {
  flex: 1;
  text-align: left;
}
.practice-text {
  font-weight: bold;
  margin-bottom: 2px;
  font-size: 1rem;
}
.practice-explanation {
  font-size: 0.97rem;
  opacity: 0.92;
}

.restart-btn {
  display: block;
  margin: 32px auto 0 auto;
  padding: 14px 44px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 28px;
  border: none;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 16px rgba(118, 75, 162, 0.18);
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.restart-btn:hover {
  background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .gameover-card {
    padding: 18px 6px 18px 6px;
    max-width: 98vw;
  }
  .practice-review {
    max-width: 98vw;
  }
  .restart-btn {
    padding: 10px 18px;
    font-size: 1rem;
  }
}

.ready-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f8f9fa;
  color: #333;
  font-size: 2em;
  font-weight: bold;
}
.countdown-number {
  font-size: 5rem;
  color: #333;
  animation: pulse 1s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
}

.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.5s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.fade-scale-enter-to, .fade-scale-leave-from {
  transform: scale(1.2);
  opacity: 1;
}
.countdown-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 40px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}

.countdown-number {
  font-size: 4rem;
  color: #333;
  animation: pulse 1s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
}

.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  transform: scale(0.7);
  opacity: 0;
}
.fade-scale-enter-to, .fade-scale-leave-from {
  transform: scale(1.2);
  opacity: 1;
}

/* 反馈模态框样式 */
.feedback-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(17, 24, 39, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.feedback-modal {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.feedback-modal.correct-feedback {
  border: none;
  background: linear-gradient(145deg, #ffffff, #f0fff4);
  box-shadow: 0 20px 40px rgba(72, 187, 120, 0.2);
}

.feedback-modal.incorrect-feedback {
  border: none;
  background: linear-gradient(145deg, #ffffff, #fff5f5);
  box-shadow: 0 20px 40px rgba(245, 101, 101, 0.2);
}

.feedback-modal h2 {
  margin: 0 0 1.5rem 0;
  font-size: 2.2rem;
  font-weight: 800;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.correct-feedback h2 {
  color: #48bb78;
}

.incorrect-feedback h2 {
  color: #f56565;
}

.feedback-modal .practice-info {
  background: linear-gradient(145deg, #f7fafc, #edf2f7);
  padding: 1.8rem;
  border-radius: 16px;
  margin: 1.5rem 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.feedback-modal .practice-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.feedback-modal .practice-type {
  color: #4a5568;
  margin: 1rem 0;
  font-size: 1.1rem;
}

.feedback-modal .practice-explanation {
  color: #4a5568;
  line-height: 1.7;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.feedback-modal .practice-info strong {
  color: #4299e1;
  font-weight: 700;
}

.correct-feedback .practice-info strong {
  color: #38a169;
}

.incorrect-feedback .practice-info strong {
  color: #e53e3e;
}

.feedback-modal .continue-btn {
  background: linear-gradient(145deg, #4299e1, #3182ce);
  color: white;
  border: none;
  padding: 1rem 2.8rem;
  border-radius: 9999px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
}

.correct-feedback .continue-btn {
  background: linear-gradient(145deg, #48bb78, #38a169);
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.incorrect-feedback .continue-btn {
  background: linear-gradient(145deg, #f56565, #e53e3e);
  box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
}

.feedback-modal .continue-btn:hover {
  transform: translateY(-2px);
  filter: brightness(110%);
}

.feedback-modal .continue-btn:active {
  transform: translateY(1px);
}

/* 添加过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
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
      <h1>Cyber Decision Snake</h1>
      <p>Navigate your snake to the correct symbol based on the cybersecurity practice!</p>
      
      <div class="instructions">
        <h3>How to play:</h3>
        <ol>
  <li>A scenario about online interactions will appear at the top of the screen</li>
  <li>Use arrow keys or on-screen buttons to move your snake</li>
  <li>Move toward the <span class="good-practice">✓</span> if it's a <strong>safe or smart choice</strong></li>
  <li>Move toward the <span class="bad-practice">✗</span> if it's an <strong>unsafe or risky choice</strong></li>
  <li>Learn to recognize signs of online grooming and protect yourself!</li>
</ol>
      </div>
      
      <div class="difficulty-select">
        <h3>Select Difficulty:</h3>
        <div class="difficulty-buttons">
          <button 
            @click="setDifficulty('easy')" 
            :class="['difficulty-btn', selectedDifficulty === 'easy' ? 'selected' : '']"
          >
            Easy
          </button>
          <button 
            @click="setDifficulty('medium')" 
            :class="['difficulty-btn', selectedDifficulty === 'medium' ? 'selected' : '']"
          >
            Medium
          </button>
          <button 
            @click="setDifficulty('hard')" 
            :class="['difficulty-btn', selectedDifficulty === 'hard' ? 'selected' : '']"
          >
            Hard
          </button>
        </div>
      </div>
      
      <button @click="startGame" class="start-btn">Start Game</button>
    </div>

    <!-- Main Game Screen -->
    <div v-else-if="gameState === 'playing'" class="game-screen game-play-screen">
      <div class="game-info">
        <div class="score-display">Score: {{ score }}</div>
        <div class="lives-display">Lives: <span v-for="n in lives" :key="n">❤️</span></div>
      </div>
      
      <div class="practice-display">
        <div class="practice-text">{{ currentPractice.text }}</div>
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
    </div>

    <!-- Feedback Screen -->
    <div v-else-if="gameState === 'feedback'" class="game-screen feedback-screen">
      <div :class="['feedback-container', lastDecisionCorrect ? 'correct-feedback' : 'incorrect-feedback']">
        <h2>{{ lastDecisionCorrect ? 'Correct!' : 'Incorrect!' }}</h2>
        <div class="practice-info">
          <p>"{{ lastPractice.text }}" is a {{ lastPractice.isGood ? 'good' : 'bad' }} practice.</p>
          <p>{{ lastPractice.explanation }}</p>
        </div>
        <button @click="continuePlaying" class="continue-btn">Continue</button>
      </div>
    </div>

    <!-- Game Over Screen -->
    <div v-else-if="gameState === 'gameover'" class="game-screen gameover-screen">
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
  text: "Use a nickname or screen name that doesn’t reveal your identity",
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
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  height: 100%; /* <-- ADD THIS */
  min-height: 100vh; /* <-- ENSURE at least full screen */
  display: flex;
  flex-direction: column;
}

.practice-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.practice-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-weight: bold;
  flex-shrink: 0;
}

.good-icon {
  background-color: #28a745;
  color: white;
}

.bad-icon {
  background-color: #dc3545;
  color: white;
}

.practice-detail {
  flex: 1;
  text-align: left;
}

.practice-text {
  font-weight: bold;
  margin-bottom: 5px;
}

.practice-explanation {
  font-size: 14px;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 600px) {
  .game-controls {
    margin-top: 10px;
  }
  
  .control-btn {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .practice-display {
    padding: 10px;
  }
  
  .practice-text {
    font-size: 16px;
  }
  
  .feedback-container {
    max-width: 90%;
    padding: 15px;
  }
}


.game-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  z-index: 9999;
}

/* Start Screen */
.start-screen {
  background: linear-gradient(135deg, #4a90e2, #5433FF);
  color: white;
  text-align: center;
  justify-content: center;
}

.instructions {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: left;
  max-width: 500px;
}

.good-practice {
  color: #28a745;
  font-weight: bold;
}

.bad-practice {
  color: #dc3545;
  font-weight: bold;
}

.difficulty-select {
  margin: 20px 0;
}

.difficulty-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.difficulty-btn {
  padding: 8px 20px;
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.difficulty-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.difficulty-btn.selected {
  background-color: white;
  color: #4a90e2;
  font-weight: bold;
}

.start-btn, .continue-btn, .restart-btn {
  padding: 12px 30px;
  background-color: white;
  color: #4a90e2;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  margin-top: 20px;
}

.start-btn:hover, .continue-btn:hover, .restart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
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
  width: 100%;
  padding: 15px;
  background-color: #333;
  color: white;
  border-radius: 10px;
  margin-bottom: 15px;
  text-align: center;
}

.practice-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.timer-bar {
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.timer-progress {
  height: 100%;
  background: linear-gradient(90deg, #ff7675, #fd79a8, #a29bfe, #74b9ff);
  transition: width 1s linear;
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
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
}

.feedback-container {
  max-width: 500px;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
}

.correct-feedback {
  background-color: #28a745;
  color: white;
}

.incorrect-feedback {
  background-color: #dc3545;
  color: white;
}

.practice-info {
  margin: 20px 0;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  text-align: left;
}

/* Game Over Screen */
.gameover-screen {
  background: linear-gradient(135deg, #4a90e2, #5433FF);
  color: white;
  text-align: center;
  overflow-y: auto;
}

.results-summary {
  margin: 20px 0;
  font-size: 18px;
}

.knowledge-summary {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.knowledge-bar {
  width: 80%;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.knowledge-progress {
  height: 100%;
  background: linear-gradient(90deg, #74b9ff, #a29bfe, #fd79a8);
  transition: width 1s ease;
}

.knowledge-text {
  font-size: 18px;
  font-weight: bold;
}

.practice-review {
  max-width: 600px;
  margin: 20px 0;
}

.practices-list {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  max-height: 300px;
  overflow-y: auto;
};

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


</style>
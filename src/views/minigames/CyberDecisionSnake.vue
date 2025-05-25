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
    <div v-else-if="gameState === 'start'" class="snake-landing-outer">
      <div class="snake-landing-header">
        <h1 class="game-title">Cyber Decision Snake</h1>
        <p class="game-slogan">Navigate your snake to make smart choices about online safety!</p>
      </div>
      <div class="snake-landing-main">
        <div class="snake-card">
          <div class="snake-image-container">
            <img src="@/assets/images/snake.png" alt="Snake Game" class="snake-img" />
            <div class="snake-card-overlay">
              <div class="pulse-circle"></div>
              <div class="pulse-circle delay-1"></div>
              <div class="pulse-circle delay-2"></div>
            </div>
          </div>
        </div>
        <div class="rule-card">
          <h3>How to play:</h3>
          <ul class="instructions-list">
            <li class="instruction-item">
              <span class="icon-bullet" style="background:#6366f1"><span>🧑‍💻</span></span>
              <span class="instruction-text">Read the cybersecurity scenario at the top</span>
            </li>
            <li class="instruction-item">
              <span class="icon-bullet" style="background:#8b5cf6"><span>🎮</span></span>
              <span class="instruction-text">Use arrow keys or touch controls to move</span>
            </li>
            <li class="instruction-item">
              <span class="icon-bullet" style="background:#22c55e"><span>✅</span></span>
              <span class="instruction-text">Go to the <span class="highlight-green">✓</span> for <strong class="highlight-green">safe choices</strong></span>
            </li>
            <li class="instruction-item">
              <span class="icon-bullet" style="background:#ef4444"><span>❌</span></span>
              <span class="instruction-text">Go to the <span class="highlight-red">✗</span> for <strong class="highlight-red">unsafe choices</strong></span>
            </li>
            <li class="instruction-item">
              <span class="icon-bullet" style="background:#f59e42"><span>🛡️</span></span>
              <span class="instruction-text">Learn to spot online risks and stay safe!</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="difficulty-section">
        <div class="difficulty-select">
          <h3>Select Difficulty:</h3>
          <div class="difficulty-buttons">
            <button @click="setDifficulty('easy')" :class="['difficulty-btn', selectedDifficulty === 'easy' ? 'selected' : '']">
              <span class="difficulty-icon">😌</span>
              <span class="difficulty-text">Easy</span>
            </button>
            <button @click="setDifficulty('medium')" :class="['difficulty-btn', selectedDifficulty === 'medium' ? 'selected' : '']">
              <span class="difficulty-icon">😎</span>
              <span class="difficulty-text">Medium</span>
            </button>
            <button @click="setDifficulty('hard')" :class="['difficulty-btn', selectedDifficulty === 'hard' ? 'selected' : '']">
              <span class="difficulty-icon">🔥</span>
              <span class="difficulty-text">Hard</span>
            </button>
          </div>
        </div>
        <button @click="startGame" class="start-btn">
          <span class="start-icon">🎮</span>
          <span>Start Game</span>
        </button>
      </div>
    </div>

    <!-- Main Game Screen -->
    <div v-if="gameState === 'playing' || gameState === 'feedback'" class="game-screen game-play-screen">
      <div class="game-header">
        <div class="game-info">
          <div class="score-display">
            <span class="score-icon">🏆</span>
            <span class="score-text">{{ score }}</span>
          </div>
          <div class="lives-display">
            <span v-for="n in maxLives" :key="n" :class="['life-heart', n <= lives ? 'active' : '']">
              {{ n <= lives ? '❤️' : '🖤' }}
            </span>
          </div>
        </div>
        
        <div class="practice-display">
          <div class="practice-title">🎯 Current Scenario</div>
          <div class="practice-text">{{ currentPractice.text }}</div>
        </div>
        <div class="timer-bar-wrapper">
          <div class="timer-bar">
            <div class="timer-progress" :style="{ width: timerWidth + '%' }"></div>
          </div>
          <div class="timer-text">Time remaining</div>
        </div>
      </div>

      <div class="game-board-container">
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
        <span v-if="isGoodTarget(rowIndex, colIndex)" class="target-icon">✓</span>
        <span v-if="isBadTarget(rowIndex, colIndex)" class="target-icon">✗</span>
      </div>
    </div>
  </div>
  
  <div class="game-controls-container">
    <div class="game-action-buttons">
      <button @click="togglePause" class="action-btn pause-btn" aria-label="Pause/Play">
        <svg v-if="!pauseState" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M10 4H6v16h4V4zm8 0h-4v16h4V4z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </button>
    </div>
    
    <div class="game-controls">
      <button disabled class="control-btn up-btn" aria-label="Move Up">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
      <div class="horizontal-controls">
        <button disabled class="control-btn left-btn" aria-label="Move Left">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <button disabled class="control-btn right-btn" aria-label="Move Right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <button disabled class="control-btn down-btn" aria-label="Move Down">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </button>
        <!-- Instructional Text -->
      <p class="keyboard-tip">Use arrow keys on your keyboard to move</p>
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

      <!-- Feedback Modal -->
      <transition name="fade">
        <div v-if="gameState === 'feedback'" class="feedback-modal-overlay">
          <div class="feedback-modal" :class="[
            lastDecisionCorrect ? 'correct-feedback' : 'incorrect-feedback'
          ]">
            <div class="feedback-header">
              <div class="feedback-icon">{{ lastDecisionCorrect ? '🎉' : '🤔' }}</div>
              <h2>{{ lastDecisionCorrect ? 'Well Done!' : 'Think Again!' }}</h2>
            </div>
            <div class="practice-info">
              <p class="practice-text">"{{ lastPractice.text }}"</p>
              <div class="practice-verdict" :class="lastPractice.isGood ? 'good-verdict' : 'bad-verdict'">
                This is a <strong>{{ lastPractice.isGood ? 'SAFE' : 'RISKY' }}</strong> online behavior
              </div>
              <p class="practice-explanation">{{ lastPractice.explanation }}</p>
            </div>
            <button @click="continuePlaying" class="continue-btn">
              <span>Continue</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Game Over Screen -->
    <div v-else-if="gameState === 'gameover'" class="game-screen gameover-screen">
      <div class="gameover-card">
        <div class="gameover-header">
          <div class="gameover-icon">🏁</div>
          <h2>Game Over!</h2>
        </div>
        
        <div class="results-summary">
          <div class="result-item">
            <span class="result-label">Final Score:</span>
            <span class="result-value">{{ score }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Correct Decisions:</span>
            <span class="result-value correct">{{ correctDecisions }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Incorrect Decisions:</span>
            <span class="result-value incorrect">{{ incorrectDecisions }}</span>
          </div>
        </div>
        
        <div class="knowledge-summary">
          <h3>Cybersecurity Knowledge:</h3>
          <div class="knowledge-bar">
            <div class="knowledge-progress" :style="{ width: knowledgePercentage + '%' }"></div>
            <div class="knowledge-text">{{ knowledgePercentage }}%</div>
          </div>
          <div class="knowledge-level">{{ getKnowledgeLevel }}</div>
        </div>
        <div class="practice-review">
          <h3>Key Online Safety Tips:</h3>
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
        
        <div class="gameover-actions">
          <button @click="resetGame" class="restart-btn">
            <span class="btn-icon">🔄</span>
            <span>Play Again</span>
          </button>
          <button @click="shareScore" class="share-btn">
            <span class="btn-icon">📱</span>
            <span>View Score</span>
          </button>
        </div>
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
      maxLives: 3,
      selectedDifficulty: 'medium',
      gameSpeed: 280, // milliseconds between moves - slower than original for better playability
      boardSize: { // Optimized board sizes for different difficulties
        easy: 10,
        medium: 12,
        hard: 15,
      },
      currentBoardSize: 12, // Will be set based on difficulty
      pauseState: false,
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
      timerDuration: 25, // seconds - increased from original for better playability
      reviewPractices: [],
      countdownNumber: 3,
      isCountingDown: false,
      
      // Enhanced database of cybersecurity practices with more teen-focused scenarios
      // Enhanced database of cybersecurity practices focused on online grooming
practicesDatabase: [
  // Good practices (safe responses to potential grooming)
  {
    text: "Tell a trusted adult if someone online asks for private photos",
    isGood: true,
    explanation: "Reporting inappropriate requests helps keep you and others safe from potential predators."
  },
  {
    text: "Block and report users who make you uncomfortable online",
    isGood: true,
    explanation: "You have the right to feel safe online and reporting helps platforms identify harmful users."
  },
  {
    text: "Only accept friend requests from people you know in real life",
    isGood: true,
    explanation: "This reduces the risk of connecting with someone who might have harmful intentions."
  },
  {
    text: "Keep your social media profiles private",
    isGood: true,
    explanation: "This limits the personal information that strangers can see about you."
  },
  {
    text: "Refuse to share personal details like your school or home address",
    isGood: true,
    explanation: "This information could be used to locate you in real life."
  },
  {
    text: "Tell someone if an online contact wants to keep your conversations secret",
    isGood: true,
    explanation: "Secrecy is often a warning sign that someone knows their behavior is inappropriate."
  },
  {
    text: "Use a nickname instead of your real name in games and forums",
    isGood: true,
    explanation: "This helps protect your identity from people with bad intentions."
  },
  // Bad practices (unsafe responses to potential grooming)
  {
    text: "Continue chatting with someone who asks inappropriate questions",
    isGood: false,
    explanation: "Inappropriate questions are a warning sign. It's best to end contact and tell a trusted adult."
  },
  {
    text: "Share photos of yourself when someone online insists",
    isGood: false,
    explanation: "No matter how much they pressure you, it's never safe to send photos to strangers online."
  },
  {
    text: "Keep it secret when an online friend asks you not to tell anyone about your conversations",
    isGood: false,
    explanation: "Requests for secrecy are a major warning sign of grooming behavior."
  },
  {
    text: "Agree to meet an online friend in person without telling an adult",
    isGood: false,
    explanation: "Meeting online contacts in person can be extremely dangerous without adult supervision."
  },
  {
    text: "Give personal information to someone who seems trustworthy online",
    isGood: false,
    explanation: "Groomers are skilled at building false trust to gather information about potential victims."
  },
  {
    text: "Accept gifts or game currency from people you've met online",
    isGood: false,
    explanation: "Predators often use gifts to build trust and make you feel obligated to them."
  },
  {
    text: "Talk about personal problems with someone you just met online",
    isGood: false,
    explanation: "Groomers look for vulnerable targets and often pretend to be understanding of problems."
  },
  {
    text: "Believe someone who says they're the same age as you without proof",
    isGood: false, 
    explanation: "Adults often pretend to be younger online to gain trust and manipulate young people."
  }
]
    };
  },
  computed: {
    knowledgePercentage() {
      if (this.correctDecisions + this.incorrectDecisions === 0) return 0;
      return Math.round((this.correctDecisions / (this.correctDecisions + this.incorrectDecisions)) * 100);
    },
    getKnowledgeLevel() {
      const percentage = this.knowledgePercentage;
      if (percentage >= 90) return "Online Security Expert! 🏆";
      if (percentage >= 75) return "Safety Champion! 🥇";
      if (percentage >= 60) return "Security Savvy! 🔒";
      if (percentage >= 40) return "Learning the Basics 📚";
      return "Needs Practice 🔍";
    }
  },
  mounted() {
    console.log('Game component mounted', this.gameState);
    // Add event listeners for keyboard, touch events, etc.
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    clearInterval(this.gameLoop);
    clearInterval(this.timerInterval);
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    setDifficulty(level) {
      this.selectedDifficulty = level;
      
      // Adjust game parameters based on difficulty
      switch(level) {
        case 'easy':
          this.gameSpeed = 400; // Slower for easier gameplay
          this.currentBoardSize = this.boardSize.easy;
          this.timerDuration = 30; // More time on easy mode
          break;
        case 'medium':
          this.gameSpeed = 350;
          this.currentBoardSize = this.boardSize.medium;
          this.timerDuration = 25;
          break;
        case 'hard':
          this.gameSpeed = 300; // Still faster than original but more playable
          this.currentBoardSize = this.boardSize.hard;
          this.timerDuration = 20; // Less time on hard mode
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
        this.pauseState = false;
        console.log('Practice selected');
        
        // Start with countdown
        this.gameState = 'ready';
        this.countdownNumber = 3;
        this.isCountingDown = true;
        
        const countdownInterval = setInterval(() => {
          this.countdownNumber--;
          if (this.countdownNumber <= 0) {
            clearInterval(countdownInterval);
            this.isCountingDown = false;
            this.gameState = 'playing';
            this.startTimer();
            
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
          }
        }, 1000);
        
        // Reset game stats
        this.score = 0;
        this.lives = this.maxLives;
        this.correctDecisions = 0;
        this.incorrectDecisions = 0;
        this.practicesEncountered = [];
        
        console.log('Game initialized');
      } catch (error) {
        console.error('Error in startGame:', error);
      }
    },
    togglePause() {
  this.pauseState = !this.pauseState;
  
  if (this.pauseState) {
    // Pause the game
    clearInterval(this.gameLoop);
    clearInterval(this.timerInterval);
  } else {
    // Resume the game
    this.gameLoop = setInterval(() => {
      this.moveSnake();
    }, this.gameSpeed);
    
    // Resume the timer with current width
    const intervalTime = 100;
    const totalIntervals = this.timerDuration * 1000 / intervalTime;
    const decrement = 100 / totalIntervals;
    
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
    }, intervalTime);
  }
},
    initializeBoard() {
      this.board = [];
      for (let i = 0; i < this.currentBoardSize; i++) {
        const row = [];
        for (let j = 0; j < this.currentBoardSize; j++) {
          // Add walls around the edges
          if (i === 0 || i === this.currentBoardSize - 1 || j === 0 || j === this.currentBoardSize - 1) {
            row.push('wall');
          } else {
            row.push(null);
          }
        }
        this.board.push(row);
      }
    },
    
    initializeSnake() {
      const middle = Math.floor(this.currentBoardSize / 2);
      // Make the snake shorter to start - easier to control
      this.snake = [
        [middle, middle],
        [middle, middle - 1]
      ];
      this.direction = 'right';
      this.nextDirection = 'right';
    },
    
    placeTargets() {
      // Find available positions (not occupied by snake or walls)
      const availablePositions = [];
      for (let i = 0; i < this.currentBoardSize; i++) {
        for (let j = 0; j < this.currentBoardSize; j++) {
          if (this.board[i][j] !== 'wall' && !this.isSnakePosition(i, j)) {
            availablePositions.push([i, j]);
          }
        }
      }
      
      if (availablePositions.length >= 2) {
        // Make sure targets aren't too close to each other or the snake
        // First, place good target
        const goodIndex = Math.floor(Math.random() * availablePositions.length);
        this.goodTargetPosition = availablePositions[goodIndex];
        
        // Remove positions too close to good target
        const filteredPositions = availablePositions.filter((pos, index) => {
          if (index === goodIndex) return false;
          
          // Calculate distance from good target
          const distance = Math.abs(pos[0] - this.goodTargetPosition[0]) + 
                          Math.abs(pos[1] - this.goodTargetPosition[1]);
          
          // Only keep positions that are at least 3 cells away
          return distance >= 3;
        });
        
        // Place bad target
        if (filteredPositions.length > 0) {
          const badIndex = Math.floor(Math.random() * filteredPositions.length);
          this.badTargetPosition = filteredPositions[badIndex];
        } else {
          // Fallback if no good positions found
          availablePositions.splice(goodIndex, 1);
          const badIndex = Math.floor(Math.random() * availablePositions.length);
          this.badTargetPosition = availablePositions[badIndex];
        }
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
      
      const intervalTime = 100; // Update timer more frequently for smoother animation
      const totalIntervals = this.timerDuration * 1000 / intervalTime;
      const decrement = 100 / totalIntervals;
      
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
      }, intervalTime);
    },
    
    handleKeyDown(event) {
      if (this.gameState !== 'playing') return;
      
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
      
      // Always move the head
      this.snake.unshift(head);
      
      if (hitGoodTarget || hitBadTarget) {
        clearInterval(this.timerInterval);
        clearInterval(this.gameLoop);
        
        const correctDecision = (hitGoodTarget && this.currentPractice.isGood) ||
                               (hitBadTarget && !this.currentPractice.isGood);
        
        if (correctDecision) {
          // Add visual/audio feedback
          this.score += this.selectedDifficulty === 'easy' ? 5 : 
                        this.selectedDifficulty === 'medium' ? 10 : 15;
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
        
        // Don't pop the tail - snake grows on both targets
        this.goodTargetPosition = null;
        this.badTargetPosition = null;
        
        return; // Stop further movement
      }
      
      // If not eating target, normal move: pop the tail
      this.snake.pop();
    },
    
    handleCollision() {
      // Play collision sound
      this.lives--;
      
      if (this.lives <= 0) {
        this.endGame();
      } else {
        clearInterval(this.gameLoop);
        clearInterval(this.timerInterval);
        
        // Instead of resetting snake position entirely, just revert to initial position
        this.initializeSnake();
        this.placeTargets();
        
        // Keep the current practice - gives player another chance with same question
        
        // Start countdown overlay
        this.countdownNumber = 3;
        this.isCountingDown = true;
        
        const countdownInterval = setInterval(() => {
          this.countdownNumber--;
          if (this.countdownNumber <= 0) {
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
  this.initializeSnake(); // Add this line to reset snake position first
  this.placeTargets();    // Then place targets so they won't overlap
  this.selectPractice();
  this.startTimer();
  this.pauseState = false;
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
      // Sort to show correct practices first, then incorrect ones
      const sortedPractices = [...this.practicesEncountered]
        .sort((a, b) => (b.isGood ? 1 : 0) - (a.isGood ? 1 : 0))
        .slice(-5); // Last 5 practices
      
      this.reviewPractices = sortedPractices;
      
      this.gameState = 'gameover';
    },
    
    shareScore() {
      // Would implement actual sharing functionality here
      // For now, just show an alert
      alert(`You scored ${this.score} points with ${this.knowledgePercentage}% knowledge in Cyber Decision Snake! 🐍`);
    },
    
    resetGame() {
      console.log('Resetting game to start state');
      this.gameState = 'start';
      // Reset all game state variables
      this.score = 0;
      this.lives = this.maxLives;
      this.correctDecisions = 0;
      this.incorrectDecisions = 0;
      this.practicesEncountered = [];
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
  }
};
</script>

<style scoped>
:deep(html), :deep(body), :deep(#app), :deep(.v-application) {
  min-height: 100vh !important;
  height: auto !important;
  max-height: none !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

.cyber-snake-game {
  background: linear-gradient(135deg, #2b3141 0%, #1a202c 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  color: #e2e8f0;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.keyboard-tip {
  margin-top: 8px;
  font-size: 0.95rem;
  color: #cbd5e1;
  text-align: center;
  font-style: italic;
}
.control-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Start Screen */
.snake-landing-outer {
  min-height: calc(100vh - 64px);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #2b3141 0%, #1a202c 100%);
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 0 16px;
}

.snake-landing-header {
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.game-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  letter-spacing: 2px;
  text-shadow: 0 2px 12px rgba(56, 189, 248, 0.4);
  animation: pulse-title 3s infinite ease-in-out;
}

@keyframes pulse-title {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

.game-slogan {
  font-size: 1.3rem;
  color: #a5b4fc;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 0;
  max-width: 650px;
}

.snake-landing-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  min-height: 0;
  padding: 0 4vw;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
}

.snake-card, .rule-card {
  width: 480px;
  height: 480px;
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.snake-card::before, .rule-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  z-index: 2;
}

.snake-image-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snake-img {
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
}

.snake-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-circle {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.1);
  animation: pulse-animation 3s infinite;
}

.delay-1 {
  animation-delay: 1s;
}

.delay-2 {
  animation-delay: 2s;
}

@keyframes pulse-animation {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.8;
  }
}
.rule-card h3 {
  font-weight: 700;
  margin-bottom: 28px;
  color: #a5b4fc;
  text-align: left;
  width: 100%;
  font-size: 1.5rem;
  position: relative;
}

.rule-card h3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  border-radius: 4px;
}

.instructions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 1.05rem;
  border-radius: 12px;
  padding: 8px;
  cursor: default;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.instruction-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.icon-bullet {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.3em;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.instruction-item:hover .icon-bullet {
  transform: scale(1.1);
}

.instruction-text {
  flex: 1;
  line-height: 1.6;
  color: #e2e8f0;
  font-size: 1rem;
}

.highlight-green {
  color: #34d399;
  font-weight: 700;
}

.highlight-red {
  color: #f87171;
  font-weight: 700;
}

.difficulty-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  max-width: 680px;
}

.difficulty-select {
  margin-bottom: 32px;
  text-align: center;
  width: 100%;
}

.difficulty-select h3 {
  margin-bottom: 16px;
  font-size: 1.3rem;
  color: #a5b4fc;
  font-weight: 600;
}

.difficulty-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.difficulty-btn {
  border: none;
  border-radius: 16px;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  color: #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.difficulty-btn.selected {
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.3);
  transform: translateY(-4px);
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  z-index: 1;
}

.difficulty-btn:hover:not(.selected) {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
}

.difficulty-icon {
  font-size: 1.3rem;
  margin-right: 6px;
}

.start-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 auto;
  padding: 18px 48px;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(56, 189, 248, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.start-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.5s ease;
}

.start-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(56, 189, 248, 0.4);
}

.start-btn:hover::before {
  left: 100%;
}

.start-icon {
  font-size: 1.4rem;
}

@media (max-width: 1100px) {
  .snake-card, .rule-card {
    width: 400px;
    height: 400px;
    padding: 24px;
  }
  
  .snake-landing-main {
    gap: 24px;
  }
  
  .game-title {
    font-size: 2.8rem;
  }
  
  .game-slogan {
    font-size: 1.1rem;
  }
}

@media (max-width: 900px) {
  .snake-landing-main {
    flex-direction: column;
    gap: 32px;
  }
  
  .snake-card, .rule-card {
    width: 90%;
    max-width: 480px;
    height: auto;
    min-height: 320px;
  }
  
  .snake-img {
    max-height: 220px;
  }
  
  .difficulty-buttons {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .game-title {
    font-size: 2.2rem;
  }
  
  .game-slogan {
    font-size: 1rem;
  }
  
  .difficulty-btn {
    padding: 10px 16px;
    font-size: 1rem;
  }
  
  .start-btn {
    padding: 14px 32px;
    font-size: 1.1rem;
  }
  
  .snake-landing-header {
    margin-top: 20px;
    margin-bottom: 16px;
  }
}

/* Game Play Screen */
.game-play-screen {
  background-color: #111827;
  justify-content: flex-start;
  padding: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  position: relative;
}

.game-header {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.game-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.score-display, .lives-display {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 10px 20px;
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  color: #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.score-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.score-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
}

.life-heart {
  margin: 0 3px;
  transition: all 0.3s ease;
}

.life-heart.active {
  animation: beat 1.5s ease infinite;
}

@keyframes beat {
  0% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
}

.practice-display {
  margin: 24px auto;
  padding: 24px;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  max-width: 800px;
  text-align: center;
  position: relative;
  border: 2px solid #3b82f6;
  animation: glow 3s infinite alternate;
}

@keyframes glow {
  0% { box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2); }
  100% { box-shadow: 0 8px 32px rgba(59, 130, 246, 0.5); }
}

.practice-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #93c5fd;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.practice-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  line-height: 1.4;
}

.timer-bar-wrapper {
  width: 100%;
  max-width: 500px;
  margin: 0 auto 24px auto;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timer-bar {
  width: 100%;
  height: 12px;
  background: #1f2937;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

.timer-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  transition: width 0.1s linear;
  border-radius: 6px;
}

.timer-text {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-top: 8px;
}

.game-board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  gap: 24px;
  flex-wrap: wrap;
}

.game-board {
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 500px;
  background-color: #1f2937;
  border: 3px solid #3b82f6;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  outline: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  flex-shrink: 0;
}

.game-controls-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.game-action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.action-btn {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.action-btn:active {
  transform: translateY(1px);
}

.action-btn svg {
  width: 28px;
  height: 28px;
}

.game-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.horizontal-controls {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.control-btn {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  color: #e2e8f0;
  border: none;
  border-radius: 12px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.control-btn svg {
  width: 28px;
  height: 28px;
}

.control-btn:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  transform: translateY(-2px);
}

.control-btn:active {
  transform: translateY(1px);
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}

/* Add media queries to handle mobile layout */
@media (max-width: 900px) {
  .game-board-container {
    flex-direction: column;
  }
  
  .game-controls-container {
    flex-direction: row;
    width: 100%;
    max-width: 500px;
    margin-top: 24px;
  }
  
  .game-action-buttons {
    margin-bottom: 0;
  }
}

@media (max-width: 500px) {
  .game-controls-container {
    flex-direction: column;
    gap: 16px;
  }
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
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-width: 20px;
  min-height: 20px;
  position: relative;
  overflow: hidden;
}

.snake-head {
  background-color: #3b82f6;
  border-radius: 4px;
  z-index: 2;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

.snake-head::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 20%;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 50%;
  z-index: 3;
}

.snake-body {
  background-color: #60a5fa;
  border-radius: 4px;
  z-index: 1;
}

.good-target {
  background-color: #10b981;
  color: white;
  border-radius: 50%;
  z-index: 2;
  animation: pulse-target 2s infinite ease-in-out;
}

.bad-target {
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  z-index: 2;
  animation: pulse-target 2s infinite ease-in-out;
}

@keyframes pulse-target {
  0% { transform: scale(0.85); }
  50% { transform: scale(1); }
  100% { transform: scale(0.85); }
}

.target-icon {
  font-size: 1.2rem;
  font-weight: 900;
}

.wall {
  background-color: #4b5563;
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%, transparent);
  background-size: 10px 10px;
}


/* Feedback Modal */
.feedback-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(17, 24, 39, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.feedback-modal {
  background: #1f2937;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  max-width: 550px;
  width: 90%;
  text-align: center;
  animation: modal-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid #3b82f6;
}

@keyframes modal-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.feedback-modal.correct-feedback {
  border-color: #10b981;
  background: linear-gradient(135deg, #1f2937 0%, #064e3b 100%);
}

.feedback-modal.incorrect-feedback {
  border-color: #ef4444;
  background: linear-gradient(135deg, #1f2937 0%, #7f1d1d 100%);
}

.feedback-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.feedback-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.feedback-modal h2 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 800;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.correct-feedback h2 {
  background: linear-gradient(90deg, #34d399, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.incorrect-feedback h2 {
  background: linear-gradient(90deg, #f87171, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feedback-modal .practice-info {
  background: rgba(255, 255, 255, 0.05);
  padding: 24px;
  border-radius: 16px;
  margin: 24px 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  border-left: 4px solid #3b82f6;
}

.correct-feedback .practice-info {
  border-left-color: #10b981;
}

.incorrect-feedback .practice-info {
  border-left-color: #ef4444;
}

.feedback-modal .practice-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 16px;
  line-height: 1.5;
}

.practice-verdict {
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 12px;
  border-radius: 8px;
  margin: 12px 0;
  font-weight: 600;
}

.good-verdict {
  color: #34d399;
}

.bad-verdict {
  color: #f87171;
}

.feedback-modal .practice-explanation {
  color: #94a3b8;
  line-height: 1.7;
  margin-top: 16px;
  font-size: 1.1rem;
}

.feedback-modal .continue-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 16px 36px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.correct-feedback .continue-btn {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.incorrect-feedback .continue-btn {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.feedback-modal .continue-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.feedback-modal .continue-btn:active {
  transform: translateY(-1px);
}

.feedback-modal .continue-btn svg {
  width: 20px;
  height: 20px;
}

/* Game Over Screen */
.gameover-screen {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  text-align: center;
  overflow-y: auto;
  padding: 40px 16px;
}

.gameover-card {
  background: rgba(31, 41, 55, 0.7);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(59, 130, 246, 0.5);
  animation: fade-up 0.6s ease;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.gameover-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}

.gameover-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
  animation: spin 5s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.gameover-card h2 {
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-shadow: 0 2px 12px rgba(56, 189, 248, 0.4);
}
.results-summary {
  margin: 24px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  width: 100%;
}

.result-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.result-label {
  font-size: 0.9rem;
  color: #94a3b8;
}

.result-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #e2e8f0;
}

.result-value.correct {
  color: #34d399;
}

.result-value.incorrect {
  color: #f87171;
}

.knowledge-summary {
  width: 100%;
  margin: 24px 0;
  background: rgba(255, 255, 255, 0.05);
  padding: 24px;
  border-radius: 16px;
}

.knowledge-summary h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #e2e8f0;
}

.knowledge-bar {
  width: 100%;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}

.knowledge-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.knowledge-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.knowledge-level {
  font-size: 1.1rem;
  font-weight: 600;
  color: #38bdf8;
  margin-top: 8px;
}

.practice-review {
  width: 100%;
  margin: 24px 0 0 0;
}

.practice-review h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #e2e8f0;
}

.practices-list {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.practice-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.practice-item:hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.07);
}

.practice-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  font-weight: 700;
  flex-shrink: 0;
  font-size: 1.2rem;
}

.good-icon {
  background-color: #10b981;
  color: white;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.bad-icon {
  background-color: #ef4444;
  color: white;
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}

.practice-detail {
  flex: 1;
  text-align: left;
}

.practice-detail .practice-text {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.05rem;
  color: #e2e8f0;
  line-height: 1.4;
}

.practice-detail .practice-explanation {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.5;
}

.gameover-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
  width: 100%;
}

.restart-btn, .share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 180px;
}

.restart-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.share-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.restart-btn:hover, .share-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.restart-btn:active, .share-btn:active {
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 1.2rem;
}

.ready-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: #fff;
  position: relative;
}

.countdown-number {
  font-size: 8rem;
  font-weight: 800;
  color: #fff;
  animation: zoom-pulse 1s cubic-bezier(.17,.67,.83,.67);
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

@keyframes zoom-pulse {
  0% {
    transform: scale(0.5);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

.countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 24, 39, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(5px);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from, .fade-scale-leave-to {
  transform: scale(0.7);
  opacity: 0;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .practice-display {
    padding: 16px;
  }
  
  .practice-text {
    font-size: 1.2rem;
  }
  
  .game-board {
    width: 90vw;
    max-width: 90vw;
  }
  
  .gameover-card {
    padding: 24px;
  }

  .results-summary {
    grid-template-columns: 1fr;
  }
  
  .gameover-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .restart-btn, .share-btn {
    max-width: 100%;
    width: 100%;
  }
  
  .feedback-modal {
    padding: 24px 16px;
  }
  
  .countdown-number {
    font-size: 6rem;
  }
}

@media (max-width: 480px) {
  .game-title {
    font-size: 1.8rem;
  }
  
  .practice-text {
    font-size: 1rem;
  }
  
  .control-btn {
    width: 50px;
    height: 50px;
  }
  
  .gameover-card h2 {
    font-size: 2rem;
  }
  
  .countdown-number {
    font-size: 4rem;
  }
}
</style>
<template>
  <div class="card-stack-container">
    <!-- Header Instructions Box -->
    <div class="instructions-header" v-if="!isMobileView">
      <div class="instructions-content">
          <h2>Cybersafety Practices Questionnaire</h2>
          <p>This questionnaire is designed to gauge your current cybersafety practices. Drag each card to the bubble that best represents how often you follow that practice:</p>
          <div class="bubble-legend">
          <div class="legend-item always-legend">
              <div class="legend-bubble"></div>
              <span>ALWAYS - I consistently follow this practice</span>
          </div>
          <div class="legend-item sometimes-legend">
              <div class="legend-bubble"></div>
              <span>SOMETIMES - I occasionally follow this practice</span>
          </div>
          <div class="legend-item rarely-legend">
              <div class="legend-bubble"></div>
              <span>RARELY - I seldom follow this practice</span>
          </div>
          <div class="legend-item never-legend">
              <div class="legend-bubble"></div>
              <span>NEVER - I don't follow this practice</span>
          </div>
          </div>
      </div>
    </div>

    <!-- Desktop View with Bubbles -->
    <div v-if="!isMobileView" class="card-area" 
         :style="{ height: containerHeight + 'px' }"
         @mousemove="handleMouseMove" 
         @mouseup="handleMouseUp"
         @mouseleave="handleMouseUp">
      <!-- Moving Bubbles Background -->
      <div class="bubbles-container">
          <div v-for="bubble in bubbleElements" 
              :key="`bubble-${bubble.id}`" 
              class="bubble-bg" 
              :style="{ 
                  left: bubble.left, 
                  width: bubble.size,
                  height: bubble.size,
                  animationDuration: bubble.duration,
                  animationDelay: bubble.delay,
                  background: `radial-gradient(
                  circle at 30% 30%, 
                  ${bubble.color} 0%, 
                  rgba(255, 255, 255, 0.4) 40%, 
                  rgba(255, 255, 255, 0.1) 60%
                  )`
              }">
          </div>
      </div>

      <!-- Always Bubble (Top Left) -->
      <cybersafety-bubble
        type="always"
        label="ALWAYS"
        :is-over="isOverAlwaysBubble"
        :cards-count="alwaysCards.length"
        :position="{ left: '50px', top: '30px' }"
        :base-size="baseBubbleSize"
        :expanded-size="expandedBubbleSize"
        :growth-rate="30"
      />
      
      <!-- Sometimes Bubble (Bottom Left) -->
      <cybersafety-bubble
        type="sometimes"
        label="SOMETIMES"
        :is-over="isOverSometimesBubble"
        :cards-count="sometimesCards.length"
        :position="{ left: '350px', top: '500px' }"
        :base-size="baseBubbleSize"
        :expanded-size="expandedBubbleSize"
        :growth-rate="30"
      />
      
      <!-- Rarely Bubble (Top Right) -->
      <cybersafety-bubble
        type="rarely"
        label="RARELY"
        :is-over="isOverRarelyBubble"
        :cards-count="rarelyCards.length"
        :position="{ left: '830px', top: '50px' }"
        :base-size="baseBubbleSize"
        :expanded-size="expandedBubbleSize"
        :growth-rate="30"
      />
      
      <!-- Never Bubble (Bottom Right) -->
      <cybersafety-bubble
        type="never"
        label="NEVER"
        :is-over="isOverNeverBubble"
        :cards-count="neverCards.length"
        :position="{ left: '810px', top: '540px' }"
        :base-size="baseBubbleSize"
        :expanded-size="expandedBubbleSize"
        :growth-rate="30"
      />
      
      <!-- Cards in the stack -->
      <div class="stack-origin">
        <cybersafety-card
          v-for="(card, index) in cards"
          :key="card.id"
          :content="card.content"
          :id="card.id"
          :x="card.x"
          :y="card.y"
          :is-dragging="card.isDragging"
          :placed="card.placed"
          :answered="card.answered"
          :is-correct="card.isCorrect"
          :is-button="card.isButton"
          :index="index"
          :total-cards="cards.length"
          @card-mousedown="handleCardMouseDown"
        />
      </div>
      
      <!-- Reset button -->
      <button class="reset-button" @click="resetStack">Reset Quiz</button>
    </div>

    <!-- Mobile View with Radio Buttons -->
    <div v-else class="mobile-questionnaire">
      <div class="mobile-score-display">
        <h2>Cybersafety Practices Quiz</h2>
      </div>

      <div class="mobile-questions">
        <div v-for="(card) in cards.filter(c => !c.isButton)" :key="card.id" class="mobile-question-card" 
            :class="{ 
              'mobile-correct': card.answered && card.isCorrect,
              'mobile-incorrect': card.answered && !card.isCorrect
            }">
          <p class="question-text">{{ card.content }}</p>
          
          <div class="radio-group">
            <div class="radio-option">
              <input 
                type="radio" 
                :id="'true-' + card.id" 
                :name="'question-' + card.id" 
                :value="true"
                v-model="card.userAnswer"
                @change="handleRadioChange(card, true)"
              >
              <label :for="'true-' + card.id">Yes</label>
            </div>
            
            <div class="radio-option">
              <input 
                type="radio" 
                :id="'false-' + card.id" 
                :name="'question-' + card.id" 
                :value="false"
                v-model="card.userAnswer"
                @change="handleRadioChange(card, false)"
              >
              <label :for="'false-' + card.id">No</label>
            </div>
          </div>
        </div>
      </div>
      
      <button class="mobile-results-button" @click="showResults = true">See Your Cybersafety Score</button>
      
    </div>
  </div>
</template>

<script>
import CybersafetyCard from './CybersafetyCard.vue';
import CybersafetyBubble from './CybersafetyBubble.vue';

export default {
  name: 'CardStack',
  components: {
    CybersafetyCard,
    CybersafetyBubble
  },
  props: {
    // Add these new props
    questions: {
      type: Array,
      required: true,
      default: () => []
    },
    onResponseUpdate: {
      type: Function,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      cards: [],
      dragStartX: 0,
      dragStartY: 0,
      
      // Four bubble positions
      alwaysBubbleCenter: { x: 50, y: 30 },
      sometimesBubbleCenter: { x: 350, y: 500 },
      rarelyBubbleCenter: { x: 830, y: 50 },
      neverBubbleCenter: { x: 810, y: 540 },
      
      bubbleBaseSize: 200,
      bubbleGrowthRate: 30,
      activeCardId: null,
      score: 0,
      totalAnswered: 0,
      windowWidth: window.innerWidth,
      
      // Four bubble hover states
      isOverAlwaysBubble: false,
      isOverSometimesBubble: false,
      isOverRarelyBubble: false,
      isOverNeverBubble: false,
      
      baseBubbleSize: 200,
      expandedBubbleSize: 240,
      showResults: false,

      // BG bubbles
      bubbleElements: Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${80 + Math.random() * 40}px`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
      color: `rgba(98, 200, 220, ${0.3 + Math.random() * 0.4})`
      })),
      
    }
  },
  computed: {
    // Determine if we're in mobile view
    isMobileView() {
      return this.windowWidth < 768;
    },
    
    // Get cards in each bubble
    alwaysCards() {
      return this.cards.filter(card => 
        !card.isButton && card.placed && 
        this.isCardInBubble(card, this.alwaysBubbleCenter, this.alwaysBubbleSize/2)
      );
    },
    
    sometimesCards() {
      return this.cards.filter(card => 
        !card.isButton && card.placed && 
        this.isCardInBubble(card, this.sometimesBubbleCenter, this.sometimesBubbleSize/2)
      );
    },
    
    rarelyCards() {
      return this.cards.filter(card => 
        !card.isButton && card.placed && 
        this.isCardInBubble(card, this.rarelyBubbleCenter, this.rarelyBubbleSize/2)
      );
    },
    
    neverCards() {
      return this.cards.filter(card => 
        !card.isButton && card.placed && 
        this.isCardInBubble(card, this.neverBubbleCenter, this.neverBubbleSize/2)
      );
    },
    
    // Calculate bubble sizes
    alwaysBubbleSize() {
      return this.bubbleBaseSize + (this.alwaysCards.length * this.bubbleGrowthRate);
    },
    
    sometimesBubbleSize() {
      return this.bubbleBaseSize + (this.sometimesCards.length * this.bubbleGrowthRate);
    },
    
    rarelyBubbleSize() {
      return this.bubbleBaseSize + (this.rarelyCards.length * this.bubbleGrowthRate);
    },
    
    neverBubbleSize() {
      return this.bubbleBaseSize + (this.neverCards.length * this.bubbleGrowthRate);
    },
    
    // Get computed position of stack origin
    stackOriginLeft() {
      return 515 - 120; // 515px (center) minus half card width to find left edge
    },
    
    stackOriginTop() {
      return 300 - 60; // 300px (center) minus half card height to find top edge
    },
    
    // Calculate the dynamic container height
    containerHeight() {
      // Start with base height
      let baseHeight = 800;
      
      // Calculate the bottom-most point of the sometimes bubble
      const sometimesBottom = this.sometimesBubbleCenter.y + (this.sometimesBubbleSize / 2);
      
      // Calculate the bottom-most point of the never bubble
      const neverBottom = this.neverBubbleCenter.y + (this.neverBubbleSize / 2);
      
      // Find the lowest point among these bubbles
      const lowestPoint = Math.max(sometimesBottom, neverBottom);
      
      // Add larger padding (230px) to ensure bubbles have plenty of space
      const requiredHeight = lowestPoint + 230;
      
      // If the required height is greater than base height but less than max,
      // use the required height; otherwise, use base or max as appropriate
      if (requiredHeight > baseHeight && requiredHeight < 1000) {
          return requiredHeight;
      } else if (requiredHeight >= 1000) {
          return 1000;
      } else {
          return baseHeight;
      }
    },
    
    // Calculate the score threshold
    scorePercentage() {
      if (this.totalAnswered === 0) return 0;
      return Math.round((this.score / this.totalAnswered) * 100);
    },
    
    // Determine feedback level based on score percentage
    feedbackLevel() {
      const percentage = this.scorePercentage;
      const { thresholds } = this.safetyData;
      
      if (percentage >= thresholds.high) return 'high';
      if (percentage >= thresholds.medium) return 'medium';
      return 'low';
    }
  },
  methods: {
      // Initialize cards from the JSON data
      initializeCardsFromProps() {
        const cards = [];
        // Create a card for each question
        this.questions.forEach((question, index) => {
          cards.push({
            id: index + 1,
            content: question.text,
            x: 0,
            y: 0,
            isDragging: false,
            placed: false,
            answered: false,
            isCorrect: false,
            correctAnswer: this.determineCorrectAnswer(question.importance),
            userAnswer: null,
            categoryId: question.categoryId,
            questionIndex: question.questionIndex,
            importance: question.importance
          });
        });
        
        // Add the results button
        cards.push({
          id: this.questions.length + 1,
          content: 'See Your Cybersafety Score',
          x: 0,
          y: 0,
          isDragging: false,
          placed: false,
          answered: false,
          isCorrect: false,
          correctAnswer: 'always',
          userAnswer: null,
          isButton: true
        });
        
        this.cards = cards;
      },
      
      // Determine the correct answer based on importance
      determineCorrectAnswer(importance) {
          // Map importance to appropriate answer
          switch(importance) {
              case 'critical':
                return 'always'; // Critical safety measures should always be followed
              case 'high':
                return 'always'; // High importance should be followed consistently
              case 'medium':
                return 'sometimes'; // Medium importance can be sometimes
              default:
                return 'sometimes'; // Default fallback
          }
      },
      
      // Get feedback message based on level
      feedbackMessage(level) {
        switch(level) {
          case 'high':
            return "Excellent! You are following best practices for online safety.";
          case 'medium':
            return "You have a good foundation for online safety, but there are areas where you could improve.";
          case 'low':
            return "Your online safety practices need significant improvement.";
          default:
            return "";
        }
      },
      
      // Calculate score based on answer quality
      calculateScoreValue(answer) {
          switch(answer) {
          case 'always': return 1.0;
          case 'sometimes': return 0.66;
          case 'rarely': return 0.33;
          case 'never': return 0.0;
          default: return 0.0;
          }
      },
      
      // Get the percentage of answers for a specific response type
      getAnswerPercentage(answerType) {
          if (this.totalAnswered === 0) return 0;
          
          const answerCount = this.cards.filter(c => 
          !c.isButton && c.answered && c.userAnswer === answerType
          ).length;
          
          return Math.round((answerCount / this.totalAnswered) * 100);
      },
      
      // Handle card mousedown event from child component
      handleCardMouseDown({ event, cardId }) {
        const card = this.cards.find(c => c.id === cardId);
        
        // Skip if it's the results button
        if (card.isButton) {
          // NEW CODE: Call parent's submit method instead of showing local results
          this.onSubmit();
          return;
        }
        
        // Store the card ID being dragged
        this.activeCardId = cardId;
        
        // Set dragging state for this card
        const cardIndex = this.cards.findIndex(c => c.id === cardId);
        this.cards[cardIndex].isDragging = true;
        
        // Store initial mouse position relative to card
        this.dragStartX = event.clientX - this.cards[cardIndex].x;
        this.dragStartY = event.clientY - this.cards[cardIndex].y;
      },
      
      // Handle radio button selection (Mobile view)
      handleRadioChange(card, answer) {
          const oldAnswer = card.userAnswer;
          const wasAnswered = card.answered;
          
          // Set the user's answer
          card.userAnswer = answer;
          card.answered = true;
          
          // Calculate score based on how close the answer is to the ideal
          const correctAnswer = card.correctAnswer;
          const idealScore = this.calculateScoreValue(correctAnswer);
          const userScore = this.calculateScoreValue(answer ? 'always' : 'never');
          const scoreValue = 1 - Math.abs(idealScore - userScore);
          
          // Set correctness based on a threshold
          card.isCorrect = (scoreValue >= 0.8);
          
          // If the card was already answered, adjust the score
          if (wasAnswered) {
          // Remove old score contribution
          const oldIdealScore = this.calculateScoreValue(correctAnswer);
          const oldUserScore = this.calculateScoreValue(oldAnswer ? 'always' : 'never');
          const oldScoreValue = 1 - Math.abs(oldIdealScore - oldUserScore);
          this.score -= oldScoreValue;
          } else {
          // Increment answered count for new answers
          this.totalAnswered++;
          }
          
          // Add new score contribution
          this.score += scoreValue;
      },
      
      // Check if a card is inside a specific bubble
      isCardInBubble(card, bubbleCenter, bubbleRadius) {
          // Calculate card center
          const cardCenterX = card.x + 120; 
          const cardCenterY = card.y + 60;
          
          // Calculate the absolute position of the card in the container
          const absoluteCardX = this.stackOriginLeft + cardCenterX;
          const absoluteCardY = this.stackOriginTop + cardCenterY;
          
          // Calculate distance from card center to bubble center
          const distance = Math.sqrt(
          Math.pow(absoluteCardX - bubbleCenter.x, 2) + 
          Math.pow(absoluteCardY - bubbleCenter.y, 2)
          );
          
          // Return true if card is inside bubble
          return distance < bubbleRadius;
      },
      
      // Handle dragging motion
      handleMouseMove(e) {
          if (!this.activeCardId) return;

          const cardIndex = this.cards.findIndex(card => card.id === this.activeCardId);
          if (cardIndex === -1 || !this.cards[cardIndex].isDragging) return;

          // Update card position based on mouse movement
          this.cards[cardIndex].x = e.clientX - this.dragStartX;
          this.cards[cardIndex].y = e.clientY - this.dragStartY;

          // Bubble overlap detection
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          // Find all bubble elements
          const alwaysBubbleEl = this.$el.querySelector('.always-bubble');
          const sometimesBubbleEl = this.$el.querySelector('.sometimes-bubble');
          const rarelyBubbleEl = this.$el.querySelector('.rarely-bubble');
          const neverBubbleEl = this.$el.querySelector('.never-bubble');

          if (alwaysBubbleEl && sometimesBubbleEl && rarelyBubbleEl && neverBubbleEl) {
              const alwaysRect = alwaysBubbleEl.getBoundingClientRect();
              const sometimesRect = sometimesBubbleEl.getBoundingClientRect();
              const rarelyRect = rarelyBubbleEl.getBoundingClientRect();
              const neverRect = neverBubbleEl.getBoundingClientRect();

              this.isOverAlwaysBubble =
              mouseX >= alwaysRect.left &&
              mouseX <= alwaysRect.right &&
              mouseY >= alwaysRect.top &&
              mouseY <= alwaysRect.bottom;

              this.isOverSometimesBubble =
              mouseX >= sometimesRect.left &&
              mouseX <= sometimesRect.right &&
              mouseY >= sometimesRect.top &&
              mouseY <= sometimesRect.bottom;
              
              this.isOverRarelyBubble =
              mouseX >= rarelyRect.left &&
              mouseX <= rarelyRect.right &&
              mouseY >= rarelyRect.top &&
              mouseY <= rarelyRect.bottom;
              
              this.isOverNeverBubble =
              mouseX >= neverRect.left &&
              mouseX <= neverRect.right &&
              mouseY >= neverRect.top &&
              mouseY <= neverRect.bottom;
          }
      },

      // End dragging and check for answers
      handleMouseUp() {
          // Reset all bubble hover flags
          this.isOverAlwaysBubble = false;
          this.isOverSometimesBubble = false;
          this.isOverRarelyBubble = false;
          this.isOverNeverBubble = false;
          
          if (!this.activeCardId) return;
          
          const cardIndex = this.cards.findIndex(card => card.id === this.activeCardId);
          if (cardIndex === -1) return;
          
          // Update card state - no longer dragging
          this.cards[cardIndex].isDragging = false;
          
          // Check which bubble the card is in
          const inAlwaysBubble = this.isCardInBubble(
          this.cards[cardIndex], 
          this.alwaysBubbleCenter, 
          this.alwaysBubbleSize/2
          );
          
          const inSometimesBubble = this.isCardInBubble(
          this.cards[cardIndex], 
          this.sometimesBubbleCenter, 
          this.sometimesBubbleSize/2
          );
          
          const inRarelyBubble = this.isCardInBubble(
          this.cards[cardIndex], 
          this.rarelyBubbleCenter, 
          this.rarelyBubbleSize/2
          );
          
          const inNeverBubble = this.isCardInBubble(
          this.cards[cardIndex], 
          this.neverBubbleCenter, 
          this.neverBubbleSize/2
          );
          
          // Determine which bubble (if any) the card is in
          let userAnswer = null;
          if (inAlwaysBubble) userAnswer = 'always';
          else if (inSometimesBubble) userAnswer = 'sometimes';
          else if (inRarelyBubble) userAnswer = 'rarely';
          else if (inNeverBubble) userAnswer = 'never';
          
          // If card is in one of the bubbles
          if (userAnswer) {
          // Mark as placed
          this.cards[cardIndex].placed = true;
    
          // Skip if it's the button card
          if (!this.cards[cardIndex].isButton) {
            // For regular question cards
            const previousUserAnswer = this.cards[cardIndex].userAnswer;
            const wasAnswered = this.cards[cardIndex].answered;
            
            // Mark as answered
            this.cards[cardIndex].answered = true;
            
            // Set user answer
            this.cards[cardIndex].userAnswer = userAnswer;
            
            // Calculate score based on how close the answer is to the ideal
            const correctAnswer = this.cards[cardIndex].correctAnswer;
            const idealScore = this.calculateScoreValue(correctAnswer);
            const userScore = this.calculateScoreValue(userAnswer);
            const scoreValue = 1 - Math.abs(idealScore - userScore);
            
            // Set correctness based on a threshold
            this.cards[cardIndex].isCorrect = (scoreValue >= 0.8);
            
            // Update local score tracking (we'll still calculate these for visual feedback)
            if (wasAnswered) {
              // Remove old score contribution if changing an answer
              const oldIdealScore = this.calculateScoreValue(correctAnswer);
              const oldUserScore = this.calculateScoreValue(previousUserAnswer);
              const oldScoreValue = 1 - Math.abs(oldIdealScore - oldUserScore);
              this.score -= oldScoreValue;
            } else {
              // Increment answered count for new answers
              this.totalAnswered++;
            }
            
            // Add new score contribution
            this.score += scoreValue;
            
            // NEW CODE: Notify parent component about the updated response
            // Only send updates if: 1) It's not the button and 2) The answer changed
            if (!wasAnswered || previousUserAnswer !== userAnswer) {
              this.onResponseUpdate(
                this.cards[cardIndex].categoryId,
                this.cards[cardIndex].questionIndex,
                userAnswer
              );
            }
            
            // Force a UI update to reflect bubble size changes
            this.$forceUpdate();
          }
        } else {
          // If card was previously placed but now outside bubbles
          if (this.cards[cardIndex].placed) {
            // If card was answered, update scores
            if (this.cards[cardIndex].answered && !this.cards[cardIndex].isButton) {
              const correctAnswer = this.cards[cardIndex].correctAnswer;
              const oldUserAnswer = this.cards[cardIndex].userAnswer;
              
              // Remove score contribution
              const oldIdealScore = this.calculateScoreValue(correctAnswer);
              const oldUserScore = this.calculateScoreValue(oldUserAnswer);
              const oldScoreValue = 1 - Math.abs(oldIdealScore - oldUserScore);
              this.score -= oldScoreValue;
              
              this.totalAnswered--;
              
              // NEW CODE: Notify parent that answer was removed
              this.onResponseUpdate(
                this.cards[cardIndex].categoryId,
                this.cards[cardIndex].questionIndex,
                null  // null indicates answer was removed
              );
              
              // Force a UI update to reflect bubble size changes
              this.$forceUpdate();
            }
            
            // Reset the card's state
            this.cards[cardIndex].placed = false;
            this.cards[cardIndex].answered = false;
            this.cards[cardIndex].isCorrect = false;
            this.cards[cardIndex].userAnswer = null;
          }
        }
        
        // Reset active card ID
        this.activeCardId = null;
      },
      
      // Reset all cards back to stack
      resetStack() {
        this.cards.forEach(card => {
          // If this card had an answer, notify parent of reset
          if (!card.isButton && card.answered) {
            this.onResponseUpdate(
              card.categoryId,
              card.questionIndex,
              null  // null indicates answer was removed
            );
          }
          
          // Reset local card state
          card.x = 0;
          card.y = 0;
          card.isDragging = false;
          card.placed = false;
          card.answered = false;
          card.isCorrect = false;
          card.userAnswer = null;
        });
        
        this.activeCardId = null;
        this.score = 0;
        this.totalAnswered = 0;
        this.showResults = false;
      },
      
      // Generate style for each card
      getCardStyle(card, index) {
          const zIndex = card.isDragging ? 50 : (this.cards.length - index);
          const offset = index * 2;
          
          // For the button card (last card)
          if (card.isButton) {
          return {
              transform: `translate(${card.x}px, ${card.y}px) translateY(${offset}px)`,
              zIndex: zIndex,
              backgroundColor: '#4c8bf5',
              color: 'white',
              cursor: 'pointer'
          };
          }
          
          return {
          transform: `translate(${card.x}px, ${card.y}px) ${!card.placed && !card.isDragging ? `translateY(${offset}px)` : ''}`,
          zIndex: zIndex
          };
      },
      
      // Handle window resize
      handleResize() {
          this.windowWidth = window.innerWidth;
      }
  },
  created() {
    // Initialize cards from props
    this.initializeCardsFromProps();
  },
  mounted() {
    // Add resize listener
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // Remove resize listener
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
/* Header Instructions Box */
.instructions-header {
width: 1300px;
margin: 0 auto 20px auto;
}

.instructions-content {
background-color: white;
padding: 20px 30px;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
text-align: left;
}

.instructions-content h2 {
margin-top: 0;
color: #333;
font-size: 24px;
margin-bottom: 15px;
}

.instructions-content p {
color: #444;
font-size: 16px;
line-height: 1.5;
margin-bottom: 15px;
}

.bubble-legend {
display: flex;
flex-wrap: wrap;
gap: 15px;
margin-top: 15px;
}

.legend-item {
display: flex;
align-items: center;
flex: 1 1 40%;
min-width: 250px;
}

.legend-bubble {
width: 24px;
height: 24px;
border-radius: 50%;
margin-right: 10px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.always-legend .legend-bubble {
background-color: rgba(76, 175, 80, 0.5);
border: 2px solid rgba(76, 175, 80, 0.8);
}

.sometimes-legend .legend-bubble {
background-color: rgba(255, 152, 0, 0.5);
border: 2px solid rgba(255, 152, 0, 0.8);
}

.rarely-legend .legend-bubble {
background-color: rgba(156, 39, 176, 0.5);
border: 2px solid rgba(156, 39, 176, 0.8);
}

.never-legend .legend-bubble {
background-color: rgba(244, 67, 54, 0.5);
border: 2px solid rgba(244, 67, 54, 0.8);
}

/* Moving Bubbles Background */
.bubbles-container {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
overflow: hidden;
z-index: 5;
pointer-events: none;
will-change: transform; 
}

.bubble-bg {
position: absolute;
bottom: -100px;
border-radius: 50%;
background: radial-gradient(
  circle at 30% 30%, 
  rgb(98, 200, 220) 0%, 
  rgba(6, 93, 150, 0.4) 40%, 
  rgba(24, 6, 183, 0.708) 60%
);
animation: rise linear infinite;
opacity: 0.5;
pointer-events: none;
will-change: transform, opacity; 
transform: translateZ(0); 
}

@keyframes rise {
0% {
  transform: translateY(0) rotate(0);
  opacity: 0.3;
}
50% {
  opacity: 0.7;
}
100% {
  transform: translateY(-100vh) rotate(360deg);
  opacity: 0;
}
}

.card-stack-container {
  margin: 0 auto 30px;
  max-width: 1300px;
}

/* Desktop Styles */
.card-area {
position: relative;
width: 100%;
max-width: 1300px;
margin: 0 auto;
border: 2px solid #ccc;
border-radius: 12px;
background-color: #f0f5ff;
overflow: hidden;
box-sizing: border-box;
transition: height 0.5s ease;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.stack-origin {
position: absolute;
top: 300px;
left: 515px;
transform: translate(-50%, -50%);
z-index: 10;
will-change: transform;
}

.reset-button {
position: absolute;
bottom: 20px;
right: 20px;
padding: 8px 16px;
background-color: #4c8bf5;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-weight: bold;
}

.reset-button:hover {
background-color: #3a78e7;
}

.instructions {
position: absolute;
top: 20px;
right: 20px;
background-color: rgba(255, 255, 255, 0.9);
padding: 15px;
border-radius: 8px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
max-width: 220px;
}

.instructions h3 {
margin-top: 0;
margin-bottom: 10px;
font-size: 16px;
}

.instructions ul {
margin: 0;
padding-left: 20px;
text-align: left;
font-size: 14px;
}

.instructions li {
margin-bottom: 5px;
}

.score-display {
position: absolute;
top: 20px;
left: 50%;
transform: translateX(-50%);
background-color: rgba(255, 255, 255, 0.9);
padding: 10px 20px;
border-radius: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
z-index: 10;
}

.score-display h2 {
margin: 0;
font-size: 18px;
color: #333;
}

/* Results Modal Styles */
.results-modal {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.7);
display: flex;
justify-content: center;
align-items: center;
z-index: 100;
}

.results-content {
background-color: white;
padding: 30px;
border-radius: 12px;
width: 80%;
max-width: 500px;
text-align: center;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.score-circle {
width: 150px;
height: 150px;
border-radius: 50%;
background: linear-gradient(135deg, #4c8bf5, #34c759);
margin: 20px auto;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.score-number {
font-size: 38px;
font-weight: bold;
color: white;
}

.results-text {
margin-bottom: 15px;
font-size: 18px;
}

.results-advice {
font-size: 16px;
margin-bottom: 25px;
padding: 10px;
background-color: #f0f5ff;
border-radius: 8px;
}

.results-breakdown {
margin: 20px 0;
padding: 15px;
background-color: #f8f9fa;
border-radius: 8px;
}

.answer-distribution {
width: 100%;
height: 30px;
margin-top: 10px;
display: flex;
border-radius: 4px;
overflow: hidden;
}

.answer-bar {
height: 100%;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
transition: width 0.5s ease;
min-width: 40px;
}

.always-bar {
background-color: rgba(76, 175, 80, 0.8);
}

.sometimes-bar {
background-color: rgba(255, 152, 0, 0.8);
}

.rarely-bar {
background-color: rgba(156, 39, 176, 0.8);
}

.never-bar {
background-color: rgba(244, 67, 54, 0.8);
}

.close-results-button {
background-color: #4c8bf5;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s;
}

.close-results-button:hover {
background-color: #3a78e7;
}

/* Mobile Questionnaire Styles */
.mobile-questionnaire {
padding: 15px;
background-color: #f0f5ff;
border-radius: 8px;
border: 1px solid #ddd;
}

.mobile-score-display {
background-color: white;
padding: 15px;
border-radius: 8px;
text-align: center;
margin-bottom: 20px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mobile-questions {
display: flex;
flex-direction: column;
gap: 15px;
margin-bottom: 20px;
}

.mobile-question-card {
background-color: white;
border-radius: 8px;
padding: 15px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
}

.mobile-always {
border-left: 5px solid #4CAF50;
background-color: rgba(76, 175, 80, 0.05);
}

.mobile-sometimes {
border-left: 5px solid #FF9800;
background-color: rgba(255, 152, 0, 0.05);
}

.mobile-rarely {
border-left: 5px solid #9C27B0;
background-color: rgba(156, 39, 176, 0.05);
}

.mobile-never {
border-left: 5px solid #F44336;
background-color: rgba(244, 67, 54, 0.05);
}

.question-text {
font-weight: bold;
margin-bottom: 15px;
font-size: 16px;
}

.radio-group {
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 10px;
margin-bottom: 10px;
}

.radio-option {
display: flex;
align-items: center;
gap: 6px;
margin: 5px 0;
}

.always-option label {
color: #4CAF50;
}

.sometimes-option label {
color: #FF9800;
}

.rarely-option label {
color: #9C27B0;
}

.never-option label {
color: #F44336;
}

.radio-option input[type="radio"] {
margin: 0;
}

.mobile-results-button {
display: block;
margin: 20px auto;
padding: 12px 20px;
background-color: #4c8bf5;
color: white;
border: none;
border-radius: 4px;
font-weight: bold;
cursor: pointer;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
font-size: 16px;
}

.mobile-results-modal {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.7);
display: flex;
justify-content: center;
align-items: center;
z-index: 100;
}
</style>
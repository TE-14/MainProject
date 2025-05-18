<template>
    <div 
      class="card"
      :class="{ 
        'dragging': isDragging, 
        'correct': answered && isCorrect,
        'incorrect': answered && !isCorrect,
        'button-card': isButton,
        'fade-out': placed && answered
      }"
      :style="cardStyle"
      @mousedown="handleCardMouseDown"
    >
      {{ content }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'CybersafetyCard',
    props: {
      content: {
        type: String,
        required: true
      },
      id: {
        type: [Number, String],
        required: true
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      },
      isDragging: {
        type: Boolean,
        default: false
      },
      placed: {
        type: Boolean,
        default: false
      },
      answered: {
        type: Boolean,
        default: false
      },
      isCorrect: {
        type: Boolean,
        default: false
      },
      isButton: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        required: true
      },
      totalCards: {
        type: Number,
        required: true
      }
    },
    computed: {
      cardStyle() {
        const zIndex = this.isDragging ? 50 : (this.totalCards - this.index);
        const offset = this.index * 2;
        
        // For the button card
        if (this.isButton) {
          return {
            transform: `translate(${this.x}px, ${this.y}px) translateY(${offset}px)`,
            zIndex: zIndex,
            backgroundColor: '#4c8bf5',
            color: 'white',
            cursor: 'pointer'
          };
        }
        
        // Base styles
        const style = {
          transform: `translate(${this.x}px, ${this.y}px) ${!this.placed && !this.isDragging ? `translateY(${offset}px)` : ''}`,
          zIndex: zIndex
        };
        
        // Add opacity and visibility styles for fading out
        if (this.placed && this.answered) {
          style.opacity = 0;
          style.visibility = 'hidden';
        }
        
        return style;
      }
    },
    methods: {
      handleCardMouseDown(e) {
        // Don't allow interaction with cards that are fading out
        if (this.placed && this.answered) {
          return;
        }
        
        // Emit event to parent component
        this.$emit('card-mousedown', { 
          event: e, 
          cardId: this.id 
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    position: absolute;
    width: 240px;
    height: 120px;
    background-color: white;
    border: 2px solid #666;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    padding: 15px;
    text-align: center;
  }
  
  .correct {
    background-color: rgba(76, 175, 80, 0.2);
    border-color: #4CAF50;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
  }
  
  .incorrect {
    background-color: rgba(244, 67, 54, 0.2);
    border-color: #F44336;
    box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
  }
  
  .button-card {
    background-color: #4c8bf5 !important;
    color: white !important;
    font-weight: bold !important;
    border-color: #3a78e7 !important;
  }
  
  .dragging {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
  
  /* New fade-out animation */
  .fade-out {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.8s ease, visibility 0s 0.8s;
  }
  </style>
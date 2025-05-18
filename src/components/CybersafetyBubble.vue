<template>
    <div class="bubble-container">
      <div 
        class="bubble" 
        :class="bubbleTypeClass" 
        :style="computedStyle"
      >
        <div class="shimmer"></div>
        <div class="bubble-label">{{ label }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CybersafetyBubble',
    props: {
      type: {
        type: String,
        required: true,
        validator: (value) => ['always', 'sometimes', 'rarely', 'never'].includes(value)
      },
      label: {
        type: String,
        required: true
      },
      isOver: {
        type: Boolean,
        default: false
      },
      cardsCount: {
        type: Number,
        default: 0
      },
      position: {
        type: Object,
        required: true,
        validator: (value) => typeof value.left === 'string' && typeof value.top === 'string'
      },
      baseSize: {
        type: Number,
        default: 360
      },
      expandedSize: {
        type: Number,
        default: 480
      },
      growthRate: {
        type: Number,
        default: 30
      }
    },
    computed: {
      bubbleTypeClass() {
        return `${this.type}-bubble`;
      },
      
      computedSize() {
            // Ensure consistent linear growth - each card adds exactly growthRate pixels
            const cardExpansion = this.cardsCount * this.growthRate;
            
            // Use the larger of hover expansion or card-based expansion
            return this.isOver 
            ? Math.max(this.expandedSize, this.baseSize + cardExpansion) 
            : (this.baseSize + cardExpansion);
        },
      
      computedStyle() {
        return {
          position: 'absolute',
          left: this.position.left,
          top: this.position.top,
          width: `${this.computedSize}px`,
          height: `${this.computedSize}px`,
          borderRadius: '50%',
          backgroundColor: this.getBubbleBackgroundColor(),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.5s ease, height 0.5s ease'
        };
      },
  
      bubbleColorStyle() {
        switch(this.type) {
          case 'always':
            return {
              backgroundColor: 'rgba(76, 175, 80, 0.15)',
              borderColor: 'rgba(76, 175, 80, 0.5)',
              boxShadow: '0 0 30px rgba(76, 175, 80, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2)'
            };
          case 'sometimes':
            return {
              backgroundColor: 'rgba(255, 152, 0, 0.15)',
              borderColor: 'rgba(255, 152, 0, 0.5)',
              boxShadow: '0 0 30px rgba(255, 152, 0, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2)'
            };
          case 'rarely':
            return {
              backgroundColor: 'rgba(156, 39, 176, 0.15)',
              borderColor: 'rgba(156, 39, 176, 0.5)',
              boxShadow: '0 0 30px rgba(156, 39, 176, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2)'
            };
          case 'never':
            return {
              backgroundColor: 'rgba(244, 67, 54, 0.15)',
              borderColor: 'rgba(244, 67, 54, 0.5)',
              boxShadow: '0 0 30px rgba(244, 67, 54, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2)'
            };
          default:
            return {
              backgroundColor: 'rgba(100, 200, 255, 0.15)',
              borderColor: 'rgba(100, 200, 255, 0.5)',
              boxShadow: '0 0 30px rgba(100, 200, 255, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2)'
            };
        }
      }
    },
    methods: {
      getBubbleBackgroundColor() {
        switch(this.type) {
          case 'always':
            return 'rgba(76, 175, 80, 0.15)'; // Green
          case 'sometimes':
            return 'rgba(255, 152, 0, 0.15)'; // Orange
          case 'rarely':
            return 'rgba(156, 39, 176, 0.15)'; // Purple
          case 'never':
            return 'rgba(244, 67, 54, 0.15)'; // Red
          default:
            return 'rgba(100, 200, 255, 0.15)'; // Blue (default)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .bubble-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .bubble {
    position: absolute;
    border-radius: 50%;
    overflow: hidden;
    transition: width 0.5s ease, 
                height 0.5s ease, 
                left 0.5s ease, 
                top 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    will-change: width, height, left, top;
  }
  
  .always-bubble {
    background-color: rgba(76, 175, 80, 0.15);
    border: 3px solid rgba(76, 175, 80, 0.5);
    box-shadow: 0 0 30px rgba(76, 175, 80, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2);
  }
  
  .sometimes-bubble {
    background-color: rgba(255, 152, 0, 0.15);
    border: 3px solid rgba(255, 152, 0, 0.5);
    box-shadow: 0 0 30px rgba(255, 152, 0, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2);
  }
  
  .rarely-bubble {
    background-color: rgba(156, 39, 176, 0.15);
    border: 3px solid rgba(156, 39, 176, 0.5);
    box-shadow: 0 0 30px rgba(156, 39, 176, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2);
  }
  
  .never-bubble {
    background-color: rgba(244, 67, 54, 0.15);
    border: 3px solid rgba(244, 67, 54, 0.5);
    box-shadow: 0 0 30px rgba(244, 67, 54, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.2);
  }
  
  .bubble-label {
    font-size: 22px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
    z-index: 3;
    user-select: none;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
  }
  
  .shimmer {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.15) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 4s linear infinite;
    transform: rotate(45deg);
  }
  
  @keyframes shimmer {
    0% {
      transform: rotate(45deg) translateY(-100%);
    }
    100% {
      transform: rotate(45deg) translateY(100%);
    }
  }
  </style>
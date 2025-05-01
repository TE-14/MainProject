<template>
    <div
      class="swipe-card"
      :style="cardStyle"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
    >
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SwipeCard',
    data() {
      return {
        startX: 0,
        currentX: 0,
        startY: 0, // Add Y coordinate tracking
        dragging: false,
        isTouch: false,
        isDraggingCard: false, // Specific flag for card dragging vs clicking
        dragThreshold: 10, // Minimum pixels moved to consider it a drag
        startTime: 0, // Track when drag started
        maxDragDistance: 300 // Distance required for a complete swipe
      };
    },
    computed: {
      cardStyle() {
        const translateX = this.currentX - this.startX;
        const dragPercentage = Math.min(Math.abs(translateX) / this.maxDragDistance, 1);
        const opacity = 1 - (dragPercentage * 0.5); // Fade to 50% opacity
        
        // Calculate color tint based on direction
        let tintColor = 'rgba(0, 0, 0, 0)'; // Default - no tint
        if (this.isDraggingCard && Math.abs(translateX) > 20) {
          // Right swipe (healthy) - green tint
          if (translateX > 0) {
            tintColor = `rgba(52, 199, 89, ${dragPercentage * 0.3})`; // Green with opacity
          } 
          // Left swipe (cyberbullying) - red tint
          else if (translateX < 0) {
            tintColor = `rgba(255, 59, 48, ${dragPercentage * 0.3})`; // Red with opacity
          }
        }
        
        // Only apply translation when actually dragging the card
        if (this.isDraggingCard && (this.dragging || Math.abs(translateX) > 0)) {
          return {
            transform: `translateX(${translateX}px)`,
            opacity: opacity,
            boxShadow: `0 8px 20px rgba(0, 0, 0, ${0.15 * opacity})`,
            transition: this.dragging ? 'none' : 'all 0.3s ease',
            background: `linear-gradient(${tintColor}, ${tintColor}), white`
          };
        } else {
          // No additional transforms when card is at rest
          return {
            transition: 'all 0.3s ease'
          };
        }
      }
    },
    methods: {
      getClientX(e) {
        return e.type.startsWith('mouse') ? e.clientX : e.touches[0].clientX;
      },
      getClientY(e) {
        return e.type.startsWith('mouse') ? e.clientY : e.touches[0].clientY;
      },
      startDrag(e) {
        // If the click is on a button or interactive element, don't initiate drag
        if (e.target.closest('.response-button') || 
            e.target.closest('button') || 
            e.target.closest('a') || 
            e.target.closest('input') || 
            e.target.closest('select') ||
            e.target.closest('.settings-panel')) {
          return;
        }
        
        this.isTouch = !e.type.startsWith('mouse');
        this.startX = this.getClientX(e);
        this.startY = this.getClientY(e); // Track Y position
        this.currentX = this.startX;
        this.dragging = true;
        this.isDraggingCard = false; // Start with false until we confirm it's a drag
        this.startTime = Date.now(); // Record start time
    
        // Prevent default behavior to avoid text selection or scrolling
        if (!this.isTouch) {
          document.addEventListener('mousemove', this.onDrag);
          document.addEventListener('mouseup', this.endDrag);
        }
      },
      onDrag(e) {
        if (!this.dragging) return;
        
        const currentX = this.getClientX(e);
        const currentY = this.getClientY(e);
        const deltaX = Math.abs(currentX - this.startX);
        const deltaY = Math.abs(currentY - this.startY);
        
        // Only consider it a drag if we've moved past threshold (primarily horizontal)
        if (deltaX > this.dragThreshold && deltaX > deltaY) {
          this.isDraggingCard = true;
          this.currentX = currentX;
        }
      },
      endDrag() {
        if (!this.dragging) return;
        this.dragging = false;
        
        // Skip processing if it wasn't a real drag or if it was a quick tap
        if (!this.isDraggingCard && (Date.now() - this.startTime < 300)) {
          this.currentX = this.startX; // Reset position
          this.isDraggingCard = false; // Reset flag
          
          if (!this.isTouch) {
            document.removeEventListener('mousemove', this.onDrag);
            document.removeEventListener('mouseup', this.endDrag);
          }
          return;
        }
    
        const diff = this.currentX - this.startX;
    
        if (this.isDraggingCard && Math.abs(diff) > this.maxDragDistance) {
          const direction = diff > 0 ? 'right' : 'left';
          this.$emit('swiped', direction);
          this.animateOffscreen(diff);
        } else {
          this.currentX = this.startX; // snap back
        }
    
        if (!this.isTouch) {
          document.removeEventListener('mousemove', this.onDrag);
          document.removeEventListener('mouseup', this.endDrag);
        }
        
        this.isDraggingCard = false; // Reset flag
      },
      animateOffscreen(diff) {
        const offscreenX = diff > 0 ? 1000 : -1000;
        this.currentX = this.startX + offscreenX;
        setTimeout(() => {
          this.$emit('removed');
        }, 300);
      }
    }
  };
  </script>
  
  <style scoped>
  .swipe-card {
    /* Fixed positioning with explicit centering */
    position: absolute;
    width: 70%;
    max-width: 550px;
    min-height: 450px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    
    /* Critical centering properties */
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0; /* Remove any margin that could affect centering */
    
    /* Other styling */
    will-change: transform, opacity;
    touch-action: manipulation; /* Changed from none to allow scrolling */
    user-select: none;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 10; /* Ensure card is above other elements */
  }
  
  /* Target specific interactive elements to ensure they're clickable */
  .swipe-card :deep(.response-button),
  .swipe-card :deep(button),
  .swipe-card :deep(a),
  .swipe-card :deep(input),
  .swipe-card :deep(select) {
    cursor: pointer !important;
    touch-action: manipulation !important;
  }
  
  @media (max-width: 768px) {
    .swipe-card {
      width: 90%;
      max-width: none;
      height: 80vh;
    }
  }
  </style>
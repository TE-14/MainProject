<template>
  <div class="accessibility-wrapper">
    <!-- Font change indicator -->
    <div :class="['font-change-indicator', { show: showFontIndicator }]">
      {{ fontIndicatorText }}
    </div>

    <!-- Floating button -->
    <button 
      class="accessibility-button"
      @click="toggleMenu"
      aria-label="Open Accessibility Menu (Alt + A)"
      title="Open Accessibility Menu (Alt + A)"
    >
      <span class="icon">♿</span>
    </button>

    <!-- Menu panel -->
    <div v-if="isOpen" class="accessibility-menu">
      <div class="menu-header">
        <h2>Accessibility Menu</h2>
        <button @click="toggleMenu" class="close-button" aria-label="Close Menu (Esc)" title="Close Menu (Esc)">
          ✕
        </button>
      </div>

      <div class="menu-content">
        <!-- Font size adjustment -->
        <div class="menu-item">
          <h3>
            <span class="icon">🔠</span>
            Adjust Font Size
            <span class="shortcut">(Alt + 1/2)</span>
          </h3>
          <div class="font-size-controls">
            <button @click="adjustFontSize(-10)" aria-label="Decrease Font Size (Alt + 2)" title="Decrease Font Size (Alt + 2)">-</button>
            <span>{{ fontSize }}%</span>
            <button @click="adjustFontSize(10)" aria-label="Increase Font Size (Alt + 1)" title="Increase Font Size (Alt + 1)">+</button>
          </div>
        </div>

        <!-- Dyslexia friendly font -->
        <div class="menu-item">
          <h3>
            <span class="icon">🔤</span>
            Dyslexia Friendly Font
            <span class="shortcut">(Alt + 3)</span>
          </h3>
          <button 
            @click="toggleDyslexiaFont"
            :class="{ active: isDyslexiaFontEnabled }"
            :aria-pressed="isDyslexiaFontEnabled"
            :aria-label="'Dyslexia Friendly Font ' + (isDyslexiaFontEnabled ? 'Enabled' : 'Enable') + ' (Alt + 3)'"
            :title="'Dyslexia Friendly Font ' + (isDyslexiaFontEnabled ? 'Enabled' : 'Enable') + ' (Alt + 3)'"
          >
            {{ isDyslexiaFontEnabled ? 'Enabled' : 'Enable' }}
          </button>
        </div>

        <!-- Highlight links -->
        <div class="menu-item">
          <h3>
            <span class="icon">🔗</span>
            Highlight Links
            <span class="shortcut">(Alt + 4)</span>
          </h3>
          <button 
            @click="toggleHighlightLinks"
            :class="{ 'active': isHighlightLinksEnabled }"
            :aria-label="'Highlight Links ' + (isHighlightLinksEnabled ? 'Enabled' : 'Enable') + ' (Alt + 4)'"
            :title="'Highlight Links ' + (isHighlightLinksEnabled ? 'Enabled' : 'Enable') + ' (Alt + 4)'"
          >
            {{ isHighlightLinksEnabled ? 'Enabled' : 'Enable' }}
          </button>
        </div>

        <!-- Highlight headings -->
        <div class="menu-item">
          <h3>
            <span class="icon">🎯</span>
            Highlight Headings
            <span class="shortcut">(Alt + 5)</span>
          </h3>
          <button 
            @click="toggleHighlightTitles"
            :class="{ 'active': isHighlightTitlesEnabled }"
            :aria-label="'Highlight Headings ' + (isHighlightTitlesEnabled ? 'Enabled' : 'Enable') + ' (Alt + 5)'"
            :title="'Highlight Headings ' + (isHighlightTitlesEnabled ? 'Enabled' : 'Enable') + ' (Alt + 5)'"
          >
            {{ isHighlightTitlesEnabled ? 'Enabled' : 'Enable' }}
          </button>
        </div>

        <!-- Color Saturation -->
        <div class="menu-item">
          <h3>
            <span class="icon">🎨</span>
            Color Saturation
            <span class="shortcut">(Alt + 6)</span>
          </h3>
          <div class="saturation-controls">
            <button 
              @click="setSaturation('low')"
              :class="{ 'active': currentSaturation === 'low' }"
              aria-label="Low Saturation (Alt + 6)"
              title="Low Saturation - Softer Colors"
            >
              Low
            </button>
            <button 
              @click="setSaturation('normal')"
              :class="{ 'active': currentSaturation === 'normal' }"
              aria-label="Normal Saturation"
              title="Normal Saturation - Original Colors"
            >
              Normal
            </button>
            <button 
              @click="setSaturation('high')"
              :class="{ 'active': currentSaturation === 'high' }"
              aria-label="High Saturation"
              title="High Saturation - Vibrant Colors"
            >
              High
            </button>
          </div>
        </div>
      </div>

      <div class="menu-footer">
        <p class="keyboard-hint">Press Alt + A to toggle menu</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessibilityMenu',
  data() {
    return {
      isOpen: false,
      fontSize: parseInt(localStorage.getItem('accessibility_fontSize')) || 100,
      isDyslexiaFontEnabled: false,
      isHighlightLinksEnabled: localStorage.getItem('accessibility_highlightLinks') === 'true',
      isHighlightTitlesEnabled: localStorage.getItem('accessibility_highlightTitles') === 'true',
      showFontIndicator: false,
      fontIndicatorText: '',
      currentSaturation: localStorage.getItem('accessibility_saturation') || 'normal',
      lastFocusedElement: null
    }
  },
  created() {
    // 从 localStorage 获取初始状态
    const savedDyslexiaState = localStorage.getItem('accessibility_dyslexiaFont')
    if (savedDyslexiaState === 'true') {
      this.isDyslexiaFontEnabled = true
      document.body.classList.add('dyslexia-font')
    }
    this.applySettings()
    window.addEventListener('keydown', this.handleKeyboard)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard)
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.lastFocusedElement = document.activeElement
        this.$nextTick(() => {
          const firstFocusable = this.$el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          if (firstFocusable) {
            firstFocusable.focus()
          }
        })
      } else {
        if (this.lastFocusedElement) {
          this.lastFocusedElement.focus()
        }
      }
    },
    adjustFontSize(change) {
      this.fontSize = Math.max(50, Math.min(200, this.fontSize + change))
      document.documentElement.style.fontSize = `${this.fontSize}%`
      localStorage.setItem('accessibility_fontSize', this.fontSize)
    },
    toggleDyslexiaFont() {
      this.isDyslexiaFontEnabled = !this.isDyslexiaFontEnabled
      if (this.isDyslexiaFontEnabled) {
        document.body.classList.add('dyslexia-font')
      } else {
        document.body.classList.remove('dyslexia-font')
      }
      localStorage.setItem('accessibility_dyslexiaFont', this.isDyslexiaFontEnabled)
      this.fontIndicatorText = this.isDyslexiaFontEnabled ? 'Dyslexia Friendly Font Enabled' : 'Default Font Restored'
      this.showFontIndicator = true
      setTimeout(() => {
        this.showFontIndicator = false
      }, 2000)
    },
    toggleHighlightLinks() {
      this.isHighlightLinksEnabled = !this.isHighlightLinksEnabled
      document.body.classList.toggle('highlight-links')
      localStorage.setItem('accessibility_highlightLinks', this.isHighlightLinksEnabled)
    },
    toggleHighlightTitles() {
      this.isHighlightTitlesEnabled = !this.isHighlightTitlesEnabled
      document.body.classList.toggle('highlight-titles')
      localStorage.setItem('accessibility_highlightTitles', this.isHighlightTitlesEnabled)
    },
    setSaturation(level) {
      this.currentSaturation = level
      localStorage.setItem('accessibility_saturation', level)
      
      document.body.classList.remove('saturation-low', 'saturation-normal', 'saturation-high')
      
      if (level !== 'normal') {
        document.body.classList.add(`saturation-${level}`)
      }
      
      this.fontIndicatorText = `Switched to ${level === 'low' ? 'Low' : level === 'high' ? 'High' : 'Normal'} Saturation`
      this.showFontIndicator = true
      setTimeout(() => {
        this.showFontIndicator = false
      }, 2000)
    },
    handleKeyboard(event) {
      if (event.altKey && event.key === 'a') {
        event.preventDefault()
        this.toggleMenu()
      }
      
      if (this.isOpen) {
        switch(event.key) {
          case 'Escape':
            this.isOpen = false
            break
          case '1':
            if (event.altKey) {
              event.preventDefault()
              this.adjustFontSize(10)
            }
            break
          case '2':
            if (event.altKey) {
              event.preventDefault()
              this.adjustFontSize(-10)
            }
            break
          case '3':
            if (event.altKey) {
              event.preventDefault()
              this.toggleDyslexiaFont()
            }
            break
          case '4':
            if (event.altKey) {
              event.preventDefault()
              this.toggleHighlightLinks()
            }
            break
          case '5':
            if (event.altKey) {
              event.preventDefault()
              this.toggleHighlightTitles()
            }
            break
          case '6':
            if (event.altKey) {
              event.preventDefault()
              const levels = ['normal', 'low', 'high']
              const currentIndex = levels.indexOf(this.currentSaturation)
              const nextIndex = (currentIndex + 1) % levels.length
              this.setSaturation(levels[nextIndex])
            }
            break
        }
      }
    },
    applySettings() {
      document.documentElement.style.fontSize = `${this.fontSize}%`
      const savedDyslexiaState = localStorage.getItem('accessibility_dyslexiaFont')
      if (savedDyslexiaState === 'true') {
        this.isDyslexiaFontEnabled = true
        document.body.classList.add('dyslexia-font')
      } else {
        document.body.classList.remove('dyslexia-font')
      }
      if (this.isHighlightLinksEnabled) document.body.classList.add('highlight-links')
      if (this.isHighlightTitlesEnabled) document.body.classList.add('highlight-titles')
      const savedSaturation = localStorage.getItem('accessibility_saturation')
      if (savedSaturation && savedSaturation !== 'normal') {
        document.body.classList.add(`saturation-${savedSaturation}`)
      }
    },
    applyDyslexiaFont() {
      // 该方法已不再需要，可留空或删除
    },
  }
}
</script>

<style>
/* 全局样式 */
:root {
  --dyslexia-font: inherit;
}

/* 确保只用.dyslexia-font控制字体 */
</style>

<style scoped>
.accessibility-wrapper {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
}

.accessibility-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #4a90e2;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accessibility-button:hover {
  transform: scale(1.1);
  background: #357abd;
}

.accessibility-menu {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: min(90vw, 400px);
  max-height: min(90vh, 600px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.menu-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.menu-header h2 {
  margin: 0;
  font-size: clamp(18px, 4vw, 24px);
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #f5f5f5;
  color: #333;
}

.menu-content {
  padding: 15px;
  flex-grow: 1;
  overflow-y: auto;
}

.menu-item {
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  margin-bottom: 15px;
}

.menu-item h3 {
  margin: 0 0 10px 0;
  font-size: clamp(16px, 3.5vw, 18px);
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.menu-item button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.menu-item button.active {
  background: #007AFF !important;
  color: white !important;
  border-color: #0056b3 !important;
}

.menu-item button:hover:not(.active) {
  background: #f5f5f5;
}

/* 深色模式样式 */
:deep(.dark-mode) .menu-item button {
  background: #2c2c2c;
  border-color: #444;
  color: #fff;
}

:deep(.dark-mode) .menu-item button:hover:not(.active) {
  background: #3c3c3c;
}

:deep(.dark-mode) .menu-item button.active {
  background: #007AFF !important;
  color: white !important;
  border-color: #0056b3 !important;
}

.font-size-controls,
.saturation-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.font-size-controls button,
.saturation-controls button {
  width: 36px;
  height: 36px;
  min-width: unset;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.saturation-controls button {
  flex: 1;
  min-width: 80px;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.9em;
  white-space: nowrap;
}

.shortcut {
  font-size: clamp(12px, 2.5vw, 14px);
  color: #666;
  margin-left: auto;
}

.menu-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: clamp(12px, 2.5vw, 14px);
  color: #666;
  background: white;
  position: sticky;
  bottom: 0;
}

.keyboard-hint {
  margin: 0 0 5px 0;
  font-style: italic;
}

.icon {
  font-size: clamp(18px, 4vw, 24px);
}

.font-change-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-size: clamp(16px, 3.5vw, 20px);
  transition: transform 0.3s ease;
  pointer-events: none;
}

.font-change-indicator.show {
  transform: translate(-50%, -50%) scale(1);
}

/* 移动设备适配 */
@media (max-width: 768px) {
  .accessibility-wrapper {
    right: 10px;
    bottom: 10px;
  }

  .accessibility-menu {
    right: 10px;
    bottom: 70px;
    width: calc(100vw - 20px);
    max-height: calc(100vh - 80px);
  }

  .menu-item {
    padding: 12px;
  }

  .menu-content {
    padding: 10px;
  }

  .font-size-controls,
  .saturation-controls {
    flex-wrap: wrap;
  }
}

/* 小屏幕设备适配 */
@media (max-width: 480px) {
  .accessibility-button {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .menu-item h3 {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .shortcut {
    margin-left: 0;
  }
}

/* 确保在较大屏幕上不会太宽 */
@media (min-width: 1200px) {
  .accessibility-menu {
    max-width: 450px;
  }
}
</style> 
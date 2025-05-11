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
            :class="{ 'active': isDyslexiaFontEnabled }"
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

        <!-- Dark mode -->
        <div class="menu-item">
          <h3>
            <span class="icon">🌙</span>
            Dark Mode
            <span class="shortcut">(Alt + 6)</span>
          </h3>
          <button 
            @click="toggleDarkMode"
            :class="{ 'active': isDarkMode }"
            :aria-label="'Dark Mode ' + (isDarkMode ? 'Enabled' : 'Enable') + ' (Alt + 6)'"
            :title="'Dark Mode ' + (isDarkMode ? 'Enabled' : 'Enable') + ' (Alt + 6)'"
          >
            {{ isDarkMode ? 'Enabled' : 'Enable' }}
          </button>
        </div>
      </div>

      <div class="menu-footer">
        <p class="keyboard-hint">Press Alt + A to toggle menu</p>
        <p>Web Accessibility By Sienna ❤️</p>
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
      isDyslexiaFontEnabled: localStorage.getItem('accessibility_dyslexiaFont') === 'true',
      isHighlightLinksEnabled: localStorage.getItem('accessibility_highlightLinks') === 'true',
      isHighlightTitlesEnabled: localStorage.getItem('accessibility_highlightTitles') === 'true',
      isDarkMode: localStorage.getItem('accessibility_darkMode') === 'true',
      showFontIndicator: false,
      fontIndicatorText: ''
    }
  },
  created() {
    // 初始化设置
    this.applySettings()
    
    // 添加键盘快捷键
    window.addEventListener('keydown', this.handleKeyboard)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard)
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    adjustFontSize(change) {
      this.fontSize = Math.max(50, Math.min(200, this.fontSize + change))
      document.documentElement.style.fontSize = `${this.fontSize}%`
      localStorage.setItem('accessibility_fontSize', this.fontSize)
    },
    toggleDyslexiaFont() {
      this.isDyslexiaFontEnabled = !this.isDyslexiaFontEnabled
      document.body.classList.toggle('dyslexia-font')
      localStorage.setItem('accessibility_dyslexiaFont', this.isDyslexiaFontEnabled)
      
      // Show font change indicator
      this.fontIndicatorText = this.isDyslexiaFontEnabled ? 'Dyslexia Friendly Font Enabled' : 'Default Font Restored'
      this.showFontIndicator = true
      setTimeout(() => {
        this.showFontIndicator = false
      }, 2000)
      
      if (this.isDyslexiaFontEnabled) {
        this.checkFontLoading()
      }
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
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark-mode')
      localStorage.setItem('accessibility_darkMode', this.isDarkMode)
    },
    handleKeyboard(event) {
      // Alt + A 打开/关闭菜单
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
              this.toggleDarkMode()
            }
            break
        }
      }
    },
    applySettings() {
      // 应用保存的设置
      document.documentElement.style.fontSize = `${this.fontSize}%`
      if (this.isDyslexiaFontEnabled) document.body.classList.add('dyslexia-font')
      if (this.isHighlightLinksEnabled) document.body.classList.add('highlight-links')
      if (this.isHighlightTitlesEnabled) document.body.classList.add('highlight-titles')
      if (this.isDarkMode) document.body.classList.add('dark-mode')
    },
    checkFontLoading() {
      document.fonts.ready.then(() => {
        const testString = 'Test';
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        context.font = '20px Arial';
        const defaultWidth = context.measureText(testString).width;
        
        context.font = '20px OpenDyslexic';
        const dyslexicWidth = context.measureText(testString).width;
        
        if (defaultWidth === dyslexicWidth) {
          console.warn('OpenDyslexic font may not be loaded correctly');
          this.fontIndicatorText = 'Font loading failed, using fallback font';
          this.showFontIndicator = true;
          setTimeout(() => {
            this.showFontIndicator = false;
          }, 3000);
        }
      });
    }
  }
}
</script>

<style scoped>
.accessibility-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.accessibility-button {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accessibility-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.accessibility-menu {
  position: fixed;
  right: 20px;
  bottom: 90px;
  width: min(90vw, 340px);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 1;
}

.menu-header h2 {
  margin: 0;
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  font-weight: 600;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Quicksand', sans-serif;
}

.close-button {
  width: 32px;
  height: 32px;
  background: rgba(99, 102, 241, 0.1);
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(99, 102, 241, 0.2);
}

.menu-item {
  margin-bottom: 20px;
  padding: clamp(12px, 3vw, 16px);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.menu-item h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 12px 0;
  font-size: clamp(0.9rem, 3.5vw, 1.1rem);
  color: #1f2937;
  font-weight: 500;
}

.menu-item .icon {
  font-size: clamp(1.1rem, 4vw, 1.2rem);
}

.font-size-controls {
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 16px);
  padding: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.font-size-controls button {
  width: clamp(32px, 8vw, 36px);
  height: clamp(32px, 8vw, 36px);
  border-radius: 10px;
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: white;
  color: #6366f1;
  cursor: pointer;
  font-size: clamp(16px, 4vw, 18px);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.font-size-controls button:hover {
  background: rgba(99, 102, 241, 0.1);
}

.font-size-controls span {
  font-size: clamp(0.9rem, 3.5vw, 1.1rem);
  color: #1f2937;
  font-weight: 500;
  min-width: clamp(50px, 15vw, 60px);
  text-align: center;
}

button.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.menu-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(99, 102, 241, 0.1);
  font-size: clamp(0.8rem, 3vw, 0.9rem);
  color: #6366f1;
  font-weight: 500;
}

/* 深色模式样式覆盖 */
:deep(.dark-mode) .accessibility-menu {
  background: rgba(26, 26, 26, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

:deep(.dark-mode) .menu-item {
  background: rgba(45, 45, 45, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark-mode) .menu-item:hover {
  background: rgba(45, 45, 45, 0.8);
}

:deep(.dark-mode) .menu-item h3 {
  color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.dark-mode) .font-size-controls {
  background: rgba(45, 45, 45, 0.8);
}

:deep(.dark-mode) .font-size-controls button {
  background: rgba(45, 45, 45, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.dark-mode) .font-size-controls button:hover {
  background: rgba(61, 61, 61, 0.9);
}

:deep(.dark-mode) .font-size-controls span {
  color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.dark-mode) button.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  color: white !important;
  border: none;
}

:deep(.dark-mode) .menu-header,
:deep(.dark-mode) .menu-footer {
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark-mode) .menu-header h2 {
  background: linear-gradient(135deg, #93c5fd 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.dark-mode) .close-button {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.dark-mode) .close-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

:deep(.dark-mode) .shortcut,
:deep(.dark-mode) .keyboard-hint {
  color: #93c5fd !important;
  opacity: 0.9;
}

:deep(.dark-mode) .menu-footer p {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* 确保图标在深色模式下可见 */
:deep(.dark-mode) .icon {
  color: rgba(255, 255, 255, 0.95) !important;
}

/* 移动设备横屏适配 */
@media screen and (max-height: 500px) and (orientation: landscape) {
  .accessibility-menu {
    bottom: 20px;
    right: 90px;
    max-height: 80vh;
  }
  
  .menu-item {
    margin-bottom: 12px;
    padding: 10px;
  }
  
  .menu-header {
    margin-bottom: 16px;
    padding-bottom: 12px;
  }
  
  .menu-footer {
    margin-top: 16px;
    padding-top: 12px;
  }
}

/* 小屏幕设备适配 */
@media screen and (max-width: 380px) {
  .accessibility-button {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    font-size: 20px;
  }
  
  .accessibility-menu {
    padding: 16px;
  }
  
  .menu-item {
    padding: 10px;
  }
  
  .close-button {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
}

.shortcut {
  font-size: 0.8em;
  color: #6366f1;
  opacity: 0.8;
  margin-left: 8px;
}

.keyboard-hint {
  font-size: 0.9em;
  color: #6366f1;
  opacity: 0.8;
  margin: 0 0 8px 0;
}

:deep(.dark-mode) .shortcut,
:deep(.dark-mode) .keyboard-hint {
  color: #93c5fd;
}

/* 添加字体切换过渡效果 */
:deep(*) {
  transition: font-family 0.3s ease, letter-spacing 0.3s ease, word-spacing 0.3s ease, line-height 0.3s ease;
}

/* 添加字体切换提示 */
.font-change-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(99, 102, 241, 0.9);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 1.2em;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.font-change-indicator.show {
  opacity: 1;
}

:deep(.dark-mode) .font-change-indicator {
  background: rgba(147, 197, 253, 0.9);
  color: #1f2937;
}
</style> 
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

        <!-- Magnifier -->
        <div class="menu-item">
          <h3>
            <span class="icon">🔍</span>
            Screen Magnifier
            <span class="shortcut">(Alt + 7)</span>
          </h3>
          <div class="magnifier-controls">
            <button 
              @click="toggleMagnifier"
              :class="{ 'active': isMagnifierEnabled }"
              :aria-label="'Screen Magnifier ' + (isMagnifierEnabled ? 'Enabled' : 'Enable') + ' (Alt + 7)'"
              :title="'Screen Magnifier ' + (isMagnifierEnabled ? 'Enabled' : 'Enable') + ' (Alt + 7)'"
            >
              {{ isMagnifierEnabled ? 'Enabled' : 'Enable' }}
            </button>
            <div v-if="isMagnifierEnabled" class="zoom-controls">
              <button 
                @click="adjustMagnifierZoom(-0.5)"
                aria-label="Decrease Zoom"
                title="Decrease Zoom"
              >-</button>
              <span>{{ magnifierZoom }}x</span>
              <button 
                @click="adjustMagnifierZoom(0.5)"
                aria-label="Increase Zoom"
                title="Increase Zoom"
              >+</button>
            </div>
          </div>
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
      isDyslexiaFontEnabled: false,
      isHighlightLinksEnabled: localStorage.getItem('accessibility_highlightLinks') === 'true',
      isHighlightTitlesEnabled: localStorage.getItem('accessibility_highlightTitles') === 'true',
      isDarkMode: localStorage.getItem('accessibility_darkMode') === 'true',
      showFontIndicator: false,
      fontIndicatorText: '',
      isMagnifierEnabled: false,
      magnifierZoom: 1.5,
      lastFocusedElement: null,
      magnifierPosition: null,
    }
  },
  created() {
    // 从 localStorage 获取初始状态
    const savedDyslexiaState = localStorage.getItem('accessibility_dyslexiaFont')
    if (savedDyslexiaState === 'true') {
      this.isDyslexiaFontEnabled = true
      document.body.classList.add('dyslexia-font')
      this.applyDyslexiaFont()
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
        // 打开菜单时，记录当前焦点元素
        this.lastFocusedElement = document.activeElement
        this.$nextTick(() => {
          // 自动聚焦到第一个可聚焦元素
          const firstFocusable = this.$el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          if (firstFocusable) {
            firstFocusable.focus()
          }
        })
      } else {
        // 关闭菜单时，恢复之前的焦点
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
      // 切换状态
      this.isDyslexiaFontEnabled = !this.isDyslexiaFontEnabled
      
      // 更新字体
      if (this.isDyslexiaFontEnabled) {
        document.documentElement.style.setProperty('--dyslexia-font', '"OpenDyslexic", Arial, sans-serif')
        // 强制应用到根元素
        document.documentElement.style.fontFamily = 'var(--dyslexia-font)'
      } else {
        document.documentElement.style.setProperty('--dyslexia-font', 'inherit')
        // 恢复根元素默认字体
        document.documentElement.style.fontFamily = ''
      }
      
      // 保存状态
      localStorage.setItem('accessibility_dyslexiaFont', this.isDyslexiaFontEnabled)
      
      // 显示提示
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
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark-mode')
      localStorage.setItem('accessibility_darkMode', this.isDarkMode)
    },
    toggleMagnifier() {
      this.isMagnifierEnabled = !this.isMagnifierEnabled
      this.$emit('toggle-magnifier', this.isMagnifierEnabled)
      localStorage.setItem('accessibility_magnifier', this.isMagnifierEnabled)
      
      if (this.isMagnifierEnabled) {
        // 初始化放大镜位置
        const rect = document.body.getBoundingClientRect()
        this.magnifierPosition = {
          x: rect.width / 2,
          y: rect.height / 2
        }
      }
    },
    adjustMagnifierZoom(change) {
      this.magnifierZoom = Math.max(1.2, Math.min(4, this.magnifierZoom + change))
      this.$emit('set-magnifier-zoom', this.magnifierZoom)
      localStorage.setItem('accessibility_magnifierZoom', this.magnifierZoom)
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
          case '7':
            if (event.altKey) {
              event.preventDefault()
              this.toggleMagnifier()
            }
            break
        }
      }
    },
    applySettings() {
      // 应用保存的设置
      document.documentElement.style.fontSize = `${this.fontSize}%`
      
      // 检查并应用阅读障碍字体设置
      const savedDyslexiaState = localStorage.getItem('accessibility_dyslexiaFont')
      if (savedDyslexiaState === 'true') {
        this.isDyslexiaFontEnabled = true
        document.documentElement.style.setProperty('--dyslexia-font', '"OpenDyslexic", Arial, sans-serif')
        document.documentElement.style.fontFamily = 'var(--dyslexia-font)'
      }
      
      // 应用其他设置
      if (this.isHighlightLinksEnabled) document.body.classList.add('highlight-links')
      if (this.isHighlightTitlesEnabled) document.body.classList.add('highlight-titles')
      if (this.isDarkMode) document.body.classList.add('dark-mode')
      
      // 应用放大镜设置
      this.isMagnifierEnabled = localStorage.getItem('accessibility_magnifier') === 'true'
      this.magnifierZoom = parseFloat(localStorage.getItem('accessibility_magnifierZoom')) || 1.5
      if (this.isMagnifierEnabled) {
        this.$emit('toggle-magnifier', true)
        this.$emit('set-magnifier-zoom', this.magnifierZoom)
      }
    },
    applyDyslexiaFont() {
      if (this.isDyslexiaFontEnabled) {
        document.documentElement.style.setProperty('--dyslexia-font', '"OpenDyslexic", Arial, sans-serif')
      } else {
        document.documentElement.style.setProperty('--dyslexia-font', 'inherit')
      }
    },
  }
}
</script>

<style>
/* 全局样式 */
:root {
  --dyslexia-font: inherit;
}

/* 使用更强的选择器确保字体应用到所有文本元素 */
:root[style*="--dyslexia-font"] {
  font-family: var(--dyslexia-font) !important;
}

:root[style*="--dyslexia-font"] * {
  font-family: var(--dyslexia-font) !important;
}

/* 特别处理一些可能会被遗漏的元素 */
:root[style*="--dyslexia-font"] .accessibility-menu *,
:root[style*="--dyslexia-font"] h1,
:root[style*="--dyslexia-font"] h2,
:root[style*="--dyslexia-font"] h3,
:root[style*="--dyslexia-font"] h4,
:root[style*="--dyslexia-font"] h5,
:root[style*="--dyslexia-font"] h6,
:root[style*="--dyslexia-font"] p,
:root[style*="--dyslexia-font"] span,
:root[style*="--dyslexia-font"] div,
:root[style*="--dyslexia-font"] button,
:root[style*="--dyslexia-font"] input,
:root[style*="--dyslexia-font"] textarea,
:root[style*="--dyslexia-font"] label,
:root[style*="--dyslexia-font"] a {
  font-family: var(--dyslexia-font) !important;
}

/* 确保按钮状态样式正确显示 */
.menu-item button {
  position: relative;
  overflow: hidden;
}

.menu-item button.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: currentColor;
  opacity: 0.1;
}

/* 确保深色模式下的状态正确 */
:deep(.dark-mode) .menu-item button.active::before {
  opacity: 0.2;
}
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
.magnifier-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.font-size-controls button,
.zoom-controls button {
  width: 36px;
  height: 36px;
  min-width: unset;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* 深色模式 */
:deep(.dark-mode) .accessibility-menu,
:deep(.dark-mode) .menu-header,
:deep(.dark-mode) .menu-footer {
  background: #1a1a1a;
  color: #fff;
}

:deep(.dark-mode) .menu-header {
  border-bottom-color: #333;
}

:deep(.dark-mode) .menu-footer {
  border-top-color: #333;
}

:deep(.dark-mode) .menu-item {
  background: #2a2a2a;
}

:deep(.dark-mode) .menu-item h3 {
  color: #fff;
}

:deep(.dark-mode) .close-button {
  color: #999;
}

:deep(.dark-mode) .close-button:hover {
  background: #2a2a2a;
  color: #fff;
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
  .magnifier-controls {
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
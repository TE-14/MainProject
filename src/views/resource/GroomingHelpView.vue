<template>
  <div class="resource-container" @wheel="handleScroll" ref="container">
    <div class="sections-wrapper" :style="{ transform: `translateX(${-scrollPosition}px)` }">
      <section class="section">
        <div class="content-wrapper">
          <div class="text-content" :style="getTextStyle(0)">
            <h1 class="title glitch-text" data-text="Are you being groomed online?">Are you being groomed online?</h1>
            <div class="category">Emergency Help</div>
          </div>
          <div class="resource-grid" :style="{ transform: `translateX(${scrollPosition * 0.1}px)` }">
            <v-card class="warning-card resource-card mb-6" elevation="2">
              <v-card-title class="warning-title">
                <v-icon color="error" class="mr-2">mdi-alert-circle</v-icon>
                Emergency
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item prepend-icon="mdi-alert" title="Being asked for private photos"></v-list-item>
                  <v-list-item prepend-icon="mdi-alert" title="Being threatened"></v-list-item>
                  <v-list-item prepend-icon="mdi-alert" title="Feeling unsafe"></v-list-item>
                </v-list>
                <v-btn color="primary" block class="emergency-btn mt-4" prepend-icon="mdi-phone">
                  Call Emergency: 911
                </v-btn>
              </v-card-text>
            </v-card>

            <v-card class="help-card resource-card mb-6" elevation="2">
              <v-card-title>Take Action Now</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item prepend-icon="mdi-content-save" title="Save Evidence" subtitle="Screenshots, chat logs"></v-list-item>
                  <v-list-item prepend-icon="mdi-account-multiple" title="Tell Someone" subtitle="Parents or teachers"></v-list-item>
                  <v-list-item prepend-icon="mdi-block-helper" title="Block & Report" subtitle="Block on social media"></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <v-card class="support-card resource-card" elevation="2">
              <v-card-title>Get Support</v-card-title>
              <v-card-text>
                <div class="support-contacts">
                  <v-btn color="primary" block class="mb-4" prepend-icon="mdi-phone">
                    24/7 Helpline: 800-123-4567
                  </v-btn>
                  <v-btn color="secondary" block prepend-icon="mdi-chat">
                    Online Consultation
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div class="floating-elements">
            <div class="element element-1">
              <svg viewBox="0 0 200 200" class="blob">
                <path fill="rgba(133, 104, 201, 0.3)" d="M45.5,-59.5C57.9,-52.3,66.2,-37.1,71.1,-20.6C76,-4.1,77.4,13.8,71.5,28.9C65.6,43.9,52.3,56.1,37.1,63.4C21.9,70.7,4.8,73.1,-12.4,70.7C-29.7,68.3,-47.1,61.1,-58.9,47.9C-70.7,34.7,-76.9,15.5,-74.8,-2.1C-72.7,-19.7,-62.3,-35.7,-48.8,-42.8C-35.3,-49.9,-18.6,-48.1,-1.2,-46.5C16.3,-45,32.6,-43.8,45.5,-59.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div class="element element-2">
              <svg viewBox="0 0 200 200" class="blob">
                <path fill="rgba(99, 102, 241, 0.2)" d="M42.7,-57.2C54.9,-47.3,64.1,-33.5,69.2,-17.6C74.3,-1.7,75.2,16.2,68.6,30.8C61.9,45.4,47.6,56.7,31.5,63.9C15.4,71,-2.5,74,-20.6,71.1C-38.7,68.2,-57,59.4,-67.1,44.7C-77.2,30,-79.1,9.4,-74.2,-8.1C-69.2,-25.6,-57.5,-40,-43.6,-50C-29.7,-60,-14.9,-65.6,0.9,-66.8C16.7,-68,33.3,-64.8,42.7,-57.2Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div class="element element-3">
              <svg viewBox="0 0 200 200" class="blob">
                <path fill="rgba(199, 210, 254, 0.3)" d="M48.2,-64.8C62,-55.6,72.2,-40.6,75.7,-24.4C79.2,-8.2,76,9.2,68.9,24.4C61.8,39.6,50.8,52.6,37.2,60.7C23.6,68.9,7.3,72.2,-9.7,71.1C-26.7,70,-44.4,64.5,-57.8,53C-71.1,41.4,-80.1,23.8,-81.1,5.8C-82.1,-12.2,-75.1,-30.5,-62.8,-40.2C-50.5,-49.9,-32.9,-51,-17.8,-60.5C-2.7,-69.9,9.9,-87.7,25.5,-86.8C41.2,-86,62,-74.4,48.2,-64.8Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
        </div>
      </section>

      <section class="section">
        <div class="content-wrapper">
          <div class="text-content" :style="getTextStyle(1)">
            <h2 class="title glitch-text" data-text="How to Prevent Online Grooming">How to Prevent Online Grooming</h2>
            <div class="category">Protection Guide</div>
          </div>
          <div class="resource-grid" :style="{ transform: `translateX(${(scrollPosition - windowWidth) * 0.1}px)` }">
            <v-card class="resource-card mb-6" elevation="2">
              <v-card-title>Preventive Measures</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item prepend-icon="mdi-shield-check" title="Protect Privacy" subtitle="Don't share personal information"></v-list-item>
                  <v-list-item prepend-icon="mdi-account-lock" title="Be Cautious" subtitle="Don't trust strangers"></v-list-item>
                  <v-list-item prepend-icon="mdi-alert-circle" title="Recognize Danger" subtitle="Learn common grooming tactics"></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

            <v-card class="resource-card" elevation="2">
              <v-card-title>Safety Tips</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item prepend-icon="mdi-camera-off" title="No Private Photos" subtitle="Never share intimate photos"></v-list-item>
                  <v-list-item prepend-icon="mdi-map-marker-off" title="Avoid Meetings" subtitle="Don't meet online friends in person"></v-list-item>
                  <v-list-item prepend-icon="mdi-account-multiple" title="Tell Parents" subtitle="Keep communication with parents"></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </section>
    </div>

    <!-- 页面指示器 -->
    <div class="page-indicators">
      <div v-for="n in 2" 
           :key="n"
           class="page-indicator"
           :class="{ 'active': getCurrentSection === n }"
           @click="scrollToSection(n)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroomingHelpView',
  data() {
    return {
      scrollPosition: 0,
      windowWidth: window.innerWidth,
      scrolling: false
    }
  },
  computed: {
    getCurrentSection() {
      return Math.floor(this.scrollPosition / this.windowWidth) + 1
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleScroll(e) {
      e.preventDefault()
      if (this.scrolling) return

      const delta = e.deltaY
      const maxScroll = this.windowWidth
      const scrollSpeed = 3.0
      
      let targetScroll = this.scrollPosition + delta * scrollSpeed
      
      if (targetScroll > maxScroll / 2 && delta > 0) {
        targetScroll = maxScroll
      } else if (targetScroll < maxScroll / 2 && delta < 0) {
        targetScroll = 0
      }
      
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll))
      
      const animate = () => {
        const diff = targetScroll - this.scrollPosition
        if (Math.abs(diff) < 0.5) {
          this.scrollPosition = targetScroll
          this.scrolling = false
          return
        }
        this.scrollPosition += diff * 0.2
        requestAnimationFrame(animate)
      }
      
      this.scrolling = true
      requestAnimationFrame(animate)
    },
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    getTextStyle(sectionIndex) {
      const offset = this.scrollPosition - (sectionIndex * this.windowWidth)
      const threshold = this.windowWidth * 0.5
      
      const scale = Math.min(1, Math.max(0.6, 1 - Math.abs(offset) / (threshold * 2)))
      const opacity = Math.min(1, Math.max(0, 1 - Math.abs(offset) / threshold))
      
      return {
        transform: `scale(${scale})`,
        opacity: opacity
      }
    },
    scrollToSection(section) {
      const targetScroll = (section - 1) * this.windowWidth
      
      const animate = () => {
        const diff = targetScroll - this.scrollPosition
        if (Math.abs(diff) < 0.5) {
          this.scrollPosition = targetScroll
          this.scrolling = false
          return
        }
        this.scrollPosition += diff * 0.2
        requestAnimationFrame(animate)
      }
      
      this.scrolling = true
      requestAnimationFrame(animate)
    }
  }
}
</script>

<style scoped>
.resource-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, 
    #e8e6ff 0%,      /* 浅白紫色开始 */
    #d4d0ff 15%,     /* 浅紫色 */
    #b8acff 30%,     /* 中浅紫色 */
    #9c8cff 45%,     /* 中紫色 */
    #7b68ee 60%,     /* 中深紫色 */
    #483d8b 75%,     /* 深紫色 */
    #1a1f5f 100%     /* 深藏蓝色结束 */
  );
}

.sections-wrapper {
  display: flex;
  width: 200%;
  height: calc(100vh - 64px);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.section {
  flex: 0 0 50%;
  width: 50%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  overflow-y: auto;
}

.text-content {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  overflow-y: auto;
  max-height: calc(100vh - 250px); /* 设置最大高度，留出标题和边距的空间 */
}

.resource-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  color: #1a1035;
  height: fit-content; /* 高度自适应内容 */
  min-height: 200px; /* 设置最小高度 */
}

.resource-card:hover {
  transform: translateY(-10px) translateZ(30px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 30px rgba(255, 255, 255, 0.3),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
}

.warning-card {
  border-left: 4px solid #6366f1;
}

.warning-title {
  background-color: rgba(224, 231, 255, 0.6) !important;
  color: #4f46e5 !important;
  -webkit-text-fill-color: #4f46e5 !important;
}

.v-card-title {
  background: linear-gradient(135deg, #8568c9, #2b0b3f) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 800 !important;
  letter-spacing: 0.03em !important;
  font-size: 1.3rem !important;
  filter: drop-shadow(0 0 8px rgba(133, 104, 201, 0.3)) !important;
  padding: 1rem !important;
}

.title {
  font-size: 2.5rem; /* 稍微减小标题大小 */
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #1a1f5f, #483d8b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.category {
  font-size: 1.25rem; /* 稍微减小分类文字大小 */
  color: #6366f1;
  margin-bottom: 1rem;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.element {
  position: absolute;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -50%);
}

.element-1 {
  top: 20%;
  left: 20%;
}

.element-2 {
  top: 80%;
  left: 80%;
}

.element-3 {
  top: 50%;
  left: 50%;
}

.element svg path {
  fill: rgba(133, 104, 201, 0.3);
}

.element-2 svg path {
  fill: rgba(99, 102, 241, 0.2);
}

.element-3 svg path {
  fill: rgba(199, 210, 254, 0.3);
}

.gradient-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.orb {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
  animation: orbit 10s linear infinite;
}

.orb-1 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.orb-2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes orbit {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.page-indicators {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
}

.page-indicator {
  width: 3px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.page-indicator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #4158d0, #c850c0);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-indicator.active::before {
  transform: scaleY(1);
}

.page-indicator:hover::before {
  transform: scaleY(0.5);
}

:deep(.v-btn) {
  background: linear-gradient(135deg, #8568c9, #2b0b3f) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 4px 15px rgba(133, 104, 201, 0.3) !important;
  transition: all 0.3s ease !important;
}

:deep(.v-btn:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(133, 104, 201, 0.4) !important;
  background: linear-gradient(135deg, #9d89d9, #3d1c5c) !important;
}

:deep(.v-btn.v-btn--color-primary) {
  background: linear-gradient(135deg, #8568c9, #2b0b3f) !important;
}

:deep(.v-btn.v-btn--color-secondary) {
  background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
}

:deep(.v-btn.v-btn--color-error) {
  background: linear-gradient(135deg, #7b68ee, #483d8b) !important;
}

:deep(.v-alert.v-alert--type-error) {
  background-color: rgba(99, 102, 241, 0.1) !important;
  color: #4f46e5 !important;
  border-color: #6366f1 !important;
}

:deep(.v-alert.v-alert--type-error .v-alert-title) {
  color: #4f46e5 !important;
}

.emergency-btn {
  background: linear-gradient(135deg, #8568c9, #2b0b3f) !important;
  color: white !important;
  font-weight: bold !important;
  margin-top: 1rem !important;
  padding: 1rem !important;
  box-shadow: 0 4px 15px rgba(133, 104, 201, 0.3) !important;
}

.emergency-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(133, 104, 201, 0.4) !important;
  background: linear-gradient(135deg, #9d89d9, #3d1c5c) !important;
}

/* 添加警告消息样式 */
.warning-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid #6366f1;
  border-radius: 8px;
  color: #4f46e5;
  font-weight: bold;
  font-size: 1.1rem;
}

.warning-icon {
  color: #6366f1;
  font-size: 24px;
}

.v-card-text {
  padding: 1rem !important;
  max-height: calc(100vh - 350px); /* 设置最大高度 */
  overflow-y: auto; /* 允许内容滚动 */
}
</style> 
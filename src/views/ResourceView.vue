<template>
  <div class="resource-container" @wheel="handleScroll" ref="container">
    <div class="sections-wrapper" :style="{ transform: `translateX(${-scrollPosition}px)` }">
      <!-- 第一屏 -->
      <section class="section" ref="section1">
        <div class="content-wrapper">
          <div class="text-content" :style="getTextStyle(0)">
            <h1 class="title glitch-text" data-text="Youth Safety">Youth Safety</h1>
            <h1 class="title glitch-text" data-text="Contact Guide">Contact Guide</h1>
            <div class="category">Safety Education</div>
          </div>
          <div class="scroll-navigation">
            <div class="scroll-circle">
              <div class="scroll-progress" :style="{ transform: `rotate(${getScrollProgress()}deg)` }"></div>
              <div class="scroll-text">Scroll</div>
              <div class="scroll-icon">
                <div class="scroll-arrow"></div>
              </div>
            </div>
            <div class="scroll-hint">
              <span>Scroll Down to Learn More</span>
            </div>
          </div>
          <div class="floating-elements">
            <div class="element element-1">
              <svg viewBox="0 0 200 200" class="blob">
                <path fill="rgba(157, 137, 217, 0.3)" d="M45.5,-59.5C57.9,-52.3,66.2,-37.1,71.1,-20.6C76,-4.1,77.4,13.8,71.5,28.9C65.6,43.9,52.3,56.1,37.1,63.4C21.9,70.7,4.8,73.1,-12.4,70.7C-29.7,68.3,-47.1,61.1,-58.9,47.9C-70.7,34.7,-76.9,15.5,-74.8,-2.1C-72.7,-19.7,-62.3,-35.7,-48.8,-42.8C-35.3,-49.9,-18.6,-48.1,-1.2,-46.5C16.3,-45,32.6,-43.8,45.5,-59.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div class="element element-2">
              <svg viewBox="0 0 200 200" class="blob">
                <path fill="rgba(42, 27, 63, 0.2)" d="M42.7,-57.2C54.9,-47.3,64.1,-33.5,69.2,-17.6C74.3,-1.7,75.2,16.2,68.6,30.8C61.9,45.4,47.6,56.7,31.5,63.9C15.4,71,-2.5,74,-20.6,71.1C-38.7,68.2,-57,59.4,-67.1,44.7C-77.2,30,-79.1,9.4,-74.2,-8.1C-69.2,-25.6,-57.5,-40,-43.6,-50C-29.7,-60,-14.9,-65.6,0.9,-66.8C16.7,-68,33.3,-64.8,42.7,-57.2Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div class="element element-3">
              <svg viewBox="0 0 200 200" class="blob">
                <path fill="rgba(241, 212, 244, 0.3)" d="M48.2,-64.8C62,-55.6,72.2,-40.6,75.7,-24.4C79.2,-8.2,76,9.2,68.9,24.4C61.8,39.6,50.8,52.6,37.2,60.7C23.6,68.9,7.3,72.2,-9.7,71.1C-26.7,70,-44.4,64.5,-57.8,53C-71.1,41.4,-80.1,23.8,-81.1,5.8C-82.1,-12.2,-75.1,-30.5,-62.8,-40.2C-50.5,-49.9,-32.9,-51,-17.8,-60.5C-2.7,-69.9,9.9,-87.7,25.5,-86.8C41.2,-86,62,-74.4,48.2,-64.8Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
        </div>
      </section>

      <!-- 添加过渡图标 -->
      <div class="section-transition" :style="{ 
        opacity: getTransitionOpacity(0),
        transform: `translate(-50%, -50%) scale(${getTransitionScale(0)})`
      }">
        <div class="transition-icon">
          <v-icon size="48" color="white">mdi-shield-check</v-icon>
        </div>
        <div class="transition-lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- 第二屏 -->
      <section class="section" ref="section2">
        <div class="content-wrapper">
          <div class="text-content" :style="getTextStyle(1)">
            <h2 class="title glitch-text" data-text="Safety Knowledge">Safety Knowledge</h2>
            <h2 class="title glitch-text" data-text="Resource Library">Resource Library</h2>
            <div class="category">Resources</div>
          </div>
          <div class="resource-grid" :style="{ transform: `translateX(${(scrollPosition - windowWidth) * 0.1}px)` }">
            <v-card v-for="(resource, index) in resources" 
                   :key="index" 
                   class="resource-card"
                   :style="{ 
                     transform: `translateY(${getCardOffset(index)}px)`,
                     opacity: getCardOpacity(index)
                   }">
              <v-card-title>{{ resource.title }}</v-card-title>
              <v-card-text>{{ resource.description }}</v-card-text>
            </v-card>
          </div>
        </div>
      </section>

      <!-- 添加第二个过渡图标 -->
      <div class="section-transition" :style="{ 
        opacity: getTransitionOpacity(1),
        transform: `translate(-50%, -50%) scale(${getTransitionScale(1)})`
      }">
        <div class="transition-icon">
          <v-icon size="48" color="white">mdi-phone-in-talk</v-icon>
        </div>
        <div class="transition-lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- 第三屏 -->
      <section class="section" ref="section3">
        <div class="content-wrapper">
          <div class="text-content" :style="getTextStyle(2)">
            <h2 class="title glitch-text" data-text="Contact Us">Contact Us</h2>
            <h2 class="title glitch-text" data-text="Get Help">Get Help</h2>
            <div class="category">Contact</div>
          </div>
          <div class="contact-content" :style="{ transform: `translateX(${(scrollPosition - windowWidth * 2) * 0.1}px)` }">
            <div class="contact-grid">
              <v-card class="contact-card" v-for="(contact, index) in contacts" :key="index"
                     :style="{ 
                       transform: `translateY(${getCardOffset(index)}px)`,
                       opacity: getCardOpacity(index)
                     }">
                <v-card-title>{{ contact.title }}</v-card-title>
                <v-card-text>{{ contact.info }}</v-card-text>
              </v-card>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页面指示器 -->
    <div class="page-indicators">
      <div v-for="n in 3" 
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
  name: 'ResourceView',
  data() {
    return {
      scrollPosition: 0,
      windowWidth: window.innerWidth,
      scrolling: false,
      resources: [
        {
          title: 'Safe Contact Guide',
          description: 'Learn about appropriate physical contact and how to protect your personal boundaries.'
        },
        {
          title: 'Danger Signal Recognition',
          description: 'Learn to identify potential danger signals and protect yourself from inappropriate contact.'
        },
        {
          title: 'Seeking Help',
          description: 'Know how and where to seek help when encountering difficulties.'
        }
      ],
      contacts: [
        {
          title: '24/7 Helpline',
          info: '12345'
        },
        {
          title: 'Online Consultation',
          info: 'Click to Start Chat'
        }
      ]
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
      const maxScroll = this.windowWidth * 2
      const scrollSpeed = 8.0 // 大幅提高滚动速度
      
      // 使用 requestAnimationFrame 实现更流畅的滚动
      const targetScroll = Math.max(0, Math.min(this.scrollPosition + delta * scrollSpeed, maxScroll))
      const animate = () => {
        const diff = targetScroll - this.scrollPosition
        if (Math.abs(diff) < 0.5) {
          this.scrollPosition = targetScroll
          this.scrolling = false
          return
        }
        this.scrollPosition += diff * 0.4 // 增加过渡速度
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
      const threshold = this.windowWidth * 0.3 // 减小阈值，让内容更早开始变化
      
      // 调整缩放和透明度的计算方式
      const scale = Math.min(1, Math.max(0.6, 1 - Math.abs(offset) / (threshold * 2)))
      const opacity = Math.min(1, Math.max(0, 1 - Math.abs(offset) / threshold))
      
      // 调整位移效果
      const translateX = offset * 0.1
      const translateY = Math.abs(offset) > threshold ? offset * 0.05 : 0
      
      return {
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        opacity: opacity
      }
    },
    getCardOffset(index) {
      const baseOffset = 50 // 减小基础偏移量
      const currentSection = Math.floor(this.scrollPosition / this.windowWidth)
      const sectionOffset = this.scrollPosition - (currentSection * this.windowWidth)
      const threshold = this.windowWidth * 0.3
      
      if (Math.abs(sectionOffset) < threshold) {
        return 0 // 在中间区域时不偏移
      }
      
      const delay = index * 0.1
      return baseOffset * Math.max(0, Math.min(1, (Math.abs(sectionOffset) - threshold) / threshold + delay))
    },
    getCardOpacity(index) {
      const currentSection = Math.floor(this.scrollPosition / this.windowWidth)
      const sectionOffset = this.scrollPosition - (currentSection * this.windowWidth)
      const threshold = this.windowWidth * 0.3
      
      if (Math.abs(sectionOffset) < threshold) {
        return 1 // 在中间区域时完全显示
      }
      
      const delay = index * 0.1
      return Math.max(0, Math.min(1, 1 - (Math.abs(sectionOffset) - threshold) / threshold + delay))
    },
    scrollToSection(section) {
      this.scrollPosition = (section - 1) * this.windowWidth
    },
    getTransitionOpacity(index) {
      const position = this.scrollPosition - (this.windowWidth * index + this.windowWidth / 2)
      const threshold = this.windowWidth * 0.15 // 减小过渡图标的显示阈值
      const distance = Math.abs(position)
      return Math.max(0, 1 - distance / threshold)
    },
    getTransitionScale(index) {
      const position = this.scrollPosition - (this.windowWidth * index + this.windowWidth / 2)
      const threshold = this.windowWidth * 0.2
      const distance = Math.abs(position)
      const scale = Math.max(0.5, 1 - distance / threshold)
      return scale
    },
    getScrollProgress() {
      // 计算滚动进度，转换为角度（0-360）
      return (this.scrollPosition / (this.windowWidth * 2)) * 360
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
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
}

.section {
  min-width: 100vw;
  height: 100vh;
  position: relative;
  overflow: visible;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 30% 50%, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.03) 50%
  );
  pointer-events: none;
}

.content-wrapper {
  position: relative;
  height: 100%;
  padding: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform-style: preserve-3d;
}

.text-content {
  flex: 1;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform, opacity;
}

.title {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.2;
  position: relative;
  letter-spacing: -0.02em;
  background: linear-gradient(
    135deg,
    #2b0b3f 0%,    /* 深紫色 */
    #8568c9 50%,    /* 浅紫色 */
    #ffc6ff 100%    /* 紫粉色 */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(133, 104, 201, 0.5));
  transform-style: preserve-3d;
  perspective: 1000px;
  margin-bottom: 1rem;
}

.title.glitch-text {
  position: relative;
  animation: titlePulse 4s ease-in-out infinite;
}

.title.glitch-text::before {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -1px 0 #8568c9;
  top: 0;
  color: #2b0b3f;
  background: none;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-before 3s infinite linear alternate-reverse;
}

.title.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  text-shadow: 1px 0 #ffc6ff;
  top: 0;
  color: #8568c9;
  background: none;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-after 2s infinite linear alternate-reverse;
}

@keyframes titlePulse {
  0%, 100% {
    transform: translateZ(0) scale(1);
    filter: drop-shadow(0 0 15px rgba(133, 104, 201, 0.5));
  }
  50% {
    transform: translateZ(50px) scale(1.02);
    filter: drop-shadow(0 0 25px rgba(133, 104, 201, 0.7));
  }
}

@keyframes noise-before {
  0% {
    clip: rect(61px, 9999px, 94px, 0);
  }
  5% {
    clip: rect(70px, 9999px, 46px, 0);
  }
  10% {
    clip: rect(29px, 9999px, 55px, 0);
  }
  15% {
    clip: rect(85px, 9999px, 92px, 0);
  }
  20% {
    clip: rect(28px, 9999px, 31px, 0);
  }
  25% {
    clip: rect(54px, 9999px, 98px, 0);
  }
}

@keyframes noise-after {
  0% {
    clip: rect(91px, 9999px, 24px, 0);
  }
  5% {
    clip: rect(50px, 9999px, 66px, 0);
  }
  10% {
    clip: rect(19px, 9999px, 75px, 0);
  }
  15% {
    clip: rect(85px, 9999px, 42px, 0);
  }
  20% {
    clip: rect(28px, 9999px, 31px, 0);
  }
  25% {
    clip: rect(74px, 9999px, 88px, 0);
  }
}

.category {
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-top: 1.5rem;
  position: relative;
  background: linear-gradient(
    to right,
    #2b0b3f,
    #8568c9,
    #ffc6ff
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(133, 104, 201, 0.3));
}

.category::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #8568c9, #ffc6ff);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(133, 104, 201, 0.5);
}

.background-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
  filter: brightness(1.2) contrast(1.1);
}

.resource-grid, .contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 2rem;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  transform-style: preserve-3d;
  will-change: transform;
}

.resource-card, .contact-card {
  background: rgba(255, 255, 255, 0.1); /* 提高卡片透明度 */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  color: #1a1035; /* 更深的紫色 */
}

.resource-card::before, .contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.resource-card:hover, .contact-card:hover {
  transform: translateY(-10px) translateZ(30px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 30px rgba(255, 255, 255, 0.3),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
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

.v-card-text {
  color: #2b0b3f !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  font-size: 1rem !important;
  letter-spacing: 0.01em !important;
  padding: 0.5rem 1rem !important;
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

/* 添加浮动装饰元素 */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a5acd, #a8b2ff);
  opacity: 0.1;
  filter: blur(50px);
}

.shape-1 {
  width: 500px;
  height: 500px;
  top: -10%;
  left: -10%;
  animation: float 20s infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  top: 60%;
  right: -5%;
  animation: float 15s infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, 30px);
  }
}

/* 更新滚动提示样式 */
.scroll-navigation {
  position: relative;
  margin-right: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}

.scroll-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.scroll-progress {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #fff;
  transition: transform 0.3s ease;
  will-change: transform;
}

.scroll-text {
  color: #ffffff;
  font-size: 1rem;
  letter-spacing: 0.2em;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.scroll-icon {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 16px;
  height: 16px;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  transform: rotate(45deg);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.scroll-hint {
  color: #ffffff;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}

/* 添加过渡图标样式 */
.section-transition {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 90;
  pointer-events: none;
}

.transition-icon {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 0 30px rgba(255, 255, 255, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  animation: iconPulse 2s infinite;
}

.transition-lines {
  display: flex;
  gap: 0.5rem;
}

.transition-lines span {
  width: 30px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  animation: linePulse 1.5s infinite;
}

.transition-lines span:nth-child(2) {
  animation-delay: 0.2s;
}

.transition-lines span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 0 30px rgba(255, 255, 255, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 
      0 0 50px rgba(255, 255, 255, 0.4),
      inset 0 0 30px rgba(255, 255, 255, 0.3);
  }
}

@keyframes linePulse {
  0%, 100% {
    transform: scaleX(0.5);
    opacity: 0.2;
  }
  50% {
    transform: scaleX(1);
    opacity: 0.8;
  }
}

/* 添加动态光晕效果 */
.gradient-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  mix-blend-mode: soft-light;
  animation: orbFloat 20s infinite;
  opacity: 0.5;
}

.orb-1 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle at center, 
    rgba(232, 230, 255, 0.3), /* 浅白紫色 */
    rgba(156, 140, 255, 0.2) /* 中紫色 */
  );
  top: -20%;
  left: -10%;
  mix-blend-mode: overlay;
}

.orb-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at center, 
    rgba(123, 104, 238, 0.3), /* 中深紫色 */
    rgba(26, 31, 95, 0.2) /* 深藏蓝色 */
  );
  bottom: -10%;
  right: -10%;
  mix-blend-mode: overlay;
  animation-delay: -10s;
}

/* 添加设备浮动效果 */
.floating-elements {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%) translateZ(0);
  width: 50%;
  height: 70vh;
  perspective: 2000px;
  will-change: transform;
}

.element {
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.element-1 {
  width: 60%;
  top: 10%;
  right: 0;
  transform: translateZ(100px);
  animation: float 8s ease-in-out infinite;
}

.element-2 {
  width: 45%;
  top: 40%;
  right: 35%;
  transform: translateZ(50px);
  animation: float 12s ease-in-out infinite;
  animation-delay: -2s;
}

.element-3 {
  width: 35%;
  bottom: 10%;
  right: 10%;
  transform: translateZ(150px);
  animation: float 10s ease-in-out infinite;
  animation-delay: -4s;
}

.blob {
  width: 100%;
  height: auto;
  filter: blur(10px);
  opacity: 0.6;
  transform-origin: center;
  animation: blob-rotate 20s linear infinite;
}

@keyframes blob-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.glitch-text {
  position: relative;
  animation: none;
}

.glitch-text::before,
.glitch-text::after {
  display: none;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(50px, 50px) scale(1.1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateZ(var(--z)) rotate3d(1, 1, 1, 0deg);
  }
  50% {
    transform: translateY(-30px) translateZ(calc(var(--z) + 50px)) rotate3d(1, 1, 1, 3deg);
  }
}
</style> 
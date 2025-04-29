<template>
  <div class="resource-container" @wheel="handleScroll" ref="container">
    <div class="sections-wrapper" :style="getTransformStyle">
      <!-- First screen: Main intro panel -->
      <section class="section intro-section">
        <div class="full-screen-panel grooming-panel">
          <div class="panel-overlay"></div>
          <div class="panel-content">
            <h1 class="panel-title">Online Grooming</h1>
            <div class="banner-message">
              <h2 class="banner-headline">Something feels off? Trust that feeling.</h2>
              <p class="banner-text">
                Online grooming often starts with friendly messages — but if someone pushes personal questions, asks for photos, or wants to keep your chat secret, pause and trust your instincts. Healthy connections never rely on secrecy or pressure.
              </p>
            </div>
            <div class="scroll-hint">
              <span>Scroll to explore</span>
              <div class="scroll-arrow-container">
                <v-icon class="scroll-arrow" icon="mdi-chevron-down"></v-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Second screen: Understanding section -->
      <section class="section">
        <div class="content-wrapper">
          <div class="text-content">
            <div class="title">Understanding Online Grooming</div>
            <div class="category">Warning Signs & Prevention</div>
          </div>
          <div class="resource-grid">
            <!-- First Card: Warning Signs -->
            <v-card class="resource-card warning-card">
              <v-card-title class="warning-title">
                Recognize the Red Flags
              </v-card-title>
              <v-card-text>
                <div class="warning-message">
                  <v-icon class="warning-icon" icon="mdi-alert-circle"></v-icon>
                  <div>Trust your instincts</div>
                </div>
                <p class="mt-2">Real friends don't ask for secrets, pics, or silence.</p>
                <p>If someone wants you to send private images, meet in person, or stay quiet — that's manipulation, not friendship. You always have the right to say no, and no one should make you feel bad for doing so.</p>
              </v-card-text>
            </v-card>

            <!-- Second Card: Not Your Fault -->
            <v-card class="resource-card help-card">
              <v-card-title>
                It's Not Your Fault
              </v-card-title>
              <v-card-text>
                <p>You're not alone — and this is not your fault.</p>
                <p>Groomers often make young people feel isolated or responsible. But their behavior is the problem, not yours. Talk to someone you trust — a teacher, parent, or counselor. You deserve support, and help is always available.</p>
                <div class="remember-tip mt-3">
                  <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                  <span>You deserve support</span>
                </div>
              </v-card-text>
            </v-card>

            <!-- Third Card: Evidence -->
            <v-card class="resource-card">
              <v-card-title>
                Save the Evidence
              </v-card-title>
              <v-card-text>
                <p>Save the Evidence</p>
                <p>It can help you later.</p>
                <p>Even if you're unsure, don't delete messages. Save screenshots, usernames, and chat history. This evidence can help if you decide to report — and protect others, too.</p>
                <div class="remember-tip mt-3">
                  <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                  <span>How to save evidence</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </section>

      <!-- Third screen: Support Resources -->
      <section class="section">
        <div class="content-wrapper">
          <div class="text-content">
            <div class="title">Reach Out For Help</div>
            <div class="category">Support Resources</div>
          </div>
          <div class="resource-grid">
            <!-- Local Services Card -->
            <v-card class="resource-card">
              <v-card-title>
                Local Support Services
              </v-card-title>
              <v-card-text>
                <p>You can contact local services confidentially:</p>
                <ul class="mt-2">
                  <li><strong>headspace Melbourne</strong> (Youth Mental Health)</li>
                  <li>headspace.org.au/headspace-centres/melbourne</li>
                </ul>
                <div class="remember-tip mt-3">
                  <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                  <span>Find Local Support</span>
                </div>
              </v-card-text>
            </v-card>

            <!-- National Resources Card -->
            <v-card class="resource-card support-card">
              <v-card-title>
                National Resources
              </v-card-title>
              <v-card-text>
                <ul class="support-list">
                  <li>
                    <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                    Kids Helpline: 1800 55 1800
                  </li>
                  <li>
                    <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                    eSafety Commissioner
                  </li>
                  <li>
                    <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                    www.esafety.gov.au
                  </li>
                </ul>
              </v-card-text>
            </v-card>

            <!-- Encouragement Card -->
            <v-card class="resource-card">
              <v-card-title>
                Remember
              </v-card-title>
              <v-card-text>
                <div class="encouragement-message">
                  <p class="quote">"Speaking up is a sign of strength — and you're not alone."</p>
                </div>
                <p class="mt-3">People are ready to help. Taking the first step to talk to someone may feel difficult, but professionals understand what you're going through and can provide the support you need.</p>
                <div class="remember-tip mt-3">
                  <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                  <span>Find Help</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </section>
    </div>

    <!-- Return to main page hint -->
    <div v-if="currentSection === 2" class="return-to-main-hint">
      <v-icon class="bounce-arrow" icon="mdi-chevron-down" size="large" color="white"></v-icon>
      <div class="hint-text">Scroll down to return</div>
    </div>

    <!-- Return button -->
    <div class="return-button" @click="returnToResources">
      <v-icon icon="mdi-chevron-left"></v-icon>
      <span>Back</span>
    </div>

    <!-- Page indicators -->
    <div class="page-indicators">
      <div
        v-for="(_, index) in Array(totalSections)"
        :key="index"
        class="page-indicator"
        :class="{ active: currentSection === index }"
        @click="scrollToSection(index)"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GroomingHelpView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      currentSection: 0,
      scrollThreshold: 50,
      windowWidth: window.innerWidth,
      lastScrollTime: 0,
      scrollCooldown: 1000, // 1 second cooldown
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    totalSections() {
      return 3;
    },
    getTransformStyle() {
      return {
        transform: `translateX(-${this.currentSection * (100 / this.totalSections)}%)`,
      };
    },
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    scrollToSection(index) {
      this.currentSection = index;
    },
    handleScroll(event) {
      const now = Date.now();
      if (now - this.lastScrollTime < this.scrollCooldown) {
        return;
      }
      
      if (event.deltaY > this.scrollThreshold) {
        // 向下滚动
        if (this.currentSection < this.totalSections - 1) {
          this.currentSection++;
          this.lastScrollTime = now;
        } else {

          // When scrolling down in the last section, return to the main resources page
          this.returnToResources();
        }
      } else if (event.deltaY < -this.scrollThreshold) {

        if (this.currentSection > 0) {
          this.currentSection--;
          this.lastScrollTime = now;
        }
      }
    },
    getTextStyle(sectionIndex) {
      const opacity = this.currentSection === sectionIndex ? 1 : 0.3;
      return {
        opacity,
      };
    },
    returnToResources() {
      this.router.push({ name: 'resources' });
    },
  },
});
</script>

<style scoped>
.resource-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, 
    #e8e6ff 0%,      
    #d4d0ff 15%,    
    #b8acff 30%,   
    #9c8cff 45%,     
    #7b68ee 60%,    
    #483d8b 75%,                            
    #1a1f5f 100%     
  );
}

.sections-wrapper {
  display: flex;
  width: 300%;
  height: calc(100vh - 64px);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}

.section {
  flex: 0 0 33.333%;
  width: 33.333%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}


/* 全屏过渡面板样式 */

.intro-section {
  padding: 0;
  overflow: hidden;
}

.full-screen-panel {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.grooming-panel {
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('@/assets/grooming-background.jpg');
  background-size: cover;
  background-position: center;
}

.panel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.panel-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.panel-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  position: relative;
  text-transform: uppercase;
  letter-spacing: 3px;
  background: linear-gradient(
    135deg,

    #ffffff 0%,   
    #d9d9ff 50%,    
    #a6a6ff 100%    

  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(133, 104, 201, 0.8));
}

.panel-description {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  font-weight: 300;
  opacity: 0.9;
}

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.scroll-arrow-container {
  margin-top: 1rem;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  color: white !important;
  opacity: 0.8;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
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
  margin-top: 4rem;
  margin-bottom: 1rem;
  text-align: center;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.resource-grid {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  justify-content: center;
  align-items: stretch;
}

.resource-card {
  flex: 0 1 350px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  color: #0c2c4d;
  display: flex;
  flex-direction: column;
}

.resource-card:hover {
  transform: translateY(-5px) translateZ(20px) scale(1.01);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(255, 255, 255, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.warning-card,
.help-card,
.support-card {
  flex: 0 1 350px;
  height: 300px;
}

.warning-card {
  border-left: 3px solid #6366f1;
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
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  font-size: 1.2rem !important;
  filter: drop-shadow(0 0 5px rgba(133, 104, 201, 0.3)) !important;
  padding: 0.8rem 1rem !important;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #1a1f5f, #483d8b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.category {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  background: linear-gradient(135deg, #7D5FD3, #4A389F);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  letter-spacing: 0.08em;
  text-shadow: 0 0 10px rgba(125, 95, 211, 0.8);
  display: inline-block;
  position: relative;
  padding: 0.4rem 1.2rem;
}

.category::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  backdrop-filter: blur(5px);
  z-index: -1;
  border: 1px solid rgba(125, 95, 211, 0.5);
  box-shadow: 0 3px 15px rgba(125, 95, 211, 0.4);
}

.category::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 15%;
  width: 70%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #7D5FD3, transparent);
  border-radius: 2px;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 0.7;
    box-shadow: 0 0 5px rgba(125, 95, 211, 0.5);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 10px rgba(125, 95, 211, 0.8);
  }
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
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 10;
}

.page-indicator {
  width: 3px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 1.5px;
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
  border-radius: 1.5px;
}

.page-indicator.active::before {
  transform: scaleY(1);
}

.page-indicator:hover::before {
  transform: scaleY(0.5);
}

/* 默认按钮样式 - 更柔和 */
:deep(.v-btn:not(.support-contacts .v-btn)) {
  background: rgba(133, 104, 201, 0.05) !important;
  color: #483d8b !important;
  border: none !important;
  border-radius: 8px !important;
  height: auto !important;
  padding: 12px 24px !important;
  font-size: 0.95rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.5px !important;
  box-shadow: none !important;
  transition: none !important;
  pointer-events: none !important;
  cursor: default !important;
  width: 100% !important;
  max-width: 300px !important;
  margin: 8px auto !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  opacity: 0.85 !important;
}

/* 操作按钮样式 - 更柔和 */
.action-btn {
  padding: 12px 24px !important;
  font-size: 0.95rem !important;
  font-weight: 400 !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  max-width: 300px !important;
  margin: 16px auto !important;
  letter-spacing: 0.03em !important;
  text-transform: none !important;
  box-shadow: none !important;
  pointer-events: none !important;
  cursor: default !important;
  background: rgba(133, 104, 201, 0.05) !important;
  color: #483d8b !important;
  border: none !important;
  opacity: 0.85 !important;
}

.action-btn .v-icon {
  font-size: 16px !important;
  opacity: 0.8;
  margin-right: 8px !important;
}

/* National Resources 卡片的按钮样式保持不变 */
.support-contacts .v-btn {
  width: 90% !important;
  height: 42px !important;
  border-radius: 21px !important;
  margin-bottom: 0.8rem !important;
  font-size: 0.95rem !important;
  letter-spacing: 0.5px !important;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 24px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  box-shadow: 0 2px 8px rgba(133, 104, 201, 0.15) !important;
  background: linear-gradient(120deg, rgba(133, 104, 201, 0.85), rgba(79, 70, 229, 0.85)) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(5px) !important;
  transition: all 0.2s ease !important;
  color: white !important;
  cursor: pointer !important;
  pointer-events: auto !important;
}

.support-contacts .v-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(133, 104, 201, 0.25) !important;
  background: linear-gradient(120deg, rgba(133, 104, 201, 0.9), rgba(79, 70, 229, 0.9)) !important;
  width: 92% !important;
}

.support-contacts {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
  padding: 16px !important;
}

.return-to-main-hint {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.bounce-arrow {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hint-text {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1rem;
  color: white;
}

.return-button {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
}

.return-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.return-button:active {
  transform: scale(0.98);
}


/* Set list style to be more concise */

ul, ol {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

li:last-child {
  margin-bottom: 0;
}

/* Add new banner styles */
.banner-message {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 800px;
}

.banner-headline {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: white;
}

.banner-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.encouragement-message {
  background: rgba(125, 95, 211, 0.1);
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(125, 95, 211, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quote {
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #7D5FD3;
  text-align: center;
  line-height: 1.4;
}

/* 为 Remember 卡片中的段落添加特殊样式 */
.resource-card:has(.encouragement-message) .v-card-text p:not(.quote) {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: #2c1810;
}

/* 专门为 Remember 卡片添加的样式 */
.resource-card:has(.encouragement-message) {
  min-height: 400px !important;
  height: auto !important;
}

.resource-card:has(.encouragement-message) .v-card-text {
  padding: 1rem !important;
  overflow-y: auto !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 调整按钮位置 */
.resource-card:has(.encouragement-message) .action-btn {
  margin-top: 0.5rem !important;
  align-self: flex-end;
}

.v-card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  padding: 1rem !important;
  overflow-y: auto;
}

.v-card-text ul {
  margin: 0.8rem 0;
}

.v-card-text li {
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.support-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.support-list li {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background: rgba(133, 104, 201, 0.05);
  border-radius: 8px;
  color: #483d8b;
  font-weight: 500;
}

.support-list .v-icon {
  margin-right: 0.5rem;
  color: #483d8b;
}
</style> 
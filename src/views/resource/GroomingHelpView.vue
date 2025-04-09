<template>
  <div class="resource-container" @wheel="handleScroll" ref="container">
    <div class="sections-wrapper" :style="getTransformStyle">
      <!-- 添加过渡面板作为第一屏 -->
      <section class="section intro-section">
        <div class="full-screen-panel grooming-panel">
          <div class="panel-overlay"></div>
          <div class="panel-content">
            <h1 class="panel-title">Online Grooming</h1>
            <p class="panel-description">
              Learn to identify, prevent and respond to online grooming.
            </p>
            <div class="scroll-hint">
              <span>Scroll to explore</span>
              <div class="scroll-arrow-container">
                <v-icon class="scroll-arrow" icon="mdi-chevron-down"></v-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 现有的第一屏变成第二屏 -->
      <section class="section">
        <div class="content-wrapper">
          <div class="text-content">
            <div class="title">Understanding Online Grooming</div>
            <div class="category">Warning Signs & Prevention</div>
          </div>
          <div class="resource-grid">
            <!-- First Card: What to Watch Out For -->
            <v-card class="resource-card warning-card">
              <v-card-title class="warning-title">
                What to Watch Out For
              </v-card-title>
              <v-card-text>
                <div class="warning-message">
                  <v-icon class="warning-icon" icon="mdi-alert-circle"></v-icon>
                  <div>Warning signs:</div>
                </div>
                <ul class="mt-4">
                  <li>Strangers contacting you online</li>
                  <li>Asking personal questions</li>
                  <li>Unexpected gifts or money</li>
                  <li>Keeping relationships secret</li>
                </ul>
              </v-card-text>
            </v-card>

            <!-- Second Card: How to Protect Yourself -->
            <v-card class="resource-card help-card">
              <v-card-title>
                How to Protect Yourself
              </v-card-title>
              <v-card-text>
                <ul>
                  <li><strong>Privacy Settings:</strong> Keep accounts private</li>
                  <li><strong>Friend Requests:</strong> Only accept from people you know</li>
                  <li><strong>Trust Your Instincts:</strong> If it feels wrong, it is</li>
                  <li><strong>Tell Someone:</strong> Talk to a trusted adult</li>
                </ul>
                <v-btn block color="primary" class="mt-4">
                  Learn More
                </v-btn>
              </v-card-text>
            </v-card>

            <!-- Third Card: Get Support -->
            <v-card class="resource-card support-card">
              <v-card-title>
                Get Support Now
              </v-card-title>
              <v-card-text>
                <div class="support-contacts">
                  <v-btn prepend-icon="mdi-phone" block>
                    Kids Helpline: 1800 55 1800
                  </v-btn>
                  <v-btn prepend-icon="mdi-web" block>
                    eSafety Commissioner
                  </v-btn>
                  <v-btn prepend-icon="mdi-police-badge" block>
                    Police: 000 (Emergency)
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </section>

      <!-- 现有的第二屏变成第三屏 -->
      <section class="section">
        <div class="content-wrapper">
          <div class="text-content">
            <div class="title">What to Do If You're Being Groomed</div>
            <div class="category">Immediate Actions</div>
          </div>
          <div class="resource-grid">
            <!-- Action Steps Card -->
            <v-card class="resource-card">
              <v-card-title>
                Steps to Take
              </v-card-title>
              <v-card-text>
                <ol>
                  <li><strong>Stop all contact</strong> immediately</li>
                  <li><strong>Save evidence</strong> - screenshots, messages</li>
                  <li><strong>Block the person</strong> on all platforms</li>
                  <li><strong>Tell a trusted adult</strong></li>
                </ol>
                <div class="remember-tip">
                  <v-icon size="small" icon="mdi-information" class="mr-1"></v-icon>
                  <span>Not your fault</span>
                </div>
              </v-card-text>
            </v-card>

            <!-- Resources Card -->
            <v-card class="resource-card">
              <v-card-title>
                Helpful Resources
              </v-card-title>
              <v-card-text>
                <ul>
                  <li><strong>eSafety Guide</strong></li>
                  <li><strong>Kids Helpline</strong></li>
                  <li><strong>ReachOut</strong></li>
                  <li><strong>Youth Support Services</strong></li>
                </ul>
                <v-btn size="small" color="primary" class="mt-4 action-btn">
                  <v-icon size="small" icon="mdi-download" class="mr-1"></v-icon>
                  <span>Guide</span>
                </v-btn>
              </v-card-text>
            </v-card>

            <!-- Support Card -->
            <v-card class="resource-card">
              <v-card-title>
                Talk to Someone
              </v-card-title>
              <v-card-text>
                <p>Professional support is available:</p>
                <ul class="mt-2">
                  <li>School counselors</li>
                  <li>Mental health professionals</li>
                  <li>Community centers</li>
                  <li>Youth services</li>
                </ul>
                <v-btn size="small" color="secondary" class="mt-4 action-btn">
                  <v-icon size="small" icon="mdi-account-search" class="mr-1"></v-icon>
                  <span>Find Help</span>
                </v-btn>
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
      return 3; // 现在有三个部分
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
  color: #1a1035;
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

/* 修改按钮样式 - 更精致 */
:deep(.v-btn) {
  background: linear-gradient(135deg, #8568c9, #2b0b3f) !important;
  color: white !important;
  border: none !important;
  border-radius: 8px !important;
  height: auto !important;
  padding: 8px 16px !important;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 3px 8px rgba(133, 104, 201, 0.25) !important;
  transition: all 0.2s ease !important;
}

:deep(.v-btn:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(133, 104, 201, 0.3) !important;
  background: linear-gradient(135deg, #9074d0, #3c1c5b) !important;
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


/* 新的操作按钮样式 */

.action-btn {
  padding: 6px 12px !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
  border-radius: 6px !important;
  display: inline-flex !important;
  align-items: center !important;
  width: auto !important;
  margin-left: auto !important;
  letter-spacing: 0.03em !important;
  text-transform: none !important;
  box-shadow: 0 2px 5px rgba(133, 104, 201, 0.2) !important;
}

.action-btn .v-icon {
  font-size: 14px !important;
}

.action-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 3px 8px rgba(133, 104, 201, 0.25) !important;
}


/* Remember tip style */

.remember-tip {
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  padding: 4px 10px;
  background-color: rgba(254, 202, 202, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 500;
}

.remember-tip .v-icon {
  color: #ef4444;
  margin-right: 4px;
}

:deep(.v-alert.v-alert--type-error) {
  background-color: rgba(99, 102, 241, 0.1) !important;
  color: #4f46e5 !important;
  border-color: #6366f1 !important;
  border-radius: 8px !important;
  font-size: 0.9rem !important;
}

:deep(.v-alert.v-alert--type-error .v-alert-title) {
  color: #4f46e5 !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
}

.emergency-btn {
  background: linear-gradient(135deg, #8568c9, #2b0b3f) !important;
  color: white !important;
  font-weight: 600 !important;
  margin-top: 1rem !important;
  padding: 8px 16px !important;
  box-shadow: 0 3px 8px rgba(133, 104, 201, 0.25) !important;
}

.emergency-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(133, 104, 201, 0.3) !important;
  background: linear-gradient(135deg, #9074d0, #3c1c5b) !important;
}

/* Modify warning message style */

.warning-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid #6366f1;
  border-radius: 8px;
  color: #4f46e5;
  font-weight: 600;
  font-size: 0.95rem;
}

.warning-icon {
  color: #6366f1;
  font-size: 20px;
}

.v-card-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem !important;
  overflow-y: auto;
}

.support-contacts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 1rem 0;
}

/* 修改联系人按钮样式 - 更精致 */
.support-contacts .v-btn {
  width: 80% !important;
  height: 36px !important;
  border-radius: 18px !important;
  margin-bottom: 0.7rem !important;
  font-size: 0.85rem !important;
  letter-spacing: 0.5px !important;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  padding-left: 1rem !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  box-shadow: 0 2px 8px rgba(133, 104, 201, 0.15) !important;
  background: linear-gradient(120deg, rgba(133, 104, 201, 0.85), rgba(79, 70, 229, 0.85)) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(5px) !important;
  transition: all 0.2s ease !important;
}

.support-contacts .v-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(133, 104, 201, 0.25) !important;
  background: linear-gradient(120deg, rgba(133, 104, 201, 0.9), rgba(79, 70, 229, 0.9)) !important;
  width: 83% !important;
}

.support-contacts .v-btn:last-child {
  margin-bottom: 0 !important;
}

.support-card {
  overflow: hidden;
  position: relative;
}

.support-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(157, 137, 217, 0.1), transparent 70%);
  z-index: 0;
}

/* Update Get Support card content */
.support-card .v-card-text {
  padding: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
}

.support-card .v-card-title {
  background: none !important;
  color: #7D5FD3 !important;
  -webkit-text-fill-color: #7D5FD3 !important;
  text-align: center !important;
  justify-content: center !important;
  font-size: 1.3rem !important;
  padding: 1.2rem 1rem 0.8rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  filter: drop-shadow(0 0 5px rgba(125, 95, 211, 0.3)) !important;
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
</style> 
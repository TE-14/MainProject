<template>
  <v-app>
    <!-- Background decoration -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <!-- Navigation Bar -->
    <v-app-bar
      app
      :elevation="0"
      class="nav-blur"
    >
      <div class="d-flex align-center">
        <router-link to="/" class="text-decoration-none">
          <div class="brand-container">
            <v-icon size="32" class="brand-icon mr-2">mdi-shield-check</v-icon>
            <span class="text-h5 font-weight-bold brand-text">Digital Citizenship</span>
          </div>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <div class="nav-links">
        <v-btn
          to="/"
          :class="['nav-btn mx-2', $route.path === '/' ? 'nav-btn-active' : '']"
          elevation="0"
          exact
        >
          <v-icon start class="mr-2">mdi-home</v-icon>
          HOME
        </v-btn>

        <v-btn
          to="/learning-hub"
          :class="['nav-btn mx-2', $route.path.startsWith('/learning') ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-book-open-variant</v-icon>
          LEARNING HUB
        </v-btn>

        <v-btn
          to="/resources"
          :class="['nav-btn mx-2', $route.path.startsWith('/resources') ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-information</v-icon>
          RESOURCE CENTER
        </v-btn>

        <v-btn
          to="/safety-check"
          :class="['nav-btn mx-2', $route.path === '/safety-check' ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-shield-alert</v-icon>
          SAFETY CHECK
        </v-btn>

        <v-btn
          to="/scenario"
          :class="['nav-btn mx-2', $route.path === '/scenario' || $route.path.includes('scenario') ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-account-group</v-icon>
          SCENARIO
        </v-btn>

        <v-btn
          to="/mini-games"
          :class="['nav-btn mx-2', $route.path === '/mini-games' || $route.path.includes('mini-games') ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-account-group</v-icon>
          MINI-GAMES
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- Footer -->
    <v-footer app class="footer-blur px-4 py-3">
      <span class="text-caption text-medium-emphasis">Empowering digital citizens, creating a secure online world.</span>
      <v-spacer></v-spacer>
      <div class="social-links">
        <v-btn 
          icon="mdi-twitter" 
          variant="text" 
          class="mx-1"
          href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
          :ripple="false"
          title="Visit Twitter"
        ></v-btn>
        <v-btn 
          icon="mdi-github" 
          variant="text" 
          class="mx-1"
          href="https://github.com" 
          target="_blank"
          rel="noopener noreferrer"
          :ripple="false"
          title="Visit GitHub"
        ></v-btn>
        <v-btn 
          icon="mdi-linkedin" 
          variant="text" 
          class="mx-1"
          href="https://linkedin.com" 
          target="_blank"
          rel="noopener noreferrer"
          :ripple="false"
          title="Visit LinkedIn"
        ></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const route = useRoute()

    // 处理 ResizeObserver 错误
    const handleError = (event) => {
      if (event.message && event.message.includes('ResizeObserver')) {
        event.stopPropagation()
        event.preventDefault()
      }
    }

    onMounted(() => {
      window.addEventListener('error', handleError)
    })

    onUnmounted(() => {
      window.removeEventListener('error', handleError)
    })

    return { route }
  }
}
</script>

<style>
:root {
  --primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --secondary-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.v-application {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f8fafc !important;
}

/* background decoration */
.background-shapes {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.15;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  background: #818cf8;
  width: 500px;
  height: 500px;
  top: -100px;
  left: -100px;
  animation-delay: -2s;
}

.shape-2 {
  background: #8b5cf6;
  width: 400px;
  height: 400px;
  top: 60%;
  right: -100px;
  animation-delay: -1s;
}

.shape-3 {
  background: #6366f1;
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: 30%;
  animation-delay: -3s;
}

.shape-4 {
  background: #a78bfa;
  width: 250px;
  height: 250px;
  top: 30%;
  left: 60%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(30px) scale(1.05);
  }
}

/* navigation bar style */
.nav-blur {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.brand-badge {
  background: var(--primary-gradient);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.nav-btn {
  font-weight: 500;
  color: #4b5563 !important;
  border-radius: 8px !important;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.nav-btn-active {
  background: var(--primary-gradient) !important;
  color: white !important;
}

/* main content area */
.main-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 100%);
}

/* page transition animation */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* footer style */
.footer-blur {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* common card style */
.v-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease !important;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15) !important;
}

/* button style */
.action-btn {
  background: var(--primary-gradient) !important;
  color: white !important;
  font-weight: 500 !important;
  height: 48px !important;
  padding: 0 32px !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
}

.action-btn-secondary {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #4b5563 !important;
  font-weight: 500 !important;
  height: 48px !important;
  padding: 0 32px !important;
  border-radius: 12px !important;
  border: 1px solid rgba(99, 102, 241, 0.2) !important;
  transition: all 0.3s ease !important;
}

.action-btn-secondary:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 1) !important;
  border-color: rgba(99, 102, 241, 0.4) !important;
}

/* navigation button active state */
.nav-btn-active {
  background: var(--primary-gradient) !important;
  color: white !important;
}

.nav-btn-primary-active {
  background: var(--secondary-gradient) !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
}

.brand-icon {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 全局响应式基础设置 */
:root {
  font-size: 16px;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* 响应式字体大小 */
@media (max-width: 1400px) {
  :root {
    font-size: 15px;
  }
}

@media (max-width: 1200px) {
  :root {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  :root {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  :root {
    font-size: 12px;
  }
}

/* 全局容器类 */
.global-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .global-container {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .global-container {
    padding: 0.5rem;
  }
}

/* Vuetify覆盖样式 */
.v-application {
  .text-h1 { font-size: 2.5rem !important; }
  .text-h2 { font-size: 2rem !important; }
  .text-h3 { font-size: 1.75rem !important; }
  .text-h4 { font-size: 1.5rem !important; }
  .text-h5 { font-size: 1.25rem !important; }
  .text-h6 { font-size: 1rem !important; }
  
  @media (max-width: 768px) {
    .text-h1 { font-size: 2rem !important; }
    .text-h2 { font-size: 1.75rem !important; }
    .text-h3 { font-size: 1.5rem !important; }
    .text-h4 { font-size: 1.25rem !important; }
    .text-h5 { font-size: 1.1rem !important; }
    .text-h6 { font-size: 1rem !important; }
  }
}

/* 通用间距类 */
.responsive-spacing {
  padding: 1rem;
  margin: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    margin: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    margin: 0.5rem;
  }
}

/* Social links in footer */
.social-links {
  display: flex;
}

.social-links .v-btn {
  opacity: 0.7;
  transition: all 0.3s ease;
}

.social-links .v-btn:hover {
  opacity: 1;
  transform: translateY(-3px);
}

.social-links .v-btn[icon="mdi-twitter"]:hover {
  color: #1DA1F2 !important;
}

.social-links .v-btn[icon="mdi-github"]:hover {
  color: #333333 !important;
}

.social-links .v-btn[icon="mdi-linkedin"]:hover {
  color: #0077B5 !important;
}

/* 响应式图片 */
.responsive-image {
  max-width: 100%;
  height: auto;
}

/* 响应式按钮 */
.responsive-button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>

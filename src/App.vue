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
      :elevation="0"
      class="nav-blur"
    >
      <div class="d-flex align-center">
        <router-link to="/" class="text-decoration-none">
          <div class="brand-container">
            <img src="@/assets/logo2.png" alt="ShieldSkills Logo" class="brand-logo mr-2" />
            <span class="brand-text">ShieldSkills</span>
          </div>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation Links -->
      <div class="nav-links d-none d-md-flex">
        <v-btn
          v-for="navItem in navigationItems.filter(item => item.title !== 'SAFETY CHECK')" 
          :key="navItem.path"
          :to="navItem.path"
          :class="['nav-btn mx-2', isActive(navItem.path, navItem.match) ? 'nav-btn-active' : '']"
          elevation="0"
          :exact="navItem.exact"
        >
          <v-icon start class="mr-2">{{ navItem.icon }}</v-icon>
          {{ navItem.title }}
        </v-btn>

        <!-- Safety Check Dropdown -->
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :class="['nav-btn mx-2', isActive('/safety-check', null) || isActive('/checklist', null) ? 'nav-btn-active' : '']"
              elevation="0"
            >
              <v-icon start class="mr-2">mdi-shield-alert</v-icon>
              SAFETY CHECK
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              :to="'/safety-check'"
              class="safety-menu-item"
            >
              <template v-slot:prepend>
                <v-icon>mdi-shield-check</v-icon>
              </template>
              <v-list-item-title>Safety Analyzer</v-list-item-title>
            </v-list-item>
            <v-list-item
              :to="'/checklist'"
              class="safety-menu-item"
            >
              <template v-slot:prepend>
                <v-icon>mdi-clipboard-check</v-icon>
              </template>
              <v-list-item-title>Safety Checklist</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Mobile Navigation Button -->
      <v-btn
        icon
        class="d-md-none"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      class="mobile-nav-drawer"
    >
      <div class="pa-4">
        <div class="d-flex align-center justify-space-between mb-6">
          <div class="brand-container">
            <img src="@/assets/logo2.png" alt="ShieldSkills Logo" class="brand-logo mr-2" />
            <span class="text-h6 font-weight-bold brand-text">ShieldSkills</span>
          </div>
          <v-btn icon @click="drawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-list nav>
          <v-list-item
            v-for="navItem in navigationItems.filter(item => item.title !== 'SAFETY CHECK')"
            :key="navItem.path"
            :to="navItem.path"
            :exact="navItem.exact"
            :class="isActive(navItem.path, navItem.match) ? 'mobile-nav-active' : ''"
            @click="drawer = false"
          >
            <template v-slot:prepend>
              <v-icon>{{ navItem.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ navItem.title }}</v-list-item-title>
          </v-list-item>

          <!-- Mobile Safety Check Group -->
          <v-list-group value="Safety">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :class="isActive('/safety-check', null) || isActive('/checklist', null) ? 'mobile-nav-active' : ''"
              >
                <template v-slot:prepend>
                  <v-icon>mdi-shield-alert</v-icon>
                </template>
                <v-list-item-title>SAFETY CHECK</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              :to="'/safety-check'"
              @click="drawer = false"
              class="safety-submenu-item"
            >
              <template v-slot:prepend>
                <v-icon>mdi-shield-check</v-icon>
              </template>
              <v-list-item-title>Safety Analyzer</v-list-item-title>
            </v-list-item>

            <v-list-item
              :to="'/checklist'"
              @click="drawer = false"
              class="safety-submenu-item"
            >
              <template v-slot:prepend>
                <v-icon>mdi-clipboard-check</v-icon>
              </template>
              <v-list-item-title>Safety Checklist</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main class="main-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>

    <!-- Footer -->
    <v-footer app class="footer-blur px-4 py-3">
      <div class="d-flex justify-space-between align-center w-100">
        <span class="text-caption text-medium-emphasis">TE-14/Empowering digital citizens, creating a secure online world.</span>
        <v-spacer></v-spacer>
      </div>
    </v-footer>

    <!-- 无障碍菜单组件 -->
    <AccessibilityMenu 
      @toggle-magnifier="toggleMagnifier"
      @set-magnifier-zoom="setMagnifierZoom"
    />

    <Magnifier 
      :is-enabled="isMagnifierEnabled" 
      :zoom-level="magnifierZoom"
    >
      <template #default>
        <div class="app-content">
          <slot></slot>
        </div>
      </template>
    </Magnifier>
  </v-app>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import AccessibilityMenu from './components/AccessibilityMenu.vue'
import Magnifier from './components/Magnifier.vue'
import './assets/accessibility.css'

export default {
  name: 'App',
  components: {
    AccessibilityMenu,
    Magnifier
  },
  setup() {
    const route = useRoute()
    const drawer = ref(false)
    const isMagnifierEnabled = ref(false)
    const magnifierZoom = ref(1.5)
    const magnifierClone = ref(null)

    // 导航项配置
    const navigationItems = [
      {
        title: 'HOME',
        path: '/',
        icon: 'mdi-home',
        exact: true,
        match: null
      },
      {
        title: 'LEARNING HUB',
        path: '/learning-hub',
        icon: 'mdi-book-open-variant',
        exact: false,
        match: '/learning'
      },
      {
        title: 'RESOURCE CENTER',
        path: '/resources',
        icon: 'mdi-information',
        exact: false,
        match: '/resources'
      },
      {
        title: 'SAFETY CHECK',
        path: '/safety-check',
        icon: 'mdi-shield-alert',
        exact: true,
        match: null
      },
      {
        title: 'SCENARIO',
        path: '/scenario',
        icon: 'mdi-account-group',
        exact: false,
        match: 'scenario'
      },
      {
        title: 'MINI-GAMES',
        path: '/mini-games',
        icon: 'mdi-gamepad-variant',
        exact: false,
        match: 'mini-games'
      }
    ]

    // 检查导航项是否处于激活状态
    const isActive = (path, match) => {
      if (path === route.path) return true
      if (match && route.path.includes(match)) return true
      return false
    }

    // 处理 ResizeObserver 错误
    const handleError = (event) => {
      if (event.message && event.message.includes('ResizeObserver')) {
        event.stopPropagation()
        event.preventDefault()
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (event.target) {
              const resizeObserver = event.target.__resizeObserver__
              if (resizeObserver) {
                resizeObserver.unobserve(event.target)
                resizeObserver.observe(event.target)
              }
            }
          })
        })
        return true
      }
      return false
    }

    onMounted(() => {
      window.addEventListener('error', handleError, true)
      window.addEventListener('unhandledrejection', (event) => {
        if (event.reason && event.reason.message && event.reason.message.includes('ResizeObserver')) {
          event.preventDefault()
          return true
        }
        return false
      }, true)
    })

    onUnmounted(() => {
      window.removeEventListener('error', handleError, true)
      window.removeEventListener('unhandledrejection', () => {}, true)
    })

    const toggleMagnifier = (enabled) => {
      isMagnifierEnabled.value = enabled
    }

    const setMagnifierZoom = (level) => {
      magnifierZoom.value = level
    }

    return {
      route,
      drawer,
      navigationItems,
      isActive,
      isMagnifierEnabled,
      magnifierZoom,
      magnifierClone,
      toggleMagnifier,
      setMagnifierZoom
    }
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
  gap: 2px;
  padding-left: 24px;
}

.brand-text {
  font-family: 'Quicksand', 'Montserrat', 'Inter', Arial, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  color: #7c3aed;
  vertical-align: middle;
  line-height: 1;
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

/* 移动端导航样式 */
.mobile-nav-drawer {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
}

.mobile-nav-active {
  background: var(--primary-gradient) !important;
  color: white !important;
  border-radius: 8px;
}

.mobile-nav-active .v-icon {
  color: white !important;
}

/* 隐藏大屏幕导航，显示移动导航 */
@media (max-width: 768px) {
  .nav-links {
    display: none !important;
  }
  
  .brand-text {
    font-size: 1.1rem !important;
  }
}

.brand-logo {
  display: inline-block;
  height: 48px;
  width: 48px;
  object-fit: contain;
  vertical-align: middle;
  margin-right: 2px;
}

.app-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.safety-menu-item {
  min-width: 200px;
}

.safety-menu-item:hover {
  background: rgba(99, 102, 241, 0.1);
}

.safety-submenu-item {
  padding-left: 32px;
}
</style>

<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap" rel="stylesheet">

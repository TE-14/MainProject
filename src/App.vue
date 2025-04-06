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
          to="/resources"
          :class="['nav-btn mx-2', $route.path === '/resources' ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-book-open-variant</v-icon>
          LEARNING HUB
        </v-btn>

        <v-btn
          to="/resource"
          :class="['nav-btn mx-2', $route.path === '/resource' ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-information</v-icon>
          RESOURCE CENTER
        </v-btn>

        <v-btn
          to="/scenario"
          :class="['nav-btn mx-2', $route.path === '/scenario' ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-shield-alert</v-icon>
          SCENARIO
        </v-btn>

        <v-btn
          to="/quiz"
          :class="['nav-btn mx-2', $route.path === '/quiz' ? 'nav-btn-active' : '']"
          elevation="0"
        >
          <v-icon start class="mr-2">mdi-help-circle</v-icon>
          QUIZ
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
        <v-btn icon="mdi-twitter" variant="text" class="mx-1"></v-btn>
        <v-btn icon="mdi-github" variant="text" class="mx-1"></v-btn>
        <v-btn icon="mdi-linkedin" variant="text" class="mx-1"></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
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
</style>

import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@fortawesome/fontawesome-free/css/all.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Configure Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',   // Primary color: Blue
          secondary: '#424242', // Secondary color: Dark grey
          accent: '#82B1FF',    // Accent color
          error: '#FF5252',     // Error color: Red
          info: '#2196F3',      // Info color: Light blue
          success: '#4CAF50',   // Success color: Green
          warning: '#FFC107',   // Warning color: Yellow
          // UV index risk level colors
          'uv-low': '#4CAF50',      // Low risk: Green
          'uv-moderate': '#FFC107', // Moderate risk: Yellow
          'uv-high': '#FF9800',     // High risk: Orange
          'uv-very-high': '#FF5252',// Very high: Red
          'uv-extreme': '#9C27B0'   // Extreme: Purple
        }
      }
    }
  }
})

const app = createApp(App)

// Set document title
document.title = 'Digital Citizenship'

app.use(store)
app.use(router)
app.use(vuetify)

// Update title on route change
router.afterEach((to) => {
  document.title = to.meta.title || 'ShieldSkills'
  nextTick(() => {
    AOS.refreshHard();
  });
})

app.mount('#app')
AOS.init({
  duration: 800, 
  once: true,    
  offset: 80     
})

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResourceView from '../views/ResourceView.vue'
import CyberbullyingHelpView from '../views/resource/CyberbullyingHelpView.vue'
import GroomingHelpView from '../views/resource/GroomingHelpView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/learning-hub',
      name: 'learning-hub',
      component: () => import('../views/LearningHubView.vue')
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourceView,
      children: [
        {
          path: 'cyberbullying-help',
          name: 'cyberbullying-help',
          component: CyberbullyingHelpView
        },
        {
          path: 'grooming-help',
          name: 'grooming-help',
          component: GroomingHelpView
        }
      ]
    },
    {
      path: '/learning/cyberbullying',
      name: 'cyberbullying',
      component: () => import('../views/learning/CyberbullyingView.vue')
    },
    {
      path: '/cyberbullyingscenario',
      name: 'cyberbullyingscenario',
      component: () => import('../views/CyberbullyingScenario.vue')
    },
    {
      path: '/groomingscenario',
      name: 'groomingscenario',
      component: () => import('../views/GroomingScenario.vue')
    },
    {
      path: '/learning/grooming',
      name: 'grooming',
      component: () => import('../views/learning/GroomingView.vue')
    },
    {
      path: '/scenario',
      name: 'scenario',
      component: () => import('../views/Scenario.vue')
    }
  ]
})

export default router

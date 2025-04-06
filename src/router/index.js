import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/LearningHubView.vue')
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import('../views/ResourceView.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue')
    },
    {
      path: '/learning/cyberbullying',
      name: 'cyberbullying',
      component: () => import('../views/learning/CyberbullyingView.vue')
    },
    {
      path: '/scenario',
      name: 'scenario',
      component: () => import('../views/Scenario.vue')
    },
    {
      path: '/learning/phishing',
      name: 'phishing',
      component: () => import('../views/learning/PhishingView.vue')
    },
    {
      path: '/quiz/question',
      name: 'question',
      component: () => import('../views/quiz/QuestionView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/store/auth'

import LoginPage from '@/pages/LoginPage.vue'
import MainFrame from '@/frames/MainFrame.vue'

const routes = [
  { path: '/login', 
    component: LoginPage 
  },
  {
    path: '/',
    component: MainFrame,
    children: [
      // { path: '', component: Dashboard },

    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

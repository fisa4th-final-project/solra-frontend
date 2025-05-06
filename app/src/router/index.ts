import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/store/auth'

import SigninPage from '@/pages/SigninPage.vue'
import MainFrame from '@/frames/MainFrame.vue'

const routes = [
  { path: '/signin', 
    component: SigninPage 
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

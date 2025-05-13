import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/store/auth'

import LoginPage from '@/pages/LoginPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import User from '@/pages/User.vue'
import Workload from '@/pages/Workload.vue'

import MainFrame from '@/frames/MainFrame.vue'

const routes = [
  { 
    path: '/login', 
    component: LoginPage 
  },
  {
    path: '/admin',
    component: MainFrame,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'org-dashboard', component: Dashboard },
      { path: 'dept-dashboard', component: Dashboard },
      { path: 'proj-dashboard', component: Dashboard },
      { path: 'org-dept', component: Workload },
      { path: 'org', component: User },
      { path: 'depts', component: User },
      { path: 'proj', component: User },

    ]
  },
  {
    path: '/',
    component: MainFrame,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'user', component: User },
      { path: 'workload', component: Workload },

    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

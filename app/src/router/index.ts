import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/auth';
import { apiHandler } from '@/lib/global/apiManager';

export const router = createRouter({
  history: createWebHistory(),
  routes
})

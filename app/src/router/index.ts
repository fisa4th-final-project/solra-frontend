import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/auth';
import { apiHandler } from '@/lib/global/apiManager';

export const router = createRouter({
  history: createWebHistory(),
  routes
});

// 로그인 세션 검증
router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();

  // isLogined false 이면 whomi() 요청으로 백엔드에서 한번 더 검증
  if (to.name !== 'Login' && !auth.getIsLogined) await apiHandler.whomiApi();

  // 이후에도 isLogined false이면 로그인 화면으로 라우팅
  if (to.name !== 'Login' && !auth.getIsLogined) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

// 역할 검증
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore(); 
  const requireRoles: any = to.meta.roles;

  const userRoles = auth.getRoles.map((role) => role.roleName);

  if (!requireRoles) return next();

  const hasAccess = requireRoles?.some((role: any) => userRoles.includes(role));

  if (hasAccess) {
    next()
  } else {
    alert('해당 페이지에 대한 접근 권한이 없습니다.');
  }
});
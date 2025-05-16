import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import User from '@/pages/admin/User.vue'
import Workload from '@/pages/Workload.vue'
import UserGroup from '@/pages/admin/UserGroup.vue'
import Register from '@/pages/admin/Register.vue'

import MainFrame from '@/frames/MainFrame.vue'
import UserDetail from '@/pages/admin/UserDetail.vue'
import PatchUser from '@/pages/admin/PatchUser.vue'
import AddDept from '@/pages/admin/AddDept.vue'
import AddOrg from '@/pages/admin/AddOrg.vue'

const routes = [
  { 
    path: '/login', 
    component: LoginPage,
    meta: {
      breadcrumb: [{ title: '로그인', href: '/login', disabled: false }]
    }
  },
  {
    path: '/admin',
    component: MainFrame,
    meta: {
      breadcrumb: [{ title: '관리자', href: '/admin', disabled: false }]
    },
    children: [
      { 
        path: 'dashboard', 
        component: Dashboard,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false},
            { title: '대시보드', href: '/admin/dashboard', disabled: false }
          ]
        }
      },
      { 
        path: 'users', 
        component: User,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false},
            { title: '사용자', href: '/admin/users', disabled: false }
          ]
        }
      },
      {
        path: 'users/:userId',
        component: UserDetail,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '사용자', href: '/admin/users', disabled: false }
          ]
        }
      },
      {
        path: 'users/:userId/profile-edit',
        name: 'PatchUser',
        component: PatchUser,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '사용자', href: '/admin/users', disabled: false }
          ]
        }
      },
      {
        path: 'users/register',
        component: Register,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '사용자', href: '/admin/users', disabled: false },
            { title: '등록', href: '/admin/users/register', disabled: false }
          ]
        }
      },
      { 
        path: 'userGroup', 
        component: UserGroup,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false},
            { title: '사용자 그룹', href: '/admin/userGroup', disabled: false }
          ]
        }
      },
      { 
        path: 'userGroup/orgs/add', 
        component: AddOrg,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false},
            { title: '사용자 그룹', href: '/admin/userGroup', disabled: false },
            { title: '조직 추가', href: '/admin/userGroup/orgs/add', disabled: false }
          ]
        }
      },
      { 
        path: 'userGroup/depts/add', 
        component: AddDept,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false},
            { title: '사용자 그룹', href: '/admin/userGroup', disabled: false },
            { title: '부서 추가', href: '/admin/userGroup/depts/add', disabled: false }
          ]
        }
      },
      {
        path: 'userGroup/depts/:deptId',
        component: AddDept,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '사용자 그룹', href: '/admin/userGroup', disabled: false },
          ]
        }
      }
    ]
  },
  {
    path: '/',
    component: MainFrame,
    meta: {
      breadcrumb: [{ title: '홈', href: '/', disabled: false }]
    },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'workload', component: Workload },

    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

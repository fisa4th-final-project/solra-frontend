import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
import Dashboard from '@/pages/Dashboard.vue'
import User from '@/pages/admin/User.vue'
import Workload from '@/pages/Workload.vue'
import UserGroup from '@/pages/admin/UserGroup.vue'
import UserDetail from '@/pages/admin/UserDetail.vue'
import DataComponents from '@/pages/dev/DataComponents.vue'
import MainFrame from '@/frames/MainFrame.vue'
import Node from '@/pages/admin/Node.vue'
import Workspace from '@/pages/Workspace.vue'
import Cluster from '@/pages/admin/Cluster.vue'

const routes = [
  {
    path: '/dev',
    component: MainFrame, 
    children: [
      {
        path: 'components/data',
        component: DataComponents,
        meta: {
          breadcrumb: [
            { title: '개발자', href: '/dev', disabled: false },
            { title: '데이터 컴포넌트', href: '/components/data', disabled: false },
          ]
        }
      }
    ],
    meta: {
      breadcrumb: [{ title: '개발자', href: '/dev', disabled: false }]
    }
  },
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
        path: 'userGroup/depts/:deptId',
        component: UserGroup,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '사용자 그룹', href: '/admin/userGroup', disabled: false },
          ]
        }
      },
      {
        path: 'resource/node',
        component: Node,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '노드', href: '/admin/resource/node', disabled: false },
          ]
        }
      },
      {
        path: 'resource/cluster',
        component: Cluster,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: false },
            { title: '클러스터', href: '/admin/resource/cluster', disabled: false },
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
      {
        path: 'workload', component: Workload,
        meta: {
          breadcrumb: [
            { title: '홈', href: '/', disabled: false },
            { title: '워크로드', href: '/workload', disabled: false },
          ]
        } 
      }, 
      {
        path: 'workspace', component: Workspace,
        meta: {
          breadcrumb: [
            { title: '홈', href: '/', disabled: false },
            { title: '작업영역', href: '/workspace', disabled: false },
          ]
        }
      },
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

import Dashboard from '@/pages/Dashboard.vue'
import User from '@/pages/admin/User.vue'
import Workload from '@/pages/Workload.vue'
import UserGroup from '@/pages/admin/UserGroup.vue'
import DataComponents from '@/pages/dev/DataComponents.vue'
import MainFrame from '@/frames/MainFrame.vue'
import Node from '@/pages/admin/Node.vue'
import Workspace from '@/pages/Workspace.vue'
import Cluster from '@/pages/admin/Cluster.vue'
import Privilege from '@/pages/admin/Privilege.vue'
import LoginFrame from '@/frames/LoginFrame.vue'
import LoginPage from '@/pages/LoginPage.vue'

export const routes = [
  {
    path: '/dev',
    component: MainFrame,
    children: [
      {
        path: 'components/data',
        component: DataComponents,
        meta: {
          breadcrumb: [
            { title: '개발자', href: '/dev', disabled: true },
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
    component: LoginFrame,
    meta: {
      breadcrumb: [{ title: '로그인', href: '/login', disabled: false }]
    },
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginPage
      },
    ]
  },
  {
    path: '/admin',
    component: MainFrame,
    meta: {
      breadcrumb: [{ title: '관리자', href: '/admin', disabled: true }]
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '대시보드', href: '/admin/dashboard', disabled: false }
          ]
        }
      },
      {
        path: 'users',
        component: User,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '사용자', href: '/admin/users', disabled: false }
          ]
        }
      },
      {
        path: 'userGroup',
        component: UserGroup,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '사용자 그룹', href: '/admin/userGroup', disabled: false }
          ]
        }
      },
      {
        path: 'privilege',
        component: Privilege,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '역할 및 권한', href: '/admin/privilege', disabled: false }
          ]
        }
      },
      {
        path: 'resource/node',
        component: Node,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '노드', href: '/admin/resource/node', disabled: false },
          ]
        }
      },
      {
        path: 'resource/cluster',
        component: Cluster,
        meta: {
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
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
            { title: '홈', href: '/', disabled: true },
            { title: '워크로드', href: '/workload', disabled: false },
          ]
        }
      },
      {
        path: 'workspace', component: Workspace,
        meta: {
          breadcrumb: [
            { title: '홈', href: '/', disabled: true },
            { title: '작업영역', href: '/workspace', disabled: false },
          ]
        }
      },
    ]
  }
]
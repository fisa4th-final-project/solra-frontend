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
    path: '/',
    component: MainFrame,
    meta: {
      breadcrumb: [{ title: '홈', href: '/', disabled: false }]
    },
    children: [
      {
        path: '', component: Workspace,
        meta: {
          title: '작업영역',
          icon: 'mdi-aspect-ratio',
          to: '/workspace',
          breadcrumb: [
            { title: '홈', href: '/', disabled: true },
            { title: '작업영역', href: '/workspace', disabled: false },
          ]
        }
      },
      {
        path: 'workload', component: Workload,
        meta: {
          title: '워크로드',
          icon: 'mdi-apps',
          to: '/workload',
          breadcrumb: [
            { title: '홈', href: '/', disabled: true },
            { title: '워크로드', href: '/workload', disabled: false },
          ]
        }
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
        path: 'users',
        component: User,
        meta: {
          title: '사용자',
          icon: 'mdi-account-group',
          to: '/admin/users',
          roles: ['ROOT', 'ORG_ADMIN', 'DEPT_ADMIN'],
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
          title: '사용자 그룹',
          icon: 'mdi-office-building',
          roles: ['ROOT', 'ORG_ADMIN'],
          to: '/admin/userGroup',
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
          title: '역할 및 권한',
          icon: 'mdi-card-account-details',
          roles: ['ROOT'],
          to: '/admin/privilege',
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '역할 및 권한', href: '/admin/privilege', disabled: false }
          ]
        }
      },
      {
        path: 'resource/node-ns',
        component: Node,
        meta: {
          title: '노드 & 네임스페이스',
          icon: 'mdi-server',
          roles: ['ROOT', 'ORG_ADMIN'],
          to: '/admin/resource/node-ns',
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '노드', href: '/admin/resource/node-ns', disabled: false },
          ]
        }
      },
      {
        path: 'resource/cluster',
        component: Cluster,
        meta: {
          title: '클러스터',
          icon: 'mdi-kubernetes',
          roles: ['ROOT', 'ORG_ADMIN', 'DEPT_ADMIN'],
          to: '/admin/resource/cluster',
          breadcrumb: [
            { title: '관리자', href: '/admin', disabled: true },
            { title: '클러스터', href: '/admin/resource/cluster', disabled: false },
          ]
        }
      }
    ]
  },
  
  {
    path: '/dev',
    component: MainFrame,
    meta: {
      breadcrumb: [{ title: '개발자', href: '/dev', disabled: false }]
    },
    children: [
      {
        path: 'components/data',
        component: DataComponents,
        meta: {
          title: '데이터 컴포넌트',
          icon: 'mdi-xml',
          roles: ['ROOT'],
          breadcrumb: [
            { title: '개발자', href: '/dev', disabled: true },
            { title: '데이터 컴포넌트', href: '/components/data', disabled: false },
          ]
        }
      }
    ],
    
  },
]
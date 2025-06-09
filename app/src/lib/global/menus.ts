export const sidebarMenus = [
  {
    title: '작업영역',
    icon: 'mdi-aspect-ratio',
    to: '/',
    roles: [
      'ROOT', 'DEVELOPER', 'ORG_ADMIN', 'DEPT_ADMIN'
    ]
  },
  {
    title: '워크로드',
    icon: 'mdi-apps',
    to: '/workload',
    roles: [
      'ROOT', 'DEVELOPER'
    ]
  },
  {
    title: '역할 및 권한',
    icon: 'mdi-card-account-details',
    to: '/admin/privilege',
    roles: [
      'ROOT'
    ]
  },
  {
    title: '사용자 그룹',
    icon: 'mdi-office-building',
    to: '/admin/userGroup',
    roles: [
      'ROOT', 'ORG_ADMIN'
    ]
  },

  {
    title: '사용자',
    icon: 'mdi-account-group',
    to: '/admin/users',
    roles: [
      'ROOT', 'ORG_ADMIN', 'DEPT_ADMIN'
    ]
  },
  {
    title: '클러스터',
    icon: 'mdi-kubernetes',
    to: '/admin/resource/cluster',
    roles: [
      'ROOT', 'ORG_ADMIN'
    ]
  },
  {
    title: '노드 & 네임스페이스',
    icon: 'mdi-server',
    to: '/admin/resource/node-ns',
    roles: [
      'ROOT', 'ORG_ADMIN'
    ]
  },
  {
    title: '개발자',
    icon: 'mdi-xml',
    to: '/dev/components/data',
    roles: [
      'ROOT'
    ],
  },
]
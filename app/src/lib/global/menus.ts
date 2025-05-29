export const sidebarMenus = [
  {
    title: '대쉬보드',
    icon: 'mdi-view-dashboard',
    to: '/admin/dashboard',
    roles: [
      'org-admin'
    ]
  },
  {
    title: '역할 및 권한',
    icon: 'mdi-card-account-details',
    to: '/admin/privilege',
    roles: [
      'root', 'org-admin'
    ]
  },
  {
    title: '사용자 그룹',
    icon: 'mdi-office-building',
    to: '/admin/userGroup',
    roles: [
      'root', 'org-admin', 'dept-admin', 'proj-admin'
    ]
  },

  {
    title: '사용자',
    icon: 'mdi-account-group',
    to: '/admin/users',
    roles: [
      'root'
    ],
  },
  {
    title: '클러스터',
    icon: 'mdi-kubernetes',
    to: '/admin/resource/cluster'
  },
  {
    title: '노드',
    icon: 'mdi-server',
    to: '/admin/resource/node'
  },
  {
    title: '작업영역',
    icon: 'mdi-aspect-ratio',
    to: '/workspace'
  },
  {
    title: '워크로드',
    icon: 'mdi-apps',
    to: '/workload'
  },
  {
    title: '개발자',
    icon: 'mdi-xml',
    to: '/dev/components/data',
    roles: [
      'root'
    ],
  },
]
// <v-list - item
// to = "/dashboard" exact
// prepend - icon="mdi-view-dashboard"
// title = "대시보드"
// color = "primary" >
//   </v-list-item>
//   < v - list - item
// to = "/user" exact
// prepend - icon="mdi-account-group"
// title = "사용자"
// color = "primary" >
//   </v-list-item>
//   < v - list - item
// to = "/workload" exact
// prepend - icon="mdi-cube"
// title = "워크로드"
// color = "primary" >
//   </v-list-item>
//   </v-list>

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
    title: '노드',
    icon: 'mdi-server',
    to: '/admin/resource/node'
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
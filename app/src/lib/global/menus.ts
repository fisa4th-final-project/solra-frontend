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
    ],
    children: [
      {
        title: '조직',
        to: '/admin/org-dashboard',
        roles: [
          'org-admin'
        ]
      },
      {
        title: '부서',
        to: '/admin/dept-dashboard',
        roles: [
          'dept-admin'
        ]
      },
      {
        title: '프로젝트',
        to: '/admin/proj-dashboard',
        roles: [
          'proj-admin'
        ]
      }
    ]
  },
  {
    title: '사용자 그룹 관리',
    icon: 'mdi-view-dashboard',
    to: '/admin/org-dept',
    roles: [
      'root', 'org-admin', 'dept-admin', 'proj-admin'
    ],
    children: [
      {
        title: '조직 관리',
        to: '/admin/orgs',
        roles: [
          'root'
        ]
      }, 
      {
        title: '부서 관리',
        to: '/admin/depts',
        roles: [
          'root', 'org-admin'
        ]
      },
      {
        title: '프로젝트 관리',
        to: '/admin/proj',
        roles: [
          'root', 'proj-admin'
        ]
      }
    ]
  },
  {
    title: '사용자',
    icon: 'mdi-account-group',
    to: '/admin/users',
    roles: [
      'root'
    ],
    children: []
  }
]
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
    title: '사용자 그룹',
    icon: 'mdi-office-building',
    to: '/admin/userGroup',
    roles: [
      'root', 'org-admin', 'dept-admin', 'proj-admin'
    ],
    children: [
      {
        title: '사용자 그룹 관리',
        to: '/admin/userGroup',
        roles: [
          'root'
        ]
      }, 
      {
        title: '조직 추가',
        to: '/admin/userGroup/orgs/add',
        roles: [
          'root'
        ]
      },
      {
        title: '부서 추가',
        to: '/admin/userGroup/depts/add',
        roles: [
          'root', 'org-admin'
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
    children: [
      {
        title: '사용자 관리',
        to: '/admin/users',
        roles: [
          'root'
        ]
      },
      {
        title: '사용자 추가',
        to: '/admin/users/register',
        roles: [
          'root'
        ]
      }
    ]
  }
]
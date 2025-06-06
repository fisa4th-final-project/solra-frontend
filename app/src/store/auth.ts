import type { LoginResponseDto, LoginResRole, WhomiResponseDto } from '@/lib/api/user/userDto'
import type { GetUserRoleByUserIdResponseDto } from '@/lib/api/userRole/UserRoleDto';
import { defineStore } from 'pinia'

interface WhomiFullResponse extends WhomiResponseDto {
  userRoles: GetUserRoleByUserIdResponseDto[];
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {
      userId: 0,
      orgId: 0,
      deptId: 0,
      roles: [] as LoginResRole[]
    },
    user: {
      userName: '',
      orgName: '',
      deptName: '',
    },
    isLogined: false
  }),
  actions: {
    login(args: LoginResponseDto) {
      this.auth.userId = args.userId,
      this.auth.orgId = args.orgId ? args.orgId : 0,
      this.auth.deptId = args.deptId ? args.deptId : 0,
      this.auth.roles = args.roles,
      this.isLogined = true
    },
    logout() {
      this.auth.userId = 0
      this.auth.orgId = 0
      this.auth.deptId = 0
      this.auth.roles = []
      this.isLogined = false
    },
    whomi(args: WhomiFullResponse) {
      this.auth.userId = args.userId,
      this.auth.orgId = args.organizationId ?? 0,
      this.auth.deptId = args.departmentId ?? 0,
      this.auth.roles = args.userRoles.map((userRole)=> ({
        roleId: userRole.roleId,
        roleName: userRole.roleName,
        description: '',
        createdAt: ''
      })),
      this.user.userName = args.userName,
      this.user.orgName = args.organizationName ?? '무소속',
      this.user.deptName = args.departmentName ?? '미배정'
      this.isLogined = true;
    }
  },
  getters: {
    getRoles: (state) => state.auth.roles.length != 0 
    ? state.auth.roles 
    : [{
      roleName:'ANONYMOUS'
    }],
    getMe: (state) => { return {user: state.user, auth: state.auth} },
    getIsLogined: (state) => state.isLogined
  }
})

import type { LoginResponseDto, LoginResRole } from '@/lib/api/user/userDto'
import { defineStore } from 'pinia'

interface user {
  userName: string,
  orgName: string,
  deptName: string
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
    }
  }),
  actions: {
    login(args: LoginResponseDto) {
      this.auth.userId = args.userId,
      this.auth.orgId = args.orgId ? args.orgId : 0,
      this.auth.deptId = args.deptId ? args.deptId : 0,
      this.auth.roles = args.roles
    },
    logout() {
      this.auth.userId = 0
      this.auth.orgId = 0
      this.auth.deptId = 0
      this.auth.roles = []
    },
    whomi(args: user) {
      this.user.userName = args.userName,
      this.user.orgName = args.orgName,
      this.user.deptName = args.deptName
    }
  },
  getters: {
    getRoles: (state) => state.auth.roles.length != 0 
    ? state.auth.roles 
    : [{
      roleName:'ANONYMOUS'
    }],
    getMe: (state) => { return {user: state.user, auth: state.auth} }
  }
})

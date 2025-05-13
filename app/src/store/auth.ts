import type { LoginResponseDto, LoginResRole } from '@/lib/api/user/userDto'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: 0,
    orgId: 0,
    deptId: 0,
    roles: [] as LoginResRole[]
  }),
  actions: {
    login(args: LoginResponseDto) {
      this.userId = args.userId,
      this.orgId = args.orgId ? args.orgId : 0,
      this.deptId = args.deptId ? args.deptId : 0,
      this.roles = args.roles
    },
    logout() {
      this.userId = 0
      this.orgId = 0
      this.deptId = 0
      this.roles = []
    }
  },
  getters: {
    getRoles: (state) => state.roles.length != 0 
    ? state.roles 
    : [{
      roleName:'ANONYMOUS'
    }]
  }
})

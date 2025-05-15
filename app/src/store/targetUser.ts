import { defineStore } from 'pinia'

interface User {
  userId: number
  userLoginId: string
  userName: string
  email: string
}

export const useTargetUserStore = defineStore('targetUser', {
  state: (): { user: User | null } => ({
    user: null
  }),

  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    }
  },

  getters: {
    getUser: (state): User | null => state.user
  }
})

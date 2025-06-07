import type { ApiResponse } from '@/lib/global/ApiResponse'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface SnackbarQueue {
  id: number;
  text: string;
  show: boolean;
  timeout: number;
  color: string;
}
export const useResStore = defineStore('res', {
  state: () => ({
    queue: ref<SnackbarQueue[]>([])
  }),
  actions: {
    push(res: ApiResponse<any>) {
      this.queue.push({
        id: Date.now(),
        text: res.message,
        show: true,
        timeout: 3000,
        color: res.success ? 'success' : 'error'
      })
    }
  },
  getters: {
    getQueue: (state) => state.queue
  }
})

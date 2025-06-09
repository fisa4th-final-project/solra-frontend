import type { ApiResponse } from '@/lib/global/ApiResponse'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface SnackbarQueue {
  id: number;
  text: string;
  show: boolean;
  timeout: number;
  success: string;
}
export const useResStore = defineStore('res', {
  state: () => ({
    queue: ref<SnackbarQueue[]>([])
  }),
  actions: {
    push(res: ApiResponse<any>) {
      if (!res.message) return;
      this.queue.push({
        id: Date.now(),
        text: res.message,
        show: true,
        timeout: 3000,
        success: res.success ? 'success' : 'error'
      });
    },
    remove(id: number) {
      this.queue = this.queue.filter((item) => item.id !== id);
    },
    clear() {
      this.queue = []
    },
  },
  getters: {
    getQueue: (state) => state.queue
  }
})

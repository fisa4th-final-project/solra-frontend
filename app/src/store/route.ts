import { defineStore } from 'pinia'
import type { Item } from '@/components/layout/PageHeader.vue'

export const useRouteStore = defineStore('route', {
  state: () => ({
    breadcrumbs: [] as Item[]
  }),
  actions: {
    setBreadcrumbs(args: {
      breadcrumbs: Item[]
    }) {
      this.breadcrumbs = args.breadcrumbs
    },
    addBreadcrumbs(args: {
      breadcrumbs: Item
    }) {
      this.breadcrumbs.push(args.breadcrumbs);
    },
    rmBreadcrumb() {
      this.breadcrumbs = []
    }
  },
  getters: {
    getBreadcrumbs: (state) => state.breadcrumbs
  }
})

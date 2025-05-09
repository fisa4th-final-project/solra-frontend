import { defineStore } from 'pinia'
interface openArgs {
  title: string,
  message: string
}
export const useDialogStore = defineStore('dialog', {
  state: () => ({
    showDialog: false,
    dialogTitle: '',
    dialogMessage: ''
  }),
  actions: {
    open(args: openArgs) {
      this.dialogTitle = args.title
      this.dialogMessage = args.message
      this.showDialog = true
    },
    close() {
      this.showDialog = false
    }
  }
})

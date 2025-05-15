import { defineStore } from 'pinia'
interface openArgs {
  title: string,
  message: string,
  type: string
}
export const useDialogStore = defineStore('dialog', {
  state: () => ({
    showDialog: false,
    dialogTitle: '',
    dialogType: '',
    dialogMessage: ''
  }),
  actions: {
    open(args: openArgs) {
      this.dialogTitle = args.title;
      this.dialogType = args.type;
      this.dialogMessage = args.message;
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
    }
  },
  getters: {
    getType: (state) => state.dialogType
  }
})

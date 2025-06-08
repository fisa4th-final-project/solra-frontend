<template>
  <div v-if="auth.hasPerm('DEPT_DELETE')">
    <v-btn
      flat
      variant="plain"
      color="red"
      class="font-weight-bold"
      @click="openDialog"
    >
      Delete
    </v-btn>
    <Dialog v-if="dialog.getType === 'deleteDept'">
      <template v-slot:title>
        부서를 삭제하시겠습니까?
      </template>
      <template v-slot:default>
        부서: {{ dept.deptName }} 
      </template>
      <template v-slot:actions>
        <v-btn
          color=""
          @click="dialog.close()"
        >취소</v-btn>
        <v-btn
          color="red"
          @click="deleteDept()"
        >삭제</v-btn>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>

import Dialog from '@/components/common/Dialog.vue';
import { useDialogStore } from '@/store/dialog';
import { apiHandler } from '@/lib/global/apiManager';  
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

  const props = defineProps<{
    dept: {
      deptId: number,
      deptName: string
    },
    onUpdate?: () => void
  }>();

  const dialog = useDialogStore();

  function openDialog() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteDept'
    });
  }
  
  function deleteDept() {
    dialog.close();
    apiHandler.deleteDeptApi({deptId: props.dept.deptId}).then(() => {
      props.onUpdate?.();
    });
  }

</script>

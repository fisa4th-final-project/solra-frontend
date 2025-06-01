<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteRole"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteRole'">
    <template v-slot:title>
      역할을 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      역할: {{ role.roleName }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="apiHandler.deleteRoleApi({roleId: role.roleId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
import { apiHandler } from '@/lib/global/apiManager';
  import { useDialogStore } from '@/store/dialog';

  defineProps<{
    role: {
      roleId: number,
      roleName: string
    };
  }>();

  const dialog = useDialogStore();

  function deleteRole() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteRole'
    });
  }
  
</script>

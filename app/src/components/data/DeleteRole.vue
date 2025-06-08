<template>
  <div v-if="auth.hasPerm('ROLE_DELETE')">
    <v-btn
      flat
      variant="plain"
      color="red"
      class="font-weight-bold"
      @click="openDialog"
    >
      Delete
    </v-btn>
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
          @click="deleteRole()"
        >삭제</v-btn>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>

import Dialog from '@/components/common/Dialog.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { useDialogStore } from '@/store/dialog';

const props = defineProps<{
  role: {
    roleId: number,
    roleName: string
  },
  onUpdate?: () => void;
}>();

const auth = useAuthStore();

const dialog = useDialogStore();

const deleteRole = () => {
  dialog.close();
  apiHandler.deleteRoleApi({roleId: props.role.roleId}).then(() => {
    props.onUpdate?.();
  });
}

function openDialog() {
  dialog.open({
    title: '',
    message: '',
    type: 'deleteRole'
  });
}

</script>

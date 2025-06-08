<template>
  <div v-if="auth.hasPerm('ROLE_DELETE')">
    <v-btn
      flat
      variant="plain"
      color="red"
      class="font-weight-bold"
      @click="openDialog"
    >
      Revoke
    </v-btn>
    <Dialog v-if="dialog.getType === 'deleteUserRole'">
      <template v-slot:title>
        부여된 역할을 회수하시겠습니까?
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
          @click="deleteUserRole()"
        >회수</v-btn>
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
    roleId: number;
    roleName: string;
  },
  user: {
    userId: number;
  }
  onUpdate?: () => void;
}>();

const auth = useAuthStore();

const dialog = useDialogStore();

const deleteUserRole = () => {
  dialog.close();
  apiHandler.deleteUserRoleApi({
    roleId: props.role.roleId, 
    userId: props.user.userId
  }).then(() => {
    props.onUpdate?.();
  });
}

function openDialog() {
  dialog.open({
    title: '',
    message: '',
    type: 'deleteUserRole'
  });
}

</script>

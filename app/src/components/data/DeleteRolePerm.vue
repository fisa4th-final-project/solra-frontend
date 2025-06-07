<template>
  <div v-if="auth.hasPerm('ROLE_PERMISSION_REVOKE')">
    <v-btn
      flat
      color="red"
      class="font-weight-bold"
      @click="deleteRolePerm"
    >삭제</v-btn>
    <Dialog v-if="dialog.getType === 'deleteRolePerm'">
      <template v-slot:title>
        "{{ role.roleName }}" 에 부여된 권한을 회수하시겠습니까?
      </template>
      <template v-slot:default>
        권한: {{ perm.permissionName }} 
      </template>
      <template v-slot:actions>
        <v-btn
          color=""
          @click="dialog.close()"
        >취소</v-btn>
        <v-btn
          color="red"
          @click="apiHandler.deleteRolePermApi({roleId: role.roleId, permissionId: perm.permissionId})"
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

  defineProps<{
    role: {
      roleId: number,
      roleName: string
    }
    perm: {
      permissionId: number
      permissionName: string
    }
  }>();

  const auth = useAuthStore();

  const dialog = useDialogStore();

  function deleteRolePerm() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteRolePerm'
    });
  }
  
</script>

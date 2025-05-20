<template>
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
        @click="deleteRolePermApi({roleId: role.roleId, permissionId: perm.permissionId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  
  import { useDialogStore } from '@/store/dialog';
  
  import { deleteRolePermApi } from '@/lib/api/rolePerm/deleteRolePermApi';

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

  const dialog = useDialogStore();

  function deleteRolePerm() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteRolePerm'
    });
  }
  
</script>

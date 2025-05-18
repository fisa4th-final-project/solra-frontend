<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteUser"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteUser'">
    <template v-slot:title>
      사용자를 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      사용자 ID: {{ user.userLoginId }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deleteUserApi({userId: user.userId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  
  import { useDialogStore } from '@/store/dialog';

  import { deleteUserApi } from '@/lib/api/user/deleteUserApi';

  defineProps<{
    user: {
      userId: number,
      userLoginId: string
    };
  }>();

  const dialog = useDialogStore();

  function deleteUser() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteUser'
    });
  }

  
</script>

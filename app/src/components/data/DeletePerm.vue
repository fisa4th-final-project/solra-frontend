<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deletePerm"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deletePerm'">
    <template v-slot:title>
      권한을 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      권한: {{ perm.permName }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deletePermApi({permId: perm.permId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  
  import { useDialogStore } from '@/store/dialog';

  import { deletePermApi } from '@/lib/api/perm/deletePermApi';

  defineProps<{
    perm: {
      permId: number,
      permName: string
    };
  }>();

  const dialog = useDialogStore();

  function deletePerm() {
    dialog.open({
      title: '',
      message: '',
      type: 'deletePerm'
    });
  }
  
</script>

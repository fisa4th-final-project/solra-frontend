<template>
  <v-btn
    flat
    variant="plain"
    color="red"
    class="font-weight-bold"
    @click="deletePerm"
  >
    Delete
  </v-btn>
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
        @click="apiHandler.deletePermApi({permId: perm.permId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  import { apiHandler } from '@/lib/global/apiManager';
  import { useDialogStore } from '@/store/dialog';

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

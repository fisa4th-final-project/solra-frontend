<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteNS"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteNS'">
    <template v-slot:title>
      네임스페이스를 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      네임스페이스: {{ name }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deleteNSApi({clusterId, name})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  import { deleteNSApi } from '@/lib/api/ns/deleteNSApi';
  
  import { useDialogStore } from '@/store/dialog';

  defineProps<{
    clusterId: number;
    name: string;
  }>();

  const dialog = useDialogStore();

  function deleteNS() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteNS'
    });
  }
  
</script>

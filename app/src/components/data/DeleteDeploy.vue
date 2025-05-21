<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteDelete"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteDelete'">
    <template v-slot:title>
      디플로이먼트를 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      디플로이먼트: {{ name }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deleteDeployApi({clusterId, nsName, name})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  import { deleteDeployApi } from '@/lib/api/deploy/deleteDeployApi';
  
  import { useDialogStore } from '@/store/dialog';

  defineProps<{
    clusterId: number;
    nsName: string;
    name: string;
  }>();

  const dialog = useDialogStore();

  function deleteDelete() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteDelete'
    });
  }
  
</script>

<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteSvc"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteSvc'">
    <template v-slot:title>
      서비스를 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      서비스: {{ name }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deleteSvcApi({clusterId, nsName, name})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  import { deleteSvcApi } from '@/lib/api/svc/deleteSvcApi';
  
  import { useDialogStore } from '@/store/dialog';

  defineProps<{
    clusterId: number;
    nsName: string;
    name: string;
  }>();

  const dialog = useDialogStore();

  function deleteSvc() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteSvc'
    });
  }
  
</script>

<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteCluster"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteCluster'">
    <template v-slot:title>
      클러스터 정보를 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      클러스터: {{ cluster.name }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="apiHandler.deleteClusterApi({clusterId: cluster.clusterId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  import { useDialogStore } from '@/store/dialog';
import { apiHandler } from '@/lib/global/apiManager';

  defineProps<{
    cluster: {
      clusterId: number;
      name: string;
    }
  }>();

  const dialog = useDialogStore();

  function deleteCluster() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteCluster'
    });
  }
  
</script>

<template>
  <div v-if="auth.hasPerm('NAMESPACE_DELETE')">
    <v-btn
      flat
      variant="plain"
      color="red"
      class="font-weight-bold"
      @click="openDialog"
    >
      Delete
    </v-btn>
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
          @click="deleteNs"
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

const auth = useAuthStore();

const props = defineProps<{
  clusterId: number;
  name: string;
  onUpdate?: () => void;
}>();

const dialog = useDialogStore();

const deleteNs = () => {
  apiHandler.deleteNSApi({
    clusterId: props.clusterId, 
    name: props.name
  }).then(() => {
    props.onUpdate?.();
  });
  dialog.close();
}

function openDialog() {
  dialog.open({
    title: '',
    message: '',
    type: 'deleteNS'
  });
}
  
</script>

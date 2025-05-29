<template>
  <v-btn
    flat
    variant="plain"
    color="red"
    class="font-weight-bold"
    @click="deleteOrg"
  >
    Delete
  </v-btn>
  <Dialog v-if="dialog.getType === 'deleteOrg'">
    <template v-slot:title>
      조직을 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      조직: {{ org.orgName }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deleteOrgApi({orgId: org.orgId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

import Dialog from '@/components/common/Dialog.vue';
import { useDialogStore } from '@/store/dialog';
import { deleteOrgApi } from '@/lib/api/org/deleteOrgApi';

defineProps<{
  org: {
    orgId: number,
    orgName: string
  };
}>();

const dialog = useDialogStore();

function deleteOrg() {
  dialog.open({
    title: '',
    message: '',
    type: 'deleteOrg'
  });
}
  
</script>

<template>
  <div v-if="auth.hasPerm('ORG_DELETE')">
    <v-btn
      flat
      variant="plain"
      color="red"
      class="font-weight-bold"
      @click="openDialog"
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
          @click="deleteOrg()"
        >삭제</v-btn>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>

import Dialog from '@/components/common/Dialog.vue';
import { useDialogStore } from '@/store/dialog';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const props = defineProps<{
  org: {
    orgId: number;
    orgName: string;
  },
  onUpdate?: () => void;
}>();

const auth = useAuthStore();

const dialog = useDialogStore();

const deleteOrg = () => {
  dialog.close()
  apiHandler.deleteOrgApi({orgId: props.org.orgId}).then(() => {
    props.onUpdate?.();
  });
}

function openDialog() {
  dialog.open({
    title: '',
    message: '',
    type: 'deleteOrg'
  });
}
  
</script>

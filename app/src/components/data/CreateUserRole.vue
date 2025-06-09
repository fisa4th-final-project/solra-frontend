<template>
  <SideContents v-if="auth.hasPerm('USER_ROLE_ASSIGN')" v-model="isOpened">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">createRole</v-btn>
      </slot>
    </template>
    <template v-slot:title>역할 추가</template>
    
    <v-form v-model="valid" @submit.prevent="submitForm">
      <SelectRoleList :form="form"/>
      <v-btn
        :disabled="!valid"
        class="mt-4"
        type="submit"
        color="primary"
        block
      >
        부여
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import SelectRoleList from '@/components/data/SelectRoleList.vue';

const auth = useAuthStore();

const props = defineProps<{
  userId: number;
  onUpdate?: () => void;
}>();

const isOpened = ref();
const valid = ref(false);

const form = ref({
  role: {
    roleId: 0,
    roleName: ''
  }
});

const perms = ref<{
  permissionId: number;
  permissionName: string;
  description: string;
}[]>([]);

const submitForm = async () => {
  if (props.userId && form.value.role.roleId === 0) return;
  await apiHandler.createUserRoleApi({
    userId: props.userId,
    roleId: form.value.role.roleId
  }).then(() => {
    isOpened.value = false;
    props.onUpdate?.();
  });
}

defineExpose({
  form, valid, perms
});

</script>

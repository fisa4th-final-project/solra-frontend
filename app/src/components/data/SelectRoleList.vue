<template>
  <v-select
    v-model="form.role"
    :items="roleList"
    :rules="[rules.required]"
    variant="underlined"
    label="역할 선택"
    color="primary"
    item-title="roleName"
    item-value="roleId"
    return-object
    v-if="auth.hasPerm('ROLE_READ')"
  />
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  form: {
    role: {
      roleId: number,
      roleName: string
    }
  }
}>();

const roleList = ref<{
  roleId: number;
  roleName: string;
}[]>();

onMounted(async () => {
  const res = await apiHandler.getRoleListApi();
  if (res) roleList.value = res;
});

defineExpose({
  roleList
});

</script>

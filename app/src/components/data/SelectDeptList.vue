<template>
  <v-select
    v-model="form.dept"
    :items="depts"
    variant="underlined"
    label="부서 선택"
    color="primary"
    item-title="deptName"
    item-value="deptId"
    return-object
    v-if="auth.hasPerm('DEPT_READ')"
  />
  <v-select
    v-model="form.dept"
    :items="depts"
    variant="underlined"
    label="부서 선택"
    color="primary"
    item-title="deptName"
    item-value="deptId"
    return-object
    v-else
  />
</template>
<script lang="ts" setup>

import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref, watch } from 'vue';

const auth = useAuthStore();

const depts = ref<{
  deptId: number;
  deptName: string;
}[]>([]);

const props = defineProps<{
  orgId: number;
  form: {
    dept: {
      deptId: number;
      deptName: string;
    }
  }
}>();

const getDepts = async () => {
  if (auth.hasPerm('DEPT_READ')) {
    const res = await apiHandler.getDeptListApi({
      org_id: props.orgId
    });
    if (!res) return;
    depts.value = res;
  } else {
    depts.value = [{
      deptId: auth.auth.deptId, deptName: auth.user.deptName
    }]
    props.form.dept = {
      deptId: auth.auth.deptId, deptName: auth.user.deptName
    }
  }
}

onMounted(() => {
  if (!props.orgId) return;
  getDepts();
});

watch(() => props.orgId, () => {
  getDepts();
});

defineExpose({
  depts
});
</script>

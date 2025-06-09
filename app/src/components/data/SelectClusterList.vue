<template>
  <v-select
    v-model="form.cluster"
    :items="clusterList"
    :rules="[rules.required]"
    variant="underlined"
    label="클러스터 선택"
    color="primary"
    item-title="name"
    item-value="clusterId"
    return-object
    v-if="auth.hasPerm('CLUSTER_READ')"
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
    cluster: {
      clusterId: number,
      name: string
    }
  }
}>();

const clusterList = ref<{
  clusterId: number;
  name: string;
}[]>();

onMounted(async () => {
  if (auth.hasPerm('CLUSTER_READ')) {
    const res = await apiHandler.getClusterListApi();
    if (res) clusterList.value = res;
  }
});

defineExpose({
  clusterList
});

</script>

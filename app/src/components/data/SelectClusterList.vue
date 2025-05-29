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
  />
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { getClusterListApi } from '@/lib/api/cluster/getClusterListApi';
import { rules } from '@/lib/global/inputRules';

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
  await getClusterListApi().then((res) => {
    if (res) clusterList.value = res;
  });
});

</script>

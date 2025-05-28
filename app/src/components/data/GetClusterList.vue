<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-kubernetes'}"
    @selected="selected"
    @isEmpty="isEmpty"
  >
    <template v-slot:item.value="{ item }">
      <span v-if="item.field === 'caCert' || item.field === 'saToken'">••••••••••••</span>
      <span v-else>{{ item.value }}</span>
    </template>
  </DataCardList>
</template>
<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import type { GetClustersRequestParam, GetClustersResponseDto } from '@/lib/api/cluster/clusterDto';
import { getClustersApi } from '@/lib/api/cluster/getClustersApi';

defineProps<{
  req: GetClustersRequestParam;
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetClustersResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetClustersResponseDto) => {
  emit('selected', item)
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const dataHandler = async (req: GetClustersRequestParam) => {
  return await getClustersApi(req);
};

</script>

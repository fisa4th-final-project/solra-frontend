<template>
  <DataCardList
    :api="{dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-kubernetes'}"
    @selected="selected"
  >
    <template v-slot:item.value="{ item }">
      <span v-if="item.field === 'caCert' || item.field === 'saToken'">••••••••••••</span>
      <span v-else>{{ item.value }}</span>
    </template>
  </DataCardList>
</template>
<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import type { GetClustersResponseDto } from '@/lib/api/cluster/clusterDto';
import { getClustersApi } from '@/lib/api/cluster/getClustersApi';

const emit = defineEmits<{
  (e: 'selected', item: GetClustersResponseDto): void
}>()

const selected = (item: GetClustersResponseDto) => {
  emit('selected', item)
}

const dataHandler = async () => {
  return await getClustersApi();
};

</script>

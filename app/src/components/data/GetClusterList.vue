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
import type { GetClusterListRequestParam, GetClusterListResponseDto } from '@/lib/api/cluster/clusterDto';
import { getClusterListApi } from '@/lib/api/cluster/getClusterListApi';

defineProps<{
  req: GetClusterListRequestParam;
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetClusterListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetClusterListResponseDto) => {
  emit('selected', item)
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const dataHandler = async (req: GetClusterListRequestParam) => {
  return await getClusterListApi(req);
};

</script>

<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-kubernetes'}"
    @selected="selected"
    @isEmpty="isEmpty"
    v-if="auth.hasPerm('CLUSTER_READ')"
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
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

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
  return await apiHandler.getClusterListApi(req);
};

</script>

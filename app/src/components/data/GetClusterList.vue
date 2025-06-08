<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-kubernetes'}"
    @selected="selected"
    @isEmpty="isEmpty"
    v-if="auth.hasPerm('CLUSTER_READ')"
    :detail="{enable: true}"
    ref="$getClusterList"
  >
    <template v-slot:detailTitle>
      <v-row justify="space-between" align="center">
        <v-col>
          클러스터 상세
        </v-col>
        <v-col align="end">
          <UpdateCluster
            :clusterId="selectedItem.clusterId"
            :onUpdate="onUpdate"
          >
            <template v-slot:activator="{props}">
              <v-btn 
                v-bind="props"
                color="primary"
                variant="plain"
              >
                Edit
              </v-btn>
            </template>
          </UpdateCluster>
        </v-col>
      </v-row>
    </template>
    <template v-slot:detail>
      <GetClusterDetail :title="selectedItem.name" :req="{clusterId: selectedItem.clusterId}" />
    </template>
    <template v-slot:item="{ item }">
      <tr v-if="!enableField.includes(item.field)">
        <th>
          {{ item.field }}
        </th>
        <td v-if="item.field === 'caCert' || item.field === 'saToken'" class="text-right">••••••••••••</td>
        <td v-else class="text-right">
          {{ item.value }}
        </td>
      </tr>
    </template>
  </DataCardList>
</template>
<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import GetClusterDetail from '@/components/data/GetClusterDetail.vue';
import UpdateCluster from '@/components/data/UpdateCluster.vue';
import type { GetClusterListRequestParam, GetClusterListResponseDto } from '@/lib/api/cluster/clusterDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const auth = useAuthStore();

const selectedItem = ref<GetClusterListResponseDto>({} as GetClusterListResponseDto);

const $getClusterList = ref();

defineProps<{
  req: GetClusterListRequestParam;
  onUpdate?: (arg?: any) => void;
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetClusterListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetClusterListResponseDto) => {
  selectedItem.value = item;
  emit('selected', item);
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const dataHandler = async (req: GetClusterListRequestParam) => {
  return await apiHandler.getClusterListApi(req);
};

const enableField = [
  'clusterId',
  'orgId',
]

defineExpose({
  loadData: async () => await $getClusterList?.value?.loadData?.()
});

</script>

<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-cube'}"
    @selected="selected"
  >
    <template v-slot:item="{ item }">
      <tr >
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCardList>
</template>

<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import type { GetPodListRequestParam, GetPodListResponseDto } from '@/lib/api/pod/podDto';
import { getPodListApi } from '@/lib/api/pod/getPodListApi';

defineProps<{
  req: GetPodListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetPodListResponseDto): void
}>()

const selected = (item: GetPodListResponseDto) => {
  emit('selected', item)
}

const dataHandler = async (req: GetPodListRequestParam) => {
  return await getPodListApi(req);
};

</script>

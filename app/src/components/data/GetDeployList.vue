<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-hexagon-multiple'}"
    @selected="selected"
  >
    <template v-slot:item="{ item }">
      <tr>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCardList>
</template>
<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import type { GetDeployListRequestParam, GetDeployListResponseDto } from '@/lib/api/deploy/deployDto';
import { getDeployListApi } from '@/lib/api/deploy/getDeployListApi';

defineProps<{
  req: GetDeployListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetDeployListResponseDto): void
}>()

const selected = (item: GetDeployListResponseDto) => {
  emit('selected', item)
}

const dataHandler = async (req: GetDeployListRequestParam) => {
  return await getDeployListApi(req);
};

</script>

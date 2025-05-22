<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-scan-helper'}"
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
import { getNSListApi } from '@/lib/api/ns/getNSListApi';
import type { GetNSListRequestParam, GetNSListResponseDto } from '@/lib/api/ns/nsDto';

defineProps<{
  req: GetNSListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetNSListResponseDto): void
}>()

const selected = (item: GetNSListResponseDto) => {
  emit('selected', item)
}

const dataHandler = async (req: GetNSListRequestParam) => {
  return await getNSListApi(req);
};

</script>

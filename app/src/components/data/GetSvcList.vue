<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-lan'}"
    @selected="selected"
    @is-empty="isEmpty"
  >
    <template v-slot:item="{ item }">

      <tr v-if="item.field === 'labels' || item.field === 'annotations'">
        <th>
          {{ item.field }}
        </th>
        <td>
          {{ item.value }}
        </td>
      </tr>

      <tr v-else>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>

      </template>
  </DataCardList>
</template>

<script lang="ts" setup>
import type { GetSvcListRequestParam, GetSvcListResponseDto } from '@/lib/api/svc/svcDto';
import { getSvcListApi } from '@/lib/api/svc/getSvcListApi';
import DataCardList from '@/components/common/DataCardList.vue';

defineProps<{
  req: GetSvcListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetSvcListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetSvcListResponseDto) => {
  emit('selected', item)
}
const isEmpty = (item: boolean) => {
  emit('isEmpty', item)
}

const dataHandler = async (req: GetSvcListRequestParam) => {
  return await getSvcListApi(req);
};

</script>

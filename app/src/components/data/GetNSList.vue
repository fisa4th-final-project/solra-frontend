<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-scan-helper'}"
    @selected="selected"
    v-if="auth.hasPerm('NAMESPACE_READ')"  
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
import type { GetNSListRequestParam, GetNSListResponseDto } from '@/lib/api/ns/nsDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

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
  return await apiHandler.getNSListApi(req);
};

</script>

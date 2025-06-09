<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-cube'}"
    @selected="selected"
    @is-empty="isEmpty"
    v-if="auth.hasPerm('POD_READ')"
    ref="$dataCardList"
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
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const auth = useAuthStore();

defineProps<{
  req: GetPodListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetPodListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetPodListResponseDto) => {
  emit('selected', item)
}
const isEmpty = (item: boolean) => {
  emit('isEmpty', item)
}

const dataHandler = async (req: GetPodListRequestParam) => {
  return await apiHandler.getPodListApi(req);
};

const $dataCardList = ref();

defineExpose({
  loadData: async () => await $dataCardList.value?.loadData?.()
})

</script>

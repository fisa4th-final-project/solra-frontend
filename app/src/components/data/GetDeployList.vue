<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-hexagon-multiple'}"
    @selected="selected"
    @is-empty="isEmpty"
    v-if="auth.hasPerm('DEPLOYMENT_READ')"
    ref="$dataCardList"
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
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const auth = useAuthStore();

defineProps<{
  req: GetDeployListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetDeployListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>();

const isEmpty = (item: boolean) => {
  emit('isEmpty', item)
}

const selected = (item: GetDeployListResponseDto) => {
  emit('selected', item)
}

const dataHandler = async (req: GetDeployListRequestParam) => {
  return await apiHandler.getDeployListApi(req);
};

const $dataCardList = ref();

defineExpose({
  loadData: async () => await $dataCardList.value?.loadData?.()
});

</script>

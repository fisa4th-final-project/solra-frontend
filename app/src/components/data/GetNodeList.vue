<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-server'}"
    @selected="selected"
    @isEmpty="isEmpty"
  >
    <template v-slot:item="{ item }">
      <tr v-if="item.field === 'capacity' || item.field === 'allocatable'">
        <th>
          {{ item.field }}
        </th>
        <td>
          <v-container class="px-0">
            <v-row v-for="(i, key) in item.value" no-gutters>
              <v-col>
                {{ key }}
              </v-col>
              <v-col class="text-right">
                {{ i }}
              </v-col>
            </v-row>
          </v-container>
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

import DataCardList from '@/components/common/DataCardList.vue';
import type { GetNodeListRequestParam, GetNodeListResponseDto } from '@/lib/api/node/nodeDto';
import { getNodeListApi } from '@/lib/api/node/getNodeListApi';

defineProps<{
  req: GetNodeListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetNodeListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetNodeListResponseDto) => {
  emit('selected', item);
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const dataHandler = async (req: GetNodeListRequestParam) => {
  const res = await getNodeListApi(req);
  if (res) return res.map(({ clusterId, ...rest }) => rest);
}

</script>

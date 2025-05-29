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
import type { GetNodesRequestParam, GetNodesResponseDto } from '@/lib/api/node/nodeDto';
import { getNodesApi } from '@/lib/api/node/getNodesApi';

defineProps<{
  req: GetNodesRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetNodesResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: GetNodesResponseDto) => {
  emit('selected', item);
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const dataHandler = async (req: GetNodesRequestParam) => {
  const res = await getNodesApi(req);
  if (res) return res.map(({ clusterId, ...rest }) => rest);
}

</script>

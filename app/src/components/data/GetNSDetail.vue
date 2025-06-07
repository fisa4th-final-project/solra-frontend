<template>
  <DataCard 
    :header="{title, icon: 'mdi-scan-helper'}"
    :api="{req, dataHandler}"
    v-if="auth.hasPerm('NAMESPACE_READ')"
  >
    <template v-slot:item="{ item }">
      <tr v-if="item.field === 'labels' || item.field === 'annotations'">
        <th>
          {{ item.field }}
        </th>
        <td class="text-right">
          {{ item.value }}
        </td>
      </tr>
      <tr v-else>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCard>
</template>

<script lang="ts" setup>

import DataCard from '@/components/common/DataCard.vue';
import type { GetNSDetailRequestParam } from '@/lib/api/ns/nsDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  title: string;
  req: GetNSDetailRequestParam;
}>();

const dataHandler = async (req: GetNSDetailRequestParam) => {
  if (req.clusterId && req.name) return await apiHandler.getNSDetailApi(req);
};

</script>

<template>
  <DataCard
    :header="{title, icon: 'mdi-cube'}"
    :api="{req, dataHandler}"
  >      
    <template v-slot:item="{ item }">
      <tr>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCard>
</template>
<script lang="ts" setup>

import DataCard from '@/components/common/DataCard.vue';
import type { GetPodDetailRequestParam } from '@/lib/api/pod/podDto';
import { getPodDetailApi } from '@/lib/api/pod/getPodDetailApi';

defineProps<{
  title: string;
  req: GetPodDetailRequestParam;
}>();

const dataHandler = async (req: GetPodDetailRequestParam) => {
  if (req.clusterId && req.nsName && req.name) return await getPodDetailApi(req);
};

</script>

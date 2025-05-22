<template>
  <DataCard
    :header="{title, icon: 'mdi-lan'}"
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
import type { GetSvcDetailRequestParam } from '@/lib/api/svc/svcDto';
import { getSvcDetailApi } from '@/lib/api/svc/getSvcDetail.Api';

defineProps<{
  title: string;
  req: GetSvcDetailRequestParam;
}>();

const dataHandler = async (req: GetSvcDetailRequestParam) => {
  if (req.clusterId && req.nsName && req.name) return await getSvcDetailApi(req);
};

</script>

<template>
  <DataCard
    :header="{title, icon: 'mdi-cube'}"
    :api="{req, dataHandler}"
    v-if="auth.hasPerm('POD_READ')"
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
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  title: string;
  req: GetPodDetailRequestParam;
}>();

const dataHandler = async (req: GetPodDetailRequestParam) => {
  if (req.clusterId && req.nsName && req.name) return await apiHandler.getPodDetailApi(req);
};

</script>

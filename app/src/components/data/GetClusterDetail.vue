<template>
  <DataCard
    :header="{title, icon: 'mdi-kubernetes'}"
    :api="{req, dataHandler}"
  >
    <template v-slot:item="{ item }">
      <tr v-if="item.field === 'caCert' || item.field === 'saToken'">
        <th>
          {{ item.field }}
        </th>
        <td class="text-right">
          ••••••••••••
        </td>
      </tr>
      <tr v-else>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
    <template v-slot:skeleton>
      <v-container height="504px" class="d-flex justify-center align-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="60"
          width="6"
        />
      </v-container>
    </template>
  </DataCard>
</template>

<script lang="ts" setup>

import DataCard from '@/components/common/DataCard.vue';
import type { GetClusterDetailRequestParam } from '@/lib/api/cluster/clusterDto';
import { apiHandler } from '@/lib/global/apiManager';

defineProps<{
  title: string;
  req: GetClusterDetailRequestParam;
}>();

const dataHandler = async (req: GetClusterDetailRequestParam) => {
  if (req.clusterId) return await apiHandler.getClusterDetailApi(req);
};

</script>

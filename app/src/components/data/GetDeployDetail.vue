<template>
  <DataCard 
    :header="{title, icon: 'mdi-hexagon-multiple'}"
    :api="{req, dataHandler}"
  >
    <template v-slot:item="{ item }">
      <tr>
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
import type { GetDeployDetailRequestParam } from '@/lib/api/deploy/deployDto';
import { getDeployDetailApi } from '@/lib/api/deploy/getDeployDetail.Api';

defineProps<{
  title: string;
  req: GetDeployDetailRequestParam;
}>();

const dataHandler = async (req: GetDeployDetailRequestParam) => {
  if (req.clusterId && req.nsName && req.deployName) return await getDeployDetailApi(req);
};

</script>

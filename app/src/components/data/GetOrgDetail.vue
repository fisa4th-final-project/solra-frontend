<template>
  <DataCard
    :header="{title, icon: 'mdi-office-building'}"
    :api="{req, dataHandler}"
  >      
    <template v-slot:item="{ item }">
      <tr>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
    <template v-slot:skeleton>
      <v-container height="150px" class="d-flex justify-center align-center">
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
import type { GetOrgDetailRequestDto } from '@/lib/api/org/orgDto';
import { apiHandler } from '@/lib/global/apiManager';

defineProps<{
  title: string;
  req: GetOrgDetailRequestDto;
}>();

const dataHandler = async (req: GetOrgDetailRequestDto) => {
  return await apiHandler.getOrgDetailApi(req);
};

</script>

<template>
  <DataCard
    :header="{title, icon: 'mdi-office-building'}"
    :api="{req, dataHandler}"
    v-if="auth.hasPerm('ORG_READ')"
  >      
    <template v-slot:item="{ item }">
      <tr v-if="!enableField.includes(item.field)">
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
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  title: string;
  req: GetOrgDetailRequestDto;
}>();

const dataHandler = async (req: GetOrgDetailRequestDto) => {
  return await apiHandler.getOrgDetailApi(req);
};

const enableField = [
  'orgId'
]
</script>

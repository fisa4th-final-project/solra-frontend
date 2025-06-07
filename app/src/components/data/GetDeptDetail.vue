<template>
  <DataCard
    :header="{title, icon: 'mdi-briefcase'}"
    :api="{req, dataHandler}"
    v-if="auth.hasPerm('DEPT_READ')"
  >      
    <template v-slot:item="{ item }">
      <tr v-if="item.field !== 'orgId' && item.field !== 'deptId'">
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
import type { GetDeptDetailRequestParam } from '@/lib/api/dept/deptDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  title: string;
  req: GetDeptDetailRequestParam;
}>();

const dataHandler = async (req: GetDeptDetailRequestParam) => {
  if (req.deptId) return await apiHandler.getDeptDetailApi(req);
};

</script>

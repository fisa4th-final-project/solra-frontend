<template>
  <DataCard 
    :header="{title, icon: 'mdi-server'}"
    :api="{req, dataHandler}"
    v-if="auth.hasPerm('NODE_READ')"
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
  </DataCard>
</template>

<script lang="ts" setup>

import DataCard from '@/components/common/DataCard.vue';
import type { GetNodeDetailRequestParam } from '@/lib/api/node/nodeDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  title: string;
  req: GetNodeDetailRequestParam;
}>();

const dataHandler = async (req: GetNodeDetailRequestParam) => {
  if (req.clusterId && req.nodeName) return await apiHandler.getNodeDetailApi(req);
};

</script>

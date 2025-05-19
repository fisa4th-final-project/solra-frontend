<template>
  <v-row>
    <v-col
      v-for="cluster in clusters"
      :key="cluster.clusterId"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
      <Card no-title no-text no-gutters>
        <v-data-table
          :headers="clusterHeader"
          :items="mapClusterToTableRows(cluster)"
          hide-default-footer
          ripple
          hover
        >
          <template v-slot:item.value="{ item }">
            <span v-if="item.field === 'caCert' || item.field === 'saToken'">••••••••••••</span>
            <span v-else>{{ item.value }}</span>
          </template>
        </v-data-table>
      </Card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Card from '@/components/common/Card.vue';
import { getClustersApi } from '@/lib/api/cluster/getClustersApi';
import type { DataTableHeader } from 'vuetify';

const clusters = ref<{
  clusterId: number;
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
  createdAt: Date;
  updatedAt: Date;
}[]>([]);

const loadClusters = async () => {
  const res = await getClustersApi();
  if (res) clusters.value = res;
};

const mapClusterToTableRows = (cluster: Record<string, any>) => {
  return Object.entries(cluster).map(([key, value]) => ({
    field: key,
    value: value,
  }));
};

const clusterHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(loadClusters);

</script>

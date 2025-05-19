<template>
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Card from '@/components/common/Card.vue';
import type { DataTableHeader } from 'vuetify';
import { getClusterDetailApi } from '@/lib/api/cluster/getClusterDetailApi';

const props = defineProps<{
  clusterId: number;
}>()

interface clusterRef {
  clusterId: number;
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const cluster = ref<clusterRef>({} as clusterRef);

const loadCluster = async () => {
  await getClusterDetailApi({
    clusterId: props.clusterId
  }).then((res) => {
    if (res) cluster.value = res
  });
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

onMounted(loadCluster);

</script>

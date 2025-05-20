<template>
  <v-row>
    <v-col
      v-for="(node, index) in nodes"
      :key="node.name + '-' + index"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
      <Card no-text no-gutters @click="selectNode(node)">
        
        <v-row align="center" class="pb-5">
          <v-col>
            <v-icon>mdi-server</v-icon>
            <span class="text-h6 pl-5">
              {{ node.name }}
            </span>
          </v-col>
        </v-row>
        <v-data-table
          :headers="clusterHeader"
          :items="mapClusterToTableRows(node)"
          hide-default-header
          hide-default-footer
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
        </v-data-table>
      </Card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Card from '@/components/common/Card.vue';
import type { DataTableHeader } from 'vuetify';
import type { GetNodesResponseDto } from '@/lib/api/node/nodeDto';
import { getNodesApi } from '@/lib/api/node/getNodesApi';

const emit = defineEmits<{
  (e: 'selected', item: GetNodesResponseDto): void
}>()

const selectNode = (item: GetNodesResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
}>();

const nodes = ref<GetNodesResponseDto[]>();

const loadNodes = () => {
  getNodesApi({
    clusterId: props.clusterId
  }).then((res) => {
    if (res) nodes.value = res;
  });
};

const mapClusterToTableRows = (cluster: Record<string, any>) => {
  return Object.entries(cluster).map(([key, value]) => {
    return {
      field: key,
      value: value,
    }
  }).filter((item) => item.field !== 'clusterId');
};

const clusterHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(() => {
  if (props.clusterId) loadNodes();
});

watch(() => props.clusterId, () => {
  loadNodes();
});

</script>

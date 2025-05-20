<template>
  <v-row>
    <v-col
      v-for="(node, index) in nsList"
      :key="node.name + '-' + index"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
      <Card no-text no-gutters @click="selectNS(node)">
        
        <v-row align="center" class="pb-5">
          <v-col>
            <v-icon>mdi-scan-helper</v-icon>
            <span class="text-h6 pl-5">
              {{ node.name }}
            </span>
          </v-col>
        </v-row>
        <v-data-table
          :headers="nsHeader"
          :items="mapToTableRows(node)"
          hide-default-header
          hide-default-footer
        >
          <template v-slot:item="{ item }">

            <tr v-if="item.field === 'labels' || item.field === 'annotations'">
              <th>
                {{ item.field }}
              </th>
              <td>
                {{ item.value }}
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
import type { GetNSListResponseDto } from '@/lib/api/ns/nsDto';
import { getNSListApi } from '@/lib/api/ns/getNSListApi';

const emit = defineEmits<{
  (e: 'selected', item: GetNSListResponseDto): void
}>()

const selectNS = (item: GetNSListResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
}>();

const nsList = ref<GetNSListResponseDto[]>();

const loadNSList = () => {
  getNSListApi({
    clusterId: props.clusterId
  }).then((res) => {
    if (res) nsList.value = res;
  });
};

const mapToTableRows = (ns: Record<string, any>) => {
  return Object.entries(ns).map(([key, value]) => {
    return {
      field: key,
      value: value,
    }
  }).filter((row) => row.field !== 'labels' && row.field !== 'annotations');
};

const nsHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(() => {
  if (props.clusterId) loadNSList();
});

watch(() => props.clusterId, () => {
  loadNSList();
});

</script>

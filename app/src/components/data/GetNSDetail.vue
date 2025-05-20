<template>
  <Card no-text no-gutters @click="selectNS(ns)">
    
    <v-row align="center" class="pb-5">
      <v-col>
        <v-icon>mdi-scan-helper</v-icon>
        <span class="text-h6 pl-5">
          {{ ns.name }}
        </span>
      </v-col>
    </v-row>
    <v-data-table
      :headers="nsHeader"
      :items="mapToTableRows(ns)"
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
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Card from '@/components/common/Card.vue';
import type { DataTableHeader } from 'vuetify';
import type { GetNSDetailResponseDto } from '@/lib/api/ns/nsDto';
import { getNSDetailApi } from '@/lib/api/ns/getNSDetail.Api';

const emit = defineEmits<{
  (e: 'selected', item: GetNSDetailResponseDto): void
}>()

const selectNS = (item: GetNSDetailResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
  nsName: string;
}>();

const ns = ref<GetNSDetailResponseDto>({} as GetNSDetailResponseDto);

const loadNSDetail = () => {
  console.log(props.nsName);
  getNSDetailApi({
    clusterId: props.clusterId,
    name: props.nsName
  }).then((res) => {
    if (res) ns.value = res;
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
  if (props.clusterId && props.nsName) loadNSDetail();
});

watch(() => [props.clusterId, props.nsName], () => {
  loadNSDetail();
});

</script>

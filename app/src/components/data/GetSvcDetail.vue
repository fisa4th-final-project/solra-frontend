<template>
  <Card no-text no-gutters @click="selectSvc(svc)">
    
    <v-row align="center" class="pb-5">
      <v-col>
        <v-icon>mdi-lanr</v-icon>
        <span class="text-h6 pl-5">
          {{ svc.name }}
        </span>
      </v-col>
    </v-row>
    <v-data-table
      :headers="nsHeader"
      :items="mapToTableRows(svc)"
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
import { getSvcDetailApi } from '@/lib/api/svc/getSvcDetail.Api';
import type { GetSvcDetailResponseDto } from '@/lib/api/svc/svcDto';

const emit = defineEmits<{
  (e: 'selected', item: GetSvcDetailResponseDto): void
}>()

const selectSvc = (item: GetSvcDetailResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
  nsName: string;
  name: string;
}>();

const svc = ref<GetSvcDetailResponseDto>({} as GetSvcDetailResponseDto);

const loadSvcDetail = () => {
  getSvcDetailApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    name: props.name,
  }).then((res) => {
    if (res) svc.value = res;
  });
};

const mapToTableRows = (ns: Record<string, any>) => {
  return Object.entries(ns).map(([key, value]) => {
    return {
      field: key,
      value: value,
    }
  })
  // .filter((row) => row.field !== 'labels' && row.field !== 'annotations');
};

const nsHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(() => {
  if (props.clusterId && props.nsName && props.name) loadSvcDetail();
});

watch(() => [props.clusterId, props.nsName, props.name], () => {
  loadSvcDetail();
});

</script>

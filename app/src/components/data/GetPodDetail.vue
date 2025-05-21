<template>
  <Card no-text no-gutters @click="selectPod(pod)">
    
    <v-row align="center" class="pb-5">
      <v-col>
        <v-icon>mdi-cube-outline</v-icon>
        <span class="text-h6 pl-5">
          {{ pod.name }}
        </span>
      </v-col>
    </v-row>
    <v-data-table
      :headers="podHeader"
      :items="mapToTableRows(pod)"
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
import type { GetPodDetailResponseDto } from '@/lib/api/pod/podDto';
import { getPodDetailApi } from '@/lib/api/pod/getPodDetail.Api';

const emit = defineEmits<{
  (e: 'selected', item: GetPodDetailResponseDto): void
}>()

const selectPod = (item: GetPodDetailResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
  nsName: string;
  name: string;
}>();

const pod = ref<GetPodDetailResponseDto>({} as GetPodDetailResponseDto);

const loadNSDetail = () => {
  console.log(props.nsName);
  getPodDetailApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    name: props.name
  }).then((res) => {
    if (res) pod.value = res;
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

const podHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(() => {
  if (props.clusterId && props.nsName && props.name) loadNSDetail();
});

watch(() => [props.clusterId, props.nsName, props.name], () => {
  loadNSDetail();
});

</script>

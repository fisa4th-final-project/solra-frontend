<template>
  <v-row>
    <v-col
      v-for="(pod, index) in podList"
      :key="pod.name + '-' + index"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
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
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Card from '@/components/common/Card.vue';
import type { DataTableHeader } from 'vuetify';
import { getPodListApi } from '@/lib/api/pod/getPodListApi';
import type { GetPodListResponseDto } from '@/lib/api/pod/podDto';

const emit = defineEmits<{
  (e: 'selected', item: GetPodListResponseDto): void
}>()

const selectPod = (item: GetPodListResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
  nsName: string;
}>();

const podList = ref<GetPodListResponseDto[]>();

const loadPodList = () => {
  getPodListApi({
    clusterId: props.clusterId,
    nsName: props.nsName
  }).then((res) => {
    if (res) podList.value = res;
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

const podHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(() => {
  if (props.clusterId && props.nsName) loadPodList();
});

watch(() => [props.clusterId, props.nsName], () => {
  loadPodList();
});

</script>

<template>
  <v-row>
    <v-col
      v-for="(dp, index) in deployList"
      :key="dp.name + '-' + index"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
      <Card no-text no-gutters @click="selectDeploy(dp)">
        
        <v-row align="center" class="pb-5">
          <v-col>
            <v-icon>mdi-hexagon-multiple</v-icon>
            <span class="text-h6 pl-5">
              {{ dp.name }}
            </span>
          </v-col>
        </v-row>
        <v-data-table
          :headers="nsHeader"
          :items="mapToTableRows(dp)"
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
import type { GetDeployListResponseDto } from '@/lib/api/deploy/deployDto';
import { getDeployListApi } from '@/lib/api/deploy/getDeployListApi';

const emit = defineEmits<{
  (e: 'selected', item: GetDeployListResponseDto): void
}>()

const selectDeploy = (item: GetDeployListResponseDto) => {
  emit('selected', item);
}

const props = defineProps<{
  clusterId: number;
  name: string;
}>();

const deployList = ref<GetDeployListResponseDto[]>();

const loadDeployList = () => {
  getDeployListApi({
    clusterId: props.clusterId,
    name: props.name
  }).then((res) => {
    if (res) deployList.value = res;
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
  if (props.clusterId && props.name) loadDeployList();
});

watch(() => [props.clusterId, props.name], () => {
  loadDeployList();
});

</script>

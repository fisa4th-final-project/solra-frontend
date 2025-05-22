<template>
  <v-row>
    <v-col
      v-for="(svc, index) in svcList"
      :key="svc.name + '-' + index"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
      <Card no-text no-gutters @click="selectSvc(svc)">
        
        <v-row align="center" class="pb-5">
          <v-col>
            <v-icon>mdi-lan</v-icon>
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
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Card from '@/components/common/Card.vue';
import type { DataTableHeader } from 'vuetify';
import type { GetSvcListResponseDto } from '@/lib/api/svc/svcDto';
import { getSvcListApi } from '@/lib/api/svc/getSvcListApi';

const emit = defineEmits<{
  (e: 'selected', item: GetSvcListResponseDto): void
}>()

const selectSvc = (item: GetSvcListResponseDto) => {
  emit('selected', item)
}

const props = defineProps<{
  clusterId: number;
  nsName: string;
}>();

const svcList = ref<GetSvcListResponseDto[]>();

const loadSvcList = () => {
  getSvcListApi({
    clusterId: props.clusterId,
    nsName: props.nsName
  }).then((res) => {
    if (res) svcList.value = res;
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
  if (props.clusterId && props.nsName) loadSvcList();
});

watch(() => [props.clusterId, props.nsName], () => {
  loadSvcList();
});

</script>

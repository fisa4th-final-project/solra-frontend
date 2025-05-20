<template>
  <Card no-title no-text no-gutters @click="selectDeploy(deploy)">
    <v-row align="center" class="py-5">
      <v-col>
        <v-icon>mdi-hexagon-multiple</v-icon>
        <span class="text-h6 pl-5">
          {{ props.deployName }}
        </span>
      </v-col>
    </v-row>
    <v-data-table
      :headers="deployHeader"
      :items="mapToTableRows(deploy)"
      hide-default-header
      hide-default-footer
    >
    </v-data-table>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Card from '@/components/common/Card.vue';
import type { DataTableHeader } from 'vuetify';
import type { GetDeployDetailResponseDto } from '@/lib/api/deploy/deployDto';
import { getDeployDetailApi } from '@/lib/api/deploy/getDeployDetail.Api';

const emit = defineEmits<{
  (e: 'selected', item: GetDeployDetailResponseDto): void
}>()

const selectDeploy = (item: GetDeployDetailResponseDto) => {
  emit('selected', item);
}


const props = defineProps<{
  clusterId: number;
  nsName: string;
  deployName: string;
}>();

const deploy = ref<GetDeployDetailResponseDto>({} as GetDeployDetailResponseDto);

const loadDeploy = () => {
  getDeployDetailApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    deployName: props.deployName
  }).then((res) => {
    if (res) deploy.value = res
  });
};

const mapToTableRows = (cluster: Record<string, any>) => {
  return Object.entries(cluster).map(([key, value]) => ({
    field: key,
    value: value,
  }));
};

const deployHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

onMounted(() => {
  if (props.clusterId && props.nsName && props.deployName) loadDeploy();
});

watch(() => [props.clusterId, props.deployName, props.nsName], () => {
  loadDeploy();
});
</script>

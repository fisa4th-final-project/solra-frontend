<template>
  <Card no-text no-gutters @click="selected(entity)">
    <template v-slot:title>
      <v-container>
      <v-row align="center" class="py-5">
        <v-col>
          <v-icon>{{ header?.icon }}</v-icon>
          <span class="text-h6 pl-5">
            {{ header?.title }}
          </span>
        </v-col>
        </v-row>
      </v-container>
    </template>
    <v-data-table
      v-if="entity"
      :headers="tableHeader"
      :items="mapToTableRows(entity)"
      hide-default-header
      hide-default-footer
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </v-data-table>
    <slot v-else name="skeleton">
      <v-container height="468px" class="d-flex justify-center align-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="60"
          width="6"
        />
      </v-container>
    </slot>
  </Card>
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import type { DataTableHeader } from 'vuetify';

import Card from '@/components/common/Card.vue';

const props = defineProps<{
  api?: {
    dataHandler: Function;
    req: Object;
  }
  data?: Object;
  header: {
    title: string;
    icon: string;
  }
}>();

const emit = defineEmits<{
  (e: 'selected', entity: any): void
}>();

const selected = (entity: any) => {
  emit('selected', entity);
}

const entity = ref({});
const isLoading = ref(false)

const mapToTableRows = (item: Record<string, any>) => {
  return Object.entries(item).map(([key, value]) => ({
    field: key,
    value: value,
  }));
};

const tableHeader: readonly DataTableHeader[] = [
  { key: 'field', title: '항목', align: 'start' },
  { key: 'value', title: '값', align: 'end' },
];

const loadData = async (req: Object, dataHandler: Function) => {
  isLoading.value = true;
  entity.value = await dataHandler(req).then((res: any) =>{
    if (res) {
      isLoading.value = false;
      return res;
    }
  });
}

onMounted(() => {
  if (props.api?.req ) {
    loadData(props.api.req, props.api.dataHandler);
  }

  if (props.data)  {
    isLoading.value = false;
    entity.value = props.data; 
  };
});

watch(() => props.api?.req, () => {
  if (props.api?.req) { 
    loadData(props.api.req, props.api.dataHandler);
  }
});

watch(() => props.data, () => {
  if (props.data) { 
    isLoading.value = false;
    entity.value = props.data;
  } else {
    isLoading.value = true;
  }
});
</script>

<template>
  <v-row v-if="!isEmptyList">
    <v-col
      v-for="(data, index) in datas"
      :key="index"
      cols="12"
      sm="12"
      md="6"
      xl="4"
    >
      <DataCard
        :header="{title: data.name, icon: header.icon}"
        :data="data"
        @selected="selected(data)"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </DataCard>
    </v-col>
  </v-row>
  <v-row v-if="!isEmptyList">
    <v-col>
      <Card>
        <v-row align="center">
          <v-col align="center">
            <v-spacer class="ma-15" />
            정보를 불러올 수 없습니다.
            <v-spacer class="ma-15" />
          </v-col>
        </v-row>
      </Card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import Card from '@/components/common/Card.vue';
import DataCard from '@/components/common/DataCard.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  api: {
    dataHandler: Function;
    req?: Object;
  },
  header: {
    titleKey: string;
    icon: string;
  }
}>();

const emit = defineEmits<{
  (e: 'selected', item: any): void
  (e: 'isEmpty', item: boolean): void
}>()

const selected = (item: any) => {
  emit('selected', item);
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const isEmptyList = ref(false);

const datas = ref();

const loadData = async (req: Object | null, dataHandler: Function) => {
  datas.value = await dataHandler(req).then((res: any) => {
    if (!res || res.length === 0) {
      isEmpty(false);
    } else {
      isEmpty(true);
      return res;
    }
  });
};

onMounted(() => {
  loadData(props.api.req ?? null, props.api.dataHandler);
});

watch(() => props.api?.req, () => {
  if (props.api?.req) { 
    loadData(props.api.req, props.api.dataHandler);
  }
});

</script>

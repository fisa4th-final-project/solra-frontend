<template>
  <SideContents
    v-if="detail?.enable"
    v-model="isItemDetailOpen"
    ref="$clickedItem"
  >
    <template v-slot:title>
      <slot name="detailTitle" />
    </template>
    <slot name="detail" />
  </SideContents>
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
        :header="{title: data[header.titleKey], icon: header.icon}"
        :data="data"
        @selected="selected(data)"
        @click="onClickItem"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </DataCard>
    </v-col>
  </v-row>
  <v-row v-else>
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
import SideContents from '@/components/layout/SideContents.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  api: {
    dataHandler: Function;
    req?: Object;
  },
  header: {
    titleKey: string;
    icon: string;
  },
  detail?: {
    enable: boolean;
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
  isEmptyList.value = item;
  emit('isEmpty', item);
}

const isEmptyList = ref(true);

const isItemDetailOpen = ref();

const datas = ref();

const loadData = async () => {
  if (isItemDetailOpen.value) isItemDetailOpen.value = false;

  const res = await props.api.dataHandler(props.api.req ?? null);
  if (!res || res.length === 0) {
    isEmpty(true);
  } else {
    datas.value = res;
    isEmpty(false);
  }
};

const $clickedItem = ref();

const onClickItem = () => {
  isItemDetailOpen.value = true;
}

onMounted(() => {
  loadData();
});

watch(() => props.api?.req, () => {
  if (props.api?.req) { 
    loadData();
  }
});

defineExpose({
  loadData
});

</script>

<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-apps'}"
    :detail="{enable:true}"
    @selected="selected"
    @is-empty="isEmpty"
  >
    <template v-slot:detailTitle>
      <v-row justify="space-between" align="center">
        <v-col>
          {{ selectedItem.name }}
        </v-col>
        <v-col align="end">
          <UpdateWorkload
            :cluster="{clusterId: req.clusterId}"
            :ns="{name: req.nsName}"
            :svc="selectedItem.service ? {name: selectedItem.service.name} : undefined"
            :deploy="selectedItem.deploy ? {name: selectedItem.deploy.name} : undefined"
          >
            <template v-slot:activator="{props}">
              <v-btn 
                v-bind="props"
                color="primary"
                variant="plain"
              >
                Edit
              </v-btn>
            </template>
          </UpdateWorkload>
        </v-col>
      </v-row>
    </template>
    <template v-slot:detail>
      <DataCard 
        :data="selectedItem.service" 
        :header="{
          icon: 'mdi-lan', 
          title: 'SVC'
        }
      ">
      </DataCard>
      <v-spacer class="my-5"/>
      <DataCard 
        :data="selectedItem.deploy" 
        :header="{
          icon: 'mdi-hexagon-multiple-outline', 
          title: 'DEPLOY'
        }
      ">
      </DataCard>
    </template>
    <template v-slot:item="{ item }">
      <tr v-if="item.field === 'service' || item.field === 'deploy'">
        <th>
          {{ item.field }}
        </th>
        <td>
          <v-container class="px-0" v-for="(it, key) in item.value" >
            <v-row  no-gutters >
              <v-col cols="2" lg="4" sm="3">
                {{ key }}
              </v-col>
              <v-col class="text-right">
                {{ it }}\
              </v-col>
            </v-row>
          </v-container>
        </td>
      </tr>
      <tr v-else>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCardList>
</template>

<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import type { GetPodListRequestParam, GetPodListResponseDto } from '@/lib/api/pod/podDto';
import { buildWorkloadStructure } from '@/lib/global/workloadBuilder';
import { ref } from 'vue';
import DataCard from '@/components/common/DataCard.vue';
import UpdateWorkload from '@/components/data/UpdateWorkload.vue';
import { apiHandler } from '@/lib/global/apiManager';

defineProps<{
  req: GetPodListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetPodListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>();

const selected = (item: GetPodListResponseDto) => {
  selectedItem.value = item;
  emit('selected', item);
}
const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const selectedItem = ref();

const dataHandler = async (req: GetPodListRequestParam) => {
  // const podList = await getPodListApi(req);
  const svcList = await apiHandler.getSvcListApi(req);
  const deployList = await apiHandler.getDeployListApi(req);

  return buildWorkloadStructure({
    svcList: svcList, deployList: deployList
  });
};

</script>

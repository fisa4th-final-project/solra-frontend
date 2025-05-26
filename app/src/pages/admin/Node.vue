<template>
  <v-container v-if="clusterList.length"> <!-- TODO: 클러스터 별 Node 리스트 출력 -->
    <v-row  v-for="(cluster, i) in clusterList" :key="i">
      <v-col>
        <v-row justify="space-between" align="center" class="px-3">
            <span class="text-h5 text-uppercase pa-0">
              {{ cluster.name }}
            </span>
            <v-col>
              <v-row v-if="!isEmptyList[cluster.clusterId]">
                <v-col>
                  <v-progress-linear 
                    height="1"
                    indeterminate
                  />
                </v-col>
              </v-row>
              <v-divider/>
            </v-col>
            
            <v-icon> <!-- TODO: cluster 정보 조회 기능 추가 -->
              mdi-information-outline
            </v-icon>   
          </v-row>
        <GetNodeList 
          :req="{clusterId: cluster.clusterId}"
          @selected="select"
          @is-empty="(empty) => isEmpty(cluster.clusterId, empty)"
        />
        <v-spacer v-if="i + 1 < clusterList.length" class="ma-15" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else  height="100%" class="d-flex justify-center align-center">
    <v-progress-circular
    :width="3"
    size="50"
    color="primary"
    indeterminate
    />
  </v-container>
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import GetNodeList from '@/components/data/GetNodeList.vue';
import { getClustersApi } from '@/lib/api/cluster/getClustersApi';
import type { GetClustersResponseDto } from '@/lib/api/cluster/clusterDto';
import type { GetNodeDetailResponseDto } from '@/lib/api/node/nodeDto';
import Card from '@/components/common/Card.vue';

const clusterList = ref<GetClustersResponseDto[]>([]);
const selectedNode = ref<GetNodeDetailResponseDto>();
const isEmptyList = ref<Record<number, boolean>>({});


const select = (item: GetNodeDetailResponseDto) => {
  selectedNode.value = item;
}
const isEmpty = (clusterId: number, empty: boolean) => {
  isEmptyList.value[clusterId] = empty;
}

onMounted(async() => {
  await getClustersApi().then((res) => {
    if (res) clusterList.value = res;
  });
});

</script>
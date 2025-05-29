<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          노드
        </span>
      </v-col>
    </v-row>
    <v-row v-if="clusterList.length" v-for="(cluster, i) in clusterList" :key="i">
      <v-col>
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            {{ cluster.name }}
          </span>
          <v-col>
            <v-row v-if="isEmptyList[cluster.clusterId]">
              <v-col>
                <v-progress-linear 
                  height="1"
                  indeterminate
                />
              </v-col>
            </v-row>
            <v-divider/>
          </v-col>
          
          <v-icon @click="openClusterDetail(cluster)">
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
    <v-container v-else  height="100%" class="d-flex justify-center align-center">
      <v-progress-circular
      :width="3"
      size="50"
      color="primary"
      indeterminate
      />
    </v-container>
  </v-container>
  <SideContents v-model="isClusterDetailOpen">
    <template v-slot:title>
      <v-row justify="space-between" align="center">
        <v-col>
          클러스터 상세
        </v-col>
        <v-col align="end">
          <UpdateCluster
            v-if="selectedCluster"
            :clusterId="selectedCluster.clusterId"
          >
            <template v-slot:activator="{props}">
              {{ console.log(selectedCluster.clusterId) }}
              {{ console.log(props) }}
              <v-btn 
                v-bind="props"
                color="primary"
                variant="plain"
              >
                Edit
              </v-btn>
            </template>
          </UpdateCluster>
        </v-col>
      </v-row>
    </template>
    <GetClusterDetail  v-if="selectedCluster" :title="selectedCluster.name" :req="{clusterId: selectedCluster.clusterId}" />
  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import GetNodeList from '@/components/data/GetNodeList.vue';
import { getClusterListApi } from '@/lib/api/cluster/getClusterListApi';
import type { GetClusterListResponseDto } from '@/lib/api/cluster/clusterDto';
import type { GetNodeDetailResponseDto } from '@/lib/api/node/nodeDto';
import SideContents from '@/components/layout/SideContents.vue';
import GetClusterDetail from '@/components/data/GetClusterDetail.vue';
import UpdateCluster from '@/components/data/UpdateCluster.vue';

const clusterList = ref<GetClusterListResponseDto[]>([]);
const selectedNode = ref<GetNodeDetailResponseDto>();
const isEmptyList = ref<Record<number, boolean>>({});

const selectedCluster = ref();

const isClusterDetailOpen = ref(false);

const select = (item: GetNodeDetailResponseDto) => {
  selectedNode.value = item;
}
const isEmpty = (clusterId: number, empty: boolean) => {
  isEmptyList.value[clusterId] = empty;
}

const openClusterDetail = (cluster: any) => {
  selectedCluster.value = cluster;
  console.log(selectedCluster.value);
  isClusterDetailOpen.value = true;
}

onMounted(async() => {
  await getClusterListApi().then((res) => {
    if (res) clusterList.value = res;
  });
});

</script>
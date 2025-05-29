<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          클러스터
        </span>
      </v-col>
      <v-col align="end">
        <CreateCluster>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :ripple="false"
              variant="plain"
              color="primary"
            >
              Add
            </v-btn>
          </template>
        </CreateCluster>
      </v-col>
    </v-row>
    <v-row v-if="orgList.length" v-for="(org, i) in orgList" :key="i">
      <v-col>
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            {{ org.orgName }}
          </span>
          <v-col>
            <v-row v-if="isEmptyList[org.orgId]">
              <v-col>
                <v-progress-linear
                  height="1"
                  indeterminate
                />
              </v-col>
            </v-row>
            <v-divider/>
          </v-col>

          <v-icon> <!-- TODO: org 정보 조회 기능 추가 -->
            mdi-information-outline
          </v-icon>
        </v-row>
        <GetClusterList 
          :req="{orgId: org.orgId}"
          @selected="select"
          @is-empty="(empty) => isEmpty(org.orgId, empty)"
        />
        <v-spacer v-if="i + 1 < orgList.length" class="ma-15" />
      </v-col>
    </v-row>
    <v-container v-else height="100%" class="d-flex justify-center align-center">
      <v-progress-circular 
        :width="3"
        size="50"
        color="primary"
        indeterminate
      />
    </v-container>
  </v-container>
</template>
<script lang="ts" setup>

import CreateCluster from '@/components/data/CreateCluster.vue';
import GetClusterList from '@/components/data/GetClusterList.vue';
import type { GetClusterDetailResponseDto } from '@/lib/api/cluster/clusterDto';
import { getOrgListApi } from '@/lib/api/org/getOrgListApi';
import type { GetOrgListResponseDto } from '@/lib/api/org/orgDto';
import { onMounted, ref } from 'vue';

const orgList = ref<GetOrgListResponseDto[]>([]);
const selectedCluster = ref<GetClusterDetailResponseDto>();
const isEmptyList = ref<Record<number,boolean>>({});

const select = (item: GetClusterDetailResponseDto) => {
  selectedCluster.value = item;
}
const isEmpty = (orgId: number, empty: boolean) => {
  isEmptyList.value[orgId] = empty;
}

onMounted(async () => {
  await getOrgListApi().then((res) => {
    if (res) orgList.value = res;
  });
});

</script>
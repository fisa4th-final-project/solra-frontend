<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          클러스터
        </span>
      </v-col>
      <v-col align="end">
        <CreateCluster :onUpdate="loadCluster">
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

          <v-btn flat variant="plain" icon="mdi-refresh" @click="loadCluster(org.orgId)"/>

        </v-row>
        <GetClusterList 
          :req="{orgId: org.orgId}"
          @selected="select"
          @is-empty="(empty) => isEmpty(org.orgId, empty)"
          :onUpdate="loadCluster"
          :ref="(el) => getclusterListRef(el, org.orgId)"
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
import type { GetOrgListResponseDto } from '@/lib/api/org/orgDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';

const auth = useAuthStore();

const orgList = ref<GetOrgListResponseDto[]>([]);
const selectedCluster = ref<GetClusterDetailResponseDto>();
const isEmptyList = ref<Record<number,boolean>>({});
const $getClusterList = ref<Record<number, InstanceType<typeof GetClusterList> | null>>({});

const select = (item: GetClusterDetailResponseDto) => {
  selectedCluster.value = item;
}
const isEmpty = (orgId: number, empty: boolean) => {
  isEmptyList.value[orgId] = empty;
}

const loadData = async () => {
  const res = await apiHandler.getOrgListApi().catch( async () => {
    await apiHandler.getOrgDetailApi({
      orgId: auth.getMe.auth.orgId
    }).then((org) => {
      if (org) orgList.value.push(org);
    });
  }); 
  if (res) return orgList.value = res;
}

const getclusterListRef = (el: any, orgId: number) => {
  $getClusterList.value[orgId] = el;
}

const loadCluster = (orgId: number) => {
  $getClusterList?.value?.[orgId]?.loadData();
}

onMounted(() => {
  loadData();
});

</script>
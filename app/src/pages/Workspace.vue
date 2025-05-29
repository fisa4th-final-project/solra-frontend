<template>
  <v-container height="100%">
    <v-row>
      <v-col cols="12">
        <span class="text-h5">부서 정보</span>
      </v-col>
      <v-col lg="4" md="12" sm="12">
        <GetDeptDetail title="소속 부서" :req="deptReq" />
      </v-col>
      <v-col lg="8" md="12" sm="12">
        <GetUserList :req="userReq" />
      </v-col>
    </v-row>
    <v-divider class="my-16"></v-divider>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12">
          <span class="text-h4">리소스</span>
        </v-col>
        <v-col cols="6">
          <SelectClusterList :form="form" />
        </v-col>
        <v-col cols="6">
          <SelectNSList :form="form" />
        </v-col>
      </v-row>
    </v-form>

    

    <v-row v-if="valid" class="ga-10">
      <v-col cols="12">
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            pod
          </span>
          <v-col>
            <v-row v-if="isEmptyList['pod']">
              <v-col>
                <v-progress-linear 
                  height="1"
                  indeterminate
                />
              </v-col>
            </v-row>
            <v-divider/>
          </v-col>
          
          <v-icon> <!-- TODO: 새로고침 기능 추가 -->
            mdi-refresh
          </v-icon>   
        </v-row>
        <GetPodList 
          :req="{clusterId: form.cluster.clusterId, nsName: form.ns.name}"
          @is-empty="(empty) => isEmpty('pod', empty)"
        />
      </v-col>
      <v-col cols="12">
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            SVC
          </span>
          <v-col>
            <v-row v-if="isEmptyList['deploy']">
              <v-col>
                <v-progress-linear 
                  height="1"
                  indeterminate
                />
              </v-col>
            </v-row>
            <v-divider/>
          </v-col>
          <v-icon> <!-- TODO: 새로고침 기능 추가 -->
            mdi-refresh
          </v-icon>   
        </v-row>
        <GetDeployList 
          :req="{clusterId: form.cluster.clusterId, nsName: form.ns.name}"
          @is-empty="(empty) => isEmpty('deploy', empty)"
        />
      </v-col>
      <v-col cols="12">
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            Deploy
          </span>
          <v-col>
            <v-row v-if="isEmptyList['svc']">
              <v-col>
                <v-progress-linear 
                  height="1"
                  indeterminate
                />
              </v-col>
            </v-row>
            <v-divider/>
          </v-col> 
          <v-icon> <!-- TODO: 새로고침 기능 추가 -->
            mdi-refresh
          </v-icon>   
        </v-row>
        <GetSvcList 
          :req="{clusterId: form.cluster.clusterId, nsName: form.ns.name}"
          @is-empty="(empty) => isEmpty('svc', empty)"
        />
      </v-col>

      
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>

import GetDeployList from '@/components/data/GetDeployList.vue';
import GetDeptDetail from '@/components/data/GetDeptDetail.vue';
import GetPodList from '@/components/data/GetPodList.vue';
import GetSvcList from '@/components/data/GetSvcList.vue';
import GetUserList from '@/components/data/GetUserList.vue';
import SelectClusterList from '@/components/data/SelectClusterList.vue';
import SelectNSList from '@/components/data/SelectNSList.vue';
import type { GetDeptDetailRequestParam } from '@/lib/api/dept/deptDto';
import type { GetUserListQueryParam } from '@/lib/api/user/userDto';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref, watch } from 'vue';

const auth = useAuthStore();

const valid = ref(false);

const deptReq = ref<GetDeptDetailRequestParam>({} as GetDeptDetailRequestParam);

const userReq = ref<GetUserListQueryParam>({} as GetUserListQueryParam);

const form = ref<{
  cluster: {
    clusterId: number;
    name: string;
  },
  ns: {
    name: string;
  }
}>({
  cluster: {
    clusterId: 0,
    name: ''
  },
  ns: {
    name: ''
  }
})

const isEmptyList = ref<Record<string, boolean>>({});

const isEmpty = (type: string, empty: boolean) => {
  isEmptyList.value[type] = empty;
}

onMounted(() => {
  deptReq.value.deptId = auth.getMe.auth.deptId;
  userReq.value.deptId = auth.getMe.auth.deptId;
  console.log(valid);
});

watch(() => auth.getMe, () => {
  deptReq.value.deptId = auth.getMe.auth.deptId;
  userReq.value.deptId = auth.getMe.auth.deptId;
});

</script>
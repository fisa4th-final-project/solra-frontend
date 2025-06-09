<template>
  <v-container height="100%">
    <v-row>
      <v-col cols="12">
        <span class="text-h5">부서 정보</span>
      </v-col>
      <v-col lg="4" md="12" sm="12">
        <GetDeptDetail title="소속 부서" />
      </v-col>
      <v-col lg="8" md="12" sm="12">
        <GetUserList :req="userReq" :is-in-workspace="true"/>
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
            POD
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
          
          <v-btn flat variant="plain" icon="mdi-refresh" @click="$getPodList?.loadData()"/>
        </v-row>
        <GetPodList 
          :req="{clusterId: form.cluster.clusterId, nsName: form.ns.name}"
          @is-empty="(empty) => isEmpty('pod', empty)"
          ref="$getPodList"
        />
      </v-col>
      <v-col cols="12">
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            DEPLOY
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
          <v-btn flat variant="plain" icon="mdi-refresh" @click="$getDeployList?.loadData()"/>
        </v-row>
        <GetDeployList 
          :req="{clusterId: form.cluster.clusterId, nsName: form.ns.name}"
          @is-empty="(empty) => isEmpty('deploy', empty)"
          ref="$getDeployList"
        />
      </v-col>
      <v-col cols="12">
        <v-row justify="space-between" align="center" class="px-3">
          <span class="text-h5 text-uppercase pa-0">
            SVC
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
          <v-btn flat variant="plain" icon="mdi-refresh" @click="$getSvcList?.loadData()"/>
        </v-row>
        <GetSvcList 
          :req="{clusterId: form.cluster.clusterId, nsName: form.ns.name}"
          @is-empty="(empty) => isEmpty('svc', empty)"
          ref="$getSvcList"
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
import type { GetUserListQueryParam } from '@/lib/api/user/userDto';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref, watch } from 'vue';

const auth = useAuthStore();

const valid = ref(false);

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

const $getPodList = ref();
const $getSvcList = ref();
const $getDeployList = ref();

const isEmpty = (type: string, empty: boolean) => {
  isEmptyList.value[type] = empty;
}

onMounted(() => {
  userReq.value.deptName = auth.getMe.user.deptName;
});

watch(() => auth.getMe, () => {
  userReq.value.deptName = auth.getMe.user.deptName;
});

</script>
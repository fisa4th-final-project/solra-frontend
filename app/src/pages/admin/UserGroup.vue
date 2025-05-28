<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          사용자 그룹
        </span>
      </v-col>
      <v-col align="end">
        <CreateUserGroup>
          <template v-slot:activator="{props}">
            <v-btn 
              v-bind="props"
              color="primary"
              variant="plain"
            >
              Add
            </v-btn>
          </template>
        </CreateUserGroup>
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
          
          <v-icon @click="openOrgDetail(org)">
            mdi-information-outline
          </v-icon>
          
        </v-row>
        <GetDeptList 
          :req="{org_id: org.orgId}"
          @selected="select"
          @is-empty="(empty) => isEmpty(org.orgId, empty)"
        />
        <v-spacer v-if="i + 1 < orgList.length" class="ma-15" />
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
  <SideContents v-model="isOrgDetailOpen">
    <template v-slot:title>
      <v-row justify="space-between" align="center">
        <v-col>
          조직 상세
        </v-col>
        <v-col align="end">
          <UpdateOrg
            v-if="selectedOrg"
            :org-id="selectedOrg.orgId"
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
          </UpdateOrg>
        </v-col>
      </v-row>
    </template>
    <GetOrgDetail  v-if="selectedOrg" :title="selectedOrg.orgName" :req="{orgId: selectedOrg.orgId}" />
  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import type { GetOrgsResponseDto } from '@/lib/api/org/orgDto';
import { getOrgsApi } from '@/lib/api/org/getOrgsApi';
import GetDeptList from '@/components/data/GetDeptList.vue';
import type { GetDeptDetailResponseDto } from '@/lib/api/dept/deptDto';
import SideContents from '@/components/layout/SideContents.vue';
import UpdateOrg from '@/components/data/UpdateOrg.vue';
import GetOrgDetail from '@/components/data/GetOrgDetail.vue';
import CreateUserGroup from '@/components/data/CreateUserGroup.vue';

const orgList = ref<GetOrgsResponseDto[]>([]);
const selectedDept = ref<GetDeptDetailResponseDto>();
const isEmptyList = ref<Record<number, boolean>>({});

const selectedOrg = ref();

const isOrgDetailOpen = ref(false);

const select = (item: GetDeptDetailResponseDto) => {
  selectedDept.value = item;
}
const isEmpty = (deptId: number, empty: boolean) => {
  isEmptyList.value[deptId] = empty;
}

const openOrgDetail = (org: any) => {
  selectedOrg.value = org;
  console.log(selectedOrg.value);
  isOrgDetailOpen.value = true;
}
onMounted(async () => {
  const res = await getOrgsApi();
  if (res) orgList.value = res;
});

</script>

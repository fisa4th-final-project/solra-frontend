<template>
  <v-row>
    <v-col>
      <DataCard
        :header="{title, icon: 'mdi-account'}"
        :api="{req, dataHandler}"
        v-if="auth.hasPerm('USER_READ')"
        ref="$getUserDetail"
      >  
        <template v-slot:item="{ item }">
          <tr v-if="!enableField.includes(item.field)">
            <th style="white-space: nowrap;">{{ item.field }}</th>
            <td class="text-right pt-2" v-if="item.field === '권한목록'">
              <v-chip v-for="perm in item.value" :color="permChipColor(perm)" variant="outlined" size="small" class="mt-1 ml-1">
                {{ perm }}
              </v-chip>
            </td>
            <td class="text-right" v-else>{{ item.value }}</td>
          </tr>
        </template>
      </DataCard>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="mt-5">
      <v-row justify="space-between" align="center" class="px-3">
        <span class="text-h6 text-uppercase pa-0">
          역할 목록
        </span>
        <v-col>
          <v-row v-if="isEmptyUserRole">
            <v-col>
              <v-progress-linear
                height="1"
                indeterminate
              />
            </v-col>
          </v-row>
          <v-divider/>
        </v-col>

        <CreateUserRole :user-id="req.userId" :onUpdate="updateCallback">
          <template v-slot:activator="{props}">
            <v-btn 
              v-bind="props"
              color="primary"
              variant="plain"
            >
              Add
            </v-btn>
          </template>
        </CreateUserRole>
      </v-row>
      <GetUserRoleList 
        :req="{userId: req.userId}"
        @is-empty="(i) => isEmptyUserRole = i" 
        ref="$getUserRoleList"
      />
  </v-col>
  </v-row>
</template>
<script lang="ts" setup>

import DataCard from '@/components/common/DataCard.vue';
import CreateUserRole from '@/components/data/CreateUserRole.vue';
import GetUserRoleList from '@/components/data/GetUserRoleList.vue';
import type { GetUserDetailQueryParam } from '@/lib/api/user/userDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const auth = useAuthStore();

defineProps<{
  title: string;
  req: GetUserDetailQueryParam;
}>();

const dataHandler = async (req: GetUserDetailQueryParam) => {
  return await apiHandler.getUserDetailApi(req);
};

const isEmptyUserRole = ref(true);

const $getUserDetail = ref();
const $getUserRoleList = ref();

const updateCallback = () => {
  if (!$getUserDetail) return;
  $getUserDetail.value.loadData();
  $getUserRoleList.value.loadData();
}
const enableField = [
  'userId',
  'departmentId',
  'organizationId'
]
const permChipColor = (perm: string): string => {
  const entity = perm.split('_')[0];
  let color = '';

  switch (entity) {
    case 'USER':
      color = 'indigo'
      break;
    case 'ORG':
      color = 'deep-purple'
      break
    case 'DEPT':
      color = 'pink'
      break
    case 'ROLE':
      color = 'purple'
      break
    case 'PERM':
      color = 'blue'
      break
    case 'CLUSTER':
      color = 'green'
      break
    case 'NAMESPACE':
      color = 'lime'
      break
    case 'DEPLOYMENT':
      color = 'amber'
      break
    case 'SERVICE':
      color = 'brown'
      break
    case 'POD':
      color = 'teal'
      break
    case 'NODE':
      color = 'light-green'
      break
  }

  return color;
}

</script>

<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          역할 및 권한
        </span>
      </v-col>
      <v-col align="end">
        <CreateRole>
          <template v-slot:activator="{props}">
            <v-btn 
              v-bind="props"
              color="primary"
              variant="plain"
            >
              Add
            </v-btn>
          </template>
        </CreateRole>
      </v-col>
    </v-row>
    <v-row v-if="roleList.length">
      <v-col>
        <GetRoleList 
          @selected="select"
        />
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
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import GetRoleList from '@/components/data/GetRoleList.vue';
import { getRolesApi } from '@/lib/api/role/getRolesApi';
import type { GetRolesResponseDto } from '@/lib/api/role/roleDto';
import type { GetPermDetailResponseDto } from '@/lib/api/perm/permDto';
import CreateRole from '@/components/data/CreateRole.vue';

const roleList = ref<GetRolesResponseDto[]>([]);
const selectedPerm = ref<GetPermDetailResponseDto & {roleId: number, roleName: string}>();

const select = (item: GetPermDetailResponseDto & {roleId: number, roleName: string}) => {
  selectedPerm.value = item;
}

onMounted(async () => {
  const res = await getRolesApi();
  if (res) roleList.value = res;
});

</script>

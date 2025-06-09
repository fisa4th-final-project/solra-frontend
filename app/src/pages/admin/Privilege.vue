<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          역할 및 권한
        </span>
      </v-col>
      <v-col align="end">
        <CreateRole v-if="auth.hasPerm('ROLE_CREATE')" :onUpdate="$getRoleList?.loadRoles">
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
    <v-row>
      <v-col>
        <GetRoleList 
          @selected="select"
          ref="$getRoleList"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>

import { ref } from 'vue';
import GetRoleList from '@/components/data/GetRoleList.vue';
import type { GetPermDetailResponseDto } from '@/lib/api/perm/permDto';
import CreateRole from '@/components/data/CreateRole.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const selectedPerm = ref<GetPermDetailResponseDto & {roleId: number, roleName: string}>();

const select = (item: GetPermDetailResponseDto & {roleId: number, roleName: string}) => {
  selectedPerm.value = item;
}

const $getRoleList = ref();

</script>

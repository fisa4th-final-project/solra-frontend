<template>
  <DataCard
    :api="{req, dataHandler}"
    :header="{title: '사용자 역할', icon: 'mdi-card-account-details'}"
    v-if="auth.hasPerm('ROLE_READ')"
  />
</template>
<script lang="ts" setup>

import type { GetRoleDetailRequestParam, GetRoleListResponseDto } from '@/lib/api/role/roleDto';
import DataCard from '@/components/common/DataCard.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  req: GetRoleDetailRequestParam
}>();

const dataHandler = async (req: GetRoleListResponseDto) => {
  const items = await apiHandler.getRoleDetailApi(req);
  return {'Role Name': items?.roleName, 'Description': items?.description}
}

</script>

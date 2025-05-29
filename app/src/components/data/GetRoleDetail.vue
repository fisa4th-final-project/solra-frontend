<template>
  <DataCard
    :api="{req, dataHandler}"
    :header="{title: '사용자 역할', icon: 'mdi-card-account-details'}"
  />
</template>
<script lang="ts" setup>

import type { GetRoleDetailRequestParam, GetRoleListResponseDto } from '@/lib/api/role/roleDto';
import { getRoleDetailApi } from '@/lib/api/role/getRoleDetailApi';
import DataCard from '@/components/common/DataCard.vue';

  defineProps<{
    req: GetRoleDetailRequestParam
  }>();

  const dataHandler = async (req: GetRoleListResponseDto) => {
    const items = await getRoleDetailApi(req);
    return {'Role Name': items?.roleName, 'Description': items?.description}
  }

</script>

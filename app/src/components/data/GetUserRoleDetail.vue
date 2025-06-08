<template>
  <DataCard
    :data="data"
    :header="{title: data?.roleName ?? '', icon: 'mdi-card-account-details'}"
    v-if="auth.hasPerm('USER_ROLE_READ')"
  />
</template>
<script lang="ts" setup>

import DataCard from '@/components/common/DataCard.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

defineProps<{
  data?: {
    roleName: string;
  }
}>();

</script>

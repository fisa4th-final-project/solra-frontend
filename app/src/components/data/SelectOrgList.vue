<template>
  <v-select
    v-model="form.org"
    :items="orgs"
    variant="underlined"
    label="조직 선택"
    color="primary"
    item-title="orgName"
    item-value="orgId"
    return-object
    v-if="auth.hasPerm('ORG_READ')"
  />
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import type { GetOrgListResponseDto } from '@/lib/api/org/orgDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const orgs = ref<GetOrgListResponseDto[]>();

defineProps<{
  form: {
    org: {
      orgId: number,
      orgName: string
    }
  }
}>();

onMounted(async () => {
  await apiHandler.getOrgListApi().then((resOrgs) => {
    if (!resOrgs) return;
    orgs.value = resOrgs;
  });
});

defineExpose({
  orgs
});

</script>

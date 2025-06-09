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
  <v-select
    v-model="form.org"
    :items="orgs"
    variant="underlined"
    label="조직 선택"
    color="primary"
    item-title="orgName"
    item-value="orgId"
    return-object
    v-else
  />
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import type { GetOrgListResponseDto } from '@/lib/api/org/orgDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const orgs = ref<GetOrgListResponseDto[]>();

const props = defineProps<{
  form: {
    org: {
      orgId: number,
      orgName: string
    }
  }
}>();

onMounted(async () => {
  if (auth.hasPerm('ORG_READ')) {

    await apiHandler.getOrgListApi().then((resOrgs) => {
      if (!resOrgs) return;
      orgs.value = resOrgs;
    });
  } else {
    orgs.value = [{
      orgId: auth.auth.orgId ,
      orgName: auth.user.orgName 
    }]
    props.form.org = {
      orgId: auth.auth.orgId ,
      orgName: auth.user.orgName 
    }
  }
});

defineExpose({
  orgs
});

</script>

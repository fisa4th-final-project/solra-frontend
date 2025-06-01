<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">UpdateOrg</v-btn>
      </slot>
    </template>
    <template v-slot:title>
      <span>
        조직 수정
      </span>
      <v-col align="end">
        <DeleteOrg v-if="org" :org="{orgId: org.orgId, orgName: org.orgName}"/>
      </v-col>
    </template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.orgName"
        :rules="[rules.required]"
        variant="underlined"
        label="수정할 조직 이름"
        color="primary"
        clearable
      />
      <v-btn
        class="mt-4"
        :disabled="!valid"
        type="submit"
        color="primary"
        block
      >
        수정
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import DeleteOrg from '@/components/data/DeleteOrg.vue';
import type { GetOrgDetailResponseDto } from '@/lib/api/org/orgDto';
import { apiHandler } from '@/lib/global/apiManager';

const props = defineProps<{
  orgId: number;
}>();

const valid = ref(false)

const org = ref<GetOrgDetailResponseDto>();

const form = ref({
  orgName: ''
})

const submitForm = () => {
  apiHandler.updateOrgApi({
    orgId: props.orgId,
    orgName: form.value.orgName
  });
}

const getOrgDetail = () => {
  apiHandler.getOrgDetailApi({
    orgId: props.orgId
  }).then((res) => {
    if (!res) return;
    form.value.orgName = res.orgName;
    org.value = res;
  })
}

onMounted(() => {
  if (!props.orgId) return;
  getOrgDetail();
});

watch(() => props.orgId, () => {
  getOrgDetail();
});

</script>

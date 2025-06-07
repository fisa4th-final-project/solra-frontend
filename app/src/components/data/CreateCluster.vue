<template>
  <SideContents v-if="auth.hasPerm('CLUSTER_CREATE')">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">createCluster</v-btn>
      </slot>
    </template>
    <template v-slot:title>클러스터 등록</template> 
    <v-form v-model="valid" @submit.prevent="submitForm">

      <SelectOrgList :form="form"/>

      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 이름"
        color="primary"
        clearable
        data-test="input-name"
      />
      <v-text-field
        v-model="form.env"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 목적 (dev, prod 등)"
        color="primary"
        clearable
        data-test="input-env"
      />
      <v-text-field
        v-model="form.endpoints"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 API 서버 엔드포인트"
        color="primary"
        clearable
        data-test="input-endpoints"
      />
      <v-text-field
        v-model="form.caCert"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 ca.cert"
        color="primary"
        clearable
        data-test="input-cacert"
      />
      <v-text-field
        v-model="form.saToken"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 서비스 어카운트 oAuth Token"
        color="primary"
        clearable
        data-test="input-satoken"
      />
      
      <v-btn
        :disabled="!valid"
        class="mt-4"
        type="submit"
        color="primary"
        alignself="end"
        block
      >
        등록
      </v-btn>
    </v-form>
  </SideContents>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import SideContents from '@/components/layout/SideContents.vue';
import SelectOrgList from '@/components/data/SelectOrgList.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { rules } from '@/lib/global/inputRules';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const valid = ref(false)

interface ClusterRef {
  org: {
    orgId: number;
    orgName: string;
  }
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  endpoints: string;
}

const form = ref<ClusterRef>({} as ClusterRef);

const submitForm = () => {
  apiHandler.createClusterApi({
    orgId: form.value.org.orgId,
    name: form.value.name,
    env: form.value.env,
    caCert: btoa(form.value.caCert),
    saToken: btoa(form.value.saToken),
    apiServerUrl:form.value.endpoints
  });
}

defineExpose({ form, valid });
</script>

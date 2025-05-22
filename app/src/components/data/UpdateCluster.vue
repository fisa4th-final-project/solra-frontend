<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdateCluster</v-btn>
      </slot>
    </template>
    <template v-slot:title>클러스터 정보 수정</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 이름"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.env"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 환경"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.apiServerUrl"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 API 서버 엔드포인트"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.caCert"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 ca.cert"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.saToken"
        :rules="[rules.required]"
        variant="underlined"
        label="클러스터 서비스 어카운트 oAuth"
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
import { getClusterDetailApi } from '@/lib/api/cluster/getClusterDetailApi';
import { updateClusterApi } from '@/lib/api/cluster/updateClusterApi';

const props = defineProps<{
  clusterId: number;
}>();

const valid = ref(false)

interface Form {
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
}
const form = ref<Form>({} as Form);

const submitForm = () => {
  updateClusterApi({
    clusterId: props.clusterId,
    name: form.value.name,
    env: form.value.env,
    caCert: form.value.caCert,
    saToken: form.value.saToken,
    apiServerUrl: form.value.apiServerUrl
  });
}

const getClusterDetail = () => {
  getClusterDetailApi({
    clusterId: props.clusterId
  }).then((res) => {
    if (!res) return;
    form.value = {
      name: res.name,
      env: res.env,
      caCert: res.caCert,
      saToken: res.saToken,
      apiServerUrl: res.apiServerUrl
    };
  })
}

onMounted(() => {
  if (!props.clusterId) return;
  getClusterDetail();
});

watch(() => props.clusterId, () => {
  getClusterDetail();
});

</script>

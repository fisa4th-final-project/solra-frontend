<template>
  <v-text-field
    v-model="form.name"
    :rules="[rules.required]"
    variant="underlined"
    label="디플로이먼트 이름"
    color="primary"
    clearable
  />
  <v-text-field
    v-model="form.appName"
    :rules="[rules.required]"
    variant="underlined"
    label="컨테이너 이름"
    color="primary"
    clearable
  />
  <v-text-field
    v-model="form.image"
    :rules="[rules.required]"
    variant="underlined"
    label="컨테이너 적용 이미지"
    color="primary"
    clearable
  />
  <v-text-field
    v-model="form.port"
    :rules="[rules.required]"
    variant="underlined"
    label="컨테이너 포트"
    color="primary"
    clearable
  />
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import { rules } from '@/lib/global/inputRules';
import { createDeployApi } from '@/lib/api/deploy/createDeployApi';

const props = defineProps<{
  clusterId: number;
  nsName: string; 
}>()
const form = ref({
  cluster: {
    clusterId: 0,
    name: ''
  },
  ns: {
    name: ''
  },
  name: '',
  appName: '',
  image: '',
  port: 0,
});

const submitDeploy = () => {
  createDeployApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    name: form.value.name,
    labels: {
      app: form.value.appName
    },
    container: {
      name: form.value.appName,
      image: form.value.image,
      port: form.value.port
    }
  });
}

defineExpose({
  submitDeploy
})
</script>

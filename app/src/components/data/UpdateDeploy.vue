<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdateDeploy</v-btn>
      </slot>
    </template>
    <template v-slot:title>디플로이먼트 수정</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.replicas"
        :rules="[rules.required]"
        variant="underlined"
        label="Replica Set"
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
import { updateDeployApi } from '@/lib/api/deploy/updateDeployApi';
import { getDeployDetailApi } from '@/lib/api/deploy/getDeployDetail.Api';

const props = defineProps<{
  clusterId: number;
  nsName: string;
  name: string;
}>();

const valid = ref(false);

interface Form {
  replicas: number;
}

const form = ref<Form>({} as Form);

const submitForm = () => {
  updateDeployApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    name: props.name,
    replicas: form.value.replicas
  });
}

const getNSDetail = () => {
  getDeployDetailApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    deployName: props.name
  }).then((res) => {
    if (res) form.value = {
      replicas: res.replicas
    }
  });
}

onMounted(() => {
  if (props.clusterId && props.nsName && props.name) getNSDetail();
});

watch(() => [props.clusterId, props.nsName, props.name], () => {
  getNSDetail();
});

</script>

<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createDeployment</v-btn>
      </slot>
    </template>
    <template v-slot:title>디플로이먼트 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-row>
        <v-col>
          <SelectClusterList :form="form" />
        </v-col>
        <v-col>
          <SelectNSList :form="form" />
        </v-col>
      </v-row>
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
      
      <v-btn
        :disabled="!valid"
        class="mt-4"
        type="submit"
        color="primary"
        block
      >
        등록
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import { rules } from '@/lib/global/inputRules';
import SideContents from '@/components/layout/SideContents.vue';
import { createDeployApi } from '@/lib/api/deploy/createDeployApi';
import SelectClusterList from '@/components/data/SelectClusterList.vue';
import SelectNSList from '@/components/data/SelectNSList.vue';

const valid = ref(false);

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

const submitForm = () => {
  createDeployApi({
    clusterId: form.value.cluster.clusterId,
    nsName: form.value.ns.name,
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

</script>

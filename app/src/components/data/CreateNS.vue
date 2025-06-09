<template>
  <SideContents v-if="auth.hasPerm('NAMESPACE_CREATE')">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">createNS</v-btn>
      </slot>
    </template>
    <template v-slot:title>네임스페이스 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <SelectClusterList :form="form"/>
      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        variant="underlined"
        label="네임스페이스 이름"
        color="primary"
        clearable
        data-test="input-namespace-name"
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
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import SelectClusterList from '@/components/data/SelectClusterList.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const valid = ref(false);

const form = ref({
  name: '',
  cluster: {
    clusterId: 0,
    name: ''
  }
});

const submitForm = async () => {
  await apiHandler.createNSApi({
    clusterId: form.value.cluster.clusterId,
    name: form.value.name
  });
}

defineExpose({
  form, valid
});

</script>

<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createPerm</v-btn>
      </slot>
    </template>
    <template v-slot:title>권한 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.permissionName"
        :rules="[rules.required]"
        variant="underlined"
        label="생성할 권한 이름"
        color="primary"
        clearable
        data-test="input-perm-name"
        />
        <v-text-field
        v-model="form.description"
        variant="underlined"
        label="권한 설명"
        color="primary"
        clearable
        data-test="input-perm-desc"
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
import { apiHandler } from '@/lib/global/apiManager';

const valid = ref(false);

const form = ref({
  permissionName: '',
  description: ''
});

const submitForm = async () => {
  await apiHandler.createPermApi({
    permissionName: form.value.permissionName,
    description: form.value.description
  });
}

defineExpose({
  form, valid
})
</script>

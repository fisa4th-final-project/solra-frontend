<template>
  <v-form v-model="valid" @submit.prevent="submitForm">
    <v-text-field
      v-model="form.description"
      :rules="[rules.required]"
      variant="underlined"
      label="역할 설명"
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
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';

const props = defineProps<{
  roleId: number;
}>();

const valid = ref(false)

const form = ref({
  description: ''
})

const submitForm = () => {
  apiHandler.updateRoleApi({
    roleId: props.roleId,
    description: form.value.description
  });
}

const getRoleDetail = () => {
  apiHandler.getRoleDetailApi({
    roleId: props.roleId
  }).then((res) => {
    if (!res) return;
    form.value.description = res.description;
  })
}

onMounted(() => {
  if (!props.roleId) return;
  getRoleDetail();
});

watch(() => props.roleId, () => {
  getRoleDetail();
});

</script>

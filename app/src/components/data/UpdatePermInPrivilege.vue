<template>
  <v-form v-model="valid" @submit.prevent="submitForm" v-if="auth.hasPerm('PERMISSION_UPDATE')">
    <v-text-field
      v-model="form.description"
      :rules="[rules.required]"
      variant="underlined"
      label="권한 설명"
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

import { ref } from 'vue';
import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  permId: number;
}>();

const valid = ref(false)

const form = ref({
  description: ''
})

const submitForm = () => {
  apiHandler.updatePermApi({
    permId: props.permId,
    description: form.value.description
  });
}

</script>
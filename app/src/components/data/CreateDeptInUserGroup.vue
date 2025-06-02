<template>
  <v-form v-model="valid" @submit.prevent="submitForm">
    <v-text-field
      v-model="form.dept.deptName"
      :rules="[rules.required]"
      variant="underlined"
      label="생성할 부서 이름"
      color="primary"
      clearable
      data-test="input-dept-name"
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
</template>
<script lang="ts" setup>
  
  import { ref } from 'vue'
  import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';

  const valid = ref(false)

  const props = defineProps<{
    org: {
      orgId: number;
      orgName: string;
    }
  }>();

  const form = ref({
    dept: {
      deptName: ''
    }
  })

  const submitForm = async () => {
    await apiHandler.createDeptApi({
      organizationId: props.org.orgId,
      deptName: form.value.dept.deptName
    });
  }

  defineExpose({
    form, valid
  })
</script>

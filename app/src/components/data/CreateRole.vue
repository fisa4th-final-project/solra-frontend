<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createRole</v-btn>
      </slot>
    </template>
    <template v-slot:title>역할 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.roleName"
        :rules="[rules.required]"
        variant="underlined"
        label="생성할 역할 이름"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.description"
        variant="underlined"
        label="역할 설명"
        color="primary"
        clearable
      />
      <!-- 
      todo:
      1. 역할 - 권한 연결 추가
      -->
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
  
  import { createRoleApi } from '@/lib/api/role/createRoleApi';

  const valid = ref(false)

  const form = ref({
    roleName: '',
    description: ''
  })

  /*
  todo:
  1. inputRules.ts 에 rules 공통 로직으로 추가
  */

  const rules = {
    required: (v: string) => !!v || '필수 입력 항목입니다.',
    email: (v: string) =>
      /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
  }

  const submitForm = async () => {
    await createRoleApi({
      roleName: form.value.roleName,
      description: form.value.description
    });
  }

</script>

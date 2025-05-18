<template>
  <v-container>
    <Card>
      <template v-slot:title>사용자 등록</template>
      <v-form v-model="valid" @submit.prevent="submitForm">
        <v-text-field
          v-model="form.userLoginId"
          :rules="[rules.required]"
          variant="underlined"
          label="사용자 ID"
          color="primary"
          clearable
        />
        <v-text-field
          v-model="form.password"
          :rules="[rules.required]"
          variant="underlined"
          label="비밀번호"
          type="password"
          color="primary"
          clearable
        />
        <v-text-field
          v-model="form.userName"
          :rules="[rules.required]"
          variant="underlined"
          label="이름"
          color="primary"
          clearable
        />
        <v-text-field
          v-model="form.email"
          :rules="[rules.required, rules.email]"
          variant="underlined"
          label="이메일"
          type="email"
          color="primary"
          clearable
        />
        <v-text-field
          v-model="form.orgId"
          variant="underlined"
          label="조직 ID (선택)"
          color="primary"
          clearable
        />
        <v-text-field
          v-model="form.deptId"
          variant="underlined"
          label="부서 ID (선택)"
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
    </Card>
  </v-container>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import { createUserApi } from '@/lib/api/user/createUserApi';
import Card from '@/components/common/Card.vue';

const valid = ref(false)

const form = ref({
  userLoginId: '',
  password: '',
  userName: '',
  email: '',
  orgId: '',
  deptId: ''
})

const rules = {
  required: (v: string) => !!v || '필수 입력 항목입니다.',
  email: (v: string) =>
    /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
}

const submitForm = () => {
  createUserApi({
    userLoginId: form.value.userLoginId ,
    password: form.value.password ,
    userName: form.value.userName ,
    email: form.value.email ,
    orgId: form.value.orgId ? parseInt(form.value.orgId) : undefined,
    deptId: form.value.deptId ? parseInt(form.value.deptId) : undefined,
  });
}
</script>

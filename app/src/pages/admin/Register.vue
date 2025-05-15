<template>
  <v-container class="py-10" max-width="600px">
    <v-card
      theme="light"
      rounded="xl"
      flat
      style="
        padding: 20px;
        border: 2px solid #DFE0EB;
      "
    >
      <v-card-title class="text-h5">사용자 등록</v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            variant="underlined"
            v-model="form.userLoginId"
            label="사용자 ID"
            :rules="[rules.required]"
            clearable
            :color="theme.colors.primary"
          />
          <v-text-field
            variant="underlined"
            v-model="form.password"
            label="비밀번호"
            type="password"
            :rules="[rules.required]"
            clearable
            :color="theme.colors.primary"
          />
          <v-text-field
            variant="underlined"
            v-model="form.userName"
            label="이름"
            :rules="[rules.required]"
            clearable
            :color="theme.colors.primary"
          />
          <v-text-field
            variant="underlined"
            v-model="form.email"
            label="이메일"
            type="email"
            :rules="[rules.required, rules.email]"
            clearable
            :color="theme.colors.primary"
          />
          <v-text-field
            variant="underlined"
            v-model="form.orgId"
            label="조직 ID (선택)"
            clearable
            :color="theme.colors.primary"
          />
          <v-text-field
            variant="underlined"
            v-model="form.deptId"
            label="부서 ID (선택)"
            clearable
            bg-color="white"
            :color="theme.colors.primary"
          />

          <v-btn
            class="mt-4"
            :disabled="!valid"
            type="submit"
            :color="theme.colors.primary"
            block
          >
            등록
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { createUserApi } from '@/lib/api/user/createUserApi';
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const valid = ref(false)

const form = ref({
  userLoginId: '',
  password: '',
  userName: '',
  email: '',
  orgId: '',
  deptId: ''
})

const theme = useTheme().current.value;
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

<template>
  <v-container>
    <Card>
      <template v-slot:title>사용자 편집</template>
        <Form v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="form.userLoginId"
            :rules="[rules.required]"
            color="primary"
            variant="underlined"
            label="사용자 ID"
            clearable
          />
          <v-text-field
            v-model="form.password"
            color="primary"
            variant="underlined"
            label="비밀번호"
            type="password"
            clearable
          />
          <v-text-field
            v-model="form.userName"
            :rules="[rules.required]"
            color="primary"
            variant="underlined"
            label="이름"
            clearable
          />
          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            color="primary"
            variant="underlined"
            label="이메일"
            type="email"
            clearable
          />
          <v-text-field
            variant="underlined"
            color="primary"
            label="조직 ID (선택)"
            clearable
            disabled
          />
          <v-text-field
            variant="underlined"
            color="primary"
            label="부서 ID (선택)"
            disabled
            clearable
          />

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mt-4"
            type="submit"
            flat
          >
            수정
          </v-btn>
        </Form>
    </Card>
  </v-container>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import { useTargetUserStore } from '@/store/targetUser';

import { updateUserApi } from '@/lib/api/user/updateUserApi';
import Card from '@/components/common/Card.vue';
import Form from '@/components/common/Form.vue';

const targetUser = useTargetUserStore()
const user = targetUser.getUser
const valid = ref(false)

const form = ref({
  userLoginId: user ? user.userLoginId : '',
  userName: user ? user.userName : '',
  email: user ? user.email : '',
  password: '',
})

const rules = {
  required: (v: string) => !!v || '필수 입력 항목입니다.',
  email: (v: string) =>
    /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
}

const submitForm = () => {
  if (!user) return
  updateUserApi({
    userId: user.userId,
    userLoginId: form.value.userLoginId,
    userName: form.value.userName,
    password: form.value.password,
    email: form.value.email
  });
}
</script>

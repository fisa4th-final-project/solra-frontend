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
      <v-card-title class="text-h5">사용자 편집</v-card-title>
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
            disabled
            label="조직 ID (선택)"
            clearable
            :color="theme.colors.primary"
          />
          <v-text-field
            variant="underlined"
            disabled
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
            수정
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { updateUserApi } from '@/lib/api/user/updateUserApi';
import { useTargetUserStore } from '@/store/targetUser';
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const targetUser = useTargetUserStore()
const user = targetUser.getUser
const valid = ref(false)

const form = ref({
  userLoginId: user ? user.userLoginId : '',
  userName: user ? user.userName : '',
  email: user ? user.email : '',
  password: '',
})

const theme = useTheme().current.value;
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

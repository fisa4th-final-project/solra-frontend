<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">updateUser</v-btn>
      </slot>
    </template>
    <template v-slot:title>사용자 편집</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.userLoginId"
        :rules="[rules.required]"
        :placeholder="targetUser.userLoginId"
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
        :placeholder="targetUser.userName"
        color="primary"
        variant="underlined"
        label="이름"
        clearable
      />
      <v-text-field
        v-model="form.email"
        :rules="[rules.required, rules.email]"
        :placeholder="targetUser.email"
        color="primary"
        variant="underlined"
        label="이메일"
        type="email"
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
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import { updateUserApi } from '@/lib/api/user/updateUserApi';
import { getUserDetailApi } from '@/lib/api/user/getUserDetailApi';
import type { GetUserDetailResponseDto } from '@/lib/api/user/userDto';

const props = defineProps<{
  userId: number;
}>();

const valid = ref(false);

const targetUser = ref<GetUserDetailResponseDto>({} as GetUserDetailResponseDto);

const form = ref({
  userLoginId: targetUser.value.userLoginId,
  userName: targetUser.value.userName,
  email: targetUser.value.email,
  password: '',
});

const submitForm = () => {
  updateUserApi({
    userId: props.userId,
    userLoginId: form.value.userLoginId,
    userName: form.value.userName,
    password: form.value.password,
    email: form.value.email
  });
}

const getuserDetail = () => {
  getUserDetailApi({
    userId: props.userId
  }).then((res) => {
    if (!res) return;
    targetUser.value = res
  });
}

onMounted(() => {
  if (!props.userId) return;
  getuserDetail();
});

watch(() => props.userId, () => {
  getuserDetail();
});

</script>

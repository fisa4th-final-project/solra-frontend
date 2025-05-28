<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">updateUser</v-btn>
      </slot>
    </template>
    <template v-slot:title>사용자 편집</template>
    <Card>

      <v-form v-model="valid" @submit.prevent="submitForm">
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
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mt-4"
          type="submit"
          flat
          block
        >
          수정
        </v-btn>
      </v-form>
    </Card>

  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import { updateUserApi } from '@/lib/api/user/updateUserApi';
import { getUserDetailApi } from '@/lib/api/user/getUserDetailApi';
import type { GetUserDetailResponseDto } from '@/lib/api/user/userDto';
import Card from '@/components/common/Card.vue';

const props = defineProps<{
  userId: number;
}>();

const valid = ref(false);

type ExtendedUserDetail = GetUserDetailResponseDto & {
  password: string;
};

const form = ref<ExtendedUserDetail>({
  userId: 0,
  userName: '',
  userLoginId: '',
  password: '',
  email: ''
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
    if (res) form.value = {...res, password: ''};
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

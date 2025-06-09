<template>
  <SideContents v-if="auth.hasPerm('USER_UPDATE')" v-model="isOpened">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">updateUser</v-btn>
      </slot>
    </template>
    <template v-slot:title>
      <span>
        사용자 편집
      </span>
      <v-col align="end">
        <DeleteUser v-if="user" :user="{userId: user.userId, userLoginId: user.userLoginId}"/>
      </v-col>
    </template>
    <Card no-text no-title>

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
import type { GetUserDetailResponseDto } from '@/lib/api/user/userDto';
import Card from '@/components/common/Card.vue';
import DeleteUser from '@/components/data/DeleteUser.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  userId: number;
  onUpdate?: () => void;
}>();

const valid = ref(false);

const isOpened = ref();

type ExtendedUserDetail = GetUserDetailResponseDto & {
  password: string;
};

const user = ref<GetUserDetailResponseDto>();

const form = ref<ExtendedUserDetail>({
  userId: 0,
  userName: '',
  userLoginId: '',
  password: '',
  email: ''
});

const submitForm = () => {
  apiHandler.updateUserApi({
    userId: props.userId,
    userLoginId: form.value.userLoginId,
    userName: form.value.userName,
    password: form.value.password,
    email: form.value.email
  }).then(() => {
    isOpened.value = false;
    props.onUpdate?.();
  });
}

const getuserDetail = () => {
  apiHandler.getUserDetailApi({
    userId: props.userId
  }).then((res) => {
    if (!res) return;
    form.value = {...res, password: ''};
    user.value = res;
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

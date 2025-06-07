<template>
  <SideContents v-if="auth.hasPerm('USER_CREATE')">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">createUser</v-btn>
      </slot>
    </template>
    <template v-slot:title>사용자 등록</template> 
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.userLoginId"
        :rules="[rules.required]"
        variant="underlined"
        label="사용자 ID"
        color="primary"
        clearable
        data-test="input-user-login-id"
        />
        <v-text-field
        v-model="form.password"
        :rules="[rules.required]"
        variant="underlined"
        label="비밀번호"
        type="password"
        color="primary"
        clearable
        data-test="input-password"
        />
        <v-text-field
        v-model="form.userName"
        :rules="[rules.required]"
        variant="underlined"
        label="이름"
        color="primary"
        clearable
        data-test="input-name"
        />
        <v-text-field
        v-model="form.email"
        :rules="[rules.required, rules.email]"
        variant="underlined"
        label="이메일"
        type="email"
        color="primary"
        clearable
        data-test="input-email"
      />
      <SelectRoleList :form="form"/>
      <SelectOrgList :form="form"/>
      <SelectDeptList :orgId="form.org.orgId" :form="form"/>
      <v-btn
        :disabled="!valid"
        class="mt-4"
        type="submit"
        color="primary"
        alignself="end"
      >
        등록
      </v-btn>
    </v-form>
  </SideContents>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import SelectOrgList from '@/components/data/SelectOrgList.vue';
import SelectDeptList from '@/components/data/SelectDeptList.vue';
import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';
import SelectRoleList from '@/components/data/SelectRoleList.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const valid = ref(false)

const form = ref({
  userLoginId: '',
  password: '',
  userName: '',
  email: '',
  org: {
    orgId: 0,
    orgName: ''
  },
  dept: {
    deptId: 0,
    deptName: ''
  },
  role: {
    roleId: 0,
    roleName: '',
  }
})

const submitForm = async () => {
  const res = await apiHandler.createUserApi({
    userLoginId: form.value.userLoginId ,
    password: form.value.password ,
    userName: form.value.userName ,
    email: form.value.email ,
    orgId: form.value.org.orgId ,
    deptId: form.value.dept.deptId
  });

  if (res && form.value.role.roleId != 0) await apiHandler.createUserRoleApi({
    userId: res.userId,
    roleId: form.value.role.roleId
  });
}

defineExpose({
  form, valid
});

</script>

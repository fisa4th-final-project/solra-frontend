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
      <GetPermList v-model="perms" />
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
  import GetPermList from '@/components/data/GetPermList.vue';
import { createRolePermApi } from '@/lib/api/rolePerm/createRolePermApi';

  const valid = ref(false);

  const form = ref({
    roleName: '',
    description: ''
  });

  const perms = ref<{
    permissionId: number;
    permissionName: string;
    description: string;
  }[]>();

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
    createRoleApi({
      roleName: form.value.roleName,
      description: form.value.description
    }).then((res) => {
      if (!res) return
      perms.value?.forEach( async (perm) => {
        await createRolePermApi({
          roleId: res.roleId,
          permissionId: perm.permissionId
        });
        /*
        todo:
        1.RolePerm 생성 후 action (예: 특정 페이지로 라우팅, error 처리)
        */
      })
    })
  }

</script>

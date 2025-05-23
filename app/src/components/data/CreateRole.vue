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
import GetPermList from '@/components/data/GetPermList.vue';
import { rules } from '@/lib/global/inputRules';
import { createRoleApi } from '@/lib/api/role/createRoleApi';
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
    })
  })
}

</script>

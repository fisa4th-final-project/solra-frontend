<template>
  <SideContents v-if="auth.hasPerm('ROLE_CREATE')">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">createRole</v-btn>
      </slot>
    </template>
    <template v-slot:title>역할 추가</template>
    
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-card-title>
        역할 정보
      </v-card-title>
      <v-text-field
        v-model="form.roleName"
        :rules="[rules.required]"
        variant="underlined"
        label="생성할 역할 이름"
        color="primary"
        clearable
        data-test="input-role-name"
        />
        <v-text-field
        v-model="form.description"
        variant="underlined"
        label="역할 설명"
        color="primary"
        clearable
        data-test="input-role-desc"
      />
      <v-spacer class="pt-5"/>
      <v-card-title>
        부여 권한
      </v-card-title>
      <v-spacer class="pt-5"/>
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
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const valid = ref(false);

const form = ref({
  roleName: '',
  description: ''
});

const perms = ref<{
  permissionId: number;
  permissionName: string;
  description: string;
}[]>([]);

const submitForm = async () => {
  const res = await apiHandler.createRoleApi({
    roleName: form.value.roleName,
    description: form.value.description
  });
  if (!res) return
  apiHandler.createRolePermApi({
    roleId: res.roleId,
    permissionIds: perms.value.map((perm) => perm.permissionId)
  });
}

defineExpose({
  form, valid, perms
});

</script>

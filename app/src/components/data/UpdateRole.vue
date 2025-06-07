<template>
  <SideContents v-if="auth.hasPerm('ROLE_UPDATE')">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">UpdateRole</v-btn>
      </slot>
    </template>
    <template v-slot:title>역할 수정</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.description"
        :rules="[rules.required]"
        variant="underlined"
        label="역할 설명"
        color="primary"
        clearable
      />
      <GetPermList v-model="permIdList"/>
      <v-btn
        class="mt-4"
        :disabled="!valid"
        type="submit"
        color="primary"
        block
      >
        수정
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';
import GetPermList from '@/components/data/GetPermList.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  roleId: number;
}>();

interface perm {
  permissionId: number;
  permissionName: string;
  description: string;
}

const permIdList = ref<perm[]>([]);

const valid = ref(false);

const form = ref({
  description: ''
});

const submitForm = () => {
  apiHandler.updateRoleApi({
    roleId: props.roleId,
    description: form.value.description
  });
  apiHandler.createRolePermApi({
    roleId: props.roleId,
    permissionIds: permIdList.value.map((perm) => perm.permissionId)
  });
}

const getRoleDetail = async () => {
  const res = await apiHandler.getRoleDetailApi({
    roleId: props.roleId
  });
  if (!res) return;
  form.value.description = res.description;
  apiHandler.getRolePermListApi({
    roleId: res.roleId
  }).then((perm) => {
    if (perm) permIdList.value = perm;
  });
}

onMounted(() => {
  if (!props.roleId) return;
  getRoleDetail();
});

watch(() => props.roleId, () => {
  getRoleDetail();
});

watch(() => permIdList.value, () => {
  console.log(permIdList.value);
});

</script>

<template>
  <SideContents v-if="auth.hasPerm('ROLE_UPDATE')" v-model="isOpened">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">UpdateRole</v-btn>
      </slot>
    </template>
    <template v-slot:title>
      <span>
        역할 수정
      </span>
      <v-col align="end">
        <DeleteRole v-if="role" :role="{roleId: role.roleId, roleName: role.roleName}" :onUpdate="onUpdate"/>
      </v-col>
    </template>
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
import DeleteRole from '@/components/data/DeleteRole.vue';
import type { GetRoleDetailResponseDto } from '@/lib/api/role/roleDto';

const auth = useAuthStore();

const props = defineProps<{
  roleId: number;
  onUpdate?: () => void;
}>();

interface perm {
  permissionId: number;
  permissionName: string;
  description: string;
}

const initialPermList = ref<perm[]>([]);
const permIdList = ref<perm[]>([]);

const valid = ref(false);

const isOpened = ref();

const role = ref<GetRoleDetailResponseDto>();
const form = ref({
  description: ''
});

const submitForm = async () => {
  const deletePermList = initialPermList.value
  .filter(initialPerm => !permIdList.value.some(p => p.permissionId === initialPerm.permissionId))
  .map(p => p.permissionId);

  await apiHandler.updateRoleApi({
    roleId: props.roleId,
    description: form.value.description
  });

  await apiHandler.deleteRolePermApi({
    roleId: props.roleId,
    permissionIds: deletePermList
  })
  await apiHandler.createRolePermApi({
    roleId: props.roleId,
    permissionIds: permIdList.value.map((perm) => perm.permissionId)
  });

  isOpened.value = false;
  
  props.onUpdate?.();
}

const getRoleDetail = async () => {
  const res = await apiHandler.getRoleDetailApi({
    roleId: props.roleId
  });
  if (!res) return;
  role.value = res;
  form.value.description = res.description;
  apiHandler.getRolePermListApi({
    roleId: res.roleId
  }).then((perms) => {
    if (perms) {
      initialPermList.value = perms
      permIdList.value = perms
    };
  });
}

onMounted(() => {
  if (!props.roleId) return;
  getRoleDetail();
});

watch(() => props.roleId, () => {
  getRoleDetail();
});

</script>

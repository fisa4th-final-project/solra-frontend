<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
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
import { getRoleDetailApi } from '@/lib/api/role/getRoleDetailApi';
import { updateRoleApi } from '@/lib/api/role/updateRoleApi';


const props = defineProps<{
  roleId: number;
}>();

const valid = ref(false)

const form = ref({
  description: ''
})

const submitForm = () => {
  updateRoleApi({
    roleId: props.roleId,
    description: form.value.description
  });
}

const getRoleDetail = () => {
  getRoleDetailApi({
    roleId: props.roleId
  }).then((res) => {
    if (!res) return;
    form.value.description = res.description;
  })
}

onMounted(() => {
  if (!props.roleId) return;
  getRoleDetail();
});

watch(() => props.roleId, () => {
  getRoleDetail();
});

</script>

<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">UpdateDept</v-btn>
      </slot>
    </template>
    <template v-slot:title>
      <span>
        부서 수정
      </span>
      <v-col align="end">
        <DeleteDept v-if="dept" :dept="{deptId: dept.deptId, deptName: dept.deptName}"/>
      </v-col>
    </template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.deptName"
        :rules="[rules.required]"
        variant="underlined"
        label="수정할 부서 이름"
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
import DeleteDept from '@/components/data/DeleteDept.vue';
import type { GetDeptDetailResponseDto } from '@/lib/api/dept/deptDto';
import { apiHandler } from '@/lib/global/apiManager';

const props = defineProps<{
  deptId: number;
}>();

const valid = ref(false)

const dept = ref<GetDeptDetailResponseDto>();

const form = ref({
  deptName: ''
})

const submitForm = () => {
  apiHandler.updateDeptApi({
    deptId: props.deptId,
    deptName: form.value.deptName
  });
}

const getDeptDetail = () => {
  apiHandler.getDeptDetailApi({
    deptId: props.deptId
  }).then((res) => {
    if (!res) return;
    form.value.deptName = res.deptName;
    dept.value = res;
  })
}

onMounted(() => {
  if (!props.deptId) return;
  getDeptDetail();
});

watch(() => props.deptId, () => {
  getDeptDetail();
});

</script>

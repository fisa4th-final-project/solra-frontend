<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createDept</v-btn>
      </slot>
    </template>
    <template v-slot:title>부서 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <SelectOrgList :form="form" />
      <v-text-field
        v-model="form.deptName"
        :rules="[rules.required]"
        variant="underlined"
        label="생성할 부서 이름"
        color="primary"
        clearable
      />
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
  import SelectOrgList from '@/components/data/SelectOrgList.vue';
  import SideContents from '@/components/layout/SideContents.vue';
  import { rules } from '@/lib/global/inputRules';
  import { createDeptApi } from '@/lib/api/dept/createDeptApi';

  const valid = ref(false)

  const form = ref({
    org: {
      orgId: 0,
      orgName: ''
    },
    deptName: '',
  })

  const submitForm = async () => {
    await createDeptApi({
      organizationId: form.value.org.orgId,
      deptName: form.value.deptName
    });
  }

</script>

<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createOrg</v-btn>
      </slot>
    </template>
    <template v-slot:title>조직 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.orgName"
        :rules="[rules.required]"
        variant="underlined"
        label="생성할 조직 이름"
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
        등록
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { ref } from 'vue';
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import { createOrgApi } from '@/lib/api/org/createOrgApi';

const valid = ref(false)

const form = ref({
  orgName: ''
})

const submitForm = () => {
  createOrgApi({
    orgName: form.value.orgName
  });
}

</script>

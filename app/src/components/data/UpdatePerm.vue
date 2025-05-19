<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdatePerm</v-btn>
      </slot>
    </template>
    <template v-slot:title>권한 수정</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.description"
        :rules="[rules.required]"
        variant="underlined"
        label="권한 설명"
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

import { ref } from 'vue';

import SideContents from '@/components/layout/SideContents.vue';

import { updatePermApi } from '@/lib/api/perm/getPermDetailApi';


  const props = defineProps<{
    permId: number;
  }>();

  const valid = ref(false)

  const form = ref({
    description: ''
  })

  const rules = {
    required: (v: string) => !!v || '필수 입력 항목입니다.',
    email: (v: string) =>
      /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
  }

  const submitForm = () => {
    updatePermApi({
      permId: props.permId,
      description: form.value.description
    });
  }

</script>
<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createNS</v-btn>
      </slot>
    </template>
    <template v-slot:title>네임스페이스 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <!-- 
      todo:
      1. 생성될 클러스터 선택용 select input 추가
      -->
      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        variant="underlined"
        label="네임스페이스 이름"
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
  
  import SideContents from '@/components/layout/SideContents.vue';
  import { createNSApi } from '@/lib/api/ns/createNSApi';
  
  const props = defineProps<{
    clusterId: number;
  }>();

  const valid = ref(false);

  const form = ref({
    name: '',
  });

  /*
  todo:
  1. inputRules.ts 에 rules 공통 로직으로 추가
  */
 
 const rules = {
   required: (v: string) => !!v || '필수 입력 항목입니다.',
   email: (v: string) =>
   /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
  }

  const submitForm = () => {
    createNSApi({
      clusterId: props.clusterId,
      name: form.value.name
    })
  }

</script>

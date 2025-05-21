<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createDeployment</v-btn>
      </slot>
    </template>
    <template v-slot:title>디플로이먼트 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <!-- 
      todo:
      1. 생성될 클러스터 선택용 select input 추가
      -->
      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        variant="underlined"
        label="디플로이먼트 이름"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.appName"
        :rules="[rules.required]"
        variant="underlined"
        label="컨테이너 이름"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.image"
        :rules="[rules.required]"
        variant="underlined"
        label="컨테이너 적용 이미지"
        color="primary"
        clearable
      />
      <v-text-field
        v-model="form.port"
        :rules="[rules.required]"
        variant="underlined"
        label="컨테이너 포트"
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
  import { createDeployApi } from '@/lib/api/deploy/createDeployApi';
  
  const props = defineProps<{
    clusterId: number;
    nsName: string;
  }>();

  const valid = ref(false);

  const form = ref({
    name: '',
    appName: '',
    image: '',
    port: 0,
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
    createDeployApi({
      clusterId: props.clusterId,
      nsName: props.nsName,
      name: form.value.name,
      labels: {
        app: form.value.appName
      },
      container: {
        name: form.value.appName,
        image: form.value.image,
        port: form.value.port
      }
    })
  }

</script>

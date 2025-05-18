<template>
 <v-container class="pa-0">
  <v-row no-gutters>
    <v-col>
      <Card>
        <template v-slot:title>부서 추가</template>
        <Form v-model="valid" @submit.prevent="submitForm">
          <v-select
            v-model="form.org"
            :items="orgs"
            variant="underlined"
            label="조직 선택"
            color="primary"
            item-title="orgName"
            item-value="orgId"
            return-object
          />
          <v-text-field
            v-model="form.deptName"
            :rules="[rules.required]"
            variant="underlined"
            label="생성할 부서 이름"
            color="primary"
            clearable
          />

          <template v-slot:submit>
            <v-btn
              :disabled="!valid"
              class="mt-4"
              type="submit"
              color="primary"
              block
            >
              등록
            </v-btn>
          </template>
        </Form>
      </Card>
    </v-col>
  </v-row>
 </v-container>
</template>
<script lang="ts" setup>
  
  import { onMounted, ref } from 'vue'

  import Card from '@/components/common/Card.vue';
  import Form from '@/components/common/Form.vue';

  import type { GetOrgsResponseDto } from '@/lib/api/org/orgDto';
  import { createDeptApi } from '@/lib/api/dept/createDeptApi';
  import { getOrgsApi } from '@/lib/api/org/getOrgsApi';

  const valid = ref(false)

  const form = ref({
    org: {
      orgId: 0,
      orgName: ''
    },
    deptName: '',
  })

  /*
  todo:
  1. inputRules.ts 에 rules 공통 로직으로 추가
  */

  const rules = {
    required: (v: string) => !!v || '필수 입력 항목입니다.',
    email: (v: string) =>
      /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
  }

  const orgs = ref<GetOrgsResponseDto[]>();

  onMounted(() => {
    getOrgsApi().then((res) => {
      if (!res) return;
      orgs.value = res;
      console.log(orgs.value)
    });
  })

  const submitForm = async () => {
    await createDeptApi({
      organizationId: form.value.org.orgId,
      deptName: form.value.deptName
    });
  }

</script>

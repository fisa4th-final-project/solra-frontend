<template>
<v-container class="pa-0">
  <v-row no-gutters>
    <v-col>
      <Card>
        <template v-slot:title>조직 추가</template>
        <Form v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="form.orgName"
            :rules="[rules.required]"
            variant="underlined"
            label="생성할 부서 이름"
            color="primary"
            clearable
          />

          <template v-slot:submit>
            <v-btn
              class="mt-4"
              :disabled="!valid"
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

  import { ref } from 'vue';

  import Card from '@/components/common/Card.vue';
  import Form from '@/components/common/Form.vue';

  import { createOrgApi } from '@/lib/api/org/createOrgApi';

  const valid = ref(false)

  const form = ref({
    orgName: ''
  })

  const rules = {
    required: (v: string) => !!v || '필수 입력 항목입니다.',
    email: (v: string) =>
      /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
  }

  const submitForm = () => {
    createOrgApi({
      orgName: form.value.orgName
    });
  }

</script>

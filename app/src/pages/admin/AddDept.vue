<template>
 <v-container class="pa-0">
  <v-row no-gutters>
    <v-col>
      <Card>
        <v-card-title>부서 추가</v-card-title>
 <v-card-text>
        <v-form v-model="valid" @submit.prevent="submitForm">
          <v-select
            variant="underlined"
            v-model="form.org"
            label="조직 선택"
            :color="theme.colors.primary"
            :items="orgs"
            item-title="orgName"
            item-value="orgId"
            return-object
          />
          <v-text-field
            variant="underlined"
            v-model="form.deptName"
            label="생성할 부서 이름"
            :rules="[rules.required]"
            clearable
            :color="theme.colors.primary"
          />

          <v-btn
            class="mt-4"
            :disabled="!valid"
            type="submit"
            :color="theme.colors.primary"
            block
          >
            등록
          </v-btn>
        </v-form>
      </v-card-text>
      </Card>
    </v-col>
  </v-row>
 </v-container>
</template>
<script lang="ts" setup>
  import Card from '@/components/common/Card.vue';
  import { createDeptApi } from '@/lib/api/dept/createDeptApi';
  import { getOrgsApi } from '@/lib/api/org/getOrgsApi';
  import type { GetOrgsResponseDto } from '@/lib/api/org/orgDto';
  import { onMounted, ref } from 'vue'
  import { useTheme } from 'vuetify'

const valid = ref(false)

const form = ref({
  org: {
    orgId: 0,
    orgName: ''
  },
  deptName: '',
})

const theme = useTheme().current.value;
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

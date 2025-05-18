<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdateOrg</v-btn>
      </slot>
    </template>
    <template v-slot:title>조직 수정</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.orgName"
        :rules="[rules.required]"
        variant="underlined"
        label="수정할 조직 이름"
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

  import { updateOrgApi } from '@/lib/api/org/updateOrgApi';
import { getOrgDetailApi } from '@/lib/api/org/getOrgDetailApi';

  const props = defineProps<{
    orgId: number;
  }>();

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
    updateOrgApi({
      orgId: props.orgId,
      orgName: form.value.orgName
    });
  }

  const getOrgDetail = () => {
    getOrgDetailApi({
      orgId: props.orgId
    }).then((res) => {
      if (!res) return;
      form.value.orgName = res.orgName;
    })
  }

  onMounted(() => {
    if (!props.orgId) return;
    getOrgDetail();
  });

  watch(() => props.orgId, () => {
    getOrgDetail();
  });

</script>

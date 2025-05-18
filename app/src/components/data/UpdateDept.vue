<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdateDept</v-btn>
      </slot>
    </template>
    <template v-slot:title>부서 수정</template>
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

  import { updateDeptApi } from '@/lib/api/dept/updateDeptApi';
  import { getDeptDetailApi } from '@/lib/api/dept/getDeptDetailApi';

  const props = defineProps<{
    deptId: number;
  }>();

  const valid = ref(false)

  const form = ref({
    deptName: ''
  })

  const rules = {
    required: (v: string) => !!v || '필수 입력 항목입니다.',
    email: (v: string) =>
      /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
  }

  const submitForm = () => {
    updateDeptApi({
      deptId: props.deptId,
      deptName: form.value.deptName
    });
  }

  const getDeptDetail = () => {
    getDeptDetailApi({
      deptId: props.deptId
    }).then((res) => {
      if (!res) return;
      form.value.deptName = res.deptName;
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

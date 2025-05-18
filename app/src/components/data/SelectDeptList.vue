<template>
  <v-select
    v-model="form.dept"
    :items="depts"
    variant="underlined"
    label="부서 선택"
    color="primary"
    item-title="deptName"
    item-value="deptId"
    return-object
  />
</template>
<script lang="ts" setup>

  import { onMounted, ref, watch } from 'vue';

  import { getDeptsApi } from '@/lib/api/dept/getDeptsApi';

  const depts = ref<{
    deptId: number;
    deptName: string;
  }[]>([]);

  const props = defineProps<{
    orgId: number;
    form: {
      dept: {
        deptId: number;
        deptName: string;
      }
    }
  }>();

  const getDepts = () => {
    getDeptsApi({
      org_id: props.orgId
    }).then((res) => {
      if (!res) return;
      depts.value = res;
    });
  }

  onMounted(() => {
    if (!props.orgId) return;
    getDepts();
  });

  watch(() => props.orgId, () => {
    getDepts();
  })
</script>

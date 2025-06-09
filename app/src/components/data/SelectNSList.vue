<template>
  <v-select
    v-model="form.ns"
    :items="nsList"
    :rules="[rules.required]"
    variant="underlined"
    label="네임스페이스 선택"
    color="primary"
    item-title="name"
    item-value="name"
    return-object
    v-if="auth.hasPerm('NAMESPACE_READ')"
  />
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import { rules } from '@/lib/global/inputRules';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  form: {
    cluster: {
      clusterId: number;
    }
    ns: {
      name: string;
    };
  }
}>();

const nsList = ref<{
  name: string;
}[]>();

const loadData = async () => {
  if (auth.hasPerm('NAMESPACE_READ')) {
    await apiHandler.getNSListApi({clusterId: props.form.cluster.clusterId}).then((res) => {
      //TODO NS 조회 제한 제거할 것.
      if (res) nsList.value = res.filter((ns) => !invailedNs.includes(ns.name));
    });
  }
}

onMounted(() => {
  if (props.form.cluster.clusterId) loadData();
});

watch(() => props.form.cluster.clusterId, () => {
  loadData();
});

defineExpose({
  nsList
});


const invailedNs = [
  'argocd',
  'cilium-secrets',
  'default',
  'ingress-nginx',
  'kube-node-lease',
  'kube-public',
  'kube-system',
  'local-path-storage',
  'monitoring',
  'redis',
  'solra',
  'solra-harbor',
  'solra-jenkins',
  'solra-monitoring'
]

</script>

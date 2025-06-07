<template>
  <Card no-title no-text no-gutters v-if="auth.hasPerm('PERMISSION_READ')">
    <v-data-table
      v-model="modelValue"
      :headers="headers"
      :items="permItems"
      item-value="permissionId"
      return-object
      show-select
      ripple
      hover
    >

    </v-data-table>
  </Card>
</template>
<script lang="ts" setup>

import Card from '@/components/common/Card.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';

const auth = useAuthStore();

const modelValue = defineModel<perm[]>();

interface perm {
  permissionId: number;
  permissionName: string;
  description: string;
}
const permItems = ref<perm[]>([]);

const loadPerms = () => {
  apiHandler.getPermListApi().then((res) => {
    if (!res) return;
    permItems.value = res
  });
};

const headers: {
  title: string;
  key: string;
  align: 'start' | 'end';
}[] = [
  { 
    title: '권한 명',
    key: 'permissionName',
    align: 'start'
  },
  { 
    title: '설명',
    key: 'description',
    align: 'start'
  }
]

onMounted(() => {
  loadPerms();
});

</script>
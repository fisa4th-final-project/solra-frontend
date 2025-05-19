<template>
  <Card no-title no-text no-gutters>
    <v-data-table
      v-model="modelValue"
      :headers="headers"
      :items="permItems"
      item-value="permissionId"
      return-object
      hide-default-footer
      show-select
      ripple
      hover
    >

    </v-data-table>
  </Card>
</template>
<script lang="ts" setup>

  import Card from '@/components/common/Card.vue';
  import { getPermsApi } from '@/lib/api/perm/getPermsApi';
  import { onMounted, ref } from 'vue';

  const modelValue = defineModel<any[]>();

  const permItems = ref<{
    permissionId: number,
    permissionName: string,
    description: string,
  }[]>([]);

  const loadPerms = () => {
    getPermsApi().then((res) => {
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
      title: '역할 명',
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
  })
</script>
<template>
  <Card no-title no-text no-gutters>
    <v-data-table
      :headers="headers"
      :items="roleItems"
      :row-props="getRowProps"
      hide-default-footer
      ripple
      hover
    >

    </v-data-table>
  </Card>
</template>

<script lang="ts" setup>

  import Card from '@/components/common/Card.vue';
  import { getRolesApi } from '@/lib/api/role/getRolesApi';
  import { onMounted, ref } from 'vue';

  const emit = defineEmits<{
    (e: 'selected', item: typeof roleItems.value[number]): void
  }>();

  const handleRowClick = (item: typeof roleItems.value[number]) => {
    emit('selected', item);
  }

  const getRowProps = (row: any) => {
    return {
      onClick: () => handleRowClick(row.item),
    }
  }

  const roleItems = ref<{
    roleId: number,
    roleName: string,
    description: string,
  }[]>([]);

  const loadRoles = () => {
    getRolesApi().then((res) => {
      if (!res) return;
      roleItems.value = res
    });
  };
  
  const headers: {
    title: string;
    key: string;
    align: 'start' | 'end';
  }[] = [
    { 
      title: '역할 명',
      key: 'roleName',
      align: 'start'
    },
    { 
      title: '설명',
      key: 'description',
      align: 'start'
    }
  ]

  onMounted(() => {
    loadRoles();
  })
</script>
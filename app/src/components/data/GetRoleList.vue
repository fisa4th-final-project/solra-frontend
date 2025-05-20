<template>
  <Card no-title no-text no-gutters>
    <v-data-table
      :headers="headers"
      :items="permRows"
      :group-by="groupBy"
      :row-props="getRowProps"
      hide-default-footer
      ripple
      hover
    >

    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length">
          <div class="d-flex align-center justify-space-between">
            <span>ROLE : {{ item.value }}</span>

            <v-btn
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              color="medium-emphasis"
              density="comfortable"
              size="small"
              variant="outlined"
              @click="toggleGroup(item)"
            ></v-btn>

          </div>
        </td>
      </tr>
    </template>

    </v-data-table>
  </Card>
</template>

<script lang="ts" setup>

  import Card from '@/components/common/Card.vue';
  import { getRolesApi } from '@/lib/api/role/getRolesApi';
import { getRolePermsApi } from '@/lib/api/rolePerm/getRolePermsApi';
  import { onMounted, ref } from 'vue';

  const groupBy = [{ key: 'roleName' }]

  const emit = defineEmits<{
    (e: 'selected', item: typeof permRows.value[number]): void
  }>();

  const handleRowClick = (item: typeof permRows.value[number]) => {
    emit('selected', item);
  }

  const getRowProps = (row: any) => {
    return {
      onClick: () => handleRowClick(row.item),
    }
  }

  interface Perm {
    permissionId: number;
    permissionName: string;
    description: string;
  }

  const permRows = ref<(Perm & { roleId: number; roleName: string })[]>([]);

  const loadRoles = () => {
    getRolesApi().then(async (res) => {
      if (!res) return;

      const result: (Perm & { roleId: number; roleName: string })[] = [];

      for (const role of res) {
        const perms = await getRolePermsApi({ roleId: role.roleId }) ?? [];
        for (const perm of perms) {
          result.push({
            ...perm,
            roleId: role.roleId,
            roleName: role.roleName,
          });
        }
      }

      permRows.value = result;
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
    loadRoles();
  })
  </script>
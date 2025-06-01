<template>
  <SideContents :model-value="isPermDetailOpened" :key="selectedItem?.permissionId">
    <template v-slot:title>
      <v-row justify="space-between" align="center">
        <v-col>
          권한 상세
        </v-col>
        <v-col align="end">
          <UpdatePerm
            v-if="selectedItem"
            :perm-id="selectedItem.permissionId"
            :perm-name="selectedItem.permissionName"
          >
            <template v-slot:activator="{props}">
              <v-btn 
                v-bind="props"
                color="primary"
                variant="plain"
              >
                Edit
              </v-btn>
            </template>
          </UpdatePerm>
        </v-col>
      </v-row>
    </template>
    <DataCard :header="{title: selectedItem.permissionName, icon: 'mdi-'}" :data="selectedItem"></DataCard>
  </SideContents>

  <Card no-title no-text no-gutters>
    <v-data-table
      :headers="headers"
      :items="permRows"
      :group-by="groupBy"
      :row-props="getRowProps"
      :items-per-page="10"
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
import DataCard from '@/components/common/DataCard.vue';
import UpdatePerm from '@/components/data/UpdatePerm.vue';
import SideContents from '@/components/layout/SideContents.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { nextTick, onMounted, ref } from 'vue';

const groupBy = [{ key: 'roleName' }]

const emit = defineEmits<{
  (e: 'selected', item: typeof permRows.value[number]): void
}>();

const handleRowClick = async (item: typeof permRows.value[number]) => {
  selectedItem.value = item;
  isPermDetailOpened.value = false;
  await nextTick();
  isPermDetailOpened.value = true;
  emit('selected', item);
}

const getRowProps = (row: any) => {
  if (row.item.permissionId === 0) {
    return {};
  } else {
    return {
      onClick: () => handleRowClick(row.item),
    }
  }
}

const selectedItem = ref({
  roleId: 0,
  roleName: '',
  permissionId: 0,
  permissionName: '',
  description: ''
});
const isPermDetailOpened = ref(false);

interface Perm {
  permissionId: number;
  permissionName: string;
  description: string;
}

const permRows = ref<(Perm & { roleId: number; roleName: string })[]>([]);

const loadRoles = async () => {
  const res = await apiHandler.getRoleListApi();
  if (!res) return;

  const rolePermRows = await Promise.all(
    res.map(async (role) => {
      const perms = await apiHandler.getRolePermListApi({ roleId: role.roleId }) ?? [];

      if (perms.length === 0) {
        // 권한이 없는 경우 기본 row 생성
        return [{
          permissionId: 0,
          permissionName: '',
          description: '',
          roleId: role.roleId,
          roleName: role.roleName,
        }];
      }

      return perms.map(perm => ({
        ...perm,
        roleId: role.roleId,
        roleName: role.roleName,
      }));
    })
  );

  // 2차원 배열을 평탄화
  permRows.value = rolePermRows.flat();
}

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
});

defineExpose({
  loadRoles
});
</script>
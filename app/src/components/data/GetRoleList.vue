<template>
  <SideContents :model-value="isRoleDetailOpened" :key="selectedRole?.roleId" v-if="auth.hasPerm('ROLE_READ')">
    <template v-slot:title>
      <v-row justify="space-between" align="center">
        <v-col>
          역할 상세
        </v-col>
        <v-col align="end">
          <UpdateRole
            v-if="selectedRole"
            :role-id="selectedRole.roleId"
            :role-name="selectedRole.roleName"
            :onUpdate="loadRoles"
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
          </UpdateRole>
        </v-col>
      </v-row>
    </template>
    <DataCard :header="{title: selectedRole.roleName, icon: 'mdi-calendar-account-outline'}" :data="selectedRole">
      <template v-slot:item="{ item }">
        <tr v-if="!enableField.includes(item.field)">
          <th style="white-space: nowrap;">{{ item.field }}</th>
          <td class="text-right">{{ item.value }}</td>
        </tr>
      </template>
    </DataCard>
  </SideContents>

  <SideContents :model-value="isPermDetailOpened" :key="selectedItem?.permissionId" v-if="auth.hasPerm('PERM_READ')">
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
            :onUpdate="loadRoles"
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
    <DataCard :header="{title: selectedItem.permissionName, icon: 'mdi-security'}" :data="selectedItem">
      <template v-slot:item="{ item }">
        <tr v-if="!enableField.includes(item.field)">
          <th style="white-space: nowrap;">{{ item.field }}</th>
          <td class="text-right">{{ item.value }}</td>
        </tr>
      </template>
    </DataCard>
  </SideContents>

  <Card no-title no-text no-gutters v-if="auth.hasPerm('ROLE_READ')">
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
              <div>
                <v-btn
                  icon="mdi-pencil"
                  color="medium-emphasis"
                  density="comfortable"
                  size="small"
                  variant="plain"
                  @click="handleRoleClick({roleId: item.items[0].raw.roleId, roleName: item.items[0].raw.roleName})" 
                  data-test="btn-edit-item"
                  class="mr-2"
                  v-if="auth.hasPerm('ROLE_UPDATE')"
                />
                <v-btn
                  :icon="isGroupOpen(item) ? '$expand' : '$next'"
                  color="medium-emphasis"
                  density="comfortable"
                  size="small"
                  variant="plain"
                  @click="toggleGroup(item)" 
                  data-test="btn-expend-item"
                  v-if="auth.hasPerm('ROLE_PERMISSION_READ')"
                />
              </div>
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
import UpdateRole from '@/components/data/UpdateRole.vue';
import SideContents from '@/components/layout/SideContents.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { nextTick, onMounted, ref } from 'vue';

const groupBy = [{ key: 'roleName' }]

const emit = defineEmits<{
  (e: 'selected', item: typeof permRows.value[number]): void
}>();

const auth = useAuthStore(); 

const handleRoleClick = async (item: {roleId: number, roleName: string}) => {
  selectedRole.value = item;
  isRoleDetailOpened.value = false;
  await nextTick();
  isRoleDetailOpened.value = true;
  // emit('selected', item);
}

const handleRowItemClick = async (item: typeof permRows.value[number]) => {
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
      onClick: () => handleRowItemClick(row.item),
    }
  }
}

const selectedRole = ref({
  roleId: 0,
  roleName: ''
});

const selectedItem = ref({
  roleId: 0,
  roleName: '',
  permissionId: 0,
  permissionName: '',
  description: ''
});

const isRoleDetailOpened = ref(false);
const isPermDetailOpened = ref(false);

interface Perm {
  permissionId: number;
  permissionName: string;
  description: string;
}

// const roleRow = ref<{ roleId: number; roleName: string }[]>([]);
const permRows = ref<(Perm & { roleId: number; roleName: string })[]>([]);

const loadRoles = async () => {
  // 열려 있는 사이드 컨텐츠 닫기
  isRoleDetailOpened.value = false;
  isPermDetailOpened.value = false;

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

const enableField = [
  'permissionId',
  'roleId',
]

onMounted(() => {
  loadRoles();
});

defineExpose({
  loadRoles
});
</script>
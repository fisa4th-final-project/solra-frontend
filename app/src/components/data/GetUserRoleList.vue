<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'roleName', icon: 'mdi-card-account-details'}"
    :detail="{enable: true}"
    @selected="selected"
    @is-empty="isEmpty"
    v-if="auth.hasPerm('USER_ROLE_READ')"
    ref="$userRoleList"
  >
    <template v-slot:detailTitle>
      <v-row justify="space-between" align="center">
        <v-col>
          사용자 역할 상세
        </v-col>
        <v-col align="end">
          <DeleteUserRole 
            :user="{userId: req.userId}" 
            :role="{
              roleId: selectedItem?.roleId ?? 0, 
              roleName: selectedItem?.roleName ?? ''
            }"
            :onUpdate="$userRoleList?.loadData"
          />
        </v-col>
      </v-row>
    </template>
    <template v-slot:detail>
      <GetUserRoleDetail :data="{roleName: selectedItem?.roleName ?? '역할'}" />
    </template>
    <template v-slot:item="{ item }">
      <tr v-if="!hideField.includes(item.field)">
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCardList>
  <v-row v-else>
    <v-col>

      <Card no-title>
        <template v-slot:text>
          <v-row >
            <v-col align="center">
              조회 권한이 없습니다.
            </v-col>
          </v-row>
        </template>
      </Card>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>

import Card from '@/components/common/Card.vue';
import DataCardList from '@/components/common/DataCardList.vue';
import DeleteUserRole from '@/components/data/DeleteUserRole.vue';
import GetUserRoleDetail from '@/components/data/GetUserRoleDetail.vue';
import type { GetUserRoleByUserIdQueryParam, GetUserRoleByUserIdResponseDto } from '@/lib/api/userRole/UserRoleDto';

import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const auth = useAuthStore();

defineProps<{
  req: GetUserRoleByUserIdQueryParam;
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetUserRoleByUserIdResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>();

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const selected = (item: GetUserRoleByUserIdResponseDto) => {
  selectedItem.value = item;
  emit('selected', item);
}

const $userRoleList = ref();

const selectedItem = ref<GetUserRoleByUserIdResponseDto>();

const dataHandler = async (req: GetUserRoleByUserIdQueryParam) => {
  const res = await apiHandler.getUserRoleByUserIdApi(req);
  if (!res) return
  return res
};

const hideField = [
  'userId',
  'roleId',
]

defineExpose({
  loadData: async () => await $userRoleList.value?.loadData?.()
});

</script>

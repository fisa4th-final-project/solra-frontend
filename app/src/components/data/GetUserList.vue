<template>
  <Card no-title no-text no-gutters>
    <v-data-table-server
      :headers="headers"
      :items="userItems"
      :items-length="userItemsTotal"
      @update:options="loadUser"
      :row-props="getRowProps"
      :page="page"
      :items-per-page="size"
      ripple
      hover
    >
     
    </v-data-table-server>
  </Card>
  <SideContents v-model="isOpenUserDetail">
    <template v-slot:title>
      <v-row justify="space-between" align="center">
        <v-col>
          {{ `${selectedUser.organizationName} / ${selectedUser.departmentName} - ${selectedUser.userName}` }}
        </v-col>
        <v-col align="end">
          <UpdateUser v-if="selectedUser && selectedUser.userId" :user-id="selectedUser.userId">
            <template v-slot:activator="{props}">
              <v-btn 
              v-bind="props"
              color="primary"
              variant="plain"
              >
                Edit
              </v-btn>
            </template>
          </UpdateUser>
        </v-col>
      </v-row>
    </template>
    <v-row>
      <v-col>

        <GetUserDetail v-if="selectedUser && selectedUser.userId" :user-id="selectedUser.userId"/>
      </v-col>
    </v-row>
  
  </SideContents>
  
</template>

<script lang="ts" setup>

import Card from '@/components/common/Card.vue';
import GetUserDetail from '@/components/data/GetUserDetail.vue';
import UpdateUser from '@/components/data/UpdateUser.vue';
import SideContents from '@/components/layout/SideContents.vue';
import { getUserListApi } from '@/lib/api/user/getUserListApi';
import type { GetUserListResContent } from '@/lib/api/user/userDto';
import { ref, watch } from 'vue';

const props = defineProps<{
  req?: {
    orgId?: number;
    deptId?: number;
  }
}>();

const emit = defineEmits<{
  (e: 'selected', item: typeof userItems.value[number]): void
}>();

const handleRowClick = (item: typeof userItems.value[number]) => {
  selectedUser.value = item;
  isOpenUserDetail.value = true;
  console.log(item);
  emit('selected', item);
}

const getRowProps = (row: any) => {
  return {
    onClick: () => handleRowClick(row.item),
  }
}

const selectedUser = ref();

const isOpenUserDetail = ref(false);

const userItems = ref<GetUserListResContent[]>([] as GetUserListResContent[]);

const userItemsTotal = ref<number>(0);

const size = ref(3);
const page = ref(1);

const loadUser = (options?: any) => {
  if (options) {
    page.value = options.page;
    size.value = options.itemsPerPage;
  }
  getUserListApi({
    ...props.req,
    page: page.value - 1,
    size: size.value,
  }).then((res) => {
    if (!res) return;
    userItems.value = res.content.map((user) => {
      if (!user.organizationName) {
        user.organizationName = '무소속';
      }
      if (!user.departmentName) {
        user.departmentName = '미배정';
      }
      return user;
    });
    userItemsTotal.value = res.totalElements;
  });
}

const headers: {
  title: string;
  key: string;
  align: 'start' | 'end';
}[] = [
  { 
    title: '조직',
    key: 'organizationName',
    align: 'start'
  },
  { 
    title: '부서',
    key: 'departmentName',
    align: 'start'
  },
  { 
    title: '성명',
    key: 'userName',
    align: 'start'
  },
  { 
    title: '사용자 id',
    key: 'userLoginId',
    align: 'start'
  },
  { 
    title: 'email',
    key: 'email',
    align: 'start'
  }
]

watch(() => [props.req?.deptId, props.req?.orgId], () => {
  loadUser();
})
</script>
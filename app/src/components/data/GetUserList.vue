<template>
  <Card no-title no-text no-gutters>
    <v-data-table-server
      :headers="headers"
      :items="userItems"
      :items-length="userItemsTotal"
      @update:options="loadUser"
      :row-props="getRowProps"
      ripple
      hover
    >

    </v-data-table-server>
  </Card>
</template>

<script lang="ts" setup>

  import Card from '@/components/common/Card.vue';
  import { getUsersApi } from '@/lib/api/user/getUsersApi';
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'selected', item: typeof userItems.value[number]): void
  }>();

  const handleRowClick = (item: typeof userItems.value[number]) => {
    emit('selected', item);
  }

  const getRowProps = (row: any) => {
    return {
      onClick: () => handleRowClick(row.item),
    }
  }

  const userItems = ref<{
    userId: number,
    orgName: string,
    deptName: string,
    userName: string,
    userLoginId: string,
    email: string,
  }[]>([]);

  const userItemsTotal = ref<number>(0);

  const loadUser = () => {
    getUsersApi({
      page: 0,
      size: 0
    }).then((res) => {
      if (!res) return;
      userItems.value = res.content.map((user) => {
        return {
          userId: user.userId,
          orgName: user.organizationId ? user.organizationId.toString(): '우리카드',
          deptName: user.departmentId ? user.departmentId.toString() : '인프라 통합',
          userName: user.userName,
          userLoginId: user.userLoginId,
          email: user.email,
        }
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
      key: 'orgName',
      align: 'start'
    },
    { 
      title: '부서',
      key: 'deptName',
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
</script>
<template>
  <v-container>
    <v-row no-gutters class="ga-5">
      <v-col cols="12">
        <Card no-title no-text no-gutters>
          <Form>
            <Search 
              @data="getData"
              :apiHandler="async () => {return 'hi'}"
              type="text"
              label="사용자 이름, email, ETC"
            />
            <template v-slot:submit>
              <div></div>
            </template>
          </Form>
        </Card>
      </v-col>
      <v-col>
        <Card no-title no-text no-gutters>
          <v-data-table-server
            :headers="headers"
            :items="userItems"
            :items-length="userItemsTotal"
            @update:options="loadUser"
          >

          </v-data-table-server>
        </Card>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import Search from '@/components/common/Search.vue';
  import Card from '@/components/common/Card.vue';
  import Form from '@/components/common/Form.vue';
  
  import { getUsersApi } from '@/lib/api/user/getUsersApi';

  const userItems = ref<{
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
          orgName: user.organizationId ? user.organizationId.toString(): '우리카드',
          deptName: user.departmentId ? user.departmentId.toString() : '인프라 통합',
          userName: user.userName,
          userLoginId: user.userName,
          email: user.userName,
        }
      });
      userItemsTotal.value = res.totalElements;
    });
  }
  
  const getData = (result: any) => {
    console.log('검색 결과:', result)
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

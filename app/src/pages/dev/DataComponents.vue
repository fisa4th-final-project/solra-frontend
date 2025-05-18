<template>
  <div class="d-flex flex-column ga-10">
    <!-- user -->
    <div class="d-flex flex-column ga-10 pa-0">
      <h1>사용자</h1>
      <div>
        <h2>getUserList</h2>
        <GetUserList @selected="selectUser"/>
      </div>

      <div>
        <h2>getUser</h2>
        <GetUserDetail :user-id="user.userId" />
      </div>

      <v-row justify="space-between">
        <v-col cols="4">
          <h2>createUser</h2>
          <CreateUser />
        </v-col>
        <v-col cols="4">
          <h2>updateUser</h2>
          <UpdateUser :user-id="user.userId" />
        </v-col>
        <v-col cols="4">
          <h2>deleteUser</h2>
          <DeleteUser :user="user"/>
        </v-col>
      </v-row>

    </div>
    <!-- user -->

    <v-divider />

    <!-- user group -->
    <div class="d-flex flex-column ga-10 pa-0">
      <h1> 사용자 그룹 </h1>
      <v-row justify="space-between">
        <v-col cols="6">
          <h2>SelectOrgList</h2>
          <SelectOrgList :form="userGroupForm" /> 
        </v-col>
        
        <v-col cols="6">
          <h2>SelectDeptList</h2>
          <SelectDeptList :org-id="userGroupForm.org.orgId" :form="userGroupForm" />
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="4">
          <h2>createOrg</h2>
          <CreateOrg />
        </v-col>
        <v-col cols="4">
          <h2>updateOrg</h2>
          <UpdateOrg :org-id="userGroupForm.org.orgId" />
        </v-col>
        <v-col cols="4">
          <h2>deleteOrg</h2>
          <DeleteOrg :org="userGroupForm.org"/>
        </v-col>
        <v-col cols="4">
          <h2>createDept</h2>
          <CreateDept />
        </v-col>
        <v-col cols="4">
          <h2>updateDept</h2>
          <UpdateDept :dept-id="userGroupForm.dept.deptId" />
        </v-col>
        <v-col cols="4">
          <h2>deleteDept</h2>
          <DeleteDept :dept="userGroupForm.dept"/>
        </v-col>
      </v-row>

    </div>
    <!-- org -->

  </div>
</template>

<script lang="ts" setup>
import CreateUser from '@/components/data/CreateUser.vue';
import DeleteUser from '@/components/data/DeleteUser.vue';
import GetUserDetail from '@/components/data/GetUserDetail.vue';
import GetUserList from '@/components/data/GetUserList.vue';
import UpdateUser from '@/components/data/UpdateUser.vue';
import SelectOrgList from '@/components/data/SelectOrgList.vue';
import SelectDeptList from '@/components/data/SelectDeptList.vue';

import { ref } from 'vue';
import CreateOrg from '@/components/data/CreateOrg.vue';
import CreateDept from '@/components/data/CreateDept.vue';
import UpdateOrg from '@/components/data/UpdateOrg.vue';
import UpdateDept from '@/components/data/UpdateDept.vue';
import DeleteOrg from '@/components/data/DeleteOrg.vue';
import DeleteDept from '@/components/data/DeleteDept.vue';

interface userRef {
  userId: number;
  userLoginId: string;
}
const user = ref<userRef>({} as userRef);
const selectUser = (item: any) => {
  user.value = {
    userId: item.userId,
    userLoginId: item.userLoginId
  }
}

const userGroupForm = ref({
  org: {
    orgId: 0,
    orgName: '',
  },
  dept: {
    deptId: 0,
    deptName: '',
  }
});

</script>
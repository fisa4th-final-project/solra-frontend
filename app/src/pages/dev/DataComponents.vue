<template>
  <v-container class="d-flex flex-column ga-15">
    <!-- user -->
    <v-container class="d-flex flex-column ga-10 pa-0">
      
      <div>
        <h1>getUserList</h1>
        <GetUserList @selected="selectUser"/>
      </div>

      <div>
        <h1>getUser</h1>
        <GetUserDetail :user-id="user.userId" />
      </div>

      <v-row justify="space-between">
        <div>
          <h1>createUser</h1>
          <CreateUser />
        </div>

        <div>
          <h1>updateUser</h1>
          <UpdateUser :user-id="user.userId" />
        </div> 
        
        <div>
          <h1>deleteUser</h1>
          <DeleteUser :user="user"/>
        </div>
      </v-row>

    </v-container>
    <!-- user -->

  </v-container>
</template>

<script lang="ts" setup>
import CreateUser from '@/components/data/CreateUser.vue';
import DeleteUser from '@/components/data/DeleteUser.vue';
import GetUserDetail from '@/components/data/GetUserDetail.vue';
import GetUserList from '@/components/data/GetUserList.vue';
import UpdateUser from '@/components/data/UpdateUser.vue';
import { ref } from 'vue';

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

</script>
<template>
  <v-container
    class="pa-0 d-flex flex-column ga-5"
  >
    <v-row no-gutters justify="space-between" class="ga-5">
      <v-col>
        <v-card
          theme="light"
          rounded="lg"
          flat
          class="h-100"
          style="
            padding: 20px 0;
            border: 2px solid #DFE0EB;
            "
        >
        {{ user.organizationId }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          theme="light"
          rounded="lg"
          flat
          class="h-100"
          style="
            padding: 20px 0;
            border: 2px solid #DFE0EB;
            "
        >
        {{ user.departmentId }}
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          theme="light"
          rounded="lg"
          flat
          style="
            padding: 20px 0;
            border: 2px solid #DFE0EB;
            "
        >
          <v-row no-gutters>
            <v-col class="d-flex flex-column ga-5">
              <v-row no-gutters class="pl-4 pr-4" align="center">
                <v-col align="start">
                  <span class="text-h6">
                    사용자 상세
                  </span>
                </v-col>
                <v-col align="end" >
                  <span
                    class="text-caption"
                    :style="{ 
                      color: theme.colors.primary,
                      cursor: 'pointer'
                    }"
                    @click="editUser"
                  >Edit</span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="d-flex flex-column ga-2">
                  <v-row no-gutters class="pl-4 pr-4">
                    <v-col>조직</v-col>
                    <v-col align="end">{{ user.organizationId ? user.organizationId : '미배정' }}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row no-gutters class="pl-4 pr-4">
                    <v-col>부서</v-col>
                    <v-col align="end">{{ user.departmentId ? user.departmentId : '미배정' }}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row no-gutters class="pl-4 pr-4">
                    <v-col>사용자 ID</v-col>
                    <v-col align="end">{{ user.userLoginId }}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row no-gutters class="pl-4 pr-4">
                    <v-col>사용자 이름</v-col>
                    <v-col align="end">{{ user.userName }}</v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row no-gutters class="pl-4 pr-4">
                    <v-col>email</v-col>
                    <v-col align="end">{{ user.email }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters justify="space-between" class="ga-5">
      <v-col>
        <v-card
          theme="light"
          flat
          rounded="lg"
          style="
            padding: 20px 0;
            border: 2px solid #DFE0EB;
            "
        >
        <v-row no-gutters>
          
          <v-col class="d-flex flex-column ga-5">
            <v-row no-gutters class="pl-4 pr-4" align="center">
              <v-col align="start">
                <span class="text-h6">
                  사용자 권한 목록
                </span>
              </v-col>
              <v-col align="end">
                <span
                class="text-caption"
                :style="{ 
                  color: theme.colors.primary,
                  cursor: 'pointer'
                }"
              >Edit</span>
            </v-col>
          </v-row>
          
          <v-row no-gutters>
            <v-col>
              <v-row 
                no-gutters
                v-for="role in roles"
              >
                {{ role.roleName }}
              </v-row>
            </v-col>
            </v-row>
          </v-col>
        </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn
          flat
          color="red"
          class="font-weight-bold"
          @click="deleteUser"
        >삭제</v-btn>
        <Dialog v-if="dialog.getType === 'deleteUser'">
          <template v-slot:title>
            사용자를 삭제하시겠습니까?
          </template>
          <template v-slot:default>
            사용자 ID: {{ user.userLoginId }} 
          </template>
          <template v-slot:actions>
            <v-btn-group>
              <v-btn
                color="gray"
                @click="dialog.close()"
              >취소</v-btn>
              <v-btn
                color="red"
                @click="deleteUserApi({userId: user.userId})"
              >삭제</v-btn>
            </v-btn-group>
          </template>
        </Dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
  import Dialog from '@/components/common/Dialog.vue';
  import { getUserDetailApi } from '@/lib/api/user/getUserDetailApi';
  import type { GetUserDetailResponseDto } from '@/lib/api/user/userDto';
  import { getUserRoleByUserIdApi } from '@/lib/api/userRole/getUserRoleApi';
  import type { GetUserRoleByUserIdResponseDto } from '@/lib/api/userRole/UserRoleDto';
  import {router} from '@/router'
  import { useDialogStore } from '@/store/dialog';
  import { useTargetUserStore } from '@/store/targetUser';
  import { onMounted, ref } from 'vue';
  import { useTheme } from 'vuetify';
  import { deleteUserApi } from '@/lib/api/user/deleteUserApi';

  const theme = useTheme().current.value;
  const dialog = useDialogStore();
  const targetUser = useTargetUserStore();
  const userId = router.currentRoute.value.params.userId;
  const user = ref<GetUserDetailResponseDto>({
    userId: 0,
    userName: '',
    userLoginId: '',
    email: '',
    departmentId: undefined,
    organizationId:undefined
  });

  onMounted(async () => { 
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) return;
    getUserDetailApi({
      userId: parsedUserId
    }).then( (res) => {      
      if (!res) return;
      user.value = res;
    });
  });

  const roles = ref<GetUserRoleByUserIdResponseDto[]>([]);

  onMounted(async () => {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) return;
    getUserRoleByUserIdApi({
      userId: parsedUserId
    }).then( (res) => {
      if (!res) return;
      roles.value = res;
    })
  });

  function editUser() {

    targetUser.setUser({
      userId: user.value.userId,
      userLoginId: user.value.userLoginId,
      userName: user.value.userName,
      email: user.value.email
    })
    router.push({
      name: 'PatchUser'
    });
  }

  function deleteUser() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteUser'
    })
  }
</script>

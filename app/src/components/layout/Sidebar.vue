<script lang="ts" setup>
  import { logoutApi } from '@/lib/api/user/logoutApi';
  import { whomiApi } from '@/lib/api/user/whomiApi';
  import { sidebarMenus } from '@/lib/global/menus';
  import { useToggleTheme } from '@/lib/global/setTheme';
  import { useAuthStore } from '@/store/auth';
  import { ref } from 'vue'

  const auth = useAuthStore();
  whomiApi();

  console.log(sidebarMenus)
  // ---- Mock Auth ----

  auth.login({
    userId: 1,
    orgId: 2,
    deptId: 3,
    roles: [
      {
        roleId: 1,
        roleName: 'org-admin',
        description: '조직관리자',
        createdAt: '2025-05-12'
      },
      {
        roleId: 2,
        roleName: 'dept-admin',
        description: '부서관리자',
        createdAt: '2025-05-12'
      },
      {
        roleId: 3,
        roleName: 'proj-admin',
        description: '조직관리자',
        createdAt: '2025-05-12'
      },
      {
        roleId: 4,
        roleName: 'dev',
        description: '개발자',
        createdAt: '2025-05-12'
      },
      {
        roleId: 5,
        roleName: 'root',
        description: '루트',
        createdAt: '2025-05-12'
      }
    ]
  })
  
  // ---- Mock Auth ----

  const { toggleTheme, isDark } = useToggleTheme();

  const drawer = ref(true);
  const rail = ref(true);

</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    class="d-flex flex-column"
  >
    <div>
      <v-list-item
        prepend-icon="mdi-weather-sunny" 
        value="/"
        style="
          padding-top: 20px;
          padding-bottom: 20px;
        "
      >
        <v-list-item-title
          class="text-h6"
          style="
            line-height: 1;
          "
        >
          S O L R A
        </v-list-item-title>
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-list-item
        prepend-icon="mdi-account-circle"
        style="
          padding-top: 20px;
          padding-bottom: 20px;
        "
      >
        <v-list-item-title>
          {{ auth.getMe.orgName }} / {{ auth.getMe.deptName }}
        </v-list-item-title>
        <v-list-item-title>
          {{ auth.getMe.userName }}
        </v-list-item-title>
      </v-list-item>


      <v-divider></v-divider>


      <v-list 
        density="default"
      >
        <v-list-item
          v-for="menu in sidebarMenus"
          :key="menu.to"
          :title="menu.title"
          :prepend-icon="menu.icon"
          :to="menu.to" 
          exact
          link
        />
        
      </v-list>
    </div>
    <div
      class="mt-auto"
    >
      <v-list-item prepend-icon="mdi-dots-horizontal-circle-outline">

        <v-btn-group
          rounded="xl"
          variant="outlined"
          
        >
          <v-btn icon @click="toggleTheme">
            <v-icon>{{ isDark() ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
          <v-btn 
            icon="mdi-logout"
            @click="logoutApi"
          >
          </v-btn>
          
        </v-btn-group>
      </v-list-item>

    </div>
  </v-navigation-drawer>
</template>


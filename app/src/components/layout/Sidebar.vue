<script lang="ts" setup>
  import { logoutApi } from '@/lib/api/user/logoutApi';
  import { whomiApi } from '@/lib/api/user/whomiApi';
  import { sidebarMenus } from '@/lib/global/menus';
  import { useAuthStore } from '@/store/auth';
  import { computed, reactive, ref, watch } from 'vue'
  import { useTheme } from 'vuetify'


  const theme = useTheme().current.value;
  const auth = useAuthStore();
  await whomiApi();
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
      }
    ]
  })
  
  // ---- Mock Auth ----


  const userRoles = computed(() => auth.getRoles).value;
  const filteredMenus = computed(() => 
    sidebarMenus.filter(menu => 
      menu.roles.includes('ALL') 
      || menu.roles.some(menuRole => 
        userRoles.some((userRole) => userRole.roleName == menuRole)
      )
    )
    .map(menu => ({
      ...menu,
      children: menu.children
        ? menu.children.filter(child => 
          child.roles.some(menuRole => 
            userRoles.some((userRole) => userRole.roleName == menuRole)
          )
        )
        : []
    }))
  );

  const drawer = ref(true);
  const rail = ref(true);
  
  const openGroups = reactive<Record<string, boolean>>({});

  watch(openGroups, (val) => {
    console.log(val);

  }, { deep: true })


</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    :style="{backgroundColor: theme.colors.background}"
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
        <v-list-item-title
          :style="{
            fontSize: '0.8rem',
            color: theme.colors.textGray
          }"
        >

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
        <v-list-group 
          v-for="menu in filteredMenus"
          :key="menu.to"
        >
          <template v-slot:activator="{ props }" >
            <v-list-item
              v-bind="props"
              :key="menu.to"
              :title="menu.title"
              :prepend-icon="menu.icon"
              :to="menu.to" 
              exact
              link
            />
          </template>

          <v-list-item    @click="rail = false"
          
            v-for="sub in menu.children"
            :title="sub.title"
            :key="sub.to"
            :to="sub.to"
            :color=theme.colors.primary
            exact
            link
          >
          </v-list-item>
        </v-list-group>
        
      </v-list>
    </div>
    <div
      class="mt-auto"
    >
      <v-btn-group
        rounded="xl"
        variant="outlined"
        
      >
        <v-btn 
          icon="mdi-logout"
          @click="logoutApi"
        >
        </v-btn>
      </v-btn-group>
    </div>
  </v-navigation-drawer>
</template>


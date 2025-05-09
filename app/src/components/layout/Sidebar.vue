<script lang="ts" setup>
  import { ref } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme().current.value;

  const drawer = ref(true);
  const rail = ref(true);
  // const backgroundColor = ref(theme.colors.background);
  
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
    :style="{backgroundColor: theme.colors.background}"
  >
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
        }
        "
      >
      <!-- 
      todo:
      1. userStore 생성
      2. { org / dept } 동적 주입
      3. { username? or id } 동적 주입
      -->
        우리FIS / 인프라 통합
      </v-list-item-title>
      <v-list-item-title>
        dyoun12
      </v-list-item-title>
    </v-list-item>


    <v-divider></v-divider>

    <v-list density="default">
      <v-list-item 
        to="/dashboard" exact 
        prepend-icon="mdi-view-dashboard" 
        title="대시보드"
        color="primary">
      </v-list-item>
      <v-list-item 
        to="/user" exact 
        prepend-icon="mdi-account-group" 
        title="사용자"
        color="primary">
      </v-list-item>
      <v-list-item 
        to="/workload" exact 
        prepend-icon="mdi-cube" 
        title="워크로드"
        color="primary">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


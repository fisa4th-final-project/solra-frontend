<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <v-app>

    <v-layout>
      <Sidebar/>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style lang="scss" scoped>
.v-layout {
  width: 100vw;
}
</style>

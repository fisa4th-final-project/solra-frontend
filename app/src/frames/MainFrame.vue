<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="main-frame">
    <Sidebar />
    <div class="content">
      <h1>hiu</h1>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.main-frame {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>

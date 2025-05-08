<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="main-frame">
    <Sidebar />
    <div class="content">
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

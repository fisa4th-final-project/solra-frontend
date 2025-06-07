<template>
  <div class="snackbar-container">
    <transition-group name="slide-up" tag="div">
      <v-snackbar
        v-for="(snack, _index) in resStore.queue"
        :key="snack.id"
        v-model="snack.show"
        :timeout="snack.timeout ?? 3000"
        :color="snack.color ?? 'primary'"
        location="bottom"
        class="mb-2"
      >
        <div>{{ snack.text }}</div>
      </v-snackbar>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { useResStore } from '@/store/response'

const resStore = useResStore()
</script>

<style scoped>
.snackbar-container {
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 3000;
  display: flex;
  flex-direction: column-reverse; /* 아래부터 위로 쌓이게 */
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

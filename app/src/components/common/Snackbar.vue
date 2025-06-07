<template>
  <div class="alert-container">
    <transition-group name="slide-fade" tag="div" class="alert-stack">
      <v-alert
        v-for="(item, index) in alerts"
        :key="item.id"
        :type="item.success"
        closable
        width="400px"
        elevation="10"
        @click:close="removeAlert(item.id)"
        class="mb-2"
      >
        {{ item.text }}
      </v-alert>
    </transition-group>
  </div>
</template>

<script setup>
import { useResStore } from '@/store/response'
import { computed, watch } from 'vue'

const resStore = useResStore();
const alerts = computed(() => resStore.queue)
watch(
  () => resStore.queue,
  (newQueue) => {
    for (const item of newQueue) {
      if (!item._timeoutSet) {
        item._timeoutSet = true
        const timeout = item.timeout ?? 3000
        setTimeout(() => {
          resStore.remove(item.id)
        }, timeout)
      }
    }
  },
  { deep: true, immediate: true }
)

function removeAlert(id) {
  resStore.remove(id)
}
</script>

<style scoped>
.alert-container {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 9999;
}

.alert-stack {
  display: flex;
  flex-direction: column;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>

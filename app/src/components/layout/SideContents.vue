<template>
  <v-dialog 
    transition="slide-x-reverse-transition"
    v-model="isOpen"
    height="100%"
    width="700px"
    opacity=".05"
    class="side-dialog"
    elevation-24
  >
    <template v-slot:activator="{ props }">
      <slot name="activator" :props="props"></slot>
    </template>

    <Card>
      <template v-slot:title>
        <v-row no-gutters class="ga-5" align="center">
          <v-btn 
            @click="isOpen=false"
            icon="mdi-chevron-right" 
            flat 
          />
          <slot name="title"></slot>
        </v-row>
      </template>
      <slot></slot>
    </Card>

  </v-dialog>
</template>
<script lang="ts" setup>

import Card from '@/components/common/Card.vue';
import { ref } from 'vue';

defineProps<{
  activator?: string;
}>();

const isOpen = ref(false);

defineExpose({
  isOpen
})
</script>

<style scoped>
  .v-dialog >>> .v-overlay__content {
    position: absolute !important;
    right: 0 !important;
  }
</style>
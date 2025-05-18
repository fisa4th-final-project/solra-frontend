<template>
  <v-dialog 
    transition="slide-x-reverse-transition"
    v-model="dialog"
    height="100%"
    width="50%"
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
            @click="dialog=false"
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

  const dialog = ref(false);

</script>

<style scoped>
  .v-dialog >>> .v-overlay__content {
    position: absolute !important;
    right: 0 !important;
  }
</style>
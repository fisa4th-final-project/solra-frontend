<template>
  <v-card theme="light" rounded="lg" flat
    :color="color"
    style="
      padding: 20px 0;
      border: 2px solid #DFE0EB;
    "
  >
    <slot name="title">
    </slot>
    <slot>
    </slot>
  </v-card>
</template>
<script lang="ts" setup>
  defineProps<{
    color?: string
  }>()
</script>
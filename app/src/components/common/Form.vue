<template>
  <v-form @submit.prevent="emit('submit')" ref="form">
    <slot></slot>
    
    <slot name="submit">
      <v-btn type="submit" color="primary">저장</v-btn>
    </slot>
  </v-form>
</template>

<script setup lang="ts">
const emit = defineEmits(['submit'])
</script>

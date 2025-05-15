<template>

    <v-form 
      @submit.prevent="async () => {
        emit('data', apiHandler());
      }"
    >
      <v-text-field 
        v-model="input"
        :label=label
        rounded="lg"
        type="text"
        density="default"
        clearable
        variant="outlined"
        theme="light"
        hide-details
        bg-color="white"
        :color="theme.colors.primary"
      >
        <template v-slot:prepend-inner="{ isFocused }">
          <v-icon
            :color="isFocused.value ? theme.colors.primary : 'black'"
          >
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>
    </v-form>

</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useTheme } from 'vuetify';

  defineProps<{
    apiHandler: () => void
    label: string
  }>();

  const emit = defineEmits<{
    (e: 'data', result: any): void
  }>();

  const theme = useTheme().current.value;
  const input = ref('');

</script>

<style scoped>

  ::v-deep(.v-field__outline) {
    --v-field-border-width: 2px; 
    color: #DFE0EB;
    opacity: 1;
  }
  ::v-deep(.v-field__outline) {
    --v-field-border-width: 2px; 
    --v-field-border-opacity: 1;
    color: #DFE0EB;
  }
</style>
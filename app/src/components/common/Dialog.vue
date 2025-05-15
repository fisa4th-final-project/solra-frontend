<template>
  <v-dialog 
    v-model="dialogStore.showDialog" 
    min-width="400"
    theme="light"
    
  >
    <v-card
      rounded="lg"
      flat
      style="
        padding: 20px 0;
        border: 2px solid #DFE0EB;
        "
    >
      <v-card-title class="text-h5">
        <slot name="title">
          {{ dialogStore.dialogTitle }}
        </slot>
      </v-card-title>

      <v-card-text>
        <slot name="default">
          {{ dialogStore.dialogMessage }}
        </slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <slot name="actions">
          <v-btn text @click="dialogStore.close">확인</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialogStore } from '@/store/dialog';
const dialogStore = useDialogStore();


</script>
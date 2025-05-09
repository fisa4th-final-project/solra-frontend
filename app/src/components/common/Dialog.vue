<script setup lang="ts">
import { useDialogStore } from '@/store/dialog';
const dialogStore = useDialogStore();
</script>

<template>
  <v-dialog v-model="dialogStore.showDialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5">{{ dialogStore.dialogTitle }}</v-card-title>
      <v-card-text>{{ dialogStore.dialogMessage }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialogStore.close">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


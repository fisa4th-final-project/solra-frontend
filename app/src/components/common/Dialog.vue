<template>
  <v-dialog 
    v-model="dialogStore.showDialog" 
    max-width="400"
  >
    <Card>
      <template v-slot:title>
        <slot name="title">
          {{ dialogStore.dialogTitle }}
        </slot>
      </template>

      <template v-slot:text>
        <slot name="default">
          {{ dialogStore.dialogMessage }}
        </slot>
      </template>

      <template v-slot:actions>
        <v-card-actions>
          <slot name="actions">
            <v-btn text @click="dialogStore.close">확인</v-btn>
          </slot>
        </v-card-actions>
      </template>
    </Card>
  </v-dialog>
</template>

<script setup lang="ts">

import Card from '@/components/common/Card.vue';
import { useDialogStore } from '@/store/dialog';

const dialogStore = useDialogStore();

</script>
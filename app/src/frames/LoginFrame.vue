<template>
  <v-app >
    <v-layout>
      <v-main class="bg">
        <Dialog v-if="dialog.getType === 'loginframe'"></Dialog>
        <v-container height="100%">
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">

import Dialog from '@/components/common/Dialog.vue'
import { useDialogStore } from '@/store/dialog'

const dialog = useDialogStore();

</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(330deg, #0B192C  40%, #FF6500 110%);
  color: white;
}
.v-layout {
  width: 100vw;
}
</style>

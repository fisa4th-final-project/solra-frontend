<template>
  <v-card rounded="lg" flat :class="`${noGutters ? 'pa-0' : 'py-5'}`">
    <v-card-title v-if="!noTitle">
      <slot name="title"></slot>
    </v-card-title>

    <slot></slot>

    <v-card-text v-if="!noText">
      <slot name="text"></slot>
    </v-card-text>

    <slot name="actions"></slot>
  </v-card>
</template>

<script lang="ts" setup>

  defineProps<{
    noTitle?: boolean;
    noText?: boolean;
    noGutters?: boolean;
  }>();
</script>
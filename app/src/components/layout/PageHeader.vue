<template>
  <v-breadcrumbs 
    :items="items"
    style="
      font-size: large;
      padding: 0;
      padding-bottom: 30px;
    "
    :color="color"
  >
  <template v-slot:divider>
    <v-breadcrumbs-divider
    >
    <p :style="{color:color}">
      /
    </p>
    </v-breadcrumbs-divider>
  </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>

  export interface Item {
    title: string,
    disabled: boolean,
    href: string
  }

  defineProps<{
    items: Item[],
    color: string,
  }>();

</script>

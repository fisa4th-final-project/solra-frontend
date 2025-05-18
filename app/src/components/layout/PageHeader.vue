<template>
  <v-breadcrumbs 
    :items="items"
  >
  <template v-slot:divider>
    <v-breadcrumbs-divider
    >
      <v-icon>
        mdi-slash-forward
      </v-icon>      
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
    items: Item[]
  }>();

</script>

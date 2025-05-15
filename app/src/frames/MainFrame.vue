<template>
  <v-app >
    <v-layout>
      <Sidebar/>
      <v-main
      :style="{backgroundColor: theme.colors.backgroundLight}"
      >
        <Dialog v-if="dialog.getType === 'mainframe'"></Dialog>
        <v-container>
          <PageHeader 
          :items="routeStore.getBreadcrumbs"
          :color="theme.colors.text"
          />
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import Dialog from '@/components/common/Dialog.vue'
import type { Item } from '@/components/layout/PageHeader.vue'
import { useTheme } from 'vuetify'
import { router } from '@/router'
import { useRouteStore } from '@/store/route'
import { useDialogStore } from '@/store/dialog'

const theme = useTheme().current.value;
const dialog = useDialogStore();
const routeStore = useRouteStore();

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    const breadcrumb = router.currentRoute.value.meta.breadcrumb as Item[] | undefined;
    routeStore.setBreadcrumbs({ breadcrumbs: breadcrumb || [] });
    console.log(breadcrumb);
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>
.v-layout {
  width: 100vw;
}
</style>

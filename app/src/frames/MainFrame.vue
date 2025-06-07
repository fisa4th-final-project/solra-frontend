<template>
  <v-app >
    <v-layout>
      <Sidebar/>
      <v-main>
        <Dialog v-if="dialog.getType === 'mainframe'"></Dialog>
        <v-container height="100%">
          <PageHeader 
            :items="routeStore.getBreadcrumbs"
          />
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
    <SideContents />
    <Snackbar />
  </v-app>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import Sidebar from '@/components/layout/Sidebar.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import Dialog from '@/components/common/Dialog.vue'
import type { Item } from '@/components/layout/PageHeader.vue'

import { router } from '@/router'
import { useRouteStore } from '@/store/route'
import { useDialogStore } from '@/store/dialog'
import SideContents from '@/components/layout/SideContents.vue'
import Snackbar from '@/components/common/Snackbar.vue'

const dialog = useDialogStore();
const routeStore = useRouteStore();

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    const breadcrumb = router.currentRoute.value.meta.breadcrumb as Item[] | undefined;
    routeStore.setBreadcrumbs({ breadcrumbs: breadcrumb || [] });
  },
  { immediate: true }
);

</script>

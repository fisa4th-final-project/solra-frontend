<template>
  <v-container class="pa-0">
    <v-row no-gutters class="ga-5">
      <v-col>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            
            <Card 
              v-bind="props"
              :color="isHovering ? 'white': theme.colors.backgroundLight" 
              @click="">
              <v-row no-gutters justify="center" align="center">
                <v-icon :color="theme.colors.cardBorder" size="60">mdi-plus</v-icon>
              </v-row>
            </Card>
          </template>
        </v-hover>
      </v-col>
      <v-col
        v-for="dept in depts"
      >
        <Card>
          <template v-slot:title>
            <v-card-text
              class="pt-0 pb-0"
            >
              <v-chip
                size="x-small"
              >
                {{ 
                  orgs?.find((org) => 
                    org.orgId === dept.organizationId
                  )?.orgName
                }}
              </v-chip>
            </v-card-text>
          </template>
          <v-card-title class="pt-0">
            <v-row no-gutters justify="space-between" align="center">
              {{ dept.deptName }}
              <v-btn 
                icon="mdi-dots-horizontal"
                flat
                size="small"
                :to="`/admin/dept/${dept.deptId}`"
              ></v-btn>
            </v-row>
          </v-card-title>
        </Card>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script lang="ts" setup>
import Card from '@/components/common/Card.vue';
import type { GetDeptsResponseDto } from '@/lib/api/dept/deptDto';
import type { GetOrgsResponseDto } from '@/lib/api/org/orgDto';
import { getDeptsApi } from '@/lib/api/dept/getDeptsApi';
import { getOrgsApi } from '@/lib/api/org/getOrgsApi';
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme().current.value;

const orgs = ref<GetOrgsResponseDto[]>();
const depts = ref<GetDeptsResponseDto[]>();

onMounted(async () => {
  await getOrgsApi().then((resOrgs) => {
    if (!resOrgs) return;
    orgs.value = resOrgs;
    resOrgs.forEach(async (org) => {
      await getDeptsApi({
        org_id: org.orgId
      }).then((res) => {
        if (!res) return;
        depts.value = res;
      })
    });
  });
});
</script>

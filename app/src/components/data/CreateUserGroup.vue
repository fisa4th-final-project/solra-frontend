<template>
  <SideContents v-if="auth.hasPerm('ORG_CREATE') || auth.hasPerm('DEPT_CREATE')">
    <template v-slot:activator="{props}">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">CreateWorkload</v-btn>
      </slot>
    </template>
    <template v-slot:title>사용자 그룹 추가</template>
    <v-form v-model="valid">
      <Card no-text no-gutters>
        <template v-slot:title>
          <v-container>
            <v-row align="center" class="py-5">
              <v-col>
                <v-icon>mdi-office-building</v-icon>
                <span class="text-h6 pl-5">
                  조직 선택
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <CreateOrgInUserGroup 
          :form="form"
          ref="$createSvcRef"
          v-if="auth.hasPerm('ORG_CREATE')"
        />
      </Card>
      <v-spacer class="my-5" />
      <Card no-text no-gutters>
        <template v-slot:title>
          <v-container>
            <v-row align="center" class="py-5">
              <v-col>
                <v-icon>mdi-briefcase</v-icon>                
                <span class="text-h6 pl-5">
                  부서 추가
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <CreateDeptInUserGroup
          :org="form.org"
          ref="$createDeployRef"
          />
      </Card>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { ref, watch } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import Card from '@/components/common/Card.vue';
import CreateOrgInUserGroup from '@/components/data/CreateOrgInUserGroup.vue';
import CreateDeptInUserGroup from '@/components/data/CreateDeptInUserGroup.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const valid = ref(false);

const form = ref({
  org: {
    orgId: 0,
    orgName: ''
  }
});

watch(() => [form.value.org], () => {
  console.log(form.value.org);
});

</script>

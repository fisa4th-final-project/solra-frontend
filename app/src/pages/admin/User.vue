<template>
  <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          사용자
        </span>
      </v-col>
      <v-col align="end">
        <CreateUser>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :ripple="false"
              variant="plain"
              color="primary"
            >
              Add
            </v-btn>
          </template>
        </CreateUser>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <v-col cols="6">
          <SelectOrgList :form="form" />
        </v-col>
        <v-col cols="6">
          <SelectDeptList :form="form" :org-id=form.org.orgId />
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col>
        <GetUserList :req="{
          orgId: form.org.orgId ?? 0,
          deptId: form.dept.deptId ?? 0
        }"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import CreateUser from '@/components/data/CreateUser.vue';
import GetUserList from '@/components/data/GetUserList.vue';
import SelectDeptList from '@/components/data/SelectDeptList.vue';
import SelectOrgList from '@/components/data/SelectOrgList.vue';
import { ref } from 'vue';

const form = ref<{
  org: {
    orgId: number;
    orgName: string;
  },
  dept: {
    deptId: number;
    deptName: string;
  }
}>({
  org: {
    orgId: 0,
    orgName: ''
  },
  dept: {
    deptId: 0,
    deptName: ''
  }
});
</script>

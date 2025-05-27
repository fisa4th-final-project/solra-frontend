<template>
    <v-container height="100%">
    <v-row align="center">
      <v-col>
        <span class="text-h4">
          워크로드
        </span>
      </v-col>
      <v-col align="end">
        <CreateWorkload 
          :cluster="{clusterId: form.cluster.clusterId}" 
          :ns="{name: form.ns.name}" 
        >
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
        </CreateWorkload>
      </v-col>
    </v-row>
    <v-form v-model="valid">
      <v-row>
        <v-col cols="6">
          <SelectClusterList :form="form" />
        </v-col>
        <v-col cols="6">
          <SelectNSList :form="form" />
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col>
        <GetWorkloadList :req="{clusterId:form.cluster.clusterId, nsName: form.ns.name}"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import CreateWorkload from '@/components/data/CreateWorkload.vue';
import GetWorkloadList from '@/components/data/GetWorkloadList.vue';
import SelectClusterList from '@/components/data/SelectClusterList.vue';
import SelectNSList from '@/components/data/SelectNSList.vue';
import { ref } from 'vue';

const valid = ref(false);
const form = ref<{
  cluster: {
    clusterId: number;
    name: string;
  },
  ns: {
    name: string;
  }
}>({
  cluster: {
    clusterId: 0,
    name: ''
  },
  ns: {
    name: ''
  }
})
</script>
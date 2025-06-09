<template>
  <SideContents v-if="auth.hasPerm('SERVICE_CREATE')">
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createSvc</v-btn>
      </slot>
    </template>
    <template v-slot:title>서비스 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-card-subtitle>
        기본 정보
      </v-card-subtitle>
      <v-row>
        <v-col>
          <SelectClusterList :form="form" />
        </v-col>
        <v-col>
          <SelectNSList :form="form" />
        </v-col>
      </v-row>
      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        variant="underlined"
        label="서비스 이름"
        color="primary"
        clearable
        data-test="input-svc-name"
        />
        <v-text-field
        v-model="form.selector.app"
        :rules="[rules.required]"
        variant="underlined"
        label="연결할 리소스 이름"
        color="primary"
        clearable
        data-test="input-app-name"
        />
        <v-select
        v-model="form.type"
        :items="['NodePort', 'ClusterIP', 'LoadBalancer']"
        :rules="[rules.required, rules.portType]"
        variant="underlined"
        label="서비스 타입"
        color="primary"
        data-test="input-svc-type"
      />
      
      <v-card-subtitle>
        포트 정보
      </v-card-subtitle>
      <v-row v-for="(port, i) in form.ports" :key="i" dense justify="start" align="start" class="pt-2">
        <v-col cols="12" class="py-2">
          <v-text-field hide-details v-model="port.name" label="name" />
          <v-text-field hide-details v-model="port.protocol" label="Protocol" >
            <template v-slot:append-inner>
              <v-icon @click="removePort(i)">mdi-delete</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="4" v-if="form.type === 'NodePort'" class="py-0">
          <v-text-field hide-details v-model="port.nodePort" label="NodePort" type="number" />
        </v-col>
        <v-col :cols="form.type==='NodePort' ? 4 : 6" class="py-0">
          <v-text-field hide-details v-model="port.port" label="Port" type="number" />
        </v-col>
        <v-col :cols="form.type==='NodePort' ? 4 : 6" class="py-0">
          <v-text-field hide-details v-model="port.targetPort" label="TargetPort" type="number" />
        </v-col>
      </v-row>
        
      <v-row justify="center" align="center">
        <v-col align="center">
          <v-btn @click="addPort" flat block>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-btn
        :disabled="!valid"
        class="mt-4"
        type="submit"
        color="primary"
        block
      >
        등록
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import SelectClusterList from '@/components/data/SelectClusterList.vue';
import SelectNSList from '@/components/data/SelectNSList.vue';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  clusterId: number;
  nsName: string;
}>();

const valid = ref(false);

interface Port {
  name: string;
  protocol: string;
  port: number;
  targetPort: number;
  nodePort?: number;
}
const form = ref({
  cluster: {
    clusterId: 0,
    name: ''
  },
  ns: {
    name: ''
  },
  name: '',
  type: '',
  selector: {
    app: ''
  },
  ports: [] as Port[]
});

const addPort = () => {
  form.value.ports.push({
    name: '',
    protocol: '',
    port: 0,
    targetPort: 0
  })
}

const removePort = (index: number) => {
  form.value.ports.splice(index,1);
}

const submitForm = () => {
  apiHandler.createSvcApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    ...form.value
  });
}

defineExpose({
  form, valid, addPort
})
</script>

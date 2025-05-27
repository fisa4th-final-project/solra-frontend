<template>
  <v-card-subtitle>
    기본 정보
  </v-card-subtitle>
  <v-text-field
    v-model="form.name"
    :rules="[rules.required]"
    variant="underlined"
    label="서비스 이름"
    color="primary"
    clearable
  />
  <v-text-field
    v-model="form.selector.app"
    :rules="[rules.required]"
    variant="underlined"
    label="연결할 리소스 이름"
    color="primary"
    clearable
  />
  <v-select
    v-model="form.type"
    :items="['NodePort', 'ClusterIP', 'LoadBalancer']"
    :rules="[rules.required]"
    variant="underlined"
    label="서비스 타입"
    color="primary"
    clearable
  />
  
  <v-card-subtitle>
    포트 정보
  </v-card-subtitle>
  <v-row v-for="(port, i) in form.ports" :key="i" dense justify="start" align="start" class="pt-2">
    <v-col cols="12" class="py-2">
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

</template>
<script lang="ts" setup>

import { ref } from 'vue'
import { rules } from '@/lib/global/inputRules';
import { createSvcApi } from '@/lib/api/svc/createSvcApi';

const props = defineProps<{
  clusterId: number;
  nsName: string;
}>();

interface Port {
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
    protocol: '',
    port: 0,
    targetPort: 0
  })
}

const removePort = (index: number) => {
  form.value.ports.splice(index,1);
}

const submitSvc = () => {
  console.log('child')
  createSvcApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    ...form.value
  });
}

defineExpose({
  submitSvc
});

</script>

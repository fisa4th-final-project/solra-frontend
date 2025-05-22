<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdateSvc</v-btn>
      </slot>
    </template>
    <template v-slot:title>서비스 수정</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-card-subtitle>
        기본 정보
      </v-card-subtitle>
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

      <v-btn
        class="mt-4"
        :disabled="!valid"
        type="submit"
        color="primary"
        block
      >
        수정
      </v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import { updateSvcApi } from '@/lib/api/svc/updateSvcApi';
import { getSvcDetailApi } from '@/lib/api/svc/getSvcDetail.Api';

const props = defineProps<{
  clusterId: number;
  nsName: string;
  name: string;
}>();

const valid = ref(false);

interface Form {
  type: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
  }[]
}

const form = ref<Form>({
  type: '',
  selector: {
    app: ''
  },
  ports: []
});

const submitForm = () => {
  updateSvcApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    name: props.name,
    ...form.value
  });
}

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

const getSvcDetail = () => {
  getSvcDetailApi({
    clusterId: props.clusterId,
    nsName: props.nsName,
    name: props.name
  }).then((res) => {
    if (res) form.value = {
      type: res.type,
      selector: res.selector,
      ports: res.ports
    }
  });
}

onMounted(() => {
  if (props.clusterId && props.nsName && props.name) getSvcDetail();
});

watch(() => [props.clusterId, props.nsName, props.name], () => {
  getSvcDetail();
});

</script>

<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">createSvc</v-btn>
      </slot>
    </template>
    <template v-slot:title>서비스 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <!-- 
      todo:
      1. 생성될 클러스터 선택용 select input 추가
      -->
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
import { createSvcApi } from '@/lib/api/svc/createSvcApi';
  
  const props = defineProps<{
    clusterId: number;
    nsName: string;
  }>();

  const valid = ref(false);

  interface Form {
    name: string;
    type: string;
    selector: {
      app: string;
    };
    ports: {
      protocol: string;
      port: number;
      targetPort: number;
      nodePort?: number;
    }[];
  }
  const form = ref<Form>({
    name: '',
    type: '',
    selector: {
      app: ''
    },
    ports: []
  });

  /*
  todo:
  1. inputRules.ts 에 rules 공통 로직으로 추가
  */
 
 const rules = {
   required: (v: string) => !!v || '필수 입력 항목입니다.',
   email: (v: string) =>
   /.+@.+\..+/.test(v) || '올바른 이메일 형식을 입력하세요.'
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

  const submitForm = () => {
    createSvcApi({
      clusterId: props.clusterId,
      nsName: props.nsName,
      ...form.value
    });
  }

</script>

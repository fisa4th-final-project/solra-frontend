<template>
  <SideContents v-if="auth.hasPerm('SERVICE_CREATE') || auth.hasPerm('DEPLOYMENT_CREATE')" v-model="isOpened">
    <template v-slot:activator="{props}">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">CreateWorkload</v-btn>
      </slot>
    </template>
    <template v-slot:title>워크로드 추가</template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <Card no-text no-gutters>
        <template v-slot:title>
          <v-container>
            <v-row align="center" class="py-5">
              <v-col>
                <v-icon>mdi-lan</v-icon>
                <span class="text-h6 pl-5">
                  SVC 정의
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <CreateSvcInWorkload 
          :cluster-id="props.cluster.clusterId" :ns-name="props.ns.name"
          ref="$createSvcRef"
        />
      </Card>
      <v-spacer class="my-5" />
      <Card no-text no-gutters>
        <template v-slot:title>
          <v-container>
            <v-row align="center" class="py-5">
              <v-col>
                <v-icon>mdi-hexagon-multiple-outline</v-icon>                
                <span class="text-h6 pl-5">
                  DEPLOY 정의
                </span>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <CreateDeployInWorkload
          :cluster-id="props.cluster.clusterId" :ns-name="props.ns.name"
          ref="$createDeployRef"
          />
      </Card>
      <v-spacer class="my-5" />
      <v-btn
        type="submit"
        color="primary"
        flat
        block
      >생성</v-btn>
    </v-form>
  </SideContents>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import SideContents from '@/components/layout/SideContents.vue';
import CreateSvcInWorkload from '@/components/data/CreateSvcInWorkload.vue';
import CreateDeployInWorkload from '@/components/data/CreateDeployInWorkload.vue';
import Card from '@/components/common/Card.vue';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  cluster: {
    clusterId: number;
  },
  ns: {
    name: string;
  },
  onUpdate?: () => void;
}>();

const isOpened = ref();
const valid = ref(false);

const $createSvcRef = ref()
const $createDeployRef = ref()

const submitForm = async () => {
  await $createSvcRef.value.submitSvc();
  await $createDeployRef.value.submitDeploy().then(() => {
    props.onUpdate?.();
    isOpened.value = false;
  });
}

defineExpose({
  valid
})

</script>

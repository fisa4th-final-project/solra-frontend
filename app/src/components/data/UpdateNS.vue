<template>
  <SideContents v-if="auth.hasPerm('NAMESPACE_UPDATE')" v-model="isOpened">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">UpdateNS</v-btn>
      </slot>
    </template>
    <template v-slot:title>
      <span>
        네임스페이스 정보 수정
      </span>
      <v-col align="end">
        <DeleteNS :cluster-id="ns.clusterId" :name="ns.name" :onUpdate="updateCallBack"/>
      </v-col>
    </template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-textarea
        v-model="form.labels"
        variant="underlined"
        label="네임스페이스 labels"
        color="primary"
        clearable
      />
      <v-textarea
        v-model="form.annotations"
        variant="underlined"
        label="네임스페이스 annotaions"
        color="primary"
        clearable
      />
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
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import DeleteNS from '@/components/data/DeleteNS.vue';
import type { GetNSDetailResponseDto } from '@/lib/api/ns/nsDto';

const auth = useAuthStore();

const props = defineProps<{
  clusterId: number;
  name: string;
  onUpdate?: (arg?: any) => void
}>();

const isOpened = ref();

const valid = ref(false);

interface Form {
  labels: string;
  annotations: string;
}

const form = ref<Form>({} as Form);

const ns = ref<GetNSDetailResponseDto>({} as GetNSDetailResponseDto);

const submitForm = () => {
  apiHandler.updateNSApi({
    clusterId: props.clusterId,
    name: props.name,
    labels: JSON.parse(form.value.labels),
    annotations: JSON.parse(form.value.annotations)
  }).then(() => {
    updateCallBack();
  });
}

const getNSDetail = () => {
  apiHandler.getNSDetailApi({
    clusterId: props.clusterId,
    name: props.name
  }).then((res) => {
    if (!res) return;
    ns.value = res;
    form.value = {
      annotations: JSON.stringify(res.annotations),
      labels: JSON.stringify(res.labels)
    }
  });
}

const updateCallBack = () => {
  isOpened.value = false;
  props.onUpdate?.();
}

onMounted(() => {
  if (!props.clusterId || !props.name) return;
  getNSDetail();
});

watch(() => [props.clusterId, props.name], () => {
  getNSDetail();
});

</script>

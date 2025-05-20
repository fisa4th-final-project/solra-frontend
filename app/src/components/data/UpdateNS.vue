<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator">
        <v-btn v-bind="props">UpdateNS</v-btn>
      </slot>
    </template>
    <template v-slot:title>네임스페이스 정보 수정</template>
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

  import { computed, onMounted, ref, watch } from 'vue';

  import SideContents from '@/components/layout/SideContents.vue';
  import { getNSDetailApi } from '@/lib/api/ns/getNSDetail.Api';
  import { updateNSApi } from '@/lib/api/ns/updateNSApi';

  const props = defineProps<{
    clusterId: number;
    name: string;
  }>();

  const valid = ref(false)

  interface Form {
    labels: string;
    annotations: string;
  }

  const form = ref<Form>({} as Form);

  const submitForm = () => {
    updateNSApi({
      clusterId: props.clusterId,
      name: props.name,
      labels: JSON.parse(form.value.labels),
      annotations: JSON.parse(form.value.annotations)
    });
  }

  const getNSDetail = () => {
    getNSDetailApi({
      clusterId: props.clusterId,
      name: props.name
    }).then((res) => {
      if (!res) return;
      form.value = {
        annotations: JSON.stringify(res.annotations),
        labels: JSON.stringify(res.labels)
      }
    });
  }

  onMounted(() => {
    if (!props.clusterId || !props.name) return;
    getNSDetail();
  });

  watch(() => [props.clusterId, props.name], () => {
    getNSDetail();
  });

</script>

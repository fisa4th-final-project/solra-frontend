<template>

    <Form 
      @submit.prevent="submitHandler"
    >
      <v-text-field 
        v-model="input"
        :label=label
        :type="type"
        rounded="lg"
        density="default"
        variant="plain"
        prepend-icon="mdi-magnify"
        class="pb-4 pl-4 pr-3"
        clearable
        hide-details
        single-line
      >
      </v-text-field>
      <template v-slot:submit>
      <div></div>
      </template>
    </Form>

</template>

<script lang="ts" setup>

import Form from '@/components/common/Form.vue';
import { ref } from 'vue';

  const input = ref('');

  const props = defineProps<{
    apiHandler: () => Promise<any>;
    label: string;
    type: string;
  }>();

  const emit = defineEmits<{
    (e: 'data', result: any): void;
  }>();

  const submitHandler = async () => {
    emit('data', props.apiHandler());
  }

</script>
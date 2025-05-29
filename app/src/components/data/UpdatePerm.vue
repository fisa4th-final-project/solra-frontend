<template>
  <SideContents>
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">UpdatePerm</v-btn>
      </slot>
    </template>
    <template v-slot:title>
    <span>
      권한 수정
    </span>
    <v-col align="end">
      <DeletePerm :perm="{permId: props.permId, permName: props.permName}"/>
    </v-col>
    </template>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-text-field
        v-model="form.description"
        :rules="[rules.required]"
        variant="underlined"
        label="권한 설명"
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

import { ref } from 'vue';
import SideContents from '@/components/layout/SideContents.vue';
import { rules } from '@/lib/global/inputRules';
import { updatePermApi } from '@/lib/api/perm/updatePermApi';
import DeletePerm from '@/components/data/DeletePerm.vue';

const props = defineProps<{
  permId: number;
  permName: string;
}>();

const valid = ref(false)

const form = ref({
  description: ''
})

const submitForm = () => {
  updatePermApi({
    permId: props.permId,
    description: form.value.description
  });
}

</script>
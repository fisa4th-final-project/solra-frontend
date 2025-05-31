<template>
  <v-container>
    <v-row v-if="isCreateOrg">
      <v-col>
        <v-form v-model="valid" @submit.prevent="createOrg">
          <v-text-field
            v-model="form.org.orgName"
            :rules="[rules.required]"
            variant="underlined"
            label="생성할 조직 이름"
            color="primary"
            clearable
            data-test="input-org-name"
          />
          <v-row class="mt-3">
            <v-col align="center">
              <v-btn
                :disabled="!valid"
                type="submit"
                color="primary"
                block
              >
                등록
              </v-btn>
            </v-col>
            <v-col align="center">
              <v-btn 
                @click="closeCreateOrg" 
                color="red"
                flat 
                block
                data-test="btn-select-org"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          
        </v-form>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <SelectOrgList :form="props.form"/>
      </v-col>
      <v-col cols="12">
        <v-btn 
          @click="openCreateOrg" 
          flat 
          block 
          data-test="btn-create-org"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>

import { ref, watch } from 'vue';
import { rules } from '@/lib/global/inputRules';
import { createOrgApi } from '@/lib/api/org/createOrgApi';
import SelectOrgList from '@/components/data/SelectOrgList.vue';

const valid = ref(false);

const props = defineProps<{
  form: {
    org: {
      orgId: number,
      orgName: string
    }
  }
}>();

const form = ref({
  org: {
    orgId: 0,
    orgName: ''
  },
});

const isCreateOrg = ref();

const createOrg = async () => {
  if (isCreateOrg) {
    const res = await createOrgApi({
      orgName: form.value.org.orgName
    });
    if (!res) return
    props.form.org = res;
    isCreateOrg.value = false;
  }
}

const openCreateOrg = () => {
  isCreateOrg.value = true;
}
const closeCreateOrg = () => {
  isCreateOrg.value = false;
}

watch(() => [form.value.org], () => {
  console.log(form.value.org);
});

defineExpose({
  form, valid, isCreateOrg
})

</script>

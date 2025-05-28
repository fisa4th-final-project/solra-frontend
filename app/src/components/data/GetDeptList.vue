<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'deptName', icon: 'mdi-briefcase'}"
    :detail="{enable: true}"
    @selected="selected"
    @is-empty="isEmpty"
  >
    <template v-slot:detailTitle>
      <v-row justify="space-between" align="center">
        <v-col>
          {{ selectedItem.name }}
        </v-col>
        <v-col align="end">
          <UpdateDept
            :dept-id="selectedItem.deptId"
          >
            <template v-slot:activator="{props}">
              <v-btn 
                v-bind="props"
                color="primary"
                variant="plain"
              >
                Edit
              </v-btn>
            </template>
          </UpdateDept>
        </v-col>
      </v-row>
    </template>
    <template v-slot:detail>
      <GetDeptDetail title="부서 상세" :req="{deptId: selectedItem.deptId}" />
    </template>
    <template v-slot:item="{ item }">
      <tr v-if="item.field !== 'orgId' && item.field !== 'deptId'">
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCardList>
</template>
<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import GetDeptDetail from '@/components/data/GetDeptDetail.vue';
import UpdateDept from '@/components/data/UpdateDept.vue';
import type { GetDeptDetailResponseDto, GetDeptsRequestParam } from '@/lib/api/dept/deptDto';
import { getDeptsApi } from '@/lib/api/dept/getDeptsApi';
import { ref } from 'vue';

defineProps<{
  req: GetDeptsRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetDeptDetailResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>();

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const selected = (item: GetDeptDetailResponseDto) => {
  selectedItem.value = item;
  emit('selected', item);
}

const selectedItem = ref();

const dataHandler = async (req: GetDeptsRequestParam) => {
  const res = await getDeptsApi(req);
  if (!res) return
  return res
};

</script>

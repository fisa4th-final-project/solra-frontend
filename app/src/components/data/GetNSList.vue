<template>
  <DataCardList
    :api="{req, dataHandler}"
    :header="{titleKey: 'name', icon: 'mdi-scan-helper'}"
    @selected="selected"
    @isEmpty="isEmpty"
    v-if="auth.hasPerm('NAMESPACE_READ')"  
    :detail="{enable: true}"
    ref="$getNsList"
  >
    <template v-slot:detailTitle>
      <v-row justify="space-between" align="center">
        <v-col>
          네임스페이스 상세
        </v-col>
        <v-col align="end">
          <UpdateNS
            v-if="selectedNs"
            :cluster-id="selectedNs.clusterId"
            :name="selectedNs.name"
            :onUpdate="$getNsList?.loadData"
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
          </UpdateNS>
        </v-col>
      </v-row>
    </template>
    <template v-slot:detail>
      <GetNSDetail :req="{clusterId: selectedNs.clusterId, name: selectedNs.name
      }" :title="selectedNs.name" />
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <th>{{ item.field }}</th>
        <td class="text-right">{{ item.value }}</td>
      </tr>
    </template>
  </DataCardList>
</template>
<script lang="ts" setup>

import DataCardList from '@/components/common/DataCardList.vue';
import GetNSDetail from '@/components/data/GetNSDetail.vue';
import UpdateNS from '@/components/data/UpdateNS.vue';
import type { GetNSListRequestParam, GetNSListResponseDto } from '@/lib/api/ns/nsDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const auth = useAuthStore();

defineProps<{
  req: GetNSListRequestParam
}>();

const emit = defineEmits<{
  (e: 'selected', item: GetNSListResponseDto): void
  (e: 'isEmpty', item: boolean): void
}>()

const selectedNs = ref<GetNSListResponseDto>({} as GetNSListResponseDto);

const $getNsList = ref();

const selected = (item: GetNSListResponseDto) => {
  selectedNs.value = item;
  emit('selected', item);
}

const isEmpty = (item: boolean) => {
  emit('isEmpty', item);
}

const dataHandler = async (req: GetNSListRequestParam) => {
  return await apiHandler.getNSListApi(req).then(async (res) => {
    //TODO NS 조회 제한 제거할 것.
    if (res) return res.filter((ns) => !invailedNs.includes(ns.name))
  });
};

const invailedNs = [
  'argocd',
  'cilium-secrets',
  'default',
  'ingress-nginx',
  'kube-node-lease',
  'kube-public',
  'kube-system',
  'local-path-storage',
  'monitoring',
  'redis',
  'solra',
  'solra-harbor',
  'solra-jenkins',
  'solra-monitoring',
  '01-solra-access',
  'solra-access-0609',
  'solra-token',
  'cilium',
  'solra-cert',
  'solra-gitlab',
  'solra-kube-monkey'
]
</script>

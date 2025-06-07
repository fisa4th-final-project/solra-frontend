<template>
  <Card no-title no-text no-gutters v-if="auth.hasPerm('USER_READ')">
    <v-data-table
      :items="userItems"
      :headers="userheader"
      hide-default-header
      hide-default-footer
    >

    </v-data-table>
  </Card>
</template>
<script lang="ts" setup>

import { computed, onMounted, ref, watch } from 'vue';
import type { DataTableHeader } from 'vuetify';
import Card from '@/components/common/Card.vue';
import type { GetUserDetailResponseDto } from '@/lib/api/user/userDto';
import { apiHandler } from '@/lib/global/apiManager';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

const props = defineProps<{
  userId: number
}>();

const user = ref<GetUserDetailResponseDto>({} as GetUserDetailResponseDto);

const userItems = computed(() =>
  Object.entries(user.value).map(([key, value]) => ({
    field: key,
    value: value,
  }))
);

const userheader: DataTableHeader[] = [
  {
    key: 'field',
    title: '',
    align: 'start'
  },
  {
    key: 'value',
    title: '',
    align: 'end'
  }
]

const getUserDetail = () => {
  apiHandler.getUserDetailApi({
    userId: props.userId
  }).then( (res) => {      
    if (!res) return;
    user.value = res;
  });
}

onMounted(() => {
  if (!props.userId) return;
  getUserDetail();
});

watch(() => props.userId, () => {
  getUserDetail();
});

</script>
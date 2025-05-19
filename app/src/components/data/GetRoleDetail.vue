<template>
  <Card no-title no-text no-gutters>
    <v-data-table
      :items="roleItems"
      :headers="roleheader"
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
import type { GetRoleDetailResponseDto } from '@/lib/api/role/roleDto';
import { getRoleDetailApi } from '@/lib/api/role/getRoleDetailApi';


  const props = defineProps<{
    roleId: number
  }>();

  const user = ref<GetRoleDetailResponseDto>({} as GetRoleDetailResponseDto);

  const roleItems = computed(() =>
    Object.entries(user.value).map(([key, value]) => ({
      field: key,
      value: value,
    }))
  );
  
  const roleheader: DataTableHeader[] = [
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

  const getRoleDetail = () => {
    getRoleDetailApi({
      roleId: props.roleId
    }).then((res) => {      
      if (!res) return;
      user.value = res;
      /*
      todo: 
      1. role 상세 조회 시 연결된 perm list도 table에 포함
      */
    });
  }

  onMounted(() => {
    if (!props.roleId) return;
    getRoleDetail();
  });

  watch(() => props.roleId, () => {
    getRoleDetail();
  });

</script>

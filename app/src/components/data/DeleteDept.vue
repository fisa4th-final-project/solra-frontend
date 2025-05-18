<template>
  <v-btn
    flat
    color="red"
    class="font-weight-bold"
    @click="deleteDept"
  >삭제</v-btn>
  <Dialog v-if="dialog.getType === 'deleteDept'">
    <template v-slot:title>
      부서를 삭제하시겠습니까?
    </template>
    <template v-slot:default>
      부서: {{ dept.deptName }} 
    </template>
    <template v-slot:actions>
      <v-btn
        color=""
        @click="dialog.close()"
      >취소</v-btn>
      <v-btn
        color="red"
        @click="deleteDeptApi({deptId: dept.deptId})"
      >삭제</v-btn>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>

  import Dialog from '@/components/common/Dialog.vue';
  
  import { useDialogStore } from '@/store/dialog';

  import { deleteDeptApi } from '@/lib/api/dept/deleteDeptApi';
  
  defineProps<{
    dept: {
      deptId: number,
      deptName: string
    };
  }>();

  const dialog = useDialogStore();

  function deleteDept() {
    dialog.open({
      title: '',
      message: '',
      type: 'deleteDept'
    });
  }
  
</script>

<template>
  <v-container>
    <!-- 
    TODO: 전체 유저 관리를 위해 조직, 부서 필터 추가
    -->
    <v-row no-gutters class="ga-5">
      <v-col>
        <GetUserList></GetUserList>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script lang="ts" setup>
  import GetUserList from '@/components/data/GetUserList.vue';

</script>

<template>
  <v-container
    style="padding: 0;"
  >
    <v-row
      no-gutters
      style="gap: 20px;"
    >
      <v-col
        cols="12"
      >

        <v-form>
          <Search 
          :apiHandler="() => {return 'hi'}"
          label="사용자 이름, email, ETC"
          @data="getData"
          />
        </v-form>
      </v-col>
      <v-col>
        <v-card
          theme="light"
          rounded="lg"
          flat
          style="
            padding: 20px 0;
            border: 2px solid #DFE0EB;
            "
        >
          <v-row no-gutters>
            <v-col>
                <v-row 
                  no-gutters 
                  align="center"
                  class="pr-5 pl-5"
                >
                  <v-col 
                    v-for="(index) in 6"
                    :cols="cols[index-1]"
                  >
                    {{ headers[index-1] }}
                  </v-col>
                  <v-divider 
                    class="my-2 border-sm"
                    :style="{
                      opacity: 1,
                      borderColor: theme.colors.cardBorder
                    }"
                  />
                </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-row
                v-if="users.length === 0"
                class="pr-5 pl-5"
                style="min-height: 300px;"
                align="center"
              >
                <v-col align="center">
                  사용자를 추가해주세요.
                </v-col>
              </v-row>
                <v-row 
                  no-gutters 
                  align="center"
                  v-for="(user, index) in users"
                  class="pr-5 pl-5"
                >
                  
                  <v-col :cols=cols[0]>
                    <v-row no-gutters justify="center">

                      <!-- 
                        todo:
                        1. user 별 v-avatar color 차등 적용
                        -->
                        <v-avatar
                        color="red"
                        >
                        <span class="text-h5">
                          {{ user.userLoginId.slice(0,2) }}
                        </span>
                      </v-avatar>
                    </v-row>
                  </v-col>
                  <v-col :cols=cols[1]>
                      {{ user.organizationId ? user.organizationId : '미배정' }}
                  </v-col>
                  <v-col :cols=cols[2]>
                      {{ user.departmentId ? user.departmentId : '미배정' }}
                  </v-col>
                  <v-col :cols=cols[3]>
                      {{ user.userName }}
                  </v-col>
                  <v-col :cols=cols[4]>
                      {{ user.userLoginId }}
                  </v-col>
                  <v-col :cols=cols[5]>
                    {{ user.email }}
                  </v-col>
                  <v-col :cols=cols[6]>
                    <v-row no-gutters justify="center">
                      <v-btn 
                        icon="mdi-dots-horizontal"
                        flat
                        :to="`/admin/users/${user.userId}`"
                      ></v-btn>
                    </v-row>
                  </v-col>
                  <v-divider 
                    v-if="index < users.length - 1" 
                    class="my-2 border-sm"
                    :style="{
                      opacity: 1,
                      borderColor: theme.colors.cardBorder
                    }"
                  />
                </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script lang="ts" setup>
  import Search from '@/components/common/Search.vue';
  import { getUsersApi } from '@/lib/api/user/getUsersApi';
  import type { GetUsersResContent } from '@/lib/api/user/userDto';
  import { onMounted, ref } from 'vue';
  import { useTheme } from 'vuetify';

  const theme = useTheme().current.value;
  const users = ref<GetUsersResContent[] | any[]>([]);

  onMounted(async () => {
    users.value = await getUsersApi({
      page: 0,
      size: 0
    }).then((res) => {
      return res ? res.content : [];
    });
  });
  
  const getData = (result: any) => {
    console.log('검색 결과:', result)
  }

  const cols: number[] = [1, 1, 1, 2, 2, 4, 1];
  const headers: string[] = [
    '',
    '조직',
    '부서',
    '성명',
    '사용자 id',
    'email',
    ''
  ]
</script>

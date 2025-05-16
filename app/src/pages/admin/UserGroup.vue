<template>
  <v-container class="pa-0">
    <v-row no-gutters class="ga-5">
      <v-col>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            
            <Card 
              v-bind="props"
              :color="isHovering ? 'white': theme.colors.backgroundLight" 
              @click="">
              <v-row no-gutters justify="center" align="center">
                <v-icon :color="theme.colors.cardBorder" size="60">mdi-plus</v-icon>
              </v-row>
            </Card>
          </template>
        </v-hover>
      </v-col>
      <v-col
        v-for="dept in depts"
      >
        <Card>
          <template v-slot:title>
            <v-card-text
              class="pt-0 pb-0"
            >
            <v-menu location="bottom">
              <template v-slot:activator="{ props }">
                <v-chip
                  v-bind="props"
                  size="x-small"
                >
                  {{ getOrg(dept.organizationId)?.orgName }}
                </v-chip>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title
                    @click="dialog.open({
                      title: '',
                      message: '',
                      type: 'editOrg'
                    })"
                  >
                    조직 이름 편집
                  </v-list-item-title>
                  <v-list-item-title
                    @click="dialog.open({
                      title: '',
                      message: '',
                      type: 'deleteOrg'
                    })"
                  >
                    조직 삭제
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
             
            </v-card-text>
            <Dialog v-if="dialog.getType === 'editOrg'">
              <template v-slot:title>
                <span>조직 이름 편집</span>
              </template>
              <v-text-field
                :placeholder="getOrg(dept.organizationId)?.orgName"
                underline
                label="조직 이름"
                type="text"
                color="primary"
                theme="light"
                v-model="updateOrgName"
              />
              <template v-slot:actions>
                <v-btn @click="() => {
                  updateOrgName = '';
                  dialog.close();
                }">
                  취소
                </v-btn>
                <v-btn @click="async() => await updateOrgApi({
                  orgId: dept.organizationId,
                  orgName: updateOrgName
                })">
                  수정
                </v-btn>
              </template>
            </Dialog>
            <Dialog v-if="dialog.getType === 'deleteOrg'">
              <template v-slot:title>
                <span>조직 삭제</span>
              </template>
              <span>"{{ getOrg(dept.organizationId)?.orgName }}"을 삭제하시겠습니까?</span>
              <template v-slot:actions>
                <v-btn @click="() => {
                  dialog.close();
                }">
                  취소
                </v-btn>
                    <v-btn @click="async() => await deleteOrgApi({
                      orgId: dept.organizationId
                    })">
                  삭제
                </v-btn>
              </template>
            </Dialog>
          </template>
          <v-card-title class="pt-0">
            <v-row no-gutters justify="space-between" align="center">
              {{ dept.deptName }}
              <v-btn 
                icon="mdi-dots-horizontal"
                flat
                size="small"
                :to="`/admin/userGroup/depts/${dept.deptId}`"
              ></v-btn>
            </v-row>
          </v-card-title>
        </Card>
      </v-col>
    </v-row>
  </v-container>
  
</template>
<script lang="ts" setup>
import Card from '@/components/common/Card.vue';
import type { GetDeptsResponseDto } from '@/lib/api/dept/deptDto';
import type { GetOrgsResponseDto } from '@/lib/api/org/orgDto';
import { getDeptsApi } from '@/lib/api/dept/getDeptsApi';
import { getOrgsApi } from '@/lib/api/org/getOrgsApi';
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';
import Dialog from '@/components/common/Dialog.vue';
import { useDialogStore } from '@/store/dialog';
import { updateOrgsApi as updateOrgApi } from '@/lib/api/org/updateOrgApi';
import { deleteOrgApi } from '@/lib/api/org/deleteOrgApi';

const theme = useTheme().current.value;
const dialog = useDialogStore();
const orgs = ref<GetOrgsResponseDto[]>();
const depts = ref<GetDeptsResponseDto[]>();

const updateOrgName = ref<string>('');

onMounted(async () => {
  await getOrgsApi().then((resOrgs) => {
    if (!resOrgs) return;
    orgs.value = resOrgs;
    resOrgs.forEach(async (org) => {
      await getDeptsApi({
        org_id: org.orgId
      }).then((res) => {
        if (!res) return;
        depts.value = res;
      })
    });
  });
});

function getOrg(orgId: number) {
  return orgs.value?.find((org) => 
    org.orgId === orgId
  )
}
</script>

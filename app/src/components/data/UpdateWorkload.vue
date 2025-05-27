<template>
  <SideContents>
    <template v-slot:activator="{props}">
      <slot name="activator" v-bind:props>
        <v-btn v-bind="props">CreateWorkload</v-btn>
      </slot>
    </template>
    <template v-slot:title>워크로드 수정</template>
    <v-row>
      <v-col>
        <Card no-text no-gutters v-if="props.svc">
          <template v-slot:title>
            <v-container>
              <v-row align="center" class="py-5">
                <v-col>
                  <v-icon>mdi-lan</v-icon>
                  <span class="text-h6 pl-5">
                    SVC 수정
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <UpdateSvcInWorkload
          :cluster-id="props.cluster.clusterId" :ns-name="props.ns.name"
          :name="props.svc.name"
          />
        </Card>
        <v-spacer class="my-5"/>
        <Card no-text no-gutters v-if="props.deploy">
          <template v-slot:title>
            <v-container>
              <v-row align="center" class="py-5">
                <v-col>
                  <v-icon>mdi-hexagon-multiple-outline</v-icon>
                  <span class="text-h6 pl-5">
                    DEPLOY 수정
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <UpdateDeployInWorkload
            :cluster-id="props.cluster.clusterId" :ns-name="props.ns.name"
            :name="props.deploy.name"
            />
        </Card>
      </v-col>
    </v-row>
  </SideContents>
</template>
<script lang="ts" setup>

import SideContents from '@/components/layout/SideContents.vue';
import UpdateSvcInWorkload from '@/components/data/UpdateSvcInWorkload.vue';
import UpdateDeployInWorkload from '@/components/data/UpdateDeployInWorkload.vue';
import Card from '@/components/common/Card.vue';

const props = defineProps<{
  cluster: {
    clusterId: number;
  },
  ns: {
    name: string;
  }
  svc?: {
    name: string;
  },
  deploy?: {
    name: string;
  }
}>();

</script>

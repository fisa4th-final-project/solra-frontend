<template>
  <div class="d-flex flex-column ga-10">
    <!-- user -->
    <div class="d-flex flex-column ga-10 pa-0">
      <h1>사용자</h1>
      <div>
        <h2>getUserList</h2>
        <GetUserList @selected="selectUser"/>
      </div>

      <div>
        <h2>getUser</h2>
        <GetUserDetail :user-id="user.userId" />
      </div>

      <v-row justify="space-between">
        <v-col cols="4">
          <h2>createUser</h2>
          <CreateUser />
        </v-col>
        <v-col cols="4">
          <h2>updateUser</h2>
          <UpdateUser :user-id="user.userId" />
        </v-col>
        <v-col cols="4">
          <h2>deleteUser</h2>
          <DeleteUser :user="user"/>
        </v-col>
      </v-row>

    </div>
    <!-- user -->

    <v-divider />

    <!-- user group -->
    <div class="d-flex flex-column ga-10 pa-0">
      <h1> 사용자 그룹 </h1>
      <v-row justify="space-between">
        <v-col cols="6">
          <h2>SelectOrgList</h2>
          <SelectOrgList :form="userGroupForm" /> 
        </v-col>
        
        <v-col cols="6">
          <h2>SelectDeptList</h2>
          <SelectDeptList :org-id="userGroupForm.org.orgId" :form="userGroupForm" />
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="4">
          <h2>createOrg</h2>
          <CreateOrg />
        </v-col>
        <v-col cols="4">
          <h2>updateOrg</h2>
          <UpdateOrg :org-id="userGroupForm.org.orgId" />
        </v-col>
        <v-col cols="4">
          <h2>deleteOrg</h2>
          <DeleteOrg :org="userGroupForm.org"/>
        </v-col>
        <v-col cols="4">
          <h2>createDept</h2>
          <CreateDept />
        </v-col>
        <v-col cols="4">
          <h2>updateDept</h2>
          <UpdateDept :dept-id="userGroupForm.dept.deptId" />
        </v-col>
        <v-col cols="4">
          <h2>deleteDept</h2>
          <DeleteDept :dept="userGroupForm.dept"/>
        </v-col>
      </v-row>

    </div>
    <!-- user group -->

    <v-divider />

    <!-- role & permission -->
    <h1>역할 & 권한</h1>
    <div>
    <v-row>
      <v-col cols="6">
        <h2>getRoleList</h2>
        <GetRoleList @selected="selectRole" />
      </v-col>
      <v-col cols="6">
        <h2>getRole</h2>
        <GetRoleDetail :req="{roleId: role.roleId}" />
      </v-col>
      <v-col cols="6">
        <h2>getPermList</h2>
        <GetPermList v-model="selectedPerm" />
      </v-col>
      <v-col cols="6">
        <h2>getRolePermList</h2>
        <GetRolePerm />
      </v-col>
    </v-row>
    </div>
    
    <div>
      <v-row>
        <v-col cols="4">
          <h2>createRole</h2>
          <h2>createRolePerm</h2>
          <CreateRole/>
        </v-col>
        <v-col cols="4">
          <h2>updateRole</h2>
          <UpdateRole :role-id="role.roleId"/>
        </v-col>
        <v-col cols="4">
          <h2>deleteRole</h2>
          <DeleteRole :role="role"/>
        </v-col>
        <v-col cols="4">
          <h2>createPerm</h2>
          <CreatePerm />
        </v-col>
        <v-col cols="4">
          <h2>updatePerm</h2>
          <UpdatePerm :perm-id="selectedPerm[0]?.permissionId"/>
        </v-col>
        <v-col cols="4">
          <h2>deletePerm</h2>
          <DeletePerm :perm="{permId: selectedPerm[0]?.permissionId, permName: selectedPerm[0]?.permissionName}"/>
        </v-col>
        <v-col cols="4">
          <h2>deleteRolePerm</h2>
          <DeleteRolePerm 
            :perm="permission"
            :role="role"
          />
        </v-col>
      </v-row>
    </div>
    <!-- role & permission -->

    <v-divider />

    <!-- cluster -->
    <h1>클러스터</h1>
    <div>
      <v-row>
        <v-col>
          <!-- 
          todo
          1. clusterList를 선택하는 select 컴포넌트 제작
          -->
          <h1>getClusterList</h1>
          <GetClusterList @selected="selectCluster"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>getClusterDetail</h1>
          <GetClusterDetail 
            :title="cluster.ref.name" 
            :req="cluster.req"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>getNodeList</h1>
          <GetNodeList 
            :req="{clusterId: cluster.ref.id ?? 0}"
            @selected="selectNode"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>getNodeDetail</h1>
          <GetNodeDetail 
            :title="node.ref.name" 
            :req="node.req"
          />
        </v-col>
      </v-row>
    </div>
    
    <div>
      <v-row>
        <v-col>
          <h1>createCluster</h1>
          <CreateCluster />
        </v-col>
        <v-col>
          <h1>updateCluster</h1>
          <UpdateCluster :cluster-id="cluster.ref.id ?? 0" />
        </v-col>
        <v-col>
          <h1>deleteCluster</h1>
          <DeleteCluster 
            :cluster="{clusterId: cluster.ref.id ?? 0, name: cluster.ref.name}" 
          />
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row>
        <v-col>
          <!-- 
          todo
          1. nsList 선택하는 select 컴포넌트 제작
          -->
          <h1>getNSList</h1>
          <GetNSList 
            :req="{clusterId: cluster.ref.id ?? 0}" 
            @selected="selectNS"
            />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h1>getNSDetail</h1>
          <GetNSDetail 
            :title="ns.ref.name"
            :req="ns.req"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>createNS</h1>
          <CreateNS :cluster-id="cluster.ref.id ?? 0"/>
        </v-col>
        <v-col>
          <h1>updateNS</h1>
          <UpdateNS :cluster-id="cluster.ref.id ?? 0" :name="ns.ref.name"/>
        </v-col>
        <v-col>
          <h1>deleteNS</h1>
          <DeleteNS :cluster-id="cluster.ref.id ?? 0" :name="ns.ref.name"/>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row>
        <v-col>
          <h1>getDeployList</h1>
          <GetDeployList 
            :req="{clusterId: cluster.ref.id ?? 0, nsName: ns.ref.name}"
            @selected="selectDeploy"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>getDeployDetail</h1>
          <GetDeployDetail 
            :title="deploy.ref.name" 
            :req="deploy.req"
          />
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col>
          <h1>createDeploy</h1>
          <CreateDeploy :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name"/>
        </v-col>
        <v-col>
          <h1>updateDeploy</h1>
          <UpdateDeploy :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name" :name="deploy.ref.name"/>
        </v-col>
        <v-col>
          <h1>deleteDeploy</h1>
          <DeleteDeploy :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name" :name="deploy.ref.name"/>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row>
        <v-col>
          <h1>getSvcList</h1>
          <GetSvcList :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name" @selected="selectSvc" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>getSvcDetail</h1>
          <GetSvcDetail
            :title="svc.ref.name"
            :req="svc.req"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>createSvc</h1>
          <CreateSvc :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name" />
        </v-col>
        <v-col>
          <h1>updateSvc</h1>
          <UpdateSvc :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name" :name="svc.ref.name" />
        </v-col>
        <v-col>
          <h1>deleteSvc</h1>
          <DeleteSvc :cluster-id="cluster.ref.id ?? 0" :ns-name="ns.ref.name" :name="svc.ref.name" />
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row>
        <v-col>
          <h1>getPodList</h1>
          <GetPodList 
            :req="{clusterId: cluster.ref.id ?? 0, nsName: ns.ref.name}" 
            @selected="selectPod"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1>getPodDetail</h1>
          <GetPodDetail 
            :title="pod.ref.name"
            :req="pod.req"
          />
        </v-col>
      </v-row>
    </div>
    <!-- cluster -->
  </div>
</template>

<script lang="ts" setup>
import CreateUser from '@/components/data/CreateUser.vue';
import DeleteUser from '@/components/data/DeleteUser.vue';
import GetUserDetail from '@/components/data/GetUserDetail.vue';
import GetUserList from '@/components/data/GetUserList.vue';
import UpdateUser from '@/components/data/UpdateUser.vue';
import SelectOrgList from '@/components/data/SelectOrgList.vue';
import SelectDeptList from '@/components/data/SelectDeptList.vue';

import { ref } from 'vue';
import CreateOrg from '@/components/data/CreateOrg.vue';
import CreateDept from '@/components/data/CreateDept.vue';
import UpdateOrg from '@/components/data/UpdateOrg.vue';
import UpdateDept from '@/components/data/UpdateDept.vue';
import DeleteOrg from '@/components/data/DeleteOrg.vue';
import DeleteDept from '@/components/data/DeleteDept.vue';
import CreateRole from '@/components/data/CreateRole.vue';
import GetRoleList from '@/components/data/GetRoleList.vue';
import GetRoleDetail from '@/components/data/GetRoleDetail.vue';
import UpdateRole from '@/components/data/UpdateRole.vue';
import DeleteRole from '@/components/data/DeleteRole.vue';
import CreatePerm from '@/components/data/CreatePerm.vue';
import GetPermList from '@/components/data/GetPermList.vue';
import UpdatePerm from '@/components/data/UpdatePerm.vue';
import DeletePerm from '@/components/data/DeletePerm.vue';
import DeleteRolePerm from '@/components/data/DeleteRolePerm.vue';
import GetClusterList from '@/components/data/GetClusterList.vue';
import GetClusterDetail from '@/components/data/GetClusterDetail.vue';
import CreateCluster from '@/components/data/CreateCluster.vue';
import UpdateCluster from '@/components/data/UpdateCluster.vue';
import DeleteCluster from '@/components/data/DeleteCluster.vue';
import GetNodeList from '@/components/data/GetNodeList.vue';
import GetNodeDetail from '@/components/data/GetNodeDetail.vue';
import GetNSList from '@/components/data/GetNSList.vue';
import GetNSDetail from '@/components/data/GetNSDetail.vue';
import CreateNS from '@/components/data/CreateNS.vue';
import UpdateNS from '@/components/data/UpdateNS.vue';
import DeleteNS from '@/components/data/DeleteNS.vue';
import GetDeployList from '@/components/data/GetDeployList.vue';
import GetDeployDetail from '@/components/data/GetDeployDetail.vue';
import CreateDeploy from '@/components/data/CreateDeploy.vue';
import UpdateDeploy from '@/components/data/UpdateDeploy.vue';
import DeleteDeploy from '@/components/data/DeleteDeploy.vue';
import GetSvcList from '@/components/data/GetSvcList.vue';
import GetSvcDetail from '@/components/data/GetSvcDetail.vue';
import CreateSvc from '@/components/data/CreateSvc.vue';
import UpdateSvc from '@/components/data/UpdateSvc.vue';
import DeleteSvc from '@/components/data/DeleteSvc.vue';
import GetPodList from '@/components/data/GetPodList.vue';
import GetPodDetail from '@/components/data/GetPodDetail.vue';
import type { GetClusterDetailRequestParam, GetClusterDetailResponseDto } from '@/lib/api/cluster/clusterDto';
import type { GetNodeDetailRequestParam, GetNodeDetailResponseDto } from '@/lib/api/node/nodeDto';
import type { GetDeployDetailRequestParam, GetDeployDetailResponseDto } from '@/lib/api/deploy/deployDto';
import type { GetNSDetailRequestParam, GetNSDetailResponseDto } from '@/lib/api/ns/nsDto';
import type { GetSvcDetailRequestParam, GetSvcDetailResponseDto } from '@/lib/api/svc/svcDto';
import type { GetPodDetailRequestParam, GetPodDetailResponseDto } from '@/lib/api/pod/podDto';

/*
todo
1. 컴포넌트별 emit, ref, props 형식 통일
2. 변수 명 곂치지 않게
3. 컴포넌트 별 새로고침 함수 expose 생성
4. props가 제공되지 않으면 dialog 노출되지 않게 컴포넌트 수정
*/

interface userRef {
  userId: number;
  userLoginId: string;
}
const user = ref<userRef>({} as userRef);
const selectUser = (item: any) => {
  user.value = {
    userId: item.userId,
    userLoginId: item.userLoginId
  }
}

const userGroupForm = ref({
  org: {
    orgId: 0,
    orgName: '',
  },
  dept: {
    deptId: 0,
    deptName: '',
  }
});

interface RoleRef {
  roleId: number;
  roleName: string;
}

interface PermissionRef {
  permissionId: number;
  permissionName: string;
}

const role = ref<RoleRef>({} as RoleRef);
const permission = ref<PermissionRef>({} as PermissionRef);

const selectRole = (item: any) => {
  role.value = {
    roleId: item.roleId,
    roleName: item.roleName
  }
  permission.value = {
    permissionId: item.permissionId,
    permissionName: item.permissionName
  }
}

const selectedPerm = ref<{
  permissionId: number;
  permissionName: string;
  description: string;
}[]>([]);


interface EntityRef {
  id?: number;
  name: string;
}

const cluster = ref({
  req: {} as GetClusterDetailRequestParam,
  ref: {} as EntityRef
});
const selectCluster = (item: GetClusterDetailResponseDto) => {
  cluster.value.ref = {id: item.clusterId, name: item.name};
  cluster.value.req = item;
}

const node = ref({
  req: {} as GetNodeDetailRequestParam,
  ref: {} as EntityRef
});
const selectNode = (item: GetNodeDetailResponseDto) => {
  node.value.ref = {name: item.name};
  node.value.req = {
    clusterId: cluster.value.ref.id ?? 0,
    nodeName: node.value.ref.name
  };
}

const ns = ref({
  req: {} as GetNSDetailRequestParam,
  ref: {} as EntityRef
});
const selectNS = (item: GetNSDetailResponseDto) => {
  ns.value.ref = {name: item.name};
  ns.value.req = {
    clusterId: cluster.value.ref.id ?? 0,
    name: ns.value.ref.name,
  };
}

const deploy = ref({
  req: {} as GetDeployDetailRequestParam,
  ref: {} as EntityRef
});
const selectDeploy = (item: GetDeployDetailResponseDto) => {
  deploy.value.ref = {name: item.name};
  deploy.value.req = {
    clusterId: cluster.value.ref.id ?? 0,
    nsName: ns.value.ref.name,
    deployName: deploy.value.ref.name
  };
}

const svc = ref({
  req: {} as GetSvcDetailRequestParam,
  ref: {} as EntityRef
});
const selectSvc = (item: GetSvcDetailResponseDto) => {
  svc.value.ref = {name: item.name};
  svc.value.req = {
    clusterId: cluster.value.ref.id ?? 0,
    nsName: ns.value.ref.name,
    name: svc.value.ref.name
  };
}

const pod = ref({
  req: {} as GetPodDetailRequestParam,
  ref: {} as EntityRef
});
const selectPod = (item: GetPodDetailResponseDto) => {
  pod.value.ref = {name: item.name};
  pod.value.req = {
    clusterId: cluster.value.ref.id ?? 0,
    nsName: ns.value.ref.name,
    name: pod.value.ref.name
  };
}

</script>
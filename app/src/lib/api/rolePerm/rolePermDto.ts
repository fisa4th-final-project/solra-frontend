export interface CreateRolePermRequestDto {
  roleId: number;
  permissionId: number;
}

export interface CreateRolePermResponseDto {
  rolePermissionId: number;
  roleId: number;
  permissionId: number;
}

export interface GetRolePermsRequestParam {
  roleId: number;
}

export interface GetRolePermsResponseDto {
  permissionId: number;
  permissionName: string;
  description: string;
}

export interface DeleteRolePermQueryParam {
  roleId: number;
  permissionId: number;
}
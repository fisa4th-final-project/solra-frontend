export interface CreateRolePermRequestDto {
  roleId: number;
  permissionIds: number[];
}

export interface CreateRolePermResponseDto {
  rolePermissionId: number;
  roleId: number;
  permissionId: number;
}

export interface GetRolePermListRequestParam {
  roleId: number;
}

export interface GetRolePermListResponseDto {
  permissionId: number;
  permissionName: string;
  description: string;
}

export interface DeleteRolePermRequestDto {
  roleId: number;
  permissionIds: number[];
}
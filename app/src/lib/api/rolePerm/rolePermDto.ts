export interface CreateRolePermRequestDto {
  roleId: number;
  permissionId: number;
}

export interface CreateRolePermResponseDto {
  rolePermissionId: number;
  roleId: number;
  permissionId: number;
}
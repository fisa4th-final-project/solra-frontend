export interface CreateRoleRequestDto {
  roleName: string;
  description?: string;
}

export interface CreateRoleResponseDto {
  roleId: number;
  roleName: string;
  description?: string;
}

export interface GetRolesResponseDto {
  roleId: number;
  roleName: string;
  description: string;
}
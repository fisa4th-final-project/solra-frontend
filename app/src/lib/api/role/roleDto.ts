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

export interface GetRoleDetailRequestParam {
  roleId: number;
}

export interface GetRoleDetailResponseDto {
  roleId: number;
  roleName: string;
  description: string;
}

export interface UpdateRoleRequestDto {
  roleId: number;
  description: string;
}

export interface UpdateRoleResponseDto {
  roleId: number;
  roleName: string;
  description: string;
}

export interface DeleteRoleQueryParam {
  roleId: number;
}
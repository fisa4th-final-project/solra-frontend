export interface GetUserRoleByUserIdQueryParam {
  userId: number;
}

export interface GetUserRoleByUserIdResponseDto {
  userId: number;
  roleId: number;
  roleName: string;  
}

export interface CreateUserRoleReqDto {
  userId: number;
  roleId: number;
}

export interface CreateUserRoleResDto {
  userId: number;
  roleId: number;
  roleName: string;
}

export interface DeleteUserRoleRequestDto {
  userId: number;
  roleId: number;
}
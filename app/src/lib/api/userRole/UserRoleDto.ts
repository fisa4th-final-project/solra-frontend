export interface GetUserRoleByUserIdQueryParam {
  userId: number;
}

export interface GetUserRoleByUserIdResponseDto {
  userId: number;
  roleId: number;
  roleName: string;  
}

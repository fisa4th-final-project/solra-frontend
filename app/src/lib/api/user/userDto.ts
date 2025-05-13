
export interface LoginRequestDto {
  userLoginId: string,
  password: string
}

export interface LoginResponseDto {
  userId: number,
  orgId?: number,
  deptId?: number,
  roles: LoginResRole[]
}

export interface LoginResRole {
  roleId: number,
  roleName: string,
  description: string,
  createdAt: string,
  updatedAt?: string
}

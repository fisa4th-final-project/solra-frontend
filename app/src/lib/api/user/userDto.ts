
export interface LoginRequestDto {
  userLoginId: string,
  password: string
}

export interface LoginResponseDto {
  userId: number,
  orgId?: number,
  deptId?: number,
  roles: [
    {
      roleId: number,
      roleName: string,
      description: string,
      createdAt: string,
      updatedAt?: string
    }
  ]
}
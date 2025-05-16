export interface CreateDeptRequestDto {
  organizationId: number,
  deptName: string
}

export interface CreateDeptResponseDto {
  deptId: number,
  organizationId: number,
  deptName: string
}

export interface GetDeptsRequestParam {
  org_id: number
}

export interface GetDeptsResponseDto {
  deptId: number,
  organizationId: number,
  deptName: string
}
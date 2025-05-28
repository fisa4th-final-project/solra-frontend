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
  orgId: number,
  deptName: string
}

export interface GetDeptDetailRequestParam {
  deptId: number
}

export interface GetDeptDetailResponseDto {
  deptId: number,
  organizationId: number,
  deptName: string
}

export interface UpdateDeptRequestDto {
  deptId: number
  deptName: string
}

export interface UpdateDeptResponseDto {
  deptId: number,
  organizationId: number,
  deptName: string
}

export interface DeleteDeptQueryParam {
  deptId: number
}
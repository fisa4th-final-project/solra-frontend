export interface CreateOrgRequestDto {
  orgName: string
}

export interface CreateOrgResponseDto {
  orgId: number,
  orgName: string
}

export interface GetOrgsResponseDto {
  orgId: number,
  orgName: string
}

export interface UpdateOrgRequestDto {
  orgId: number,
  orgName: string
}

export interface UpdateOrgResponseDto {
  orgId: number,
  orgName: string
}

export interface DeleteOrgQueryParam {
  orgId: number
}
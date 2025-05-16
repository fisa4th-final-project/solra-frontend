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
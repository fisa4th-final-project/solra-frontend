export interface CreatePermRequestDto {
  permissionName: string;
  description: string;
}

export interface CreatePermResponseDto {
  permissionId: number;
  permissionName: string;
  description: string;
}

export interface GetPermsResponseDto {
  permissionId: number;
  permissionName: string;
  description: string;
}

export interface UpdatePermRequestParam {
  permId: number;
  description: string;
}

export interface UpdatePermResponseDto {
  permissionId: number;
  permissionName: string;
  description: string;
}

export interface DeletePermQueryParam {
  permId: number;
}
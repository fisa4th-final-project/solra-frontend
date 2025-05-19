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
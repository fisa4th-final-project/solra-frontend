export interface GetClusterListRequestParam {
  orgId: number;
}

export interface GetClusterListResponseDto {
  clusterId: number;
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetClusterDetailRequestParam {
  clusterId: number;
}

export interface GetClusterDetailResponseDto {
  clusterId: number;
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClusterRequestDto {
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
}

export interface CreateClusterResponseDto {
  clusterId: number;
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateClusterRequestDto {
  clusterId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
}

export interface UpdateClusterResponseDto {
  clusterId: number;
  orgId: number;
  name: string;
  env: string;
  caCert: string;
  saToken: string;
  apiServerUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteClusterQueryParam {
  clusterId: number;
}
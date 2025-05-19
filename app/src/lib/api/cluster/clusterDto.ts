export interface GetClustersResponseDto {
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
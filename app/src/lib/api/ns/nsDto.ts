export interface GetNSListRequestParam {
  clusterId: number;
}

export interface GetNSListResponseDto {
  name: string;
  status: string;
  labels: {};
  annotations: {};
  createdAt: Date;
}

export interface GetNSDetailRequestParam {
  clusterId: number;
  name: string;
}

export interface GetNSDetailResponseDto {
  name: string;
  status: string;
  labels: {};
  annotations: {};
  createdAt: Date;
}
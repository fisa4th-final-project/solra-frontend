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

export interface CreateNSRequestDto {
  clusterId: number;
  name: string;
}

export interface CreateNSResponseDto {
  name: string;
  status: string;
  labels: {};
  annotations: {};
  createAt: Date;
}

export interface UpdateNSRequestDto {
  clusterId: number;
  name: string;
  labels: {};
  annotations: {};
}

export interface UpdateNSResponseDto {
  name: string;
  status: string;
  labels: {};
  annotations: {};
  createAt: Date;
}
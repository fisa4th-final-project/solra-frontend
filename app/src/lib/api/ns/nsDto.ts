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

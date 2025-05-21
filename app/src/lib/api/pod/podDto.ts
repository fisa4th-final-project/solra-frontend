export interface GetPodListRequestParam {
  clusterId: number;
  nsName: string;
}

export interface GetPodListResponseDto {
  name: string;
  phase: string;
  podIP?: string;
  nodeName?: string;
}

export interface GetPodDetailRequestParam {
  clusterId: number;
  nsName: string;
  name: string;
}

export interface GetPodDetailResponseDto {
  name: string;
  phase: string;
  podIP?: string;
  nodeName?: string;
}
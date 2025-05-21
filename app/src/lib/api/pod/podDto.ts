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
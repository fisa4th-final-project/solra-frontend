export interface GetNodesRequestParam {
  clusterId: number;
}

export interface GetNodesResponseDto {
  name: string;
  status: string;
  capacity: {
    cpu: string;
    ephemeralStorage: string;
    hugepages1Gi: string;
    hugepages2Mi: string;
    memory: string;
    pods: string;
  },
  allocatable: {
    cpu: string;
    ephemeralStorage: string;
    hugepages1Gi: string;
    hugepages2Mi: string;
    memory: string;
    pods: string;
  }
}
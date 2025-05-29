export interface GetNodeListRequestParam {
  clusterId: number;
}

export interface GetNodeListResponseDto {
  clusterId: string;
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

export interface GetNodeDetailRequestParam {
  clusterId: number;
  nodeName: string;
}

export interface GetNodeDetailResponseDto {
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
export interface GetDeployListRequestParam {
  clusterId: number;
  name: string;
}

export interface GetDeployListResponseDto {
  name: string;
  replicas: number;
  readyReplicas: number;
  selector: {
    app: string;
  };
  images: string[];
}

export interface GetDeployDetailRequestParam {
  clusterId: number;
  nsName: string;
  deployName: string;
}

export interface GetDeployDetailResponseDto {
  name: string;
  replicas: number;
  readyReplicas: number;
  selector: {
    app: string;
  };
  images: string[];
}
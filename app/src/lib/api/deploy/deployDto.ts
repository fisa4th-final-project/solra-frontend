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
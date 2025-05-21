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

export interface CreateDeployRequestDto {
  clusterId: number;
  nsName: string;
  name: string;
  labels: {
    app: string;
  };
  container: {
    name: string;
    image: string;
    port: number;
  }
}

export interface CreateDeployResponseDto {
  name: string;
  replicas: number;
  labels: {};
  container: {};
}
export interface GetSvcListRequestParam {
  clusterId: number;
  nsName: string;
}

export interface GetSvcListResponseDto {
  name: string;
  type: string;
  clusterIP: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
  }[];
}

export interface GetSvcDetailRequestParam {
  clusterId: number;
  nsName: string;
  name: string;
}

export interface GetSvcDetailResponseDto {
  name: string;
  type: string;
  clusterIP: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
  }[];
}

export interface CreateSvcRequestDto {
  clusterId: number;
  nsName: string;
  name: string;
  type: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
  }[];
}

export interface CreateSvcResponseDto {
  name: string;
  type: string;
  clusterIP: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    nodePort?: number;
    port: number;
    targetPort: number;
  } [];
}

export interface UpdateSvcRequestDto {
  clusterId: number;
  nsName: string;
  name: string;
  type: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
  }[];
}

export interface UpdateSvcResponseDto {
  name: string;
  type: string;
  selector: {
    app: string;
  };
  ports: {
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
  }[];
}

export interface DeleteSvcQueryParam {
  clusterId: number;
  nsName: string;
  name: string;
}
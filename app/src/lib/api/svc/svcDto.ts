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
  ports: [
    {
      protocol: string;
      nodePort?: number;
      port: number;
      targetPort: number
    }
  ]
}
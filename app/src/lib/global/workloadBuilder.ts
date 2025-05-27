import type { GetDeployListResponseDto } from "@/lib/api/deploy/deployDto";
import type { GetSvcListResponseDto } from "@/lib/api/svc/svcDto";

interface WorkloadReq {
  svcList: GetSvcListResponseDto[] | null;
  deployList: GetDeployListResponseDto[] | null;
}

interface WorkloadGroup {
  name: string;
  service?: GetSvcListResponseDto;
  deploy?: GetDeployListResponseDto;
}

/**
 * app 라벨 추출 함수
 */
function extractAppName(selector: Record<string, string> | undefined): string | null {
  if (!selector) return null;
  return (
    selector["app"] ??
    selector["app.kubernetes.io/name"] ??
    null
  );
}

export function buildWorkloadStructure(req: WorkloadReq): WorkloadGroup[] {
  const appMap: Map<string, WorkloadGroup> = new Map();

  // 서비스 처리
  req.svcList?.forEach(service => {
    const app = extractAppName(service.selector);
    if (!app) return;

    if (!appMap.has(app)) {
      appMap.set(app, { name: app });
    }

    appMap.get(app)!.service = service;
  });

  // 디플로이 처리
  req.deployList?.forEach(deploy => {
    const app = extractAppName(deploy.selector);
    if (!app) return;

    if (!appMap.has(app)) {
      appMap.set(app, { name: app });
    }

    appMap.get(app)!.deploy = deploy;
  });

  return Array.from(appMap.values());
}

import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetSvcDetailRequestParam, GetSvcDetailResponseDto } from "@/lib/api/svc/svcDto";

export async function getSvcDetailApi(reqDto: GetSvcDetailRequestParam):Promise<GetSvcDetailResponseDto | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services/${reqDto.name}`,
    auth: true
  }).then(async (res: ApiResponse<GetSvcDetailResponseDto>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '서비스 상세 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}
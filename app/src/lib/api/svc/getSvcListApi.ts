import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetSvcListRequestParam, GetSvcListResponseDto } from "@/lib/api/svc/svcDto";

export async function getSvcListApi(reqDto: GetSvcListRequestParam):Promise<GetSvcListResponseDto[] | null> {

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services`,
    auth: true
  }).then(async (res: ApiResponse<GetSvcListResponseDto[]>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '서비스 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}